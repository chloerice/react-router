import React, { Component } from 'react';
import { convertAlbum, convertAlbums, skip } from '../utils';
import axios from 'axios';
import Albums from './Albums';
import Songs from './Songs';

export default class Artist extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const selectArtist = this.props.selectArtist;
    const artistId = this.props.routeParams.artistId;

    const gettingArtist = axios.get(`/api/artists/${artistId}`);
    const gettingAlbums = axios.get(`/api/artists/${artistId}/albums`);
    const gettingSongs = axios.get(`/api/artists/${artistId}/songs`);

    Promise.all([gettingArtist, gettingAlbums, gettingSongs])
    .then(res => {
      const artist = res[0].data;
      let albums = res[1].data;
      const songs = res[2].data;
      albums = convertAlbums(albums);

      this.props.artistOnLoad(artist, albums, songs);
    })
    .catch(console.error);
  }

  render() {
    const artist = this.props.selectedArtist;
    console.log("songs inside artist render ", this.props.currentSongList);
    return (
      <div>
       { artist ? 
        (<div>
          <h3>{artist.name}</h3>
          <Albums albums={this.props.albums} />
          <Songs songs={this.props.currentSongList} />
        </div>)
        : null
        }
      </div>
      )
  }
}
