import axios from 'axios';
import merge from 'lodash.merge';

class UserSession {
  constructor() {
    this.reducer = this.reducer.bind(this);
    this.actions = {
      'IS_AUTHENTICATED': (oldState, newData) => {
        return merge ({}, oldState, {isAuthenticated: newData});
      },
      'LOGIN': (oldState, newData) => {
        return merge ({}, oldState, {login: newData});
      },
    }
  }

  isAuthenticated() {
    return function(dispatch) {
      return axios.get('/api/isAuthenticated')
        .then(response => dispatch({
          type: 'IS_AUTHENTICATED',
          data: response.data
        }));
    }
  }

  login(data) {
    return function(dispatch) {
      return axios.post('/login', data)
        .then(response => dispatch({
          type: 'IS_AUTHENTICATED',
          data: response.data
        }));
    }
  }

  logout() {
    return function(dispatch) {
      return axios.get('/logout')
        .then(response => dispatch({
          type: 'IS_AUTHENTICATED',
          data: response.data
        }));
    }
  }

  reducer(oldState = {}, action) {
    // return {isAuthenticated: action.data};
      if (!this.actions[action.type]) return oldState;
      return this.actions[action.type](oldState, action.data);
  }


}

// const Session = {
//
//   isAuthenticated: function() {
//     return function(dispatch) {
//       return axios.get('/api/isAuthenticated')
//         .then(response => dispatch({
//           type: 'IS_AUTHENTICATED',
//           data: response.data
//         }));
//     }
//   },
//
//   login: function(data) {
//     return function(dispatch) {
//       return axios.post('/login', data)
//         .then(response => dispatch({
//           type: 'LOGIN',
//           data: response.data
//         }));
//     }
//   },
//
//   actions: {
//     'IS_AUTHENTICATED': (oldState, newData) => {
//       return merge ({}, oldState, {isAuthenticated: newData});
//     },
//     'LOGIN': (oldState, newData) => {
//       return merge ({}, oldState, {login: newData});
//     },
//   },
//
//   reducer: function(oldState = {}, action) {
//     // return {isAuthenticated: action.data};
//     return function () {
//       if (!this.actions[action.type]) return oldState;
//       return this.actions[action.type](oldState, action.data);
//     };
//   }
//
// }

const Session = new UserSession;
export default Session;
