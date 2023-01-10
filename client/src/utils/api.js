export const createUser = (userData) => {
	return fetch('/api/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	});
};

export const login = (userData) => {
	return fetch('/api/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	});
};

export const saveContent = (userData) => {
	console.log(userData);
	return fetch('/api/projects/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	});
};

export const findAllProjects = (token) => {
	return fetch(`api/projects/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`,
		},
	});
};

// export const deleteProject = (projectId, token) => {
//   return fetch(`api/projects/${projectId}`,{
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: `Bearer ${token}`,
//     }
//   });
// };
