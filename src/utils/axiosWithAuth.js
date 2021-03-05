import axios from 'axios';

export const axiosWithAuth = () => {
	const lsToken = window.localStorage.getItem('token');

	const token = lsToken ? lsToken : '';

	console.log('Token', token);

	return axios.create({
		baseURL: 'https://tt166-africa.herokuapp.com/api/',
		headers: {
			Authorization: `${token}`
		}
	});
};
