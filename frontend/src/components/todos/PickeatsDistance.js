import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addInfo } from '../../actions/info';
import { PickeatsForm } from 'PickeatsForm'

class PickeatsDistance extends Component {
  onSubmit = formValues => {

    const body = {
      radius: Math.round(formValues * 1609.34),

    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const token = localStorage.token;

    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }

    axios.patch('/api/user/profile/', body, config).then(function (response) { 
      console.log(response);
    });

  };

  render() {
    return (
      <div style={{ marginTop: '2rem' }}>
        <PickeatsForm destroyOnUnmount={false} onSubmit={this.onSubmit} form={'create' + this.props.type}/>
      </div>
    );
  }
}

export default connect(
  null,
  { addInfo }
)(PickeatsCreate);
