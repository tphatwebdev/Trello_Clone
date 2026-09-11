import { useState } from 'react'
import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import SvgIcon from '@mui/material/SvgIcon'
import trello from '~/assets/trello.svg?react'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Started from './Menus/Started'
import Templates from './Menus/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import Profiles from './Menus/Profiles'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { Link } from 'react-router-dom'
import Notifications from './Notifications/Notifications'

const AppBar = () => {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Box sx={(theme) => ({
      width: '100%',
      height: theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingX: 2,
      gap: 2,
      overflowX: 'auto',
      bgcolor: '#1565c0',
      ...theme.applyStyles('dark', {
        bgcolor: '#2c3e50'
      })
    })}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Link to='/boards'>
          <Tooltip title="Boards list">
            <AppsIcon sx={{ color: 'white', verticalAlign: 'middle' }}/>
          </Tooltip>
        </Link>
        <Link to='/'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={trello} fontSize='small' inheritViewBox sx={{ color: 'white' }}/>
            <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>Taskly</Typography>
          </Box>
        </Link>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces/>
          <Recent/>
          <Started/>
          <Templates/>
          <Button
            sx={{
              color: 'white',
              border: 'none',
              '&:hover': { border: 'none' }
            }}
            variant="outlined"
            startIcon={<LibraryAddIcon/>}
          >
            Create
          </Button>
        </Box>

      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          id="outlined-basic"
          label="Search..."
          type='text'
          variant="outlined"
          size='small'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }}/>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <CloseIcon
                    fontSize='small'
                    sx={{ color: searchValue ? 'white' : 'transparent', cursor: 'pointer' }}
                    onClick={() => setSearchValue('')}
                  />
                </InputAdornment>
              )
            }
          }}
          sx={{
            minWidth: '120px',
            maxWidth: '180px',
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
        {/* dark-light mode */}
        <ModeSelect/>
        {/* Xử lý hiển thị thông báo - notification */}
        <Notifications/>
        <Tooltip title="Help">
          <IconButton>
            <HelpOutlineOutlinedIcon sx={{ cursor: 'pointer', color: 'white' }}/>
          </IconButton>
        </Tooltip>
        <Profiles/>
      </Box>
    </Box>
  )
}
export default AppBar