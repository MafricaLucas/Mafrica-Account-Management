import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';

const container = document.getElementById('root');

if (!container) {
    throw new Error('Failed to find the root element');
}

const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
