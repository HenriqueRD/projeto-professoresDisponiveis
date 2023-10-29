import { Request, Response } from 'express'
import connection from '../database/connection'
import { sumMin } from '../utils/sum_min'

interface Hours {
  week_day: number,
  from: string,
  to: string,
}

export async function create(req: Request, res: Response) {

  const db = await connection.transaction()

  try {
    const user = {
      name: req.body.name,
      icon_url: req.body.icon_url,
      description: req.body.description,
      phone: req.body.phone
    }
  
    const user_id = await db('users').insert(user)
  
    const Class = {
      price: req.body.price,
      subject_id: req.body.subject_id,
      user_id: user_id[0]
    }
  
    const class_id = await db('classes').insert(Class)
  
    const schedule = req.body.schedule.map((x: Hours) => {
      return {
        week_day: x.week_day,
        from: sumMin(x.from),
        to: sumMin(x.to),
        class_id: class_id[0]
      }
    })
  
    await db('class_schedule').insert(schedule)
  
    db.commit()
  
    res.status(201).send()
  } catch (err) {
    db.rollback()
    res.status(400).json({error: err})
  }
}

export async function list(req: Request, res: Response) {

  const { subject_id, week_day, time } = req.query
  
  const db = await connection.transaction()

  if(!subject_id|| !week_day || !time) {
    return res.status(400).json({ error: "Error query params"})
  }

  const timeInMin = sumMin(time as string)

  const classes = await db('classes')
    .whereExists(function() {
      this.select('class_schedule.*').from('class_schedule')
      .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
      .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
      .whereRaw('`class_schedule`.`from` <= ??', [timeInMin])
      .whereRaw('`class_schedule`.`to` > ??', [timeInMin])
    })
    .innerJoin('users', 'classes.user_id', '=', 'users.id')
    .innerJoin('subjects', 'classes.subjects_id', '=', 'subjects.id')
    .where('classes.subjects_id', '=', Number(subject_id))
    .select(['classes.*', 'users.*'])

    db.commit()
  res.status(200).json(classes)
}