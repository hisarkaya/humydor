import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Dropdown } from 'semantic-ui-react';

class BrandForm extends React.Component {

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

    renderDropdown = ({input, label, options, meta}) => {
        const errorClass = `field ${meta.touched && meta.error ? 'error' : ''}`;
        return (
            <div className={errorClass}>
                <label>{label}</label>
                <Dropdown
                    selection {...input}
                    value={input.value}
                    onChange={ (param,data)  => input.onChange(data.value)}
                    placeholder="select country"
                    fluid
                    options={options}
                />
                {this.renderError(meta)}
            </div>
        );
    }
    
    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="name" component={this.renderInput} label="name" />
                <Field name="countryId" component={this.renderDropdown} label="country" options={this.props.countries} />
                <button className="ui button primary">submit</button>
            </form>
        );
    }
}

const validate = formValues => {
    const errors = {};
    if(!formValues.name) {
        errors.name = "brand name required";
    }
    if(!formValues.countryId) {
        errors.countryId = "Country name required";
    }
    return errors;
}

export default reduxForm(
    {
        form: 'brandForm',
        validate
    }
)(BrandForm);