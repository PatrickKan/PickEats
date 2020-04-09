import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTodos, deleteTodo } from '../../actions/todos';

class TodoList extends Component {
  componentDidMount() {
    this.props.getTodos();
  }

  render() {
    return (
      <div className='ui relaxed divided list' style={{ marginTop: '2rem' }}>
        {this.props.todos.map(todo => (
          todo.description ? (
          <div className='item' key={todo.id}>
            <div className='right floated content'>
              <Link
                to={`/delete/${todo.id}`}
                className='small ui negative basic button'
              >
                Delete
              </Link>
            </div>
            <i className='star icon' />
            <div className='content'>
              <Link to={`/edit/${todo.id}`} className='header'>
                {todo.description}
              </Link>
              <div className='description'>{todo.description}</div>
            </div>
          </div> ) : (<div/>)
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
)(TodoList);
