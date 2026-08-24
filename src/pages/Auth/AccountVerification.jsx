import { useState, useEffect } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import PageLoading from '~/components/Loading/PageLoading'
import { verifyUserAPI } from '~/apis'

function AccountVerification() {
  // Lấy giá trị email và token từ url
  let [searchParams] = useSearchParams()
  const { email, token } = Object.fromEntries([...searchParams])
  // tạo 1 biến state để biết được là đã verify tài khoản hay chưa
  const [verify, setVerify] = useState(false)
  useEffect (() => {
    if (email && token) {
      verifyUserAPI({ email, token }).then(() => setVerify(true))
    }
  }, [email, token])
  if (!email || !token) {
    return <Navigate to='/404'/>
  }
  if (!verify) {
    return <PageLoading caption='Verifying your account...'/>
  }
  return <Navigate to={`/login?verifiedEmail=${email}`}/>
}
export default AccountVerification