import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from "react-redux"
import store from './store/Store.js';
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
<Provider store={store}> 
        <Toaster />
        <App />
        </Provider>
    </BrowserRouter>
);
