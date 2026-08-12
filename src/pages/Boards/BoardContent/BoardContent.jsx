import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'

const BoardContent = () => {
  return (
    <Box sx={(theme) => ({
      bgcolor: '#1976d2',
      ...theme.applyStyles('dark', {
        bgcolor: '#31495e'
      }),
      width: '100%',
      height: theme.trello.boardContentHeight,
      p: '10px 0'
    })}>
      <ListColumns />
    </Box>
  )
}
export default BoardContent