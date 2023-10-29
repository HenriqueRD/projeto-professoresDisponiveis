import './index.css'
import Header from '../../components/Header'
import Card from '../../components/Card'
export default function TeacherList() {
  return (
    <div id="TeacherList">
      <Header title='Estes são os proffys disponíveis.'>
        <form className="formList">
          <div className='input'>
            <label htmlFor="materia">Matéria</label>
            <select name="materia" id="materia">
                <option value="0">Selecione um Matéria</option>
                {}
            </select>
          </div>
          <div className='input'>
            <label htmlFor="dia">Dia da semana</label>
            <select name="dia" id="dia">
                <option value="0">Selecione um Dia</option>
                {}
            </select>
          </div>
          <div className='input'>
            <label htmlFor="hora">Horário</label>
            <select name="hora" id="hora">
                <option value="0">Selecione um Horário</option>
                {}
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