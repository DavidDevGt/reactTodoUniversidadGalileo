import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from "./store/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import './index.css';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
}
