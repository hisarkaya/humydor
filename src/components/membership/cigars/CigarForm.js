import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Dropdown } from 'semantic-ui-react';

class CigarForm extends React.Component {


    state = {
        brand: this.props.brand
    }

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

    renderInput = ({ input, label, brand, meta }) => {
        const errorClass = `field ${meta.touched && meta.error ? 'error' : ''}`;
        return (
            <div className={errorClass}>
                <label>{label}</label>
                <div className="ui labeled input">
                    <div className="ui label">
                        {brand}
                    </div>
                    <input {...input} autoComplete="off" />
                </div>
                {this.renderError(meta)}
            </div>
        );
    }

    renderDropdown = ({ input, label, options, meta }) => {
        const errorClass = `field ${meta.touched && meta.error ? 'error' : ''}`;
        return (
            <div className={errorClass}>
                <label>{label}</label>
                <Dropdown
                    selection 
                    {...input}
                    value={input.value}
                    onChange={(param, data) => {

                        var dataText,
                            selectedItem = data.options.filter(item => item.key === data.value);
                        if (Array.isArray(selectedItem) && selectedItem.length) {
                            dataText = selectedItem[0].text.replace(/\(.*\)/ig, '');
                        }
                        input.onChange(data.value);
                        this.setState({ brand: dataText });

                    }}
                    onBlur={(param, data) => {
                        input.onBlur(data.value);
                    }}
                    placeholder="select brand"
                    search
                    fluid
                    options={options}
                />
                {this.renderError(meta)}
            </div>
        );
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
                <Field name="brandId" component={this.renderDropdown} label="brand" options={this.props.brands} />
                <Field name="name" component={this.renderInput} label="name" brand={this.state.brand} />
                <button className="ui button primary">add</button>
            </form>
        );
    }
}

const validate = formValues => {
    const errors = {};
    if (!formValues.name) {
        errors.name = "name required";
    }
    if (!formValues.brandId) {
        errors.brandId = "brand required";
    }
    return errors;
}

export default reduxForm({
    form: 'cigarForm',
    validate
})(CigarForm);