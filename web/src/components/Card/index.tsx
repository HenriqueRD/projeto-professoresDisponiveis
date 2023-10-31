import { WhatsappLogo } from '@phosphor-icons/react';
import './index.css'

interface Card {
  description: string;
  iconUrl: string;
  name: string;
  discipline: string;
  price: number;
}

export default function Card({ description, discipline, iconUrl, name, price } : Card) {
  return (
    <div id="Card">
      <div className="info">
        <div className="user">
          <img src={iconUrl} alt="" />
          <div>
            <strong>{name}</strong>
            <span>{discipline}</span>
          </div>
        </div>
        <p>{description}</p>
      </div>
      <div className="footer">
        <span>Preço/hora <span>R$ {price}</span></span>
        <a href="#"><WhatsappLogo size={24} /> Entrar em contato</a>
      </div>
    </div>
  )
}