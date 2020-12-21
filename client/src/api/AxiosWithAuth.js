import axios from 'axios';

const axiosWithAuth = () => {

	return axios.create({
		headers: {
			authorization: localStorage.getItem('token'),
		},
		baseURL: 'http://localhost:5000'
	});
};

export default axiosWithAuth;