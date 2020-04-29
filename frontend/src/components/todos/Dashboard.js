import React, { Component } from 'react';
import { connect } from 'react-redux';
import PickeatsCreate from './PickeatsCreate';
import PickeatsList from './PickeatsList';
import PickeatsCheckbox from './PickeatsCheckbox'
import PickeatsDistance from './PickeatsDistance'

import { Card, Header } from 'semantic-ui-react'
import axios from 'axios';

class Dashboard extends Component {
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
        this.setState({radius: Math.round((res.data.radius/1609.34)*10)/10, price_1:res.data.price_1, price_2:res.data.price_2, price_3:res.data.price_3, price_4:res.data.price_4 });
    })
  }
 
  render() {
    return (
      <div className='ui container' style={{ marginTop: '2rem' }}>
        <Header as='h1'>{this.props.user ? this.props.user.username : 'Profile'}</Header>
        <Card.Group>
          <Card fluid>
            <Card.Content>
              <Header size='medium'>🌯 What type of food do you want to eat?</Header>
              <PickeatsCreate type='prefers'/>
              <PickeatsList type='prefers'/>
            </Card.Content>
          </Card>
          <Card fluid>
            <Card.Content>
              <Header size='medium'>🥅 What are your goals?</Header>
              <PickeatsCreate type='goals'/>
              <PickeatsList type='goals'/>
            </Card.Content>
          </Card>
          <Card fluid>
            <Card.Content>
              <Header size='medium'>🙅‍♀️ Do you have any allergies?</Header>
              <PickeatsCreate type='allergies'/>
              <PickeatsList type='allergies'/>
            </Card.Content>
          </Card>
          <Card fluid>
            <Card.Content>
              <Header size='medium'>💸 How much are you willing to spend?</Header>
              <PickeatsCheckbox type='profile'/>
            </Card.Content>
          </Card>
          <Card fluid>
            <Card.Content>
              <Header size='medium'>📍 Distance? Current distance: {this.state.radius} </Header>
              <PickeatsDistance type='profile'/>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps
)(Dashboard);

// export default Dashboard;
