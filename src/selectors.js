import { useSelector } from 'react-redux';

export const getSelectors = () => {
	const user = {
		isAuthenticated: (() =>
			useSelector(({ user }) => user.isAuthenticated))(),
		userData: (() => useSelector(({ user }) => user.userData))()
	};

	return { user };
};
