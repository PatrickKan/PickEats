import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTodos, deleteTodo } from '../../actions/todos';

import { Label, Icon, Popup } from 'semantic-ui-react';
import PickeatsEdit from './PickeatsEdit';

class PickeatsList extends Component {
  componentDidMount() {
    this.props.getTodos();
  }

  render() {
    return (
      <div className='ui relaxed' style={{ marginTop: '2rem' }}>
        {this.props.todos.map(todo => (
          todo.description ? (
            <Popup
              trigger={
                <Label as='a' style={{margin: '0.2rem'}}>
                  {todo.description}
                  <Icon name='delete' onClick={()=>this.props.deleteTodo(todo.id)}/>
                </Label>
              }
              key={todo.id}
              hoverable
            >
              <Popup.Content>
                <PickeatsEdit id={todo.id}/>
              </Popup.Content>
            </Popup>
          ) : (<span/>)
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: Object.values(state.todos)
});

export default connect(
  mapStateToProps,
  { getTodos, deleteTodo }
)(PickeatsList);
