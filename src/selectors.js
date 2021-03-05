import { useSelector } from 'react-redux';

export const getSelectors = () => {
	const user = {
		isAuthenticated: (() =>
			useSelector(({ user }) => user.isAuthenticated))(),
		userData: (() => useSelector(({ user }) => user.userData))()
	};

	const items = {
		items: (() => useSelector(({ items }) => items))()
	};

	return { user, items };
};
