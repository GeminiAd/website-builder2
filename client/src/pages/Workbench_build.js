import React, { useState, useEffect } from "react";
import Save from '../components/asideComponents/Save_wrk';
import "../styles/Workbench_build.css";
import { PopoverPicker } from "../components/asideComponents/PopoverPicker";
import DraggableCardComponent from '../components/projectCardComponents/DraggableCardComponent';
import DraggableImageComponent from '../components/projectCardComponents/DraggableImageComponent';
import Dustbin from '../components/Dustbin';
import { CustomDragLayer } from '../components/projectCardComponents/CustomDragLayer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import cardObj from '../utils/cardObj';
import AsideQuestions from "../components/asideComponents/AsideQuestions";

let codeCompileArr = [];
const flair = {
	addNavBarSizing: {
		width: "25%",
		minHeight: "100%",
	},
	addNavBarColor: {
		backgroundColor: "#77C3EC",
	},
	className: {
		display: 'flex',

	},
	componentBar: {
		minHeight: 200
	}
};

const WRK = () => {

	const [cards, setCards] = useState(cardObj());
	const [components, setComponents] = useState({
		imageComponent: {
			image: null
		}
	});
	const [dustbin, setDustbin] = useState({
		style: {
			background: {
				backgroundColor: '#222'
			}
		}
	});

	const [visibilityNav, setVisibilityNav] = useState(false);
	const [visibilityMain, setVisibilityMain] = useState(false);
	const [visibilityAside, setVisibilityAside] = useState(false)
	const [visibilityComp, setVisibilityComp] = useState(false);
	const [visibilityFooter, setVisibilityFooter] = useState(false);

	const [nav, setNav] = useState("Add Navigation Bar");
	const [main, setMain] = useState("Add Main Content Section");
	const [aside, setAside] = useState("Add Aside Content Section")
	const [comp, setComp] = useState("Add Components");
	const [Footer, setFooter] = useState("Add Footer Section");

	const [colorAside, setColorAside] = useState("#aabbcc");
	const [colorAsideGrad, setColorAsideGrad] = useState("#aabbcc");
	const [colorFooterGrad, setcolorFooterGrad] = useState("#aabbcc");
	const [colorMainBackground, setColor3] = useState("#aabbcc");
	const [colorMainHeaders, setColor4] = useState("#aabbcc");
	const [colorMainText, setColor5] = useState("#aabbcc");
	const [colorBody, setColor6] = useState("#aabbcc");
	const [colorFooter, setColor7] = useState("#aabbcc");
	const [colorFooterLinks, setColor8] = useState("#aabbcc");
	const [colorFooterText, setColor9] = useState("#aabbcc");

	const [dustbinDimensions, setDustbinDimensions] = useState({});

	useEffect(() => {
		const dustbin = document.getElementById('dustbin');
		setDustbinDimensions({
			width: dustbin.offsetWidth,
			height: dustbin.offsetHeight
		})
	}, []);

	useEffect(() => {
		const dustbin = document.getElementById('dustbin');

		function handleResize() {
			setDustbinDimensions({
				width: dustbin.offsetWidth,
				height: dustbin.offsetHeight
			})
		}

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const start = () => {
		codeCompileArr = [];
	};

	const addNav = () => {
		if (visibilityNav) {
			setVisibilityNav(false);
			setNav("Add Navigation Bar");
		} else {
			setVisibilityNav(true);
			setNav("Collapse NavBar Bench");
		}
	};

	const addMain = () => {
		if (visibilityMain) {
			setVisibilityMain(false);
			setMain("Add Main Content Section");
		} else {
			setVisibilityMain(true);
			setMain("Collapse Main Bench");
		}
	};

	const addAside = () => {
		if (visibilityAside) {
			setVisibilityAside(false);
			setAside("Add aside Content Section");
		} else {
			setVisibilityAside(true);
			setAside("Collapse Aside Bench");
		}
	};

	const addFooter = () => {
		if (visibilityFooter) {
			setVisibilityFooter(false);
			setFooter("Add Footer");
		} else {
			setVisibilityFooter(true);
			setFooter("Collapse Footer Bench");
		}
	};


	const addComp = () => {
		if (visibilityComp) {
			setVisibilityComp(false);
			setComp("Add Components");
		} else {
			setVisibilityComp(true);
			setComp("Collapse Component Bench");
		}
	};

	const asideVal = () => {
		let asideVal = document.getElementById("asideVal").textContent;
		if (asideVal === "No") {
			document.getElementById("asideVal").innerHTML = "Yes";
		}
		if (asideVal === "Yes") {
			document.getElementById("asideVal").innerHTML = "No";
		}
	};

	const footerDir = () => {
		let footerDirVal = document.getElementById("footerLinkDir").textContent;
		if (footerDirVal === "Right") {
			document.getElementById("footerLinkDir").innerHTML = "Left";
		}
		if (footerDirVal === "Left") {
			document.getElementById("footerLinkDir").innerHTML = "Right";
		}
	};

	//asidePop
	const asidePop = () => {
		let asidePop = document.getElementById("asidePop").textContent;
		if (asidePop === "Pop") {
			document.getElementById("asidePop").innerHTML = "Blend";
		}
		if (asidePop === "Blend") {
			document.getElementById("asidePop").innerHTML = "Pop";
		}
	};
	const asideDir = () => {
		let asideDir = document.getElementById("asideDir").textContent;
		if (asideDir === "Left") {
			document.getElementById("asideDir").innerHTML = "Right";
		}
		if (asideDir === "Right") {
			document.getElementById("asideDir").innerHTML = "Left";
		}
	};

	const asideGrad = () => {
		let asideGrad = document.getElementById("asideGrad").textContent;
		if (asideGrad === "No") {
			document.getElementById("asideGrad").innerHTML = "Yes";
		}
		if (asideGrad === "Yes") {
			document.getElementById("asideGrad").innerHTML = "No";
		}
	};
	const footerGrad = () => {
		let footerGradVal = document.getElementById("footerGrad").textContent;
		if (footerGradVal === "No") {
			document.getElementById("footerGrad").innerHTML = "Yes";
		}
		if (footerGradVal === "Yes") {
			document.getElementById("footerGrad").innerHTML = "No";
		}
	};

	const navRender = () => {
		let navObj = -1
		for (let i = 0; i < codeCompileArr.length; i++) {
			if (codeCompileArr[i].contentTitle === "navbar") {
				navObj = i;
			}
		}

		if (navObj === -1) {
		} else {
			let navRenderObj = codeCompileArr[navObj];
			let header = document.createElement("div");
			let headBack
			if (navRenderObj.gradVal == 'Yes') {
				headBack = ` background-image: linear-gradient(to bottom right, ${navRenderObj.navColor}, ${navRenderObj.navgradColor});`
			}
			if (navRenderObj.gradVal == 'No') {
				headBack = `background-color: ${navRenderObj.navColor};`
			}
			header.setAttribute(
				"style",
				`width: 100%;
				${headBack};`
			);
			let title = document.createElement("div");
			title.setAttribute(
				"style",
				`width: 100%;
				font-size: 40px;
				text-align: center;
			color: ${navRenderObj.navTitleColor};
			font-family: ${navRenderObj.fontTitle}`
			);
			title.textContent = navRenderObj.homeTitle;
			let nav = document.createElement("ul");
			if (navRenderObj.navDir === 'Left') {
				nav.setAttribute(
					"style",
					`width: 100%;
				display: flex;
				margin-right: 15px;
					margin-bottom: 0px;
				justify-content: start;`
				)
			}
			if (navRenderObj.navDir === 'Right') {
				nav.setAttribute(
					"style",
					`width: 100%;
			display: flex;
			margin-right: 15px;
				margin-bottom: 0px;
			justify-content: end;`
				)
			}

			let tempLinks = navRenderObj.navlinks[0]
			for (let i = 0; i < tempLinks.length; i++) {
				let navLink = document.createElement("li");
				navLink.setAttribute(
					"style",
					`margin-right: 15px;
				color: ${navRenderObj.navLinksColor};
				font-family: ${navRenderObj.fontNavLinks};`)

				navLink.textContent = navRenderObj.navlinks[0][i];
				nav.append(navLink);
			}
	
			let renderNavDiv = document.getElementById("renderNavDiv");
			let navSubmitBtn = document.getElementById('navBtn');
			navSubmitBtn.textContent = "Update NavBar Settings";

			header.append(title);
			header.append(nav);
			renderNavDiv.appendChild(header);
		}
	}

	const mainSubmit = async (e) => {
		for (let i = 0; i < codeCompileArr.length; i++) {
			if (codeCompileArr[i].contentTitle === 'body') {
				codeCompileArr.splice(i, 1)
			}
		}
		e.preventDefault();
		let mainSubmitBtn = document.getElementById('mainBtn');
		let fontMainHeaders = document.getElementsByName('fontMainHeaders');
		let fontMainHeadersVal
		for (let i = 0; i < fontMainHeaders.length; i++) {
			if (fontMainHeaders[i].checked) {
				fontMainHeadersVal = fontMainHeaders[i].value
			}
		}
		let fontMainText = document.getElementsByName('fontMainText')
		let fontMainTextVal
		for (let i = 0; i < fontMainText.length; i++) {
			if (fontMainText[i].checked) {
				fontMainTextVal = fontMainText[i].value
			}
		}

		let mainTitle = document.getElementById("mainTitle").value;
		let asideVal = document.getElementById("asideVal").textContent;
		let asideGrad = document.getElementById("asideGrad").textContent;
		let asideTitle = document.getElementById("asideTitle").value;
		let asideContentText = document.getElementById("asideContentText").value;
		let asideDir = document.getElementById("asideDir").textContent;
		let asidePop = document.getElementById("asidePop").textContent;
		let asideContent = {
			asideGrad: asideGrad,
			asideBackCol: colorAside,
			asidebackColGrad: colorAsideGrad,
			asideTitle: asideTitle,
			asideContentText: asideContentText,
			asidePop: asidePop,

		}
		let temp = {
			contentTitle: "body",
			aside: asideVal,
			asideContent: asideContent,
			asideDir: asideDir,
			colorBody: colorBody,
			mainTitle: mainTitle,
			colorMainBackground: colorMainBackground,
			fontMainHeadersVal: fontMainHeadersVal,
			fontMainTextVal: fontMainTextVal,
			colorMain: colorMainBackground,
			colorMainHeaders: colorMainHeaders,
			mainTextColor: colorMainText
		};
		codeCompileArr.push(temp);
		console.log(codeCompileArr);
		let renderBodyDiv = document.getElementById("renderBodyDiv");
		renderBodyDiv.innerHTML = "";


		//render page
		let navObj = -1
		for (let i = 0; i < codeCompileArr.length; i++) {
			if (codeCompileArr[i].contentTitle === "body") {
				navObj = i;
			}
		}
		if (navObj === -1) {
		} else {
			let navMainObj = codeCompileArr[navObj];
			let body = document.createElement("div");
			body.setAttribute(
				"style",
				`width: 100%;
				height: auto;
				color: ${navMainObj.colorMainText};
				background-color: ${navMainObj.colorBody};`
			);
			let mainHeader = document.createElement("div");
			mainHeader.setAttribute(
				"style",
				`width: 100%;
				font-size: 30px;
				text-align: center;
				color: ${navMainObj.colorMainHeaders};
				font-family: ${navMainObj.fontMainHeadersVal}`
			);
			mainHeader.textContent = navMainObj.mainTitle;
			let Aside
			if (navMainObj.aside === 'Yes') {
				Aside = document.createElement("div");
				let AsideTitle = document.createElement("h2");
				let AsideContent = document.createElement("p");
				let asideColor
				let pop
				if (navMainObj.asideContent.asideGrad === 'Yes') {
					asideColor = `background-image: linear-gradient(to bottom right,${navMainObj.asideContent.asideBackCol}, ${navMainObj.asideContent.asidebackColGrad})`
				} else {
					asideColor = `background-color:${navMainObj.asideContent.asideBackCol}`
				}
				if (navMainObj.asideContent.asidePop === 'Pop') {
					pop = 'margin: 3px; box-shadow: 2px 0px 20px'
				} else {
					pop = ''
				}

				Aside.setAttribute(
					'style',
					`${asideColor};
					font-family:${navMainObj.asideContent.asideTextFont};
					${pop};
					height:100vh;
					width: 20%;
					`
				);
				AsideTitle.setAttribute(
					'style',
					`
					font-family:sarif
					`
				);
				AsideContent.textContent = navMainObj.asideContent.asideContentText
				AsideTitle.textContent = navMainObj.asideContent.asideTitle
				Aside.append(AsideTitle)
				Aside.append(AsideContent)
			}
			let mainContent = document.createElement("div");
			let content = document.createElement("div");
			content.setAttribute(
				"style",
				`width: 100%;
				font-size: 30px;
				height: 100%;
				display: flex;`
			);
			mainContent.setAttribute(
				"style",
				`background-color:${navMainObj.colorMainBackground};
				 color:${navMainObj.mainTextColor};
				 font-family:${navMainObj.fontMainTextVal};
				 height:100vh;
				 width: 100%;`
			)
			if (navMainObj.aside === 'Yes') {
				if (navMainObj.asideDir === 'Left') {
					content.append(Aside)
					content.append(mainContent)
				} else {
					content.append(mainContent)
					content.append(Aside)
				}
			}
			// let navImage = uploadImage(image, )	
			mainSubmitBtn.textContent = "Update Main Settings";
			body.append(mainHeader);
			body.append(content);
			renderBodyDiv.appendChild(body);
		}
	};

	const footerSubmit = async (e) => {
		for (let i = 0; i < codeCompileArr.length; i++) {
			if (codeCompileArr[i].contentTitle === 'footer') {
				codeCompileArr.splice(i, 1)
			}
		}
		e.preventDefault();
		let footerSubmitBtn = document.getElementById('footerBtn');
		let fontFooter = document.getElementsByName('fontFooter');
		let footerFontVal
		for (let i = 0; i < fontFooter.length; i++) {
			if (fontFooter[i].checked) {
				footerFontVal = fontFooter[i].value
			}
		}

		let fontFooterLinks = document.getElementsByName('fontFooterLinks')
		let footerLinkFontVal
		for (let i = 0; i < fontFooterLinks.length; i++) {
			if (fontFooterLinks[i].checked) {
				footerLinkFontVal = fontFooterLinks[i].value
			}
		}

		let footerLinkDirVal = document.getElementById("footerLinkDir").textContent;
		let footerLinksString = document.getElementById("footerLinksString").value;
		let footerBottomText = document.getElementById("bottomText").value;
		let footerGradVal = document.getElementById("footerGrad").textContent;
		let footerLinks = footerLinksString.split(",");
		let temp = {
			contentTitle: "footer",
			footerGradVal: footerGradVal,
			footerColor: colorFooter,
			footerColorGrad: colorFooterGrad,
			footerBottomText: footerBottomText,
			footerlinks: [footerLinks],
			footerLinksDir: footerLinkDirVal,
			fontFooter: footerFontVal,
			fontFooterLinks: footerLinkFontVal,
			footerFontColor: colorFooterText,
			footerLinksColor: colorFooterLinks
		};
		codeCompileArr.push(temp);
		console.log(codeCompileArr);
		let renderFooterDiv = document.getElementById("renderFooterDiv");
		renderFooterDiv.innerHTML = "";


		//render page
		let navObj = -1
		for (let i = 0; i < codeCompileArr.length; i++) {
			if (codeCompileArr[i].contentTitle === "footer") {
				navObj = i;
			}
		}
		if (navObj === -1) {
		} else {
			let navRenderObj = codeCompileArr[navObj];
			let footer = document.createElement("div");
			footer.setAttribute(
				"style",
				`width: 100%;
				background-color: ${navRenderObj.footerColor};`
			);
			let bottomText = document.createElement("div");
			bottomText.setAttribute(
				"style",
				`width: 100%;
				font-size: 18px;
				font-style: italic;
				text-align: center;
				color: ${navRenderObj.footerFontColor};
				font-family: ${navRenderObj.fontFooter}`
			);
			bottomText.textContent = navRenderObj.footerBottomText;
			let footerImg = document.createElement("img");
			footerImg.setAttribute(
				"style",
				`width: 150px;
				height: 150px;
				font-size: 40px;
				text-align: center;`
			);
			footerImg.setAttribute(
				"src",
				`${navRenderObj.footerImgLink}`
			)
			footerImg.setAttribute(
				"public_id",
				`${navRenderObj.footerImgPubId}`
			)
			let links = document.createElement("ul");
			if (navRenderObj.footerLinksDir === 'Left') {
				links.setAttribute(
					"style",
					`width: 100%;
					display: flex;
					flex-direction: column;
					margin-right: 15px;
					align-items: flex-start;`
				)
			}
			if (navRenderObj.footerLinksDir === 'Right') {
				links.setAttribute(
					"style",
					`width: 100%;
				display: flex;
				flex-direction: column;
				margin-right: 15px;
				align-items: flex-end;`
				)
			}

			let tempLinks = navRenderObj.footerlinks[0]
			for (let i = 0; i < tempLinks.length; i++) {
				let footerLink = document.createElement("li");
				footerLink.setAttribute(
					"style",
					`margin-right: 15px;
					color: ${navRenderObj.footerLinksColor};
					font-family: ${navRenderObj.fontFooterLinks};`)

				footerLink.textContent = navRenderObj.footerlinks[0][i];
				links.append(footerLink);
			}

			footerSubmitBtn.textContent = "Update Footer Settings";

			footer.append(bottomText);
			footer.append(footerImg);
			footer.append(links);
			renderFooterDiv.appendChild(footer);
		}
	};

	return (
		<React.Fragment>
			<div className="container-fluid">
				<div className="row">
					<aside
						id="sidebar"
						className="col-3 d-flex flex-column align-items-center"
					>	<div className="container-fluid workbenchColumnWrapper">
							<div className="row d-flex align-items-center">
								<div className="col">
									<h2 className="mt-3 workbenchTitle">Workbench</h2>
								</div>
								<div className="col d-flex flex-row justify-content-end">
									<button
										className="btn btn-success"
										id={'startButton'}
										type="button"
										onClick={start}
									>
										Start
									</button>
								</div>
							</div>
							<button
								style={{ color: 'white' }}
								className="btn dropdown-toggle w-100"
								type="button"
								onClick={addNav}
								id="addNavBtn"
							>
								{nav}
							</button>
							{ visibilityNav ? (
								<div style={flair.addNavBarColor} className="col-12 inner-container">
									<AsideQuestions render = {navRender} codeCompileArr = {codeCompileArr}/>
								</div>
							):(
								<div></div>
							)}

							<button
								style={{ color: 'white' }}
								className="btn dropdown-toggle w-100"
								type="button"
								onClick={addComp}
								id="addComponentBtn"
							>
								{comp}
							</button>
							{visibilityComp ? (
								<div style={flair.componentBar} className="inner-container">
									<DraggableCardComponent />
									<DraggableImageComponent components={components} setComponents={setComponents} />
								</div>
							) : (
								<div></div>
							)}
							<button
								style={{ color: 'white' }}
								className="btn dropdown-toggle w-100"
								type="button"
								onClick={addMain}
								id="addMainBtn"
							>
								{main}
							</button>
							{visibilityMain ? (
								<div style={flair.addNavBarColor} className="col-12 inner-container">
									<button
										style={{ color: 'white' }}
										className="btn dropdown-toggle w-100"
										type="button"
										onClick={addAside}
										id="addMainBtn"
									>
										{aside}
									</button>
									{visibilityAside ? (
										<div style={flair.addNavBarColor} className="col-12 inner-container">
											<div className="row-12">
												<label className="col-6 labelText">Would you like an Aside section: </label>
												<button className="col-6 btn btn-primary" id="asideVal" onClick={asideVal}>
													No
												</button>
											</div>

											<hr className="navBenchBreak"></hr>

											<p>If you would like a solid backgrouond select no to gradiant and only select one color::</p>
											<label className="col-6 labelText">Would you like a gradiant: </label>
											<button className="col-6 btn btn-primary" id="asideGrad" onClick={asideGrad}>
												No
											</button>

											<hr className="navBenchBreak"></hr>

											<div className="row">
												<div className="d-flex justify-content-between">
													<label className="labelText">Select entire Aside background-color: </label>
													{<PopoverPicker color={colorAside} onChange={setColorAside} />}
												</div>
											</div>
											<div className="row">
												<div className="d-flex justify-content-between">
													<label className="labelText">Select entire Aside background-color for gradiant: </label>
													{<PopoverPicker color={colorAsideGrad} onChange={setColorAsideGrad} />}
												</div>
											</div>
											<hr className="navBenchBreak"></hr>

											<div className="row-12">
												<label className="col-6 labelText">
													Title of Aside
												</label>
												<input className="col-6" type="text" id="asideTitle"></input>
											</div>
											<hr className="navBenchBreak"></hr>

											<div className="row-12">
												<label className="col-6 labelText">
													What content would you like in the aside:
												</label>
												<input className="col-6" type="text" id="asideContentText"></input>
											</div>
											<hr className="navBenchBreak"></hr>

											<label className="col-6 labelText">Would you like your aside on the left or the right: </label>
											<button className="col-6 btn btn-primary" id="asideDir" onClick={asideDir}>
												Left
											</button>

											<hr className="navBenchBreak"></hr>

											<label className="col-6 labelText">Would you like your aside on the left or the right: </label>
											<button className="col-6 btn btn-primary" id="asidePop" onClick={asidePop}>
												Pop
											</button>
										</div>
									) : (
										<div></div>
									)}
									<hr className="navBenchBreak"></hr>
									<hr className="navBenchBreak"></hr>
									<hr className="navBenchBreak"></hr>

									<div className="row">
										<div className="d-flex justify-content-between">
											<label className="labelText">Select entire page background-color: </label>
											{<PopoverPicker color={colorBody} onChange={setColor6} />}
										</div>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row">
										<div className="d-flex justify-content-between">
											<label className="labelText">Select background color: </label>
											{<PopoverPicker color={colorMainBackground} onChange={setColor3} />}
										</div>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row-12">
										<label className="col-6 labelText">
											Header for main section(optional)
										</label>
										<input className="col-6" type="text" id="mainTitle"></input>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row labelText">
										<p>Select a font for Main Headers: </p>
									</div>

									<div className="row">
										<div className="col-4">
											<label className="labelText" htmlFor="serif" style={{ fontFamily: 'Serif' }}>Serif
												<input type="radio" name="fontMainHeaders" value="Serif" style={{ fontFamily: 'Serif' }} />
											</label>

											<label className="labelText" htmlFor="comic sans MS" style={{ fontFamily: 'Cursive' }}>Comic Sans
												<input type="radio" name="fontMainHeaders" value="comic sans MS" style={{ fontFamily: 'Cursive' }} />
											</label>
											<br></br>
											<label className="labelText" htmlFor="fantasy" style={{ fontFamily: 'Fantasy' }}>Impact
												<input type="radio" name="fontMainHeaders" value="Fantasy" style={{ fontFamily: 'Fantasy' }} />
											</label>
										</div>

										<div className="col-4">
											<label className="labelText" htmlFor="arial" style={{ fontFamily: 'sans-serif' }}>Arial
												<input type="radio" name="fontMainHeaders" value="arial" style={{ fontFamily: 'sans-serif' }} />
											</label>
											<br></br>
											<label className="labelText" htmlFor="Courier" style={{ fontFamily: 'monospace' }}>Courier
												<input type="radio" name="fontMainHeaders" value="Courier" style={{ fontFamily: 'monospace' }} />
											</label>
											<label className="labelText" htmlFor="Tahoma" style={{ fontFamily: 'sans-serif' }}>Tahoma
												<input type="radio" name="fontMainHeaders" value="Tahoma" style={{ fontFamily: 'sans-serif' }} />
											</label>
										</div>

										<div className="col-4">
											<label className="labelText" htmlFor='arial black, sans-serif' style={{ fontFamily: 'arial black, sans-serif' }}>Arial Black
												<input type="radio" name="fontMainHeaders" value='arial black, sans-serif' style={{ fontFamily: 'arial black, sans-serif' }} />
											</label>
											<label className="labelText" htmlFor='trebuchet ms, sans-serif' style={{ fontFamily: 'trebuchet ms, sans-serif' }}>Trebuchet MS
												<input type="radio" name="fontMainHeaders" value='trebuchet ms, sans-serif' style={{ fontFamily: 'trebuchet ms, sans-serif' }} />
											</label>
											<label className="labelText" htmlFor='verdana, sans-serif' style={{ fontFamily: 'verdana, sans-serif' }}>Verdana
												<input type="radio" name="fontMainHeaders" value='verdana, sans-serif' style={{ fontFamily: 'verdana, sans-serif' }} />
											</label>
										</div>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row">
										<div className="d-flex justify-content-between">
											<label className="labelText">Select Main Headers Color: </label>
											{<PopoverPicker color={colorMainHeaders} onChange={setColor4} />}
										</div>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row labelText">
										<p>Select a font for all Text in Main: </p>
									</div>

									<div className="row">
										<div className="col-4">
											<label className="labelText" htmlFor="serif" style={{ fontFamily: 'Serif' }}>Serif
												<input type="radio" name="fontMainText" value="Serif" style={{ fontFamily: 'Serif' }} />
											</label>

											<label className="labelText" htmlFor="comic sans MS" style={{ fontFamily: 'Cursive' }}>Comic Sans
												<input type="radio" name="fontMainText" value="comic sans MS" style={{ fontFamily: 'Cursive' }} />
											</label>
											<br></br>
											<label className="labelText" htmlFor="fantasy" style={{ fontFamily: 'Fantasy' }}>Impact
												<input type="radio" name="fontMainText" value="Fantasy" style={{ fontFamily: 'Fantasy' }} />
											</label>
										</div>

										<div className="col-4">
											<label className="labelText" htmlFor="arial" style={{ fontFamily: 'sans-serif' }}>Arial
												<input type="radio" name="fontMainText" value="arial" style={{ fontFamily: 'sans-serif' }} />
											</label>
											<br></br>
											<label className="labelText" htmlFor="Courier" style={{ fontFamily: 'monospace' }}>Courier
												<input type="radio" name="fontMainText" value="Courier" style={{ fontFamily: 'monospace' }} />
											</label>
											<label className="labelText" htmlFor="Tahoma" style={{ fontFamily: 'sans-serif' }}>Tahoma
												<input type="radio" name="fontMainText" value="Tahoma" style={{ fontFamily: 'sans-serif' }} />
											</label>
										</div>

										<div className="col-4">
											<label className="labelText" htmlFor='arial black, sans-serif' style={{ fontFamily: 'arial black, sans-serif' }}>Arial Black
												<input type="radio" name="fontMainText" value='arial black, sans-serif' style={{ fontFamily: 'arial black, sans-serif' }} />
											</label>
											<label className="labelText" htmlFor='trebuchet ms, sans-serif' style={{ fontFamily: 'trebuchet ms, sans-serif' }}>Trebuchet MS
												<input type="radio" name="fontMainText" value='trebuchet ms, sans-serif' style={{ fontFamily: 'trebuchet ms, sans-serif' }} />
											</label>
											<label className="labelText" htmlFor='verdana, sans-serif' style={{ fontFamily: 'verdana, sans-serif' }}>Verdana
												<input type="radio" name="fontMainText" value='verdana, sans-serif' style={{ fontFamily: 'verdana, sans-serif' }} />
											</label>
										</div>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row">
										<div className="d-flex justify-content-between">
											<label className="labelText">Select Main Text Color: </label>
											{<PopoverPicker color={colorMainText} onChange={setColor5} />}
										</div>
									</div>

									<hr className="navBenchBreak"></hr>

									<button
										className="btn btn-primary m-3"
										id="mainBtn"
										onClick={mainSubmit}
									>
										Submit Main Settings
									</button>
								</div>

							) : (
								<div></div>
							)}
							<button
								style={{ color: 'white' }}
								className="btn dropdown-toggle w-100"
								type="button"
								onClick={addFooter}
								id="addFooterBtn"
							>
								{Footer}
							</button>
							{visibilityFooter ? (

								<div style={flair.addNavBarColor} className="col-12 inner-container">

									<div className="row">
										<p>If you would like a solid backgrouond select no to gradiant and only select one color::</p>
										<label className="col-6 labelText">Would you like a gradiant: </label>
										<button className="col-6 btn btn-primary" id="footerGrad" onClick={footerGrad}>
											No
										</button>
										<div className="d-flex justify-content-between">
											<label className="labelText">Select footer background color: </label>
											{<PopoverPicker color={colorFooter} onChange={setColor7} />}
										</div>
										<div className="d-flex justify-content-between">
											<label className="labelText">Select background color for gradiant: </label>
											{<PopoverPicker color={colorFooterGrad} onChange={setcolorFooterGrad} />}
										</div>

									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row-12">
										<label className="col-6 labelText">
											Bottom Text of footer
										</label>
										<input className="col-6" type="text" id="bottomText"></input>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row labelText">
										<p>Select a font for bottom text</p>
									</div>

									<div className="row">
										<div className="col-4">
											<label className="labelText" htmlFor="serif" style={{ fontFamily: 'Serif' }}>Serif
												<input type="radio" name="fontFooter" value="Serif" style={{ fontFamily: 'Serif' }} />
											</label>
											<label className="labelText" htmlFor="comic sans MS" style={{ fontFamily: 'Cursive' }}>Comic Sans
												<input type="radio" name="fontFooter" value="comic sans MS" style={{ fontFamily: 'Cursive' }} />
											</label>
											<label className="labelText" htmlFor="fantasy" style={{ fontFamily: 'Fantasy' }}>Impact
												<input type="radio" name="fontFooter" value="Fantasy" style={{ fontFamily: 'Fantasy' }} />
											</label>
										</div>

										<div className="col-4">
											<label className="labelText" htmlFor="arial" style={{ fontFamily: 'sans-serif' }}>Arial
												<input type="radio" name="fontFooter" value="arial" style={{ fontFamily: 'sans-serif' }} />
											</label>
											<label className="labelText" htmlFor="Courier" style={{ fontFamily: 'monospace' }}>Courier
												<input type="radio" name="fontFooter" value="Courier" style={{ fontFamily: 'monospace' }} />
											</label>
											<label className="labelText" htmlFor="Tahoma" style={{ fontFamily: 'sans-serif' }}>Tahoma
												<input type="radio" name="fontFooter" value="Tahoma" style={{ fontFamily: 'sans-serif' }} />
											</label>
										</div>

										<div className="col-4">
											<label className="labelText" htmlFor='arial black, sans-serif' style={{ fontFamily: 'arial black, sans-serif' }}>Arial Black
												<input type="radio" name="fontFooter" value='arial black, sans-serif' style={{ fontFamily: 'arial black, sans-serif' }} />
											</label>
											<label className="labelText" htmlFor='trebuchet ms, sans-serif' style={{ fontFamily: 'trebuchet ms, sans-serif' }}>Trebuchet MS
												<input type="radio" name="fontFooter" value='trebuchet ms, sans-serif' style={{ fontFamily: 'trebuchet ms, sans-serif' }} />
											</label>
											<label className="labelText" htmlFor='verdana, sans-serif' style={{ fontFamily: 'verdana, sans-serif' }}>Verdana
												<input type="radio" name="fontFooter" value='verdana, sans-serif' style={{ fontFamily: 'verdana, sans-serif' }} />
											</label>
										</div>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row">
										<div className="d-flex justify-content-between">
											<label className="labelText">Select Bottom Text Color: </label>
											{<PopoverPicker color={colorFooterText} onChange={setColor9} />}
										</div>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row-12">
										<label className="col-6 labelText">
											Input Footer Links <br /> (<i>Separate by ','!</i>):
										</label>
										<input className="col-6" type="text" id="footerLinksString"></input>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row-12">
										<label className="col-6 labelText">Anchor footer links left/right: </label>
										<button className="col-6 btn btn-primary" id="footerLinkDir" onClick={footerDir}>
											Right
										</button>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row labelText">
										<p>Footer Link Fonts: </p>
									</div>

									<div className="row">
										<div className="col-4">
											<label className="labelText" htmlFor="serif" style={{ fontFamily: 'Serif' }}>Serif
												<input type="radio" name="fontFooterLinks" value="Serif" style={{ fontFamily: 'Serif' }} />
											</label>
											<label className="labelText" htmlFor="comic sans MS" style={{ fontFamily: 'Cursive' }}>Comic Sans
												<input type="radio" name="fontFooterLinks" value="comic sans MS" style={{ fontFamily: 'Cursive' }} />
											</label>
											<label className="labelText" htmlFor="fantasy" style={{ fontFamily: 'Fantasy' }}>Impact
												<input type="radio" name="fontFooterLinks" value="Fantasy" style={{ fontFamily: 'Fantasy' }} />
											</label>
										</div>

										<div className="col-4">
											<label className="labelText" htmlFor="arial" style={{ fontFamily: 'sans-serif' }}>Arial
												<input type="radio" name="fontFooterLinks" value="arial" style={{ fontFamily: 'sans-serif' }} />
											</label>
											<label className="labelText" htmlFor="Courier" style={{ fontFamily: 'monospace' }}>Courier
												<input type="radio" name="fontFooterLinks" value="Courier" style={{ fontFamily: 'monospace' }} />
											</label>
											<label className="labelText" htmlFor="Tahoma" style={{ fontFamily: 'sans-serif' }}>Tahoma
												<input type="radio" name="fontFooterLinks" value="Tahoma" style={{ fontFamily: 'sans-serif' }} />
											</label>
										</div>

										<div className="col-4">
											<label className="labelText" htmlFor='arial black, sans-serif' style={{ fontFamily: 'arial black, sans-serif' }}>Arial Black
												<input type="radio" name="fontFooterLinks" value='arial black, sans-serif' style={{ fontFamily: 'arial black, sans-serif' }} />
											</label>
											<label className="labelText" htmlFor='trebuchet ms, sans-serif' style={{ fontFamily: 'trebuchet ms, sans-serif' }}>Trebuchet MS
												<input type="radio" name="fontFooterLinks" value='trebuchet ms, sans-serif' style={{ fontFamily: 'trebuchet ms, sans-serif' }} />
											</label>
											<label className="labelText" htmlFor='verdana, sans-serif' style={{ fontFamily: 'verdana, sans-serif' }}>Verdana
												<input type="radio" name="fontFooterLinks" value='verdana, sans-serif' style={{ fontFamily: 'verdana, sans-serif' }} />
											</label>
										</div>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row">
										<div className="d-flex justify-content-between">
											<label className="labelText">Select Footer Links Color: </label>
											{<PopoverPicker color={colorFooterLinks} onChange={setColor8} />}
										</div>
									</div>

									<button
										className="btn btn-primary m-3"
										id="footerBtn"
										onClick={footerSubmit}
									>
										Submit Footer Settings
									</button>
								</div>
							) : (
								<div></div>
							)}
						</div>

						<Save myProp={codeCompileArr} cards={cards} dustbinDimensions={dustbinDimensions} />

					</aside>
					<main
						className="col-9 wrk-concept-container" style={{ padding: '0px' }}>
						<Dustbin
							cards={cards}
							setCards={setCards}
							dustbin={dustbin}
							setDustbin={setDustbin}
						/>
						<CustomDragLayer
							cards={cards}
							setCards={setCards}
							components={components}
							setComponents={setComponents}
						/>
					</main>
				</div>
			</div>
		</React.Fragment>

	);
};

export default WRK;
