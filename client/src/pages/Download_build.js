import Footer from '../components/Footer';
import '../styles/Download_build.css';
import React, { useState } from 'react';
import CreateProject from '../utils/createUserProject';

const Download_build = ({projects}) => {
	const [projectSelected, setProjectSelected] = useState(false);
	const [value, setValue] = useState();

	const selectedProject = async (e) => {
		const value1 = e.target.value;
		if (value1) {
			console.log('project selected');
			setValue(value1 - 1);
			setProjectSelected(true);
		}
	};

	const downloadProjectFolder = async () => {
		const project = projects[value];
		CreateProject.renderFiles(project);
	};

	return (
		<>
			<div className="download_container">
				<div className="card text-center container px-0 download_card">
					<div className="card-header">Download Your Project</div>
					<div className="card-body">
						<h5 className="card-title">Select Project</h5>
						<div className="dropdown">
							<select
								className="btn btn-secondary dropdown-toggle btn-lg"
								onChange={selectedProject}
							>
								<option value="">--select--</option>
								{projects.map((project, index) => (
									<option value={index + 1}>{project.title}</option>
								))}
							</select>
						</div>
						<p className="card-text">how to download info</p>
						<button
							disabled={!projectSelected}
							type="submit"
							variant="success"
							className="btn btn-dark"
							onClick={downloadProjectFolder}
						>
							Download
						</button>
					</div>
					<div className="card-footer"></div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Download_build;

