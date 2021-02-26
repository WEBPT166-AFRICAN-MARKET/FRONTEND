import { useSelector } from 'react-redux';

export const getSelectors = () => {
	const user = {
		isAuthenticated: (() =>
			useSelector(({ user }) => user.isAuthenticated))(),
		userInfo: (() => useSelector(({ user }) => user.userInfo))()
	};

	return { user };
};
