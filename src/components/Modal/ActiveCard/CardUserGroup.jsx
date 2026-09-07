import { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'
import AddIcon from '@mui/icons-material/Add'
import Badge from '@mui/material/Badge'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

function CardUserGroup({ cardMemberIds = [] }) {
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const isOpenPopover = Boolean(anchorPopoverElement)
  const popoverId = isOpenPopover ? 'card-all-users-popover' : undefined
  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
    else setAnchorPopoverElement(null)
  }

  return (
    <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      {/* Hiển thị các user là thành viên của card */}
      {[...Array(8)].map((_, index) =>
        <Tooltip title="trungquandev" key={index}>
          <Avatar
            sx={{ width: 34, height: 34, cursor: 'pointer' }}
            alt="trungquandev"
            src="https://trungquandev.com/wp-content/uploads/2019/06/trungquandev-cat-avatar.png"
          />
        </Tooltip>
      )}

      {/* Nút này để mở popover thêm member */}
      <Tooltip title="Add new member">
        <Box
          aria-describedby={popoverId}
          onClick={handleTogglePopover}
          sx={(theme) => ({
            width: 36,
            height: 36,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '600',
            borderRadius: '50%',
            color: '#172b4d',
            bgcolor: (theme) => theme.palette.grey[200],
            ...theme.applyStyles('dark', {
              color: '#90caf9',
              bgcolor: '#2f3542'
            }),
            '&:hover': {
              color: '#0c66e4',
              bgcolor: '#e9f2ff',
              ...theme.applyStyles('dark', {
                color: '#000000de',
                bgcolor: '#90caf9'
              })
            }
          })}
        >
          <AddIcon fontSize="small" />
        </Box>
      </Tooltip>

      {/* Khi Click vào + ở trên thì sẽ mở popover hiện toàn bộ users trong board để người dùng Click chọn thêm vào card  */}
      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, maxWidth: '260px', display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {[...Array(16)].map((_, index) =>
            <Tooltip title="trungquandev" key={index}>
              {/* Cách làm Avatar kèm badge icon: https://mui.com/material-ui/react-avatar/#with-badge */}
              <Badge
                sx={{ cursor: 'pointer' }}
                overlap="rectangular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={<CheckCircleIcon fontSize="small" sx={{ color: '#27ae60' }} />}
              >
                <Avatar
                  sx={{ width: 34, height: 34 }}
                  alt="trungquandev"
                  src="https://trungquandev.com/wp-content/uploads/2019/06/trungquandev-cat-avatar.png"
                />
              </Badge>
            </Tooltip>
          )}
        </Box>
      </Popover>
    </Box>
  )
}

export default CardUserGroup
