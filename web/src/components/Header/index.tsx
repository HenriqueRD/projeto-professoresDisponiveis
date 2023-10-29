import { Link } from 'react-router-dom'
import './index.css'
import { ArrowLeft } from '@phosphor-icons/react'
import { ReactNode } from 'react';

interface Header {
  title: string;
  children?: ReactNode;
}

export default function Header({ title, children } : Header) {
  return (
    <div id="Header">
      <header>
        <div className="contentTop">
          <Link to="/">
            <ArrowLeft size={32} />
          </Link>
          <h2>Profe_</h2>
        </div>
        <div className="content">
          <div className="title">
            <h1>{title}</h1>
          </div>
          {children}
        </div>
      </header>
    </div>
  )
}