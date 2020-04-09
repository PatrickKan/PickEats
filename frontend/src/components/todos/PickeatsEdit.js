import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTodo, editTodo } from '../../actions/todos';
import TodoForm from './TodoForm';

class PickeatsEdit extends Component {
  componentDidMount() {
    this.props.getTodo(this.props.id);
  }

  onSubmit = formValues => {
    this.props.editTodo(this.props.id, formValues);
  };

  render() {
    return (
        <TodoForm
          initialValues={_.pick(this.props.todo, 'task')}
          enableReinitialize={true}
          onSubmit={this.onSubmit}
          form={'update'+this.props.id}
        />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  todo: state.todos[ownProps.id]
});

export default connect(
  mapStateToProps,
  { getTodo, editTodo }
)(PickeatsEdit);
