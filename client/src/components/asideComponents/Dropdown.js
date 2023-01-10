import React from 'react';

const Dropdown = ({fonts, fontChange}) => {
	return (
		<select
			className="btn btn-secondary dropdown-toggle"
			onChange= {fontChange}
		>
			<option value="">--select--</option>
			{fonts.map((font) => (
				<option style = {{fontFamily: font }}key={font} value={font} >
					{font}
				</option>
			))}
		</select>
	);
};

export default Dropdown;
