import { useId, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utils/sorts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'

function Column({ column }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: column._id,
      data: { ...column }
    })

  const dndKitColumnStyles = {
    touchAction: 'none',
    // Translate thay cho Tranform tranh' bug
    transform: CSS.Translate.toString(transform),
    transition,
    // height: 100% de tranh loi keo qua lai giua column ngan va dai (phai keo o khu vuc giua kha kho chiu) {...listeners} nam o Box chu khong phai div tranh keo vao vung xanh
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }

  const id = useId()
  const buttonId = `${id}-column-dropdown`
  const menuId = `${id}-menu-column-dropdown`
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {setAnchorEl(event.currentTarget)}
  const handleClose = () => {setAnchorEl(null)}

  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')

  const [isOpenNewCardForm, setIsOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setIsOpenNewCardForm(!isOpenNewCardForm)
  const [newCardTitle, setNewCardTitle] = useState('')

  const addNewCard = () => {
    if (!newCardTitle) {
      // console.error('Please enter Card title')
      return
    }
    // console.log(newCardTitle)
    toggleOpenNewCardForm()
    setNewCardTitle('')
  }
  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        {...listeners}
        sx={(theme) => ({
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: '#ebecf0',
          ...theme.applyStyles('dark', {
            bgcolor: '#333643'
          }),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        })}>
        {/* Box column header */}
        <Box sx={(theme) => ({
          height: theme.trello.columnHeaderHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        })}>
          <Typography variant='h6' sx={{
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title='More options'>
              <ExpandMoreIcon
                sx={{ color: 'text.primary', cursor: 'pointer' }}
                id={buttonId}
                aria-controls={open ? menuId : undefined}
                aria-haspopup="true"
                aria-expanded={open}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id={menuId}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                list: {
                  'aria-labelledby': buttonId
                }
              }}
            >
              <MenuItem>
                <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Remove this colomn</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                <ListItemText>Archive this colomn</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* list cards */}
        <ListCards cards={orderedCards}/>
        {/* Box column footer */}
        <Box sx={(theme) => ({
          height: theme.trello.columnFooterHeight,
          p: 2
        })}>
          {!isOpenNewCardForm
            ? <Box sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Button startIcon={<AddCardIcon/>} onClick={toggleOpenNewCardForm}>Add new card</Button>
              <Tooltip title='Drag to move'>
                <DragHandleIcon sx={{ cursor: 'pointer' }}/>
              </Tooltip>
            </Box>
            : <Box sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <TextField
                label="Enter card title..."
                type='text'
                variant="outlined"
                size='small'
                autoFocus
                data-no-dnd="true"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                sx={(theme) => ({
                  '& label': { color: 'text.primary' },
                  '& input': {
                    color: theme.palette.primary.main,
                    bgcolor: theme.palette.mode === 'dark' ? '#333643' : 'white'
                  },
                  '& label.Mui-focused': { color: theme.palette.primary.main },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: theme.palette.primary.main },
                    '&:hover fieldset': { borderColor: theme.palette.primary.main },
                    '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                    '& .MuiOutlinedInput-input': { borderRadius: 1 }
                  }
                })}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  data-no-dnd="true"
                  onClick={addNewCard}
                  variant='contained' color='success' size='small'
                  sx={(theme) => ({
                    boxShadow: 'none',
                    border: '0.5px solid',
                    borderColor: theme.palette.success.main,
                    '&:hover': { bgcolor: theme.palette.success.main }
                  })}
                >Add</Button>
                <CloseIcon
                  data-no-dnd="true"
                  fontSize='small'
                  sx={(theme) => ({
                    color: theme.palette.warning.light,
                    cursor: 'pointer'
                  })}
                  onClick={toggleOpenNewCardForm}
                />
              </Box>
            </Box>
          }
        </Box>
      </Box>
    </div>
  )
}
export default Column