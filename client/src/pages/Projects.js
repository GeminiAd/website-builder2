import React from 'react';
import '../styles/Projects.css';
import {
	PlusCircle,
	ArrowDownCircle
} from 'react-bootstrap-icons';

import { Link } from 'react-router-dom';

const Projects = ({ projects }) => {
	return (
		<React.Fragment>
			<div className="container-fluid">
				<div className="row">
					<aside
						id="sidebar"
						className="col-3 d-flex flex-column align-items-start"
					>
						<h2 className="mt-3 w-100 text-center">Projects</h2>
						<Link to="/wrk" className="project_link">
							<button
								className="btn project-btn d-flex align-items-center"
								type="button"
							>
								<PlusCircle color="white" size={18} className="me-2" />
								New Project
							</button>
						</Link>
						<Link to="/export" className="project_link">
							<button
								className="btn project-btn d-flex align-items-center"
								type="button"
							>
								<ArrowDownCircle color="white" size={18} className="me-2" />
								Export Project
							</button>
						</Link>
					</aside>
					<div className="col-9">
						<h3 className="mt-3">Current Projects</h3>
						<div className="container-fluid">
							<div className="row project_container">
								{projects.map( (project) => (
									<Link to= "/export" className= "project_box" >
										<div >{project.title}</div>
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Projects;
