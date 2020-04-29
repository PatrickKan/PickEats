import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInfos, deleteInfo } from '../../actions/info';
import { resetIndex } from '../../actions/recInfo'

import { Label, Icon, Popup } from 'semantic-ui-react';
import PickeatsEdit from './PickeatsEdit';
import { Button, Checkbox } from 'semantic-ui-react'
import axios from 'axios';

class PickeatsCheckbox extends Component {
  state = {radius: 0, price_1: false, price_2: false, price_3: false, price_4: false};

  componentDidMount() {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const token = localStorage.token;

    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }

    axios.get(`/api/user/profile`, config)
      .then(res => {
        this.setState({radius: res.data.radius, price_1:res.data.price_1, price_2:res.data.price_2, price_3:res.data.price_3, price_4:res.data.price_4 });
    })
  }

  toggle1 = () =>{
    
    const body1 = {
      price_1: !this.state.price_1,
    }

    // this.setState({ price_1: !this.state.price_1});
    this.setState((prevState) => ({ price_1: !prevState.price_1 }))
    
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const token = localStorage.token;

    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }

    axios.patch('/api/user/profile/', body1, config).then(function (response) { 
      console.log(response);
    });

    this.props.resetIndex();

  }

  toggle2 = () =>{
    const body2 = {
      price_2: !this.state.price_2,
    }
    // this.setState({price_2: !this.state.price_2});
    this.setState((prevState) => ({ price_2: !prevState.price_2 }))
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const token = localStorage.token;

    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }

    axios.patch('/api/user/profile/', body2, config).then(function (response) { 
      console.log(response);
    });

    this.props.resetIndex();

  }

  toggle3 = () =>{
    const body3 = {
      price_3: !this.state.price_3,
    }
    // this.setState({price_2: !this.state.price_2});
    this.setState((prevState) => ({ price_3: !prevState.price_3 }))
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const token = localStorage.token;

    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }

    axios.patch('/api/user/profile/', body3, config).then(function (response) { 
      console.log(response);
    });

    this.props.resetIndex();

  }

  toggle4 = () =>{
    const body4 = {
      price_4: !this.state.price_4,
    }
    // this.setState({price_2: !this.state.price_2});
    this.setState((prevState) => ({ price_4: !prevState.price_4 }))
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const token = localStorage.token;

    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }

    axios.patch('/api/user/profile/', body4, config).then(function (response) { 
      console.log(response);
    });

    this.props.resetIndex();

  }

  

  render() {
    return (
      <div>
        <Checkbox
          label='$'
          onChange={this.toggle1}
          checked={this.state.price_1}
        />
        <p> </p>
        <Checkbox
          label='$$'
          onChange={this.toggle2}
          checked={this.state.price_2}
        />
        <p> </p>
        <Checkbox
          label='$$$'
          onChange={this.toggle3}
          checked={this.state.price_3}
        />
        <p> </p>
        <Checkbox
          label='$$$$'
          onChange={this.toggle4}
          checked={this.state.price_4}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  todos: Object.values(state.todos).filter(obj=>obj.type === ownProps.type),
});

export default connect(
  mapStateToProps,
  { getInfos, deleteInfo, resetIndex }
)(PickeatsCheckbox);
