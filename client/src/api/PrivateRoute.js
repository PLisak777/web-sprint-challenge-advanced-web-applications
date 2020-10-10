import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isUserAuth = () => {
	return localStorage.getItem('token') !== null;
};

const PrivateRoute = ({ component: Component, ...props }) => {
	return (
		<Route
			{...props}
			render={() => {
				if (isUserAuth()) {
					return <Component />;
				}
				return <Redirect to="/login" />;
			}}
		/>
	);
};

export default PrivateRoute;
