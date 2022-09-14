import React from 'react';
import { getLCP, getFID, getCLS } from 'web-vitals';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './pages/App/App';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// reportWebVitals(console.log);
// getCLS(console.log)
// getFID(console.log)
// getLCP(console.log)