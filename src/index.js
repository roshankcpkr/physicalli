import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Amplify from 'aws-amplify';
import config from './aws-exports'
import {JobProvider} from './context/jobs.js'
Amplify.configure(config)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <JobProvider>
    <App />
    </JobProvider>
  </React.StrictMode>
);


