import React, { Component } from 'react';
import { convertAlbum, convertAlbums, skip } from '../utils';

export default class Artist extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const selectArtist = this.props.selectArtist;
    const artistId = this.props.routeParams.artistId;

    selectArtist(artistId);

    axios.get(`/api/artists/${artistId}/albums`)
      .then(res => res.data)
      .then(albums => this.onLoad(convertAlbums(albums)))
      .catch(console.error);

    axios.get(`/api/artists/${artistId}/songs`)
      .then(res => res.data)
      .then(songs => this.setState({
        currentSongList: songs
      }))
      .catch(console.error);
  }

  render() {

    const artist = this.props.selectedArtist;
    console.log(artist);
    return (
      { this.props.selectedArtist ?
          <div>
            <h3>{artist.name}</h3>
            <h4>ALBUMS</h4>
            <h4>SONGS</h4>
          </div>
         : null
      }
    )
  }
}
