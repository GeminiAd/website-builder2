import { ItemTypes } from "../components/projectCardComponents/ItemTypes";

import { nanoid } from 'nanoid';

const cardObject = () => {
	const card = [
		{
			top: 20,
			left: 20,
			width: 200,
			height: 200,
			header: {
				text: 'Greetings from state!',
				style: {
					backgroundColor: {
						r: 13,
						g: 110,
						b: 253,
					},
					color: 'white',
					fontFamily: 'Arial',
					fontSize: 16,
					justifyContent: 'center'
				},
			},
			body: {
				style: {
					r: 255,
					g: 255,
					b: 255,
				},
			},
			bodyStyles: [
				{
					id: nanoid(),
					text: 'Hello!',
					type: ItemTypes.BODY_TEXT,
					style: {
						fontSize: 50,
						color: {
							r: 0,
							g: 0,
							b: 0,
						},
						fontFamily: 'Arial',
					},
				},
				{
					id: nanoid(),
					text: 'TEST!',
					type: ItemTypes.BODY_TEXT,
					style: {
						fontSize: 50,
						color: {
							r: 0,
							g: 0,
							b: 0,
						},
						fontFamily: 'Arial',
					},
				},
			],
		},
	];
	return card;
};

export default cardObject;
