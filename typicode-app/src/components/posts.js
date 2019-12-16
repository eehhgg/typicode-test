import React from 'react'
import ApiService from '../shared/api-service';
import Comments from './comments';

class Posts extends React.Component {

  constructor(props) {
    super(props);
    this.apiService = new ApiService();
    this.selectPost = this.selectPost.bind(this);
    this.state = {
      posts: null,
      selectedPost: null,
      error: ''
    };
  }

  componentDidMount() {
    this.apiService.getPosts(this.props.userId)
      .then(posts => {

        if (!posts) {
          this.setState({ error: 'No posts found.' });
          return;
        }
        this.setState({
          posts: posts
        });

      })
      .catch(error => {
        this.setState({ error: 'An error occurred.' });
      });
  }

  componentWillUnmount() {
    this.setState({
      posts: null,
      selectedPost: null,
      error: ''
    });
  }

  render() {
    return (
      <div>
        { this.state.error && <div className="text-danger">{ this.state.error }</div> }
        { this.state.posts && !this.state.selectedPost &&
          this.state.posts.map(post => (
            <div key={ post.id }>
              <div>User ID: { post.userId }</div>
              <div>Post ID: { post.id }</div>
              <div>{ post.title }</div>
              <div>{ post.body }</div>
              <button onClick={ () => this.selectPost(post) }>View comments</button>
            </div>
          ))
        }
        { this.state.selectedPost &&
          <Comments
            postId={ this.state.selectedPost.id }
            onClose={ () => this.selectPost(null) } />
        }
      </div>
    );
  }

  selectPost(post) {
    this.setState({
      selectedPost: post
    });
  }

}

export default Posts
