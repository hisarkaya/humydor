import React from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { Image } from 'semantic-ui-react';
import FormButtons from '../../membership/FormButtons';

class ShapeForm extends React.Component {

    onSubmit = formValues => {

        console.log(formValues);

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

    validateImageWeight = imgFile => {
        if (imgFile && imgFile.size) {
            const imgFileKb = imgFile.size / 1024;
            if (imgFileKb > 100) {
                return 'image size should be less than 100kb';
            }
        }
    }

    handlePreview = imgUrl => {
        const prevImgDOM = document.querySelector('.hm-preview-image');
        prevImgDOM.src = imgUrl;
    }

    handleChange = (event, input) => {

        console.log('here!!!');
        console.log(event);
        console.log(input);

        var imgFile;
        event.preventDefault();
        imgFile = event.target.files[0];
        if (imgFile) {
            const localImgUrl = URL.createObjectURL(imgFile);
            const imgObj = new window.Image();

            imgObj.onLoad = () => {
                imgFile.width = imgObj.naturalWidth;
                imgFile.height = imgObj.naturalHeight;
                input.onChange(imgFile);
                URL.revokeObjectURL(imgFile);
            }
            imgObj.src = localImgUrl;
            this.handlePreview(localImgUrl);
        }
    }

    renderImageUpload = ({ input, type, label, columns, meta }) => {
        const errorClass = `required field ${columns} ${meta.touched && meta.error ? 'error' : ''}`;
        return (
            <div className="fields">
                <div className={errorClass}>
                    <label>{label}</label>
                    <input
                        name={input.name}
                        type={type}
                        accept="image/jpeg, image/png, image/gif"
                        onChange={event => this.handleChange(event, input)}
                    />
                    {this.renderError(meta)}
                </div>
            </div>
        );
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui big form attached fluid segment error">
                <Field
                    name="name"
                    component={this.renderInput}
                    label="name"
                    columns="eight wide" />
                <Field
                    name="image"
                    label="image"
                    type="file"
                    component={this.renderImageUpload}
                    validate={[this.validateImageWeight]}
                    columns="eight wide" />
                <Image
                    src="https://via.placeholder.com/300"
                    alt="preview"
                    className="hm-preview-image"
                    style={{ height: "300px", objectFit: "cover" }}
                />
                <FormButtons hideCancel={this.props.hideCancel} />
            </form>
        );
    }
}

const validate = (formValues, { shapes }) => {

    const errors = {};
    if (!formValues.name) {
        errors.name = "name required";
    }
    if (formValues.name) {
        if (_.findKey(shapes, function (c) { return c.name.toLowerCase() === formValues.name.toLowerCase(); })) {
            errors.name = "name already exists";
        }
    }
    return errors;
}

export default reduxForm(
    {
        validate
    }
)(ShapeForm);