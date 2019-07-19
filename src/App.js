import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "Isaj011 ",
      realName: "",
      avatar: "",
      location: "",
      repos: "",
      followers: "",
      url: "",
      notFound: ""
    };
  }
  render() {
    return (
      <div>
        <SearchBox fetchUser={this.fetchUser.bind(this)} />
        <Card data={this.state} />
      </div>
    );
  }
  //The api request function
  fetchApi(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        //Update status with API data
        this.setState({
          username: data.login,
          realName: data.name,
          avatar: data.avatar_url,
          location: data.location,
          repos: data.public_repos,
          followers: data.followers,
          url: data.html_url,
          notfound: data.message
        });
      })
      .catch(err => console.log("oh no!" + err));
  }
  fetchUser(username) {
    let url = `https://api.github.com/users/${username}`;
    this.fetchApi(url);
  }
  componentDidMount() {
    let url = `https://api.github.com/users/${this.state.username}`;
    this.fetchApi(url);
  }
}

class SearchBox extends Component {
  render() {
    return (
      <form className="searchbox" onSubmit={this.handleClick.bind(this)}>
        <input
          ref={ref => {
            this.search = ref;
          }}
          className="searchbox_input"
          type="text"
          placeholder="Enter the Username"
        />
        <input
          type="submit"
          className="searchbox_button"
          value="Click to search user"
        />
      </form>
    );
  }
  handleClick(e) {
    e.preventDefault();
    let username = this.search.value;
    // sending the username value to parent component to fetch new data from API
    this.props.fetchUser(username);
    this.search.value = "";
  }
}

class Card extends Component {
  render() {
    let data = this.props.data;

    if (data.notFound === "Not found") {
      // when username is not found
      return <h3 className="card_notfound">User not found. Try again!</h3>;
    } else {
      //if username found then;

      return (
        <div className="card">
          <a href={data.url} target="blank">
            <img className="card_avatar" src={data.avatar} />
          </a>
          <h2 className="card_username">
            <a className="card_link" href={data.url} target="blank">
              {data.username}
            </a>
          </h2>
          <dl>
            <dt>Real name</dt>
            <dd> {data.realName}</dd>

            <dt>Location</dt>
            <dd>{data.location}</dd>

            <dt>Number of public repos</dt>
            <dd>{data.repos}</dd>

            <dt>Number of followers</dt>
            <dd>{data.followers}</dd>
          </dl>
        </div>
      );
    }
  }
}

export default App;
