import axios from 'axios';
export default {
  // Gets a single user by id
  getUser: (id) => {
    return axios.get(`/api/user/${id}`);
  },
  // sign up a user to our service
  signUpUser: (username, email, password) => {
    return axios.post('api/signup', {username: username, email: email, password: password});
  },
  addNewQuestion: (title, body, username) => {
    return axios.post('/api/add/' + username, {title: title, body: body});
  },
  displayQuestions: (title, body, date, username) => {
    return axios.get('/api/add', {title: title, body: body, date: date, username: username});
  },
  displayOneQuestion: (id) => {
    return axios.get('/api/add/' + id);
  },
  addNewReply: (id, reply, username) => {
    return axios.post('/api/reply/' + id, {reply: reply, username: username})
  },
  showSearchResult: (title) => {
    return axios.get('/api/question/' + title);
  }
};
