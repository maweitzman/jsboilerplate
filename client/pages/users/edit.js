import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import {observe, toJS} from 'mobx';
import {inject, observer} from 'mobx-react';
import config from '../../../api/config/config';
import 'isomorphic-unfetch';

import UserValidator from '../../validators/user';
import FormService from '../../services/form';

import BasicInput from '../../components/forms/basicInput';

import {Formik} from 'formik';
import {Col, Row, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

class EditUser extends React.Component {
    rolesDisposer;

    constructor(props) {
        super(props);

        this.UserStore = this.props.store.UserStore;
        this.ErrorsStore = this.props.store.ErrorsStore;

        this.state = {
            selectedRoles: [],
            initialRoles: [],
            rolesChanged: false
        };
    }

    static async getInitialProps({req}) {
        if (req) {
            const roles = await fetch(config.api_url + '/users/roles', {
                credentials: 'include',
                headers: {
                    cookie: req.headers.cookie
                }
            });
            const user = await fetch(config.api_url + '/users/' + req.params.id, {
                credentials: 'include',
                headers: {
                    cookie: req.headers.cookie
                }
            });
            const rolesResponse = await roles.json();
            const userResponse = await user.json();
            return {
                roles: rolesResponse,
                user: userResponse
            };
        }
        return {};
    }

    componentDidMount() {
        this.rolesDisposer = observe(this.UserStore, 'user', (change) => {
            this.setMultiSelect();
        });

        this.setMultiSelect();

        if (this.props.user || this.props.roles) {
            this.UserStore.setRoles(this.props.roles);
            this.UserStore.setUser(this.props.user);
        } else {
            this.UserStore.allRoles();
            this.UserStore.one(Router.query.id);
        }
    }

    componentWillUnmount() {
        this.rolesDisposer();
    }

    setMultiSelect() {
        let roles = [];
        if (this.UserStore.user.Roles) {
            for (let role of this.UserStore.user.Roles) {
                roles.push(role.id);
            }
        }
        this.setState({
            initialRoles: roles,
            selectedRoles: roles
        });
    }

    handleMultiSelect = (event) => {
        event.persist();
        let selectedRoles = [];
        for (let option of event.target.options) {
            if (option.selected) {
                selectedRoles.push(parseInt(option.value));
            }
        }
        this.setState({
            selectedRoles
        }, () => {
            if (this.state.selectedRoles.sort().join(',') === this.state.initialRoles.sort().join(',')) {
                this.setState({
                    rolesChanged: false
                });
            } else {
                this.setState({
                    rolesChanged: true
                });
            }
        });
    }

    putInfo = async (values, actions) => {
        try {
            await this.UserStore.putInfo(Router.query.id, values);
            Router.push('/users');
        }
        catch (error) {
            FormService.handleFieldErrors(this.ErrorsStore.errors, actions);
            actions.setSubmitting(false);
        }
    }

    putRoles = async (event) => {
        event.preventDefault();
        try {
            await this.UserStore.putRoles(Router.query.id, this.state.selectedRoles);
            Router.push('/users');
        }
        catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className="EditUser">
                <h1>Edit {this.UserStore.user.username}</h1>
                <p>Here are some links:</p>
                <ul>
                    <li>
                        <Link href='/users' prefetch>
                            <a>Cancel Edit</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/' prefetch>
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/logout'>
                            <a>Logout</a>
                        </Link>
                    </li>
                </ul>
                <Row>
                    <Col md="6">
                        <fieldset>
                            <legend>Complete the form to edit {this.UserStore.user.username}'s basic info.</legend>
                            <Formik
                                initialValues={this.UserStore.user}
                                enableReinitialize={true}
                                validationSchema={UserValidator}
                                onSubmit={this.putInfo}
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
                                        <Row>
                                            <Col md={{size: 10, offset: 2}}>
                                                <Input
                                                    type="submit"
                                                    name="submit"
                                                    id="submit"
                                                    value={'Edit ' + this.UserStore.user.username}
                                                    disabled={isSubmitting || ! isValid}
                                                />
                                            </Col>
                                        </Row>
                                    </Form>
                                )}
                            </Formik>
                        </fieldset>
                    </Col>
                    <Col md="6">
                        <fieldset>
                            <legend>Complete the form to edit {this.UserStore.user.username}'s roles.</legend>
                            <Form onSubmit={this.putRoles}>
                                <FormGroup row>
                                    <Label for="roles" md={2}>Role(s)</Label>
                                    <Col md={10}>
                                        <Input
                                            type="select"
                                            name="roles"
                                            id="roles"
                                            onChange={this.handleMultiSelect}
                                            value={this.state.selectedRoles}
                                            multiple
                                        >
                                            {this.UserStore.roles.length > 0 && this.UserStore.roles.map((role, index) =>
                                                <option key={index} value={role.id}>{role.name}</option>
                                            )}
                                        </Input>
                                        <FormText>Hold 'command' or 'ctrl' to select multiple roles.</FormText>
                                    </Col>
                                </FormGroup>
                                <Row>
                                    <Col md={{size: 10, offset: 2}}>
                                        <Input
                                            type="submit"
                                            name="submit"
                                            id="submit"
                                            value={'Edit ' + this.UserStore.user.username}
                                            disabled={! this.state.rolesChanged || ! this.state.selectedRoles.length}
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        </fieldset>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default inject('store')(observer(EditUser));