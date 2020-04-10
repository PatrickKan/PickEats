import React, { Component } from 'react';
import { connect } from 'react-redux';
import PickeatsCreate from './PickeatsCreate';
import PickeatsList from './PickeatsList';

import { Card, Header } from 'semantic-ui-react'

class Dashboard extends Component {
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
