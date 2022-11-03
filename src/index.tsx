import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

// ts
const rootElem = document.getElementById('root');
if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(<App />);
}
