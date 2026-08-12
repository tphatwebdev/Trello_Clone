import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

function ListColumns({ columns }) {
  return (
    <Box sx={{
      bgcolor: 'inherit',
      width: '100%',
      height: '100%',
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden',
      '&::-webkit-scrollbar-track': { m: 2 }
    }}>
      {columns?.map(column => <Column key={column._id} column={column}/>)}
      {/* Add new column CTA */}
      <Box sx={(theme) => ({
        minWidth: '200px',
        maxWidth: '200px',
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
    </Box>
  )
}
export default ListColumns