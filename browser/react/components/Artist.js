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
    const selectedArtist = this.props.selectedArtist;
    const children = this.props.children;
    const propsToPassToChildren = {
      /**todo: make sure to include all the props that the child components need! **/
      albums: this.props.albums,
      songs: this.props.currentSongList,
      currentSong: this.props.currentSong,
      isPlaying: this.props.isPlaying,
      toggleOne: this.props.toggle
    }

    return <div>
      <h3>{ selectedArtist.name }</h3>
      <ul className="nav nav-tabs">
        <li><Link to={`/api/artists/${artistId}/albums`}>ALBUMS</Link></li>
        <li><Link to={`/api/artists/${artistId}/songs`}>SONGS</Link></li>
      </ul>
      { children && React.cloneElement(children, propsToPassToChildren) }
    </div>
  }
}
