import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addInfo } from '../../actions/info';
import TodoForm from './TodoForm'
import axios from 'axios';

class PickeatsDistance extends Component {
  onSubmit = formValues => {
    console.log(formValues);
    const body = {

      radius: Math.round(parseFloat(formValues.description)*1609.34),

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
    console.log("radius");
    console.log(body.radius);

    axios.patch('/api/user/profile/', body, config).then(function (response) { 
      console.log(response);
    });

  };

  render() {
    return (
      <div style={{ marginTop: '2rem' }}>
        <TodoForm destroyOnUnmount={false} onSubmit={this.onSubmit} form={'create' + this.props.type}/>
      </div>
    );
  }
}

export default connect(
  null,
  { addInfo }
)(PickeatsDistance);
