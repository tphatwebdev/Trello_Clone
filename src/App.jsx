import { Routes, Route, Navigate } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth/Auth'


function App() {
  return (
    <Routes>
      {/* redirect Route */}
      <Route path='/' element={
        <Navigate to='/boards/6a82b3095080dc199a3efc54' replace={true}/>
      }/>
      {/* Board Route */}
      <Route path='/boards/:boardId' element={<Board/>}/>
      {/* Authentication */}
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default App
