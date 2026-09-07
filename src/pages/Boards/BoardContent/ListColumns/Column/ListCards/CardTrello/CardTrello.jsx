import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Button from '@mui/material/Button'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentActiveBoard, updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import cloneDeep from 'lodash/cloneDeep'
import ToggleFocusInput from '~/components/Form/ToggleFocusInput'
import { updateCurrentActiveCard } from '~/redux/activeCard/activeCardSlice'

function CardTrello({ card }) {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
      useSortable({
        id: card._id,
        data: { ...card }
      })

  const dndKitCardStyles = {
    touchAction: 'none',
    // Translate thay cho Transform tránh bug
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #2ecc71' : undefined
  }

  const shouldShowCardActions = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }

  const onUpdateCardTitle = (newTitle) => {
    if (board) {
      const newBoard = cloneDeep(board)
      const column = newBoard.columns.find(c => c._id === card.columnId)
      if (column) {
        const cardToUpdate = column.cards.find(c => c._id === card._id)
        if (cardToUpdate) {
          cardToUpdate.title = newTitle
        }
      }
      dispatch(updateCurrentActiveBoard(newBoard))
    }
  }

  const setActiveCard = () => {
    // cập nhật data cho cái activeCard trong redux
    dispatch(updateCurrentActiveCard(card))
  }

  return (
    <Card
      onClick={setActiveCard}
      ref={setNodeRef} style={dndKitCardStyles} {...attributes} {...listeners}
      sx={(theme) => ({
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset',
        display: card?.FE_PlaceholderCard ? 'none' : 'block',
        border: '1px solid transparent',
        '&:hover': { borderColor: theme.palette.primary.main }
      })}>
      {card?.cover &&
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={card?.cover}
        />
      }

      <CardContent sx={{ p: '8px 10px', '&:last-child': { p: '8px 10px' } }}>
        <ToggleFocusInput
          value={card?.title}
          onChangedValue={onUpdateCardTitle}
          inputFontSize="14.5px"
          fontWeight="500"
          lineHeight="20px"
          data-no-dnd="true"
          fitContent
        />
      </CardContent>

      {shouldShowCardActions() &&
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          {!!card?.memberIds?.length && <Button size="small" startIcon={<GroupIcon/>}>{card?.memberIds?.length}</Button>}
          {!!card?.comments?.length && <Button size="small" startIcon={<CommentIcon/>}>{card?.comments?.length}</Button>}
          {!!card?.attachments?.length && <Button size="small" startIcon={<AttachmentIcon/>}>{card?.attachments?.length}</Button>}
        </CardActions>
      }
    </Card>
  )
}
export default CardTrello