import axios from 'axios';

export const getUsers = () => axios.get('http://localhost:3000/users', { withCredentials: true });
export const getSession = () => axios.get('http://localhost:3000/users/me', { withCredentials: true });
export const signOut = () => axios.get('http://localhost:3000/auth/logout');
