import React, { useState } from 'react';
import { PopoverPicker } from './PopoverPicker';
import fontOptions from '../../utils/FontsOptions';
import Dropdown from './Dropdown';

const AsideQuestions = ({render, codeCompileArr}) => {
	const fonts = fontOptions;
	// Color options
	const [gradientOption, setGradientOption] = useState('No');
	const [backgroundColor, setBackgroundColor] = useState();
	const [backgroundGradColor, setBackgroundGradColor] = useState();
	const [colorHeaderText, setColorHeaderText] = useState('#aabbcc');
	const [colorLinks, setColorLinks] = useState('#aabbcc');
	// font options
	const [headerFont, setHeaderFont] = useState("Serif");
	const [navFont, setNavFont] = useState("Serif");
	// justification
	const [navDirVal, setNavDirVal] = useState('left');
	// user input
	const [headerText, setHeaderText] = useState('');
	const [navLinkString, setNavLinkString] = useState('');

	const handleGradientYN = () => {
		if (gradientOption === 'No') {
			setGradientOption('Yes');
		} else {
			setGradientOption('No');
		}
	};

	const navDir = () => {
		if (navDirVal === 'Right') {
			setNavDirVal('Left');
		} else {
			setNavDirVal('Right');
		}
	};
	const handleHeaderFont =(e) => {
		setHeaderFont(e.target.value);
	}
	const handleNavFont =(e) => {
		setNavFont(e.target.value);
	}
	const handleUserHeader = (e) => {
		setHeaderText(e.target.value);
	};
	const handleUserLinks = (e) => {
		setNavLinkString(e.target.value);
	};
	const handleSubmit = () => {
		let navLinks = navLinkString.split(',');
		const temp ={
			contentTitle: "navbar",
			gradVal: gradientOption,
			navColor: backgroundColor,
			navgradColor: backgroundGradColor,
			homeTitle: headerText,
			navlinks: [navLinks],
			navDir: navDirVal,
			fontTitle: headerFont,
			fontNavLinks: navFont,
			navTitleColor: colorHeaderText,
			navLinksColor: colorLinks
		}
		codeCompileArr.push(temp);
		render();
	}

	return (
		<div>
			<div>
				Would you like the background of your header to have a gradient
				<button onClick={handleGradientYN}>{gradientOption}</button>
			</div>
			{(gradientOption === 'Yes') ? (
				<>
					<PopoverPicker
						color={backgroundColor}
						onChange={setBackgroundColor}
					/>
					<PopoverPicker
						color={backgroundGradColor}
						onChange={setBackgroundGradColor}
					/>
				</>
			) : (
				<PopoverPicker color={backgroundColor} onChange={setBackgroundColor} />
			)}
			<label>
				Header
				<input type="text" onChange={handleUserHeader} value={headerText} />
			</label>
			<div>
				<span>Select a font and color</span>
				<Dropdown fonts={fonts} fontChange= {handleHeaderFont}/>
				<PopoverPicker color={colorHeaderText} onChange={setColorHeaderText} />
				<div className="row-12">
					<label className="col-6 labelText">
						Input Links <br /> (<i>Separate by ','!</i>):
						<input
							className="col-6"
							type="text"
							onChange={handleUserLinks}
							value={navLinkString}
						/>
					</label>
				</div>
				<div className="row-12">
					<label className="col-6 labelText">
						Anchor links to the left or right:
					</label>
					<button
						className="col-6 btn btn-primary"
						id="navDir"
						onClick={navDir}
					>
						{navDirVal}
					</button>
				</div>
				<div className="row labelText">
					<p>What font would you like to use for your links:</p>
				</div>
				<Dropdown fonts={fonts} fontChange = {handleNavFont}/>
				<PopoverPicker color={colorLinks} onChange={setColorLinks} />
			</div>
			<button className="btn btn-primary m-3" id="navBtn" onClick={handleSubmit}>
				Submit Nav Settings
			</button>
		</div>
	);
};

export default AsideQuestions;
