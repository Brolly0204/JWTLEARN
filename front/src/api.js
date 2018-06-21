import axios from 'axios';
import history from './history';

axios.interceptors.request.use(config => {
  let token = localStorage.getItem('jtoken');
  if(token) {
    config.headers['Authorization'] = `Bear ${token}`;
  }
  return config;
}, error => Promise.reject(error));

axios.interceptors.response.use(res => {
  if (res.data.code !== 0) {
    return Promise.reject(res.data.message);
  }
  return res
}, error => {
  if (error.response.status === 401) {
    history.push('/')
  }
  return Promise.reject(error.response.data);
});

export function signin(data) {
  return axios({
    method: 'POST',
    url: 'http://localhost:8080/signin',
    data
  }).then(response => {
    let result = response.data;
    if (result.code === 0) {
      let {token} = result.data;
      localStorage.setItem('jtoken', token);
    }
    return result;
  });
}

export function signup(params) {
  return axios.post('http://localhost:8080/signup', params);
}

export function getUser() {
  return axios({
    url: 'http://localhost:8080/user',
    method: 'GET',
    headers: {
      'Authorization': `Bear ${localStorage.getItem('jtoken')}`
    }
  }).then(response => response.data);
}