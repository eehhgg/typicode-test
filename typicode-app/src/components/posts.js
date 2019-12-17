import React from 'react';
import './posts.css';
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
      error: '',
      showStarred: false
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
      error: '',
      showStarred: false
    });
  }

  render() {
    return (
      <div className="navbar-after container section-posts">
        { this.state.error && <div className="text-danger">{ this.state.error }</div> }
        { !this.state.error && !this.state.posts && <div className="text-info">Loading...</div> }
        { this.state.posts && !this.state.selectedPost &&
          <div>

            { !this.state.showStarred &&
              <button onClick={ () => this.showStarred(1) } className="mb-3">Show Starred</button>
            }
            { this.state.showStarred &&
              <button onClick={ () => this.showStarred(0) } className="mb-3">Show All</button>
            }

            { this.state.posts.map( (post, i) => (
                ( !this.state.showStarred || post.starred ) &&
                <div className="card" key={ post.id }>
                  <div className="card-body">
                    <h5 className="card-title">{ post.id }. { post.title }</h5>
                    <p className="card-text">{ post.body }</p>
                    <span className="card-link" onClick={ () => this.selectPost(post) }>View comments</span>
                    { !post.starred && <span className="card-link" onClick={ () => this.starPost(i, 1) }>Star</span> }
                    { post.starred && <span className="card-link" onClick={ () => this.starPost(i, 0) }>Unstar</span> }
                  </div>
                </div>
            )) }

            <div className="text-muted">Viewing { this.state.showStarred && 'starred' } posts for user { this.props.userId }</div>
          </div>
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

  starPost(i, b) {
    this.setState(prevState => {
      const newPosts = [...prevState.posts];
      newPosts[i].starred = ( b ? true : false );
      return { posts: newPosts };
    });
  }

  showStarred(b) {
    this.setState({
      showStarred: ( b ? true : false )
    });
  }

}

export default Posts
