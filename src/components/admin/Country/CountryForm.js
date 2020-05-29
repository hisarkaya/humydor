import React from 'react';
import { Field, reduxForm } from 'redux-form';

class CountryForm extends React.Component {

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }

    renderError = ({error, touched}) => {
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

    renderInput = ({input, label, meta }) => {
        const errorClass = `field ${meta.touched && meta.error ? 'error': ''}`;
        return (
            <div className={errorClass}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }
    
    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="name" component={this.renderInput} label="name" />
                <Field name="code" component={this.renderInput} label="code" />
                <button className="ui button primary">submit</button>
            </form>
        );
    }
}

const validate = formValues => {
    const errors = {};
    if(!formValues.name) {
        errors.name = "country name required";
    }

    if(!formValues.code) {
        errors.code = "country code required";
    }

    return errors;
}

export default reduxForm(
    {
        form: 'countryForm',
        validate
    }
)(CountryForm);