import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInfo, editInfo } from '../../actions/info';
import TodoForm from './TodoForm';

class PickeatsEdit extends Component {
  componentDidMount() {
    this.props.getInfo(this.props.type, this.props.id);
  }

  onSubmit = formValues => {
    this.props.editInfo(this.props.type, this.props.id, formValues);
  };

  render() {
    return (
        <TodoForm
          initialValues={_.pick(this.props.id, 'description')}
          enableReinitialize={true}
          onSubmit={this.onSubmit}
          form={'update'+this.props.type+this.props.id}
        />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  todo: state.todos[ownProps.id]
});

export default connect(
  mapStateToProps,
  { getInfo, editInfo }
)(PickeatsEdit);
