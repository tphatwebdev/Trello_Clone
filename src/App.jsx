import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth/Auth'
import AccountVerification from './pages/Auth/AccountVerification'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Settings from './pages/Settings/Settings'

const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true}/>
  return <Outlet />
}

function App() {
  const currentUser = useSelector(selectCurrentUser)
  return (
    <Routes>
      {/* redirect Route */}
      <Route path='/' element={
        <Navigate to='/boards/6a82b3095080dc199a3efc54' replace={true}/>
      }/>
      {/* protected routes */}
      <Route element={<ProtectedRoute user={currentUser}/>}>
        {/* Outlet của react-router-dom sẽ chạy vào các child route */}
        {/* Board Route */}
        <Route path='/boards/:boardId' element={<Board/>}/>
        {/* User Setting */}
        <Route path='/settings/account' element={<Settings/>}/>
        <Route path='/settings/security' element={<Settings/>}/>
      </Route>
      {/* Authentication */}
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth/>}/>
      <Route path='*' element={<NotFound/>}/>
      <Route path='/account/verification' element={<AccountVerification/>}/>
    </Routes>
  )
}

export default App
