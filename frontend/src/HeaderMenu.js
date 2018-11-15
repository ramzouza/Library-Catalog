import React, { Component } from 'react'
import Dropdown from './Dropdown'

class Headermenu extends Component {

  render() {
    let comp;
      comp = <div>
        <Dropdown
        user={this.props}/>
      </div>;
      //removed <Image src={avatarPath} onClick={this.handleShowAvatar} width={40} circle /> for mobile friendliness (see Dropdown.js)
    

    return (
      <div>{comp}</div>
    )
  }
}

export default Headermenu;