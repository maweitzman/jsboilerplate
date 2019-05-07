import React from 'react';
import Router from 'next/router';
import {inject, observer} from 'mobx-react';

import AuthValidator from '../validators/auth';
import AuthInterface from '../interfaces/auth';
import FormService from '../services/form';

import BasicInput from '../components/forms/basicInput';

import {Formik} from 'formik';
import {Row, Col, Form, Input} from 'reactstrap';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.AuthStore = this.props.store.AuthStore;
        this.MessagesStore = this.props.store.MessagesStore;
        this.ErrorsStore = this.props.store.ErrorsStore;
    }

    componentDidMount() {
       if (Router.query.auth || Router.query.logout) {
            if (Router.query.auth) {
                this.MessagesStore.addMessage(
                    'Your session does not exist, or has expired. Please log in to try again.',
                    'danger'
                );
            } else if (Router.query.logout) {
                this.MessagesStore.addMessage(
                    'Successfully logged out. See you soon!',
                    'success'
                )
            }
            Router.push('/login');
        }
    }
    
    login = async (values, actions) => {
        try {
            await this.AuthStore.login(values);
            Router.push('/');
        }
        catch (error) {
            FormService.handleFieldErrors(this.ErrorsStore.errors, actions);
            actions.setSubmitting(false);
        }
    }

    render() {
        return (
            <div className="Login">
                <h1>Log In!</h1>
                <Row>
                    <Col md="6">
                        <fieldset>
                            <legend>Complete the form to login.</legend>
                            <Formik
                                initialValues={new AuthInterface()}
                                validationSchema={AuthValidator}
                                onSubmit={this.login}
                            >
                                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, isSubmitting, submitCount}) => (
                                    <Form onSubmit={handleSubmit}>
                                        <BasicInput
                                            type="text"
                                            name="username"
                                            label="Username"
                                            cols={{
                                                label: 2,
                                                input: 10
                                            }}
                                            errors={this.ErrorsStore.errors}
                                            formik={{
                                                values,
                                                errors,
                                                touched,
                                                handleChange,
                                                handleBlur,
                                                submitCount
                                            }}
                                        />
                                        <BasicInput
                                            type="password"
                                            name="password"
                                            label="Password"
                                            cols={{
                                                label: 2,
                                                input: 10
                                            }}
                                            errors={this.ErrorsStore.errors}
                                            formik={{
                                                values,
                                                errors,
                                                touched,
                                                handleChange,
                                                handleBlur,
                                                submitCount
                                            }}
                                        />
                                        <Row>
                                            <Col md={{size: 10, offset: 2}}>
                                                <Input
                                                    type="submit"
                                                    name="submit"
                                                    id="submit"
                                                    value="Login"
                                                    disabled={isSubmitting || ! isValid}
                                                />
                                            </Col>
                                        </Row>
                                    </Form>
                                )}
                            </Formik>
                        </fieldset>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default inject('store')(observer(Login));