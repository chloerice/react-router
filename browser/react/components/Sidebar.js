import React from 'react';
import { Link } from 'react-router';

const Sidebar = (props) => {

  return (
    <sidebar>
      <img src="juke.svg" className="logo" />
      <section>
        <h4 className="menu-item active">
          <Link to="/">Albums</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/artists">Artists</Link>
        </h4>
      </section>
    </sidebar>
  );
}

export default Sidebar;
