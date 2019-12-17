import React from 'react';
import ApiService from '../shared/api-service';

class Comments extends React.Component {

  constructor(props) {
    super(props);
    this.apiService = new ApiService();
    this.state = {
      comments: null,
      error: ''
    };
  }

  componentDidMount() {
    this.apiService.getComments(this.props.postId)
      .then(comments => {

        if (!comments) {
          this.setState({ error: 'No comments found.' });
          return;
        }
        this.setState({
          comments: comments
        });

      })
      .catch(error => {
        this.setState({ error: 'An error occurred.' });
      });
  }

  componentWillUnmount() {
    this.setState({
      comments: null,
      error: ''
    });
  }

  render() {
    return (
      <div>
        { this.state.error && <div className="text-danger">{ this.state.error }</div> }
        <button onClick={ () => this.props.onClose() }>View Posts</button>
        { !this.state.error && !this.state.comments && <div className="text-info">Loading...</div> }
        { this.state.comments &&
          this.state.comments.map(comment => (
            <div key={ comment.id }>
              <div>{ comment.postId }</div>
              <div>{ comment.name }</div>
              <div>{ comment.email }</div>
              <div>{ comment.body }</div>
            </div>
          ))
        }
      </div>
    );
  }

}

export default Comments;
