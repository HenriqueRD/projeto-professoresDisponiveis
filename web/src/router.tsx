import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import TeacherCreate from './pages/TeacherCreate'
import TeacherList from './pages/TeacherList'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/teacherCreate' Component={TeacherCreate} />
        <Route path='/teacherList' Component={TeacherList} />
      </Routes>
    </BrowserRouter>
  )
}