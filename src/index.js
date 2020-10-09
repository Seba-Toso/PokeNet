import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'         //traigo el provider desde react-redux para poder pasar el store
import generateStore from './redux/store'                //traigo las funciones generateStore desde store.js
import {Provider} from 'react-redux'    

let store = generateStore()     // Redux store generaton   


ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
        , document.getElementById('root')
    );


serviceWorker.unregister();
