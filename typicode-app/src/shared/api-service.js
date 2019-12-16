class ApiService {

  constructor() {
    this.apiUrl = 'https://jsonplaceholder.typicode.com/';
  }

  getUser(username) {
    const url = this.apiUrl + 'users?username=' + encodeURIComponent(username);
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(user => {

          if (user.length) { user = user[0]; }
          else { user = null }
          resolve(user);

        },
        error => {
          reject(error);
        });
    });
  }

  getPosts(userId) {
    const url = this.apiUrl + 'posts?userId=' + encodeURIComponent(userId);
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(posts => {

          resolve(posts);

        },
        error => {
          reject(error);
        });
    });
  }

}

export default ApiService;
