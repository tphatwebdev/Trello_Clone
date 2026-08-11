import Box from '@mui/material/Box'

const BoardContent = () => {
  return (
    <Box sx={(theme) => ({
      bgcolor: '#1976d2',
      ...theme.applyStyles('dark', {
        bgcolor: '#31495e'
      }),
      width: '100%',
      height: `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
      display: 'flex',
      alignItems: 'center'
    })}>
        Board Content
    </Box>
  )
}
export default BoardContent