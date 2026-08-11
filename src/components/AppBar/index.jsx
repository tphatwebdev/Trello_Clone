import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect'
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
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import Profiles from './Menus/Profiles'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'

const AppBar = () => {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingX: 2,
      gap: 2,
      overflowX: 'auto'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'primary.main' }}/>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={trello} fontSize='small' inheritViewBox sx={{ color: 'primary.main' }}/>
          <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}>Trello</Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces/>
          <Recent/>
          <Started/>
          <Templates/>
          <Button variant="outlined" startIcon={<LibraryAddIcon/>}>Create</Button>
        </Box>

      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField id="outlined-basic" label="Search..." variant="outlined" size='small' sx={{ minWidth: '120px' }}/>
        <ModeSelect/>
        <Tooltip title="Notifications">
          <IconButton>
            <Badge
              variant='dot'
              color="secondary"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              sx={{ cursor: 'pointer' }}
            >
              <NotificationsNoneIcon sx={{ color: 'primary.main' }}/>
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Help">
          <IconButton>
            <HelpOutlineOutlinedIcon sx={{ cursor: 'pointer', color: 'primary.main' }}/>
          </IconButton>
        </Tooltip>
        <Profiles/>
      </Box>
    </Box>
  )
}
export default AppBar