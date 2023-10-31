import './index.css'
import { useState, useEffect, FormEvent } from 'react'
import Header from '../../components/Header'
import Card from '../../components/Card'
import api from '../../api/api'
import { Subjects } from '../TeacherCreate'

interface Classes {
  name: string,
  icon_url: string,
  description: string,
  phone: string,
  price: number,
  subject_desc: string,
  id: number,
}

export default function TeacherList() {

  const [ subjects, setSubjects ] = useState<Subjects[]>([])
  const [ classes, setClasses ] = useState<Classes[]>([])

  const [ subject, setSubject ] = useState('')
  const [ day, setDay ] = useState('')
  const [ time, setTime ] = useState('')

  
  useEffect(() => {
    api.get('/subjects/').then(x => setSubjects(x.data))
  }, [])

  async function handleSearchClasses(e: FormEvent) {
    e.preventDefault() 

    if(subject == ''|| time == '' || day == '') {
      return
    }

    await api.get('/classes/',{
      params: {
        week_day: day,
        subject_id: Number(subject),
        time,
      }
    }).then(x => setClasses(x.data))
  }

  return (
    <div id="TeacherList">
      <Header title='Estes são os proffys disponíveis.'>
        <form className="formList" onSubmit={handleSearchClasses}>
          <div className='input'>
            <label htmlFor="materia">Matéria</label>
            <select required name="materia" id="materia" value={subject} onChange={e => setSubject(e.target.value)}>
                <option value=''>Selecione um Matéria</option>
                {
                  subjects.map(x => {
                    return (
                      <option key={x.id} value={x.id}>{x.description}</option>
                    )
                  })
                }
            </select>
          </div>
          <div className='input'>
            <label htmlFor="dia">Dia da semana</label>
            <select required name="dia" id="dia" value={day} onChange={e => setDay(e.target.value)}>
              <option value={0}>Selecione um Dia</option>
              <option value={1}>Segunda-feira</option>
              <option value={2}>Terça-feira</option>
              <option value={3}>Quarta-feira</option>
              <option value={4}>Quinta-feira</option>
              <option value={5}>Sexta-feira</option>
              <option value={6}>Sábado</option>
              <option value={7}>Domingo</option>
            </select>
          </div>
          <div className='input'>
            <label htmlFor="hora">Horário</label>
            <select required name="hora" id="hora" value={time} onChange={e => setTime(e.target.value)}>
              <option value="0">Selecione um horário</option>
              {
                Array.from({length: 30}).map((x, i) => {
                  const hour = Math.floor(i / 2) + 7;
                  const t = String(hour).padStart(2, '0')+':'+ (i % 2 == 0 ? '00' : '30')
                  return (
                    <option value={t}>{t}</option>
                  )
                })
              }
            </select>
          </div>
          <div className='button'>
            <span>0</span>
            <button type='submit'>Filtrar</button>
          </div>
        </form>
      </Header>
      <div className="container">
        <div className="cards">
          {
            classes.length == 0 ? (
              <div className="empty">
                <span>Nenhum professor encontrado com sua pesquisa.</span>
              </div>
            ) : (
              classes.map(x => { return (
                <Card key={x.id} iconUrl={x.icon_url} price={x.price} name={x.name} discipline={x.subject_desc} description={x.description} />
              )})
            )
          }
        </div>
      </div>
    </div>
  )
}