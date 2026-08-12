import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

const BoardContent = ({ board }) => {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
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
      <ListColumns columns={orderedColumns}/>
    </Box>
  )
}
export default BoardContent