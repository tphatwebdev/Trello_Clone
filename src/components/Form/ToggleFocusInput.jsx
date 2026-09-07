// TrungQuanDev: https://youtube.com/@trungquandev
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

/**
 * Controlled Input trong MUI với 2 chế độ:
 * 1. fitContent = false (Mặc định - Dùng cho ActiveCard modal):
 *    - Giữ nguyên thiết kế gốc của khóa học TrungQuanDev: Dùng TextField fullWidth với background và border trong suốt.
 *    - Click vào bất kỳ đâu trên hàng tiêu đề đều có thể focus và chỉnh sửa được.
 * 2. fitContent = true (Dùng cho Column header và CardTrello):
 *    - Chiều rộng chỉ bao bọc vừa khít nội dung chữ (width: fit-content).
 *    - Chỉ khi rê chuột và click trúng chữ của tiêu đề thì mới chuyển sang chế độ sửa,
 *      tránh chiếm hết diện tích header/thẻ làm cản trở hành động kéo thả (dnd-kit) hoặc click mở modal.
 */
function ToggleFocusInput({
  value,
  onChangedValue,
  inputFontSize = '16px',
  fontWeight = 'bold',
  lineHeight,
  fitContent = false,
  ...props
}) {
  const [inputValue, setInputValue] = useState(value)
  const [isFocus, setIsFocus] = useState(false)
  const [prevValue, setPrevValue] = useState(value)

  if (value !== prevValue) {
    setPrevValue(value)
    setInputValue(value)
  }

  const triggerBlur = () => {
    setIsFocus(false)
    const trimmed = (inputValue || '').trim()

    if (!trimmed || trimmed === value) {
      setInputValue(value)
      return
    }
    setInputValue(trimmed)
    onChangedValue(trimmed)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur()
    }
    if (e.key === 'Escape') {
      setInputValue(value)
      setIsFocus(false)
      e.target.blur()
    }
  }

  // Chế độ fitContent: Dành riêng cho Card title ngoài danh sách để chỉ click đúng chữ mới edit
  if (fitContent) {
    if (!isFocus) {
      return (
        <Typography
          onClick={(e) => {
            e.stopPropagation()
            setIsFocus(true)
          }}
          {...props}
          style={{
            fontSize: inputFontSize,
            fontWeight: fontWeight,
            ...props.style
          }}
          sx={(theme) => ({
            width: 'fit-content',
            display: 'inline-block',
            cursor: 'pointer',
            fontSize: inputFontSize,
            fontWeight: fontWeight,
            lineHeight: lineHeight || 'normal',
            px: '6px',
            py: '3px',
            borderRadius: '4px',
            border: '1px solid transparent',
            transition: 'all 0.15s ease',
            color: 'text.primary',
            '&:hover': {
              backgroundColor: '#091e420f',
              ...theme.applyStyles('dark', {
                backgroundColor: '#ffffff1a'
              }),
              borderColor: 'transparent'
            },
            ...props.sx
          })}
        >
          {inputValue}
        </Typography>
      )
    }

    return (
      <TextField
        id="toggle-focus-input-controlled"
        autoFocus
        fullWidth
        variant="outlined"
        size="small"
        value={inputValue}
        onChange={(event) => { setInputValue(event.target.value) }}
        onBlur={triggerBlur}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
        slotProps={{
          htmlInput: {
            style: {
              fontSize: inputFontSize,
              fontWeight: fontWeight
            }
          }
        }}
        inputProps={{
          style: {
            fontSize: inputFontSize,
            fontWeight: fontWeight
          }
        }}
        {...props}
        sx={(theme) => ({
          '& label': {},
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
            ...theme.applyStyles('dark', {
              backgroundColor: '#22272b'
            }),
            '& fieldset': {
              borderColor: 'primary.main',
              ...theme.applyStyles('dark', {
                borderColor: '#579dff'
              })
            },
            '&:hover fieldset': {
              borderColor: 'primary.main',
              ...theme.applyStyles('dark', {
                borderColor: '#579dff'
              })
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
              ...theme.applyStyles('dark', {
                borderColor: '#579dff'
              })
            }
          },
          '& .MuiOutlinedInput-input': {
            fontSize: inputFontSize,
            fontWeight: fontWeight,
            color: 'text.primary',
            ...theme.applyStyles('dark', {
              color: '#c7d1db'
            }),
            px: '6px',
            py: '3px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          },
          ...props.sx
        })}
      />
    )
  }

  // Chế độ mặc định: Dành cho ActiveCard Modal và Column Title (chuẩn TrungQuanDev)
  return (
    <TextField
      id="toggle-focus-input-controlled"
      fullWidth
      variant="outlined"
      size="small"
      value={inputValue}
      onChange={(event) => { setInputValue(event.target.value) }}
      onBlur={triggerBlur}
      onKeyDown={handleKeyDown}
      slotProps={{
        htmlInput: {
          style: {
            fontSize: inputFontSize,
            fontWeight: fontWeight
          }
        }
      }}
      inputProps={{
        style: {
          fontSize: inputFontSize,
          fontWeight: fontWeight
        }
      }}
      {...props}
      sx={(theme) => ({
        '& label': {},
        '& input': { fontSize: inputFontSize, fontWeight: fontWeight },
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'transparent',
          '& fieldset': { borderColor: 'transparent' }
        },
        '& .MuiOutlinedInput-root:hover': {
          borderColor: 'transparent',
          '& fieldset': { borderColor: 'transparent' }
        },
        '& .MuiOutlinedInput-root.Mui-focused': {
          backgroundColor: 'white',
          ...theme.applyStyles('dark', {
            backgroundColor: '#22272b'
          }),
          '& fieldset': {
            borderColor: 'primary.main',
            ...theme.applyStyles('dark', {
              borderColor: '#579dff'
            })
          }
        },
        '& .MuiOutlinedInput-input': {
          fontSize: inputFontSize,
          fontWeight: fontWeight,
          color: 'text.primary',
          ...theme.applyStyles('dark', {
            color: '#c7d1db'
          }),
          px: '6px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        },
        ...props.sx
      })}
    />
  )
}

export default ToggleFocusInput
