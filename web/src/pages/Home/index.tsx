import './index.css'
import banner from '../../assets/banner.svg'
import { BookOpen, Presentation } from '@phosphor-icons/react'
export default function Home() {

  return (
    <div id="Home">
      <div className="container">
        <div className="contentBanner">
          <div className="info">
            <h1>Profe_</h1>
            <h2>Sua plaforma de estudos online.</h2>
          </div>
          <div className="banner">
            <img src={banner} alt="banner" />
          </div>
        </div>
        <div className="links">
          <a><BookOpen size={28}/> Estudar</a>
          <a className="create"><Presentation size={28}/> Dar aulas</a>
        </div>
      </div>
    </div>
  )
}