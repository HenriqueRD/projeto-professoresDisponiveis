import { Request, Response } from 'express'
import connection from '../database/connection'

export async function listSubjects(req: Request, res: Response) {

  const db = await connection.transaction()

  const subjects = await db('subjects').select('*')
  
  db.commit()
  res.status(200).json(subjects)
}