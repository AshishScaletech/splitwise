import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import Login from 'features/auth/container/login';
import ForgotPassword from 'features/auth/component/forgotPassword';
import ResetPassword from 'features/auth/component/resetPassword';

import { IState } from 'shared/interface/state';
import Layout from 'hoc/layout/layout';
import Home from 'features/split/container/home';

const App: React.FC = () => {
	const isLogin: boolean = useSelector((state: IState) => state.auth.isLogin);

	return (
		<Layout>
			<Routes>
				<Route path='/home' element={<Home />} />
				<Route path='*' element={<Navigate replace to='/home' />} />
			</Routes>
		</Layout>
	)

	// if (isLogin) {
	// 	return (
	// 		<Layout>
	// 			<Routes>
	// 				<Route path='/' />
	// 			</Routes>
	// 		</Layout>
	// 	);
	// } else {
	// 	return (
	// 		<Routes>
	// 			<Route path='/login' element={<Login />} />
	// 			<Route path='/forgot-password' element={<ForgotPassword />} />
	// 			<Route path='/reset-password/:token' element={<ResetPassword />} />
	// 			<Route path='*' element={<Navigate replace to='/login' />} />
	// 		</Routes>
	// 	);
	// }
};

export default App;
