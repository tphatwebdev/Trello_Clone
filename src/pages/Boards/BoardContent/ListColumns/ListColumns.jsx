import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { toast } from 'react-toastify'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'


function ListColumns({ columns, createNewColumn, createNewCard }) {
  const [isOpenNewColumnForm, setIsOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setIsOpenNewColumnForm(!isOpenNewColumnForm)
  const [newColumnTitle, setNewColumnTitle] = useState('')


  const addNewColumn = () => {
    if (!newColumnTitle) {
      toast.error('Please enter colomn title')
      return
    }
    // Tạo dữ liệu column để gọi API
    const newColumnData = {
      title: newColumnTitle
    }
    createNewColumn(newColumnData)
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }

  // SortableContext require items dang array ['id-1', 'id-2'] not {id: 'id-2}
  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {columns?.map(column => <Column key={column._id} column={column} createNewCard={createNewCard}/>)}
        {/* Add new column CTA */}
        {!isOpenNewColumnForm
          ? <Box onClick={toggleOpenNewColumnForm} sx={(theme) => ({
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            bgcolor: '#ffffff3d',
            ...theme.applyStyles('dark', {
              bgcolor: '#333643'
            }),
            borderRadius: '6px',
            height: 'fit-content'
          })}>
            <Button
              startIcon={<NoteAddIcon/>}
              sx={{
                color: 'white',
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1
              }}
            >
          Add new column
            </Button>
          </Box>
          : <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <TextField
              label="Enter column title..."
              type='text'
              variant="outlined"
              size='small'
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                onClick={addNewColumn}
                variant='contained' color='success' size='small'
                sx={(theme) => ({
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: theme.palette.success.main,
                  '&:hover': { bgcolor: theme.palette.success.main }
                })}
              >Add Column</Button>
              <CloseIcon
                fontSize='small'
                sx={(theme) => ({
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { color: theme.palette.warning.light }
                })}
                onClick={toggleOpenNewColumnForm}
              />
            </Box>
          </Box>
        }
      </Box>
    </SortableContext>
  )
}
export default ListColumns