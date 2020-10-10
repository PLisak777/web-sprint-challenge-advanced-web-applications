import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Bubbles from './Bubbles';
import ColorList from './ColorList';
import axiosWithAuth from '../api/axiosWithAuth';

const BubblePage = () => {
	const [colorList, setColorList] = useState([]);
	// fetch your colors data from the server when the component mounts
	// set that data to the colorList state property

	useEffect(() => {
		axiosWithAuth()
			.get('/api/colors')
			.then((res) => {
				console.log('pl: BubblePage.js: getColors: axios get: res: ', res);
				setColorList(res.data);
			})
			.catch((err) => {
				console.error('Unable to retrieve colors', err.message);
			});
	});

	return (
		<>
			<ColorList colors={colorList} updateColors={setColorList} />
			<Bubbles colors={colorList} />
		</>
	);
};

export default BubblePage;
