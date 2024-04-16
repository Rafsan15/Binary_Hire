import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';
import { BrowserRouter } from 'react-router-dom';
import { registerLicense } from '@syncfusion/ej2-base';
const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'http:',
});

registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NAaF1cXmhKYVJ3WmFZfVpgfF9DaVZUTGYuP1ZhSXxXdkZjXX9WdX1QTmlYVE0='
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
