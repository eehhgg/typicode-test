import React from 'react'
import ApiService from '../shared/api-service';

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
              <div>{ post.userId }</div>
              <div>{ post.title }</div>
              <div>{ post.body }</div>
              <button onClick={ () => this.selectPost(post) }>View comments</button>
            </div>
          ))
        }
        { this.state.selectedPost &&
          <div>
            Post comments
            <button onClick={ () => this.selectPost(null) }>View Posts</button>
          </div>
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
