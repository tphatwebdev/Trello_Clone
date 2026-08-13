import Box from '@mui/material/Box'
import CardTrello from './CardTrello/CardTrello'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
function ListCards({ cards }) {
  return (
    <SortableContext items={cards?.map(c => c._id)} strategy={verticalListSortingStrategy}>
      <Box sx={(theme) => ({
        p: '0 5px',
        m: '0 5px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: `calc(
            ${theme.trello.boardContentHeight} - 
            ${theme.spacing(5)} -
            ${theme.trello.columnHeaderHeight} -
            ${theme.trello.columnFooterHeight}
          )`,
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
        '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bfc2cf' }
      })}>
        {cards.map(card => <CardTrello key={card._id} card={card}/>)}
      </Box>
    </SortableContext>
  )
}
export default ListCards