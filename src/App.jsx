import Button from '@mui/material/Button'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'
import Typography from '@mui/material/Typography'
function App() {
  return (
    <>
      <div>Tran Tien Phat</div>
      <Typography variant='body2' sx={{ color: 'text.abcxyz' }}>Phat dep trai</Typography>
      <Typography variant='body2' sx={{ color: 'text.secondary' }}>Phat dep trai</Typography>
      <Button variant="contained">Hello world</Button>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <AccessAlarmIcon/>
      <ThreeDRotation/>
    </>
  )
}

export default App
