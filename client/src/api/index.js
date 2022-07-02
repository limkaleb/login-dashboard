import axios from 'axios';

export const getUsers = () => axios.get('http://localhost:3000/users', { withCredentials: true });
export const getSession = () => axios.get('http://localhost:3000/users/me', { withCredentials: true });
export const getUserStats = () => axios.get('http://localhost:3000/users/stats', { withCredentials: true });
export const updateUser = (name) => axios.put('http://localhost:3000/users/me', { user_name: name }, { withCredentials: true });
export const signOut = () => axios.get('http://localhost:3000/auth/logout');
export const signUp = (request) => {
    console.log(';requestt: ', request)
    return axios.post('http://localhost:3000/users/new', request, { withCredentials: false });
};
export const signIn = (request) => {
    console.log('requet login: ', request);
    return axios.post('http://localhost:3000/auth/login', request, { withCredentials: false });
}
