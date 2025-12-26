import { StrictMode } from 'react'
import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import { ProductProvider } from "./ProductContext/ProductContext";

/** Socket Provider */
import {SocketProvider} from "./contexts/SocketProvider.jsx";
import { ChatProvider } from './contexts/ChatProvider.jsx';
import { MessageProvider } from "./contexts/MessageProvider.jsx"; 
import { AuthProvider } from './contexts/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <ChatProvider>
            <MessageProvider>
              <ProductProvider>
                <App />
              </ProductProvider>
            </MessageProvider>
          </ChatProvider>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
