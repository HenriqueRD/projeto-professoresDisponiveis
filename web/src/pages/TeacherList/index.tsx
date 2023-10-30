import './index.css'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Card from '../../components/Card'
import api from '../../api/api'
import { Subjects } from '../TeacherCreate'
export default function TeacherList() {

  const [ subjects, setSubjects ] = useState<Subjects[]>([])
  
  useEffect(() => {
    api.get('/subjects/').then(x => setSubjects(x.data))
  }, [])

  return (
    <div id="TeacherList">
      <Header title='Estes são os proffys disponíveis.'>
        <form className="formList">
          <div className='input'>
            <label htmlFor="materia">Matéria</label>
            <select name="materia" id="materia">
                <option value="0">Selecione um Matéria</option>
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
            <select name="dia" id="dia">
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
            <select name="hora" id="hora">
              <option value="0">Selecione um Dia</option>
            </select>
          </div>
        </form>
      </Header>
      <div className="container">
        <div className="cards">
          <Card iconUrl='https://github.com/HenriqueRD.png' price={360} name='Tiago Luchtenberg' discipline='Geografia' description='As vezes não sei nem onde eu tô, mas consigo me localizar facilmente em qualquer lugar. Tenho memória fotográfica e nunca fico perdido. Eu ensino a galera como não se perder na vida, com lições geográficas simples pra você nunca mais precisar de mapa na sua bela vida.' />
        </div>
      </div>
    </div>
  )
}