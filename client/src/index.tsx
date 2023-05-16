import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './router/App';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'redux/store';
import Modal from "react-modal"
import { Chart as ChartJS, registerables  } from "chart.js";
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

ChartJS.register(...registerables);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <BrowserRouter>
        <ToastContainer 
        limit = {1}
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
          />
        <App />
      </BrowserRouter>
      
    </Provider>
    
  </React.StrictMode>
);

Modal.setAppElement('#root');

