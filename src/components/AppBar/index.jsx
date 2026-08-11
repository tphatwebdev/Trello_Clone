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

const AppBar = () => {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: 2
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'primary.main' }}/>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={trello} inheritViewBox sx={{ color: 'primary.main' }}/>
          <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}>Trello</Typography>
        </Box>
        <Workspaces/>
        <Recent/>
        <Started/>
        <Templates/>

        <Button variant="outlined">Create</Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField id="outlined-basic" label="Search..." variant="outlined" size='small'/>
        <ModeSelect/>
        <Tooltip title="Notification">
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
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Help">
          <IconButton>
            <HelpOutlineOutlinedIcon sx={{ cursor: 'pointer' }}/>
          </IconButton>
        </Tooltip>
        <Profiles/>
      </Box>
    </Box>
  )
}
export default AppBar