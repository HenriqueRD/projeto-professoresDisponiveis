import { Trash, Warning } from '@phosphor-icons/react'
import Header from '../../components/Header'
import './index.css'
import { useState, useEffect, FormEvent } from 'react'
import api from '../../api/api'

export interface Subjects {
  id: number,
  description: string
}

interface Schedules {
  week_day: number,
  from: string,
  to: string
}

export default function TeacherCreate() {
  
  const [ subjects, setSubjects ] = useState<Subjects[]>([])

  const [ name, setName ] = useState('')
  const [ iconUrl, setIconUrl ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ subject, setSubject ] = useState(0)
  const [ price, setPrice ] = useState(0)
  const [ schedules, setSchedules ] = useState<Schedules[]>([{ week_day: 0, from: '', to: '' }])
  
  useEffect(() => {
    api.get('/subjects/').then(x => setSubjects(x.data))
  }, [])

  function handleAddNewSchedule() {
    setSchedules([...schedules, {
      week_day: 0,
      from: "",
      to: ""
    }])
  }

  function handleDeleteSchedule(id : number) {
    if(schedules.length == 1) {
      return
    }
    const newArray = schedules.filter((x, index) => index !== id)
    setSchedules(newArray)
  }

  function handleInsertSchedule(id : number, field : string, value : number | string) {
    const newArray = schedules.map((x, index) => {
      if(index == id) {
        return { ...x, [field]: value }
      }
      return { ...x }
    })
    setSchedules(newArray)
  }

  function handleSubmit(e : FormEvent) {
    e.preventDefault()
    api.post('/classes/', {
      name,
      icon_url: iconUrl,
      phone,
      description,
      subject_id: subject,
      price,
      schedules
    }).catch(err => alert(err))
  
  }

  return (
    <div id="TeacherCreate">
      <Header title='Que incrível que você quer dar aulas.' />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="content">
            <div className="clield">
              <h2>Seus dados</h2>
              <hr />
              <div className="input">
                <label htmlFor="name">Nome completo</label>
                <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="input">
                <label htmlFor="icon">Link da sua foto</label>
                <input id="icon" type="text" value={iconUrl} onChange={e => setIconUrl(e.target.value)} />
              </div>
              <div className="input">
                <label htmlFor="phone">Número do telefone</label>
                <input id="phone" type="text" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div className="input">
                <label htmlFor="desc">Descrição</label>
                <textarea id="desc" value={description} onChange={e => setDescription(e.target.value)} />
              </div>
            </div>
            <div className="clield">
              <h2>Sobre a aula</h2>
              <hr />
              <div className="input">
                <label htmlFor="materia">Matéria</label>
                <select name="dia" id="materia" value={subject} onChange={e => setSubject(Number(e.target.value))}>
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
                <input id="price" type="number" value={price} onChange={e => setPrice(Number(e.target.value))} />
              </div>
            </div>
            <div className="clield">
              <div className='header'>
                <h2>Horários disponíveis</h2>
                <button type="button" onClick={handleAddNewSchedule}>+ Novo horário</button>
              </div>
              <hr />
              {
                schedules.map((x, index) => {
                  return (
                    <div className="schedule" key={index}>
                      <div className='item'>
                        <div className='input'>
                          <label htmlFor="dia">Dia da semana</label>
                          <select required name="dia" id="dia" value={x.week_day} onChange={e => handleInsertSchedule(index, "week_day", Number(e.target.value))}>
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
                        <div className="input2">
                          <div className='input'>
                            <label htmlFor="das">Das</label>
                            <input required id="das" type="time" value={x.from} onChange={e => handleInsertSchedule(index, "from", e.target.value)} />
                          </div>
                          <div className='input'>
                            <label htmlFor="ate">Até</label>
                            <input required id="ate" type="time"  onChange={e => handleInsertSchedule(index, "to", e.target.value)} />
                          </div>
                          <div className="button">
                            <button type='button' onClick={() => handleDeleteSchedule(index)}>
                              <Trash size={28} /> 
                            </button>
                          </div>
                        </div>                        
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
/*

As vezes não sei nem onde eu tô, mas consigo me localizar facilmente em qualquer lugar. Tenho memória fotográfica e nunca fico perdido. Eu ensino a galera como não se perder na vida, com lições geográficas simples pra você nunca mais precisar de mapa na sua bela vida.
https://img.freepik.com/fotos-gratis/homem-bonito-posando-e-sorrindo_23-2149396133.jpg
*/