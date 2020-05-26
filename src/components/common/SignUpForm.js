import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getUsername, createUser } from '../../actions/auth';
import Role from '../../helpers/role';
import { cleanInput } from '../../helpers/util';
import CommonTemplate from './CommonTemplate';

class SignUpForm extends React.Component {


    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error tiny message">
                    <p>{error}</p>
                </div>
            );
        } else {
            return null;
        }
    }

    renderUsernameInput = ({ input, label, meta }) => {

        const { isItemLoading, errorItem } = this.props;
        const fieldClass = `field ${meta.touched && meta.error ? 'error' : ''}`;
        var iconClass;

        if (isItemLoading) {
            iconClass = "black loading spinner circular icon";
        } else {
            if (errorItem) {
                iconClass = "red circular inverted exclamation icon";
            } else {
                iconClass = "green circular inverted check icon";
            }
        }
        return (
            <div className={fieldClass}>
                <label>{label}</label>
                <div className="ui icon input">
                    <i className={iconClass} />
                    <input
                        {...input}
                        autoComplete="off"
                    />
                </div>
                {this.renderError(meta)}
            </div>
        )
    }

    renderInput = ({ input, label, meta }) => {
        const fieldClass = `field ${meta.touched && meta.error ? 'error' : ''}`;
        return (
            <div className={fieldClass}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        )
    }

    renderHidden = ({ input }) => {
        return (
            <input {...input} type="hidden" />
        )
    }

    onSubmit = (formValues) => {
        this.props.createUser(this.props.uid, {
            email: formValues.email,
            username: cleanInput(formValues.username, true),
            displayName: cleanInput(formValues.displayName),
            photoURL: formValues.photoURL,
            role: Role.Member
        });
    }

    renderStep = () => {
        return (
            <div className="ui two top attached tiny unstackable steps">
                <Link to="/signup" className="step">
                    <div className="content">
                        <div className="title">1. Sign up with</div>
                    </div>
                </Link>
                <a href="#2" className="active step">
                    <div className="content">
                        <div className="title">2. Complete</div>
                    </div>
                </a>
            </div>
        );
    }

    render() {
        const { auth_warning, errorContainer, isContainerLoading, isAuthenticated } = this.props;

        var error, errorType;

        if (auth_warning === 'signup') {
            error = 'You do not have any account yet. Please sign up.';
            errorType = 'warning';
        }

        if (errorContainer) {
            error = errorContainer.message;
            errorType = 'negative';
        }

        return (
            <CommonTemplate

                isLoading={isContainerLoading}
                isAuthenticated={isAuthenticated}
                error={error}
                errorType={errorType}
                componentClass="hmy-signup-form"
                
            >

                {this.renderStep()}
                <div className="ui segments">
                    <div className="ui left aligned segment">
                        <div className="ui basic segment">
                            <h3 className="ui header center aligned">Complete sign up</h3>
                        </div>
                        <form className="ui error large form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                            <Field name="photoURL" component={this.renderHidden} />
                            <Field name="email" component={this.renderHidden} />
                            <Field name="errorItem" component={this.renderHidden} />
                            <Field
                                onChange={_.debounce(e => this.props.getUsername(e.target.value.toLowerCase()), 500)}
                                name="username" component={this.renderUsernameInput}
                                label="Username" />
                            <Field
                                name="displayName"
                                component={this.renderInput}
                                label="Display Name" />
                            <button
                                type="submit"
                                className="fluid ui blue large button">
                                Sign Up
                            </button>
                        </form>
                    </div>
                    <div className="ui secondary segment">
                        <p>By clicking the Sign Up button, you agree to our <Link to="/terms-and-conditions">Terms & Conditions</Link>.</p>
                    </div>
                </div>
            </CommonTemplate>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    var { displayName, username, errorItem } = formValues;

    displayName = cleanInput(displayName);
    username =  cleanInput(username, true); 
    
    if (!displayName) {
        errors.displayName = 'Required';
    } else {
        if (displayName.length < 6) {
            errors.displayName = 'At least 6 characters';
        }
        if (displayName.length > 50) {
            errors.displayName = 'At most 50 characters';
        }
    }
    if (!username) {
        errors.username = 'Required';
    } 
    if (errorItem) {
        errors.username = errorItem
    }
    return errors;
}

const wrappedForm = reduxForm({
    form: 'registerForm',
    validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(SignUpForm);

const mapStateToProps = state => {
    return {
        initialValues: {
            displayName: state.auth.smuUser.displayName,
            photoURL: state.auth.smuUser.photoURL,
            username: state.auth._username,
            email: state.auth.smuUser.email,
            errorItem: state.auth.errorItem
        },
        uid: state.auth.smuUser.uid,
        photoURL: state.auth.smuUser.photoURL,
        isAuthenticated: state.auth.isAuthenticated,
        auth_warning: state.auth.auth_warning,
        isContainerLoading: state.auth.isContainerLoading,
        errorContainer : state.auth.errorContainer,
        isItemLoading: state.auth.isItemLoading,
        errorItem: state.auth.errorItem,
    }
}

export default connect(mapStateToProps, { getUsername, createUser })(wrappedForm);