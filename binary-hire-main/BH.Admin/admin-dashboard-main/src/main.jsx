import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
const style = 'color: blue; font-weight: 900';
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';

const store = createStore({
	authName:'_auth',
	authType:'cookie',
	cookieDomain: window.location.hostname,
	cookieSecure: window.location.protocol === 'http:',
  });

ReactDOM.createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AuthProvider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AuthProvider>
	</StrictMode>,
);


