import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import {inject, observer} from 'mobx-react';
import config from '../../../api/config/config';
import 'isomorphic-unfetch';

import UserValidator from '../../validators/user';
import UserViewModel from '../../view_models/user';
import FormService from '../../services/form';

import BasicInput from '../../components/forms/basicInput';

import {Formik} from 'formik';
import {Col, Row, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

class NewUser extends React.Component {
    constructor(props) {
        super(props);

        this.UserStore = this.props.store.UserStore;
        this.ErrorsStore = this.props.store.ErrorsStore;

        this.state = {
            selectedRoles: []
        };
    }

    static async getInitialProps({req}) {
        if (req) {
            const res = await fetch(config.api_url + '/users/roles', {
                credentials: 'include',
                headers: {
                    cookie: req.headers.cookie
                }
            });
            const json = await res.json();
            return {init: json};
        }
        return {};
    }

    componentDidMount() {
        if (this.props.init) {
            this.UserStore.setRoles(this.props.init);
        } else {
            this.UserStore.allRoles();
        }
    }

    handleMultiSelect = (event) => {
        event.persist();
        let selectedRoles = [];
        for (let option of event.target.options) {
            if (option.selected) {
                selectedRoles.push(option.value);
            }
        }
        this.setState({
            selectedRoles
        });
    }

    post = async (values, actions) => {
        values.roles = this.state.selectedRoles;

        try {
            await this.UserStore.post(values);
            Router.push('/users');
        }
        catch (error) {
            FormService.handleFieldErrors(this.ErrorsStore.errors, actions);
            actions.setSubmitting(false);
        }
    }

    render() {
        const roles = this.UserStore.roles;

        return (
            <div className="NewUser">
                <h1>Create New User</h1>
                <ul>
                    <li>
                        <Link href="/users" prefetch>
                            <a>Cancel User</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/" prefetch>
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/logout">
                            <a>Logout</a>
                        </Link>
                    </li>
                </ul>
                <Row>
                    <Col md="6">
                        <fieldset>
                            <legend>Complete the form to create a user.</legend>
                            <Formik
                                initialValues={new UserViewModel()}
                                validationSchema={UserValidator}
                                onSubmit={this.post}
                            >
                                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, isSubmitting, submitCount}) => (
                                    <Form onSubmit={handleSubmit}>
                                        <BasicInput
                                            type="text"
                                            name="firstName"
                                            label="First Name"
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
                                            type="text"
                                            name="lastName"
                                            label="Last Name"
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
                                            type="email"
                                            name="email"
                                            label="Email"
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
                                        <FormGroup row>
                                            <Label for="roles" md={2}>Role(s)</Label>
                                            <Col md={10}>
                                                <Input
                                                    type="select"
                                                    name="roles"
                                                    id="roles"
                                                    onChange={this.handleMultiSelect}
                                                    multiple
                                                >
                                                    {roles.length > 0 && roles.map((role, index) =>
                                                        <option key={index} value={role.id}>{role.name}</option>
                                                    )}
                                                </Input>
                                                <FormText>Hold 'command' or 'ctrl' to select multiple roles.</FormText>
                                            </Col>
                                        </FormGroup>
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
                                                    value="Create New User"
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

export default inject('store')(observer(NewUser));