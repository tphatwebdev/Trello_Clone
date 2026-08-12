import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import AvatarGroup from '@mui/material/AvatarGroup'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'


const MENU_STYLES = {
  color: 'white', bgcolor: 'transparent', border: 'none', paddingX: '5px', borderRadius: '4px', '.MuiSvgIcon-root': {
    color: 'white'
  }, '&:hover': {
    bgcolor: 'primary.50'
  }
}

const BoardBar = ({ board }) => {
  return (
    <Box sx={(theme) => ({
      width: '100%',
      height: theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      bgcolor: '#1976d2',
      ...theme.applyStyles('dark', {
        bgcolor: '#31495e'
      }),
      paddingX: 2
    })}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />} label={board?.title}
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />} label={capitalizeFirstLetter(board?.type)}
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />} label="Add to Google drive"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />} label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />} label="Filters"
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon/>}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={7}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4b0be' }
            }
          }}
        >
          <Tooltip title='Tien Phat'>
            <Avatar alt="Tien Phat" src="https://i.pinimg.com/1200x/7b/20/65/7b20657f54c47195d30d68522b143648.jpg" />
          </Tooltip>
          <Tooltip title='Tien Phat'>
            <Avatar alt="Tien Phat" src="https://i.pinimg.com/736x/ba/61/a9/ba61a97ef370b4d8883a6968ac1c968d.jpg" />
          </Tooltip>
          <Tooltip title='Tien Phat'>
            <Avatar alt="Tien Phat" src="https://i.pinimg.com/736x/4b/23/ed/4b23ed85f9f61e7a4855faf4a08fc152.jpg" />
          </Tooltip>
          <Tooltip title='Tien Phat'>
            <Avatar alt="Tien Phat" src="https://i.pinimg.com/1200x/b2/70/c3/b270c3fbd991c82533b10b56c57d37f6.jpg" />
          </Tooltip>
          <Tooltip title='Tien Phat'>
            <Avatar alt="Tien Phat" src="https://i.pinimg.com/1200x/e9/a0/63/e9a0637f32d457dab496d3ca0c19086e.jpg" />
          </Tooltip>
          <Tooltip title='Tien Phat'>
            <Avatar alt="Tien Phat" src="https://i.pinimg.com/736x/7a/83/cb/7a83cbe3737dbee890157ac32ca96794.jpg" />
          </Tooltip>
          <Tooltip title='Tien Phat'>
            <Avatar alt="Tien Phat" src="https://i.pinimg.com/736x/ad/77/37/ad77370778b109e72a46213dfaf2426c.jpg" />
          </Tooltip>
          <Tooltip title='Tien Phat'>
            <Avatar alt="Tien Phat" src="https://i.pinimg.com/1200x/7b/20/65/7b20657f54c47195d30d68522b143648.jpg" />
          </Tooltip>
          <Tooltip title='Tien Phat'>
            <Avatar alt="Tien Phat" src="https://i.pinimg.com/736x/ba/61/a9/ba61a97ef370b4d8883a6968ac1c968d.jpg" />
          </Tooltip>
          <Tooltip title='Tien Phat'>
            <Avatar alt="Tien Phat" src="https://i.pinimg.com/736x/4b/23/ed/4b23ed85f9f61e7a4855faf4a08fc152.jpg" />
          </Tooltip>
          <Tooltip title='Tien Phat'>
            <Avatar alt="Tien Phat" src="https://i.pinimg.com/1200x/b2/70/c3/b270c3fbd991c82533b10b56c57d37f6.jpg" />
          </Tooltip>
          <Tooltip title='Tien Phat'>
            <Avatar alt="Tien Phat" src="https://i.pinimg.com/1200x/e9/a0/63/e9a0637f32d457dab496d3ca0c19086e.jpg" />
          </Tooltip>
          <Tooltip title='Tien Phat'>
            <Avatar alt="Tien Phat" src="https://i.pinimg.com/736x/7a/83/cb/7a83cbe3737dbee890157ac32ca96794.jpg" />
          </Tooltip>
          <Tooltip title='Tien Phat'>
            <Avatar alt="Tien Phat" src="https://i.pinimg.com/736x/ad/77/37/ad77370778b109e72a46213dfaf2426c.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}
export default BoardBar