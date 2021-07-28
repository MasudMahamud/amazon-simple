import React from 'react';
import Fade from 'react-reveal/Fade';
import bg from '../../images/Dark-matter.png';
import './Bg.css';

class FadeExample extends React.Component {
  render() {
    return (
      <div>
        <Fade right>
        <h2 className="title-header">Welcome To Amazon Shop</h2>
        <hr />
         
        </Fade>
      </div>
    );
  }
}

export default FadeExample;