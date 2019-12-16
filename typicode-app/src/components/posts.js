import React from 'react'
import ApiService from '../shared/api-service';

class Posts extends React.Component {

  constructor(props) {
    super(props);
    this.apiService = new ApiService();
  }

  render() {
    return (
      <div>
        Posts
      </div>
    );
  }

}

export default Posts
