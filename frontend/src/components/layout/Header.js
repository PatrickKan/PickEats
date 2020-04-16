import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

class Header extends Component {
  render() {
    const { user, isAuthenticated } = this.props.auth;

    const userLinks = (
      <div className='right menu'>
        <div className='ui simple dropdown item'>
          {user ? user.username : ''}
          <i className='dropdown icon' />
          <div className='menu'>
            <Link to='/profile' className='item'>
              Edit Preferences
            </Link>
            <Link to='/form' className='item'>
              Edit Profile
            </Link>
            <a onClick={this.props.logout} className='item'>
              Logout
            </a>
          </div>
        </div>
      </div>
    );

    const guestLinks = (
      <div className='right menu'>
        <Link to='/register' className='item'>
          Sign Up
        </Link>
        <Link to='/login' className='item'>
          Login
        </Link>
      </div>
    );

    return (
      <div className='ui inverted menu' style={{ borderRadius: '0' }}>
        <Link to='/' className='header item'>
          PickEats
        </Link>
        <Link to='/' className='item'>
          Home
        </Link>
        {isAuthenticated ? userLinks : guestLinks}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
