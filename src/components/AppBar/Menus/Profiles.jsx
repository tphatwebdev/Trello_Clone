import { useId, useState } from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'

function Profiles() {
  const id = useId()
  const buttonId = `${id}-button-profiles`
  const menuId = `${id}-menu-profiles`
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open}
        >
          <Avatar
            sx={{ width: 34, height: 34 }}
            src='https://scontent.fsgn5-7.fna.fbcdn.net/v/t39.30808-6/558513895_1366450821494308_6159585440158163178_n.jpg?stp=dst-jpg_tt6&cstp=mx736x1266&ctp=s736x1266&_nc_cat=101&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=YYPNvLjTWFYQ7kNvwGS_Z6l&_nc_oc=AdodzTO9COZMQX03hxzetvjgGjI6SH55oWK35pmE4YFV4WJDoWLO4SmA1SixQ_O4XZMWHZInQjwStlbv-Jk8nd69&_nc_zt=23&_nc_ht=scontent.fsgn5-7.fna&_nc_gid=s1GHWlneCamQfqsoiH7VHw&_nc_ss=7b2a8&oh=00_AQH2BEy3xnVixs4UjnLMcVmgaLAGRtEuDD1IEMl1ENEW9w&oe=6A80B08B'
            alt='Tran Tien Phat'
          />
        </IconButton>
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
          <Avatar sx={{ width: '28px', height: '28px', mr: 2 }}/> Profile
        </MenuItem>
        <MenuItem>
          <Avatar sx={{ width: '28px', height: '28px', mr: 2 }}/> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}
export default Profiles