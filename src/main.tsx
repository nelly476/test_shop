import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store.js";
import './index.css'
import App from './App.jsx'

const container = document.getElementById("root");
if (!container) {
  throw new Error('Root element with id="root" was not found');
}

createRoot(container as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
