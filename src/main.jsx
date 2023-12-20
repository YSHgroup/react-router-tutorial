import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './error-page';
import Contact from './routes/contact';
// import App from './App.jsx'
import './index.css';

const router = createBrowserRouter([
	{ path: '/', element: <Root />, errorElement: <ErrorPage /> },
	{ path: 'contacts/:contactId', element: <Contact /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
