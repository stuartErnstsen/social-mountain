import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post/Post'

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.filterPosts = this.filterPosts.bind(this);
  }

  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
      .then(results => {
        this.setState({ posts: results.data })
      })
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
      .then(result => {
        this.setState({ posts: result.data })
      })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(results => this.setState({ posts: results.data }))
  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts', { text })
      .then(results => this.setState({ posts: results.data }))
  }

  filterPosts(text) {
    axios.get(`https://practiceapi.devmountain.com/api/posts/filter?text=${encodeURI(text)}`)
      .then(results => this.setState({ posts: results.data }))
  }


  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header filterPosts={this.filterPosts} />

        <section className="App__content">

          <Compose createPostFn={this.createPost} />
          {posts.map(post => <Post key={post.id} id={post.id} text={post.text} date={post.date} updatePostFn={this.updatePost} deletePostFn={this.deletePost}></Post>)}
        </section>
      </div>
    );
  }
}

export default App;
