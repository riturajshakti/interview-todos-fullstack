import Home from './pages/home';
import Layout from './layout';
import Error from './error';
import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'register',
				element: <Register />,
			},
		],
	},
]);

export default router;
