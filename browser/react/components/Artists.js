import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Artists extends Component {
  constructor(props){
    super(props);
  }

  render (){
    return (<div>
              <h3>Artists</h3>
                <div className="list-group">
                { this.props.artists ?
                  this.props.artists.map(artist => {
                    return (
                      <div className="list-group-item" key={artist.id}>
                        <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
                      </div>
                    )
                  }) : null
                }
              </div>
            </div>
          )
  }
}
