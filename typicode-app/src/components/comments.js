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
        <button onClick={ () => this.props.onClose() } className="mb-3">View Posts</button>
        { !this.state.error && !this.state.comments && <div className="text-info">Loading...</div> }
        { this.state.comments &&
          <div>
            { this.state.comments.map(comment => (
              <div className="card" key={ comment.id }>
                <div className="card-body">
                  <h5 className="card-title">{ comment.id }. { comment.name }</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{ comment.email }</h6>
                  <p className="card-text">{ comment.body }</p>
                </div>
              </div>
            )) }
            <div className="text-muted">Viewing comments for post { this.props.postId }</div>
          </div>
        }
      </div>
    );
  }

}

export default Comments;
