import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';
import { BrowserRouter } from 'react-router-dom';

const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'http:',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
