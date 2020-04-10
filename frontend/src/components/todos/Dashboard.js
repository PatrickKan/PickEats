import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoCreate from './TodoCreate';
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
              <TodoCreate id='prefers'/>
              <PickeatsList id='prefers'/>
            </Card.Content>
          </Card>
          <Card fluid>
            <Card.Content>
              <Header size='medium'>🥅 What are your goals?</Header>
              <TodoCreate id='goals'/>
              <PickeatsList id='goals'/>
            </Card.Content>
          </Card>
          <Card fluid>
            <Card.Content>
              <Header size='medium'>🙅‍♀️ Do you have any allergies?</Header>
              <TodoCreate id='allergies'/>
              <PickeatsList id='allergies'/>
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
