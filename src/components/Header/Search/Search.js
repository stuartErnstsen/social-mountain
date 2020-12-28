import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    }
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value })
  }

  searchPosts = () => {
    this.props.filterPosts(this.state.text)
    this.setState({ text: '' })
  }

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input value={this.state.text} onChange={this.handleChange} placeholder="Search Your Feed" />

          <SearchIcon id="Search__icon" onClick={this.searchPosts} />
        </div>

      </section>
    )
  }
}