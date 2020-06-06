import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FormButtons from '../../membership/FormButtons';

class CountryForm extends React.Component {

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }

    renderError = ({ error, touched }) => {
        if (error && touched) {
            return (
                <div className="ui message error">
                    <div className="header">{error}</div>
                </div>
            );
        } else {
            return null;
        }
    }

    renderInput = ({ input, label, columns, meta }) => {
        const errorClass = `required field ${columns} ${meta.touched && meta.error ? 'error' : ''}`;
        return (
            <div className="fields">
                <div className={errorClass}>
                    <label>{label}</label>
                    <input {...input} autoComplete="off" />
                    {this.renderError(meta)}
                </div>
            </div>
        );
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui big form attached fluid segment error">
                <Field name="name" component={this.renderInput} label="name" columns="eight wide" />
                <Field name="code" component={this.renderInput} label="code" columns="three wide" />
                <FormButtons hideCancel={this.props.hideCancel} />
            </form>
        );
    }
}

const validate = formValues => {
    const errors = {};
    if (!formValues.name) {
        errors.name = "name required";
    }
    if (!formValues.code) {
        errors.code = "code required";
    }
    return errors;
}

export default reduxForm(
    {
        validate
    }
)(CountryForm);