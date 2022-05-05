import axios from 'axios';

const url = 'http://localhost:3000/user_name';

export const getUsers = () => axios.get(url);