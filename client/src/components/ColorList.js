import React, { useState } from 'react';

import axiosWithAuth from '../api/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const initialColor = {
	color: '',
	code: { hex: '' },
};

const ColorList = ({ colors, updateColors }) => {
	console.log('colors: ', colors);
	const [editing, setEditing] = useState(false);
	const [colorToEdit, setColorToEdit] = useState(initialColor);

	const { push } = useHistory();

	const editColor = (color) => {
		setEditing(true);
		setColorToEdit(color);
	};

	const saveEdit = (e) => {
		e.preventDefault();
		axiosWithAuth()
			.put(`/api/colors/${colorToEdit.id}`, colorToEdit)
			.then((res) => {
				console.log('pl: ColorList.js: saveEdit: axios put: res: ', res);
				updateColors(
					colors.map((c) => {
						if (c.id === res.data.id) {
							return res.data
						} else {
							return c
						}
					})
				);
				push('/bubble-page')
			})
			.catch((err) => {
				console.error('Unable to save colors', err.message);
			});
	};

	const deleteColor = (color) => {
		axiosWithAuth()
			.delete(`/api/colors/${color.id}`)
			.then((res) => {
				console.log('pl: ColorList.js: deleteColor: axios delete: res: ', res);
				updateColors(
					colors.filter(c => c.id !== res.data)
				)
				push(`/bubble-page`);
			})
			.catch((err) => {
				console.error('Unable to delete color', err.message);
			});
	};

	return (
		<div className="colors-wrap">
			<p>colors</p>
			<ul>
				{colors.map((color) => (
					<li key={color.color} onClick={() => editColor(color)}>
						<span>
							<span
								className="delete"
								onClick={(e) => {
									e.stopPropagation();
									deleteColor(color);
								}}
							>
								x
							</span>{' '}
							{color.color}
						</span>
						<div
							className="color-box"
							style={{ backgroundColor: color.code.hex }}
						/>
					</li>
				))}
			</ul>
			{editing && (
				<form onSubmit={saveEdit}>
					<legend>edit color</legend>
					<label>
						color name:
						<input
							onChange={(e) =>
								setColorToEdit({ ...colorToEdit, color: e.target.value })
							}
							value={colorToEdit.color}
						/>
					</label>
					<label>
						hex code:
						<input
							onChange={(e) =>
								setColorToEdit({
									...colorToEdit,
									code: { hex: e.target.value },
								})
							}
							value={colorToEdit.code.hex}
						/>
					</label>
					<div className="button-row">
						<button type="submit">save</button>
						<button onClick={() => setEditing(false)}>cancel</button>
					</div>
				</form>
			)}
			<div className="spacer" />
			{/* stretch - build another form here to add a color */}
		</div>
	);
};

export default ColorList;
