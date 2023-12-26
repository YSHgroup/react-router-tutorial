import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from './routes';
import ErrorPage from './error-page';
import Contact from './routes/contact';
import Root, {
	loader as rootLoader,
	action as rootAction,
} from './routes/root';
import {
	loader as contactLoader,
	action as contactAction,
} from './routes/contact';
import './index.css';
import EditContact from './routes/edit';
import { action as editAction } from './routes/edit';
import { action as deleteAction } from './routes/destroy';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				errorElement: <Index />,
				children: [
					{
						path: 'contacts/:contactId',
						element: <Contact />,
						loader: contactLoader,
						action: contactAction,
					},
					{
						path: 'contacts/:contactId/edit',
						element: <EditContact />,
						loader: contactLoader,
						action: editAction,
					},
					{
						path: 'contacts/:contactId/destroy',
						// element: <DeleteContact />,
						action: deleteAction,
						errorElement: <div>Oops! There was an error.</div>,
					},
					{
						errorElement: <ErrorPage />,
						children: [
							{ index: true, element: <Index /> },
							{
								path: 'contacts/:contactId',
								element: <Contact />,
								loader: contactLoader,
								action: contactAction,
							},
						],
					},
				],
			},
		],
	},
]);
/* Also we can configure the routes with JSX 
	using by importing createRoutesFromElements in react-router-dom.
	for example:
		const router = createBrowserRouter(
			createRoutesFromElements(
				<Route
				path="/"
				element={<Root />}
				loader={rootLoader}
				action={rootAction}
				errorElement={<ErrorPage />}
				>
				  <Route errorElement={<ErrorPage />}>
					{...child routes configurations}
				  </Route>
				</Route>
				)
			)
*/

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
