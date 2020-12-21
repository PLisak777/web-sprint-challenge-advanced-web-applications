import React, { useState, useEffect } from 'react';

import Bubbles from './Bubbles';
import ColorList from './ColorList';
import axiosWithAuth from '../api/axiosWithAuth';

const BubblePage = () => {
	const [colorList, setColorList] = useState([]);

	useEffect(() => {
		axiosWithAuth()
			.get('/api/colors')
			.then((res) => {
				console.log('pl: BubblePage.js: useEffect: axios get: res: ', res);
				setColorList(res.data);
			})
			.catch((err) => {
				console.error('Unable to retrieve colors', err.message);
			});
	}, []);

	return (
		<>
			<ColorList colors={colorList} updateColors={setColorList} />
			<Bubbles colors={colorList} data-testid='bubbletest' />
		</>
	);
};

export default BubblePage;
