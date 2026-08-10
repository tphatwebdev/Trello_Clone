import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'light',
    primary: {
      main: '#2945c1'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    text: {
      secondary: red[500],
      abcxyz: '#d6ed55'
    }
  }
})

export default theme