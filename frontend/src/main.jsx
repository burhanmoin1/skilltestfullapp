import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

console.log('main.jsx loading...');
console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000');

const client = new ApolloClient({
  uri: import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000',
  cache: new InMemoryCache(),
});

console.log('Apollo Client created, rendering app...');

const rootElement = document.getElementById('root');
if (rootElement) {
  console.log('Root element found, creating root...');
  createRoot(rootElement).render(
    <StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </StrictMode>,
  );
} else {
  console.error('Root element not found!');
}