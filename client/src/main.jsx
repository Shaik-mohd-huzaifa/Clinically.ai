import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { store } from './store/store.js'
import {Provider} from "react-redux"
import { Router } from './router/router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={Router}>
    <App />
    </RouterProvider>
    </Provider>
  </StrictMode>,
)
