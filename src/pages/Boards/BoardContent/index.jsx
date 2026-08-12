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
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'


const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

const BoardContent = () => {
  const id = useId()
  const buttonId = `${id}-column-dropdown`
  const menuId = `${id}-menu-column-dropdown`
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {setAnchorEl(event.currentTarget)}
  const handleClose = () => {setAnchorEl(null)}
  return (
    <Box sx={(theme) => ({
      bgcolor: '#1976d2',
      ...theme.applyStyles('dark', {
        bgcolor: '#31495e'
      }),
      width: '100%',
      height: theme.trello.boardContentHeight,
      p: '10px 0'
    })}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {/* Column 1 */}
        <Box sx={(theme) => ({
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
          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant='h6' sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
            Column Title
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
          {/* Box list card */}
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
            ${COLUMN_HEADER_HEIGHT} -
            ${COLUMN_FOOTER_HEIGHT}
          )`,
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
            '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bfc2cf' }
          })}>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="https://i.pinimg.com/736x/b1/00/9b/b1009b3e1aa77b1ee5c67228ad8df1d5.jpg"
              />
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Tran Tien Phat</Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }}>
                <Button size="small" startIcon={<GroupIcon/>}>20</Button>
                <Button size="small" startIcon={<CommentIcon/>}>15</Button>
                <Button size="small" startIcon={<AttachmentIcon/>}>10</Button>
              </CardActions>
            </Card>

            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>

              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>

              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>

              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>

              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>

              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>

              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>

              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>

              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>

              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>

              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>

              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>

          </Box>
          {/* Box column footer */}
          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button startIcon={<AddCardIcon/>}>
            Add new card
            </Button>
            <Tooltip title='Drag to move'>
              <DragHandleIcon sx={{ cursor: 'pointer' }}/>
            </Tooltip>
          </Box>
        </Box>

        {/* Column 2 */}
        <Box sx={(theme) => ({
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
          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant='h6' sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
            Column Title
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
          {/* Box list card */}
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
            ${COLUMN_HEADER_HEIGHT} -
            ${COLUMN_FOOTER_HEIGHT}
          )`,
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
            '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bfc2cf' }
          })}>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="https://i.pinimg.com/736x/b1/00/9b/b1009b3e1aa77b1ee5c67228ad8df1d5.jpg"
              />
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Tran Tien Phat</Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }}>
                <Button size="small" startIcon={<GroupIcon/>}>20</Button>
                <Button size="small" startIcon={<CommentIcon/>}>15</Button>
                <Button size="small" startIcon={<AttachmentIcon/>}>10</Button>
              </CardActions>
            </Card>

            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>

              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
          </Box>
          {/* Box column footer */}
          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button startIcon={<AddCardIcon/>}>
            Add new card
            </Button>
            <Tooltip title='Drag to move'>
              <DragHandleIcon sx={{ cursor: 'pointer' }}/>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default BoardContent