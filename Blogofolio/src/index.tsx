import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from "./context/ThemeContext";
import { BrowserRouter } from 'react-router-dom';
import {Provider} from "react-redux";
import {store} from "./store";
import {ScreenWidthProvider} from "./context/ScreenWidthContext";
import {PaginationProvider} from "./context/PaginationContext";

import './styles/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <ScreenWidthProvider>
              <PaginationProvider>
                <ThemeProvider>
                  <BrowserRouter>
                      <App />
                  </BrowserRouter>
                </ThemeProvider>
              </PaginationProvider>
          </ScreenWidthProvider>
      </Provider>
  </React.StrictMode>
);

reportWebVitals();
