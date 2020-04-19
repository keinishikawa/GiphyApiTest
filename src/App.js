import React from "react";
import axios from "axios";
import { Search } from "./components/Search";
import "./App.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { gifUrlList: [] };
  }

  renderImageList(list) {
    const imageList = list.map(url => {
      return (
        <li className="item">
          <img className="image" src={url} />
        </li>
      );
    });

    return <ul className="list">{imageList}</ul>;
  }

  render() {
    console.log(this.state.gifUrlList);
    return (
      <div className="App">
        <Search search={this.giphyApi} />
        {this.renderImageList(this.state.gifUrlList)}
      </div>
    );
  }

  giphyApi = target => {
    const search = target;
    const key = "appOyP0LP1n61QBW3PL6YtYZOQ7QowoG";
    const limit = 10;
    const url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${key}&limit=${limit}`;

    axios.get(url).then(res => {
      const data = res.data.data;
      const imageUrlList = data.map(item => item.images.downsized.url);

      this.setState({ gifUrlList: imageUrlList });
    });
  };
}
