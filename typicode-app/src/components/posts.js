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
      <div>
        { this.state.error && <div className="text-danger">{ this.state.error }</div> }
        { this.state.posts && !this.state.selectedPost &&
          <div>

            { !this.state.showStarred && <button onClick={ () => this.showStarred(1) }>Show Starred</button> }
            { this.state.showStarred && <button onClick={ () => this.showStarred(0) }>Show All</button> }

            { this.state.posts.map( (post, i) => (
                ( !this.state.showStarred || post.starred ) &&
                <div key={ post.id }>
                  <div>User ID: { post.userId }</div>
                  <div>Post ID: { post.id }</div>
                  <div>{ post.title }</div>
                  <div>{ post.body }</div>
                  { !post.starred && <button onClick={ () => this.starPost(i, 1) }>Star</button> }
                  { post.starred && <button onClick={ () => this.starPost(i, 0) }>Unstar</button> }
                  <button onClick={ () => this.selectPost(post) }>View comments</button>
                </div>
            )) }

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
