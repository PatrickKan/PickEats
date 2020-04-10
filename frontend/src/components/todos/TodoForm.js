import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class TodoForm extends Component {
  renderField = ({ input, label, meta: { touched, error } }) => {
    return (
      <div className={`field ${touched && error ? 'error' : ''}`}>
        <label>{label}</label>
        <input {...input} autoComplete='off' />
        {touched && error && (
          <span className='ui pointing red basic label'>{error}</span>
        )}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    const btnText = `${this.props.initialValues ? 'Update' : 'Add'}`;
    return (
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className='ui form error'
        >
          <Field name='description' component={this.renderField}/>
          <button className='ui button red'>{btnText}</button>
        </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.description) {
    errors.description = 'Please enter at least 1 character';
  }

  return errors;
};

export default reduxForm({
  form: 'todoForm',
  touchOnBlur: false,
  validate
})(TodoForm);