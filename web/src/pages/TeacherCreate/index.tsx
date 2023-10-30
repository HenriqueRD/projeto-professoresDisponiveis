import { Warning } from '@phosphor-icons/react'
import Header from '../../components/Header'
import './index.css'
import { useState, useEffect } from 'react'
import api from '../../api/api'

export interface Subjects {
  id: number,
  description: string
}

interface Schedules {
  day: number,
  from: string,
  to: string
}

export default function TeacherCreate() {
  
  const [ subjects, setSubjects ] = useState<Subjects[]>([])
  const [ schedules, setSchedules ] = useState<Schedules[]>([{ day: 0, from: '', to: '' }])
  
  useEffect(() => {
    api.get('/subjects/').then(x => setSubjects(x.data))
  }, [])

  function handleNewSchedule() {
    setSchedules([...schedules, {
      day: 0,
      from: "",
      to: ""
    }])
    console.log(schedules)
  }

  return (
    <div id="TeacherCreate">
      <Header title='Que incrível que você quer dar aulas.' />
      <div className="container">
        <form>
          <div className="content">
            <div className="clield">
              <h2>Seus dados</h2>
              <hr />
              <div className="input">
                <label htmlFor="name">Nome completo</label>
                <input id="name" type="text" />
              </div>
              <div className="input">
                <label htmlFor="icon">Link da sua foto</label>
                <input id="icon" type="text" />
              </div>
              <div className="input">
                <label htmlFor="phone">Número do telefone</label>
                <input id="phone" type="text" />
              </div>
              <div className="input">
                <label htmlFor="desc">Descrição</label>
                <textarea id="desc" />
              </div>
            </div>
            <div className="clield">
              <h2>Sobre a aula</h2>
              <hr />
              <div className="input">
                <label htmlFor="materia">Matéria</label>
                <select name="dia" id="materia">
                  <option value="0">Selecione uma Matéria</option>
                  {
                    subjects.map(x => {
                      return (
                        <option key={x.id} value={x.id}>{x.description}</option>
                      )
                    })
                  }
              </select>
              </div>
              <div className="input">
                <label htmlFor="price">Custo da sua hora por aula</label>
                <input id="price" type="number" />
              </div>
            </div>
            <div className="clield">
              <div className='header'>
                <h2>Horários disponíveis</h2>
                <button type="button" onClick={handleNewSchedule}>+ Novo horário</button>
              </div>
              <hr />
              {
                schedules.map(x => {
                  return (
                    <div className="schedule" key={Math.random()}>
                      <div className='input'>
                        <label htmlFor="dia">Dia da semana</label>
                        <select name="dia" id="dia" onChange={e => x.day = Number(e.target.value)}>
                          <option value={0}>Selecione o dia</option>
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
                        <label htmlFor="das">Das</label>
                        <input id="das" type="time" onChange={e => x.from = e.target.value} />
                      </div>
                      <div className='input'>
                        <label htmlFor="ate">Até</label>
                        <input id="ate" type="time" onChange={e => x.to = e.target.value} />
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className='footer'>
            <span><Warning size={28} /> Importante! Preencha todos os dados</span>
            <button type='submit'>Salvar cadastro</button>
          </div>
        </form>
      </div>
    </div>
  )
}