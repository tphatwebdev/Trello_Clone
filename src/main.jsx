import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from '~/theme.js'
import { ToastContainer } from 'react-toastify'
import { ConfirmProvider } from 'material-ui-confirm'
import { Provider } from 'react-redux'
import { store } from '~/redux/store'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConfirmProvider defaultOptions={{
          allowClose: false,
          dialogProps: { maxWidth: 'xs' },
          buttonOrder: ['confirm', 'cancel'],
          cancellationButtonProps: { color: 'inherit' },
          confirmationButtonProps: { color: 'secondary', variant: 'outlined' }
        }}>
          <CssBaseline />
          <App />
          <ToastContainer position='bottom-left' theme='colored'/>
        </ConfirmProvider>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
)
