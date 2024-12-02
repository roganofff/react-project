import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/app/App.jsx'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)