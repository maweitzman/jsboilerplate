import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import {inject, observer} from 'mobx-react';
import config from '../../../api/config/config';
import 'isomorphic-unfetch';

import PumpValidator from '../../validators/pump';
import FormService from '../../services/form';

import BasicInput from '../../components/forms/basicInput';

import {Formik} from 'formik';
import {Row, Col, Form, Input} from 'reactstrap';

class EditPump extends React.Component {
    constructor(props) {
        super(props);

        this.PumpStore = this.props.store.PumpStore;
        this.ErrorsStore = this.props.store.ErrorsStore;
    }

    static async getInitialProps({req}) {
        if (req) {
            const res = await fetch(config.api_url + '/pumps/' + req.params.id, {
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
            this.PumpStore.setPump(this.props.init);
        } else {
            this.PumpStore.one(Router.query.id);
        }
    }

    put = async (values, actions) => {
        try {
            await this.PumpStore.put(Router.query.id, values);
            Router.push('/pumps');
        }
        catch (error) {
            FormService.handleFieldErrors(this.ErrorsStore.errors, actions);
            actions.setSubmitting(false);
        }
    }

    render() {
        return (
            <div className="EditPump">
                <h1>Edit {this.PumpStore.pump.name}</h1>
                <p>Here are some links:</p>
                <ul>
                    <li>
                        <Link href='/pumps' prefetch>
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
                            <legend>Complete the form to edit {this.PumpStore.pump.name}.</legend>
                            <Formik
                                initialValues={this.PumpStore.pump}
                                enableReinitialize={true}
                                validationSchema={PumpValidator}
                                onSubmit={this.put}
                            >
                                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, isSubmitting, submitCount}) => (
                                    <Form onSubmit={handleSubmit}>
                                        <BasicInput
                                            type="text"
                                            name="name"
                                            label="New Pump Name"
                                            cols={{
                                                label: 3,
                                                input: 9
                                            }}
                                            errors={this.ErrorsStore.errors}
                                            formik={{
                                                values: values,
                                                errors: errors,
                                                touched: touched,
                                                handleChange: handleChange,
                                                handleBlur: handleBlur,
                                                submitCount: submitCount
                                            }}
                                        />
                                        <Row>
                                            <Col md={{size: 9, offset: 3}}>
                                                <Input
                                                    type="submit"
                                                    name="submit"
                                                    id="submit"
                                                    value={'Edit ' + this.PumpStore.pump.name}
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

export default inject('store')(observer(EditPump));