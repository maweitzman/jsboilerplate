import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import {inject, observer} from 'mobx-react';

import PumpValidator from '../../validators/pump';
import PumpInterface from '../../interfaces/pump';
import FormService from '../../services/form';

import BasicInput from '../../components/forms/basicInput';

import {Formik} from 'formik';
import {Row, Col, Form, Input} from 'reactstrap';

class NewPump extends React.Component {
    constructor(props) {
        super(props);

        this.PumpStore = this.props.store.PumpStore;
        this.ErrorsStore = this.props.store.ErrorsStore;
    }

    post = async (values, actions) => {
        try {
            await this.PumpStore.post(values);
            Router.push('/pumps');
        }
        catch (error) {
            FormService.handleFieldErrors(this.ErrorsStore.errors, actions);
            actions.setSubmitting(false);
        }
    }

    render() {
        return (
            <div className="NewPump">
                <h1>Create New Pump</h1>
                <p>Here are some links:</p>
                <ul>
                    <li>
                        <Link href='/pumps' prefetch>
                            <a>Cancel Pump</a>
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
                            <legend>Complete the form to create a pump.</legend>
                            <Formik
                                initialValues={new PumpInterface()}
                                validationSchema={PumpValidator}
                                onSubmit={this.post}
                            >
                                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, isSubmitting, submitCount}) => (
                                    <Form onSubmit={handleSubmit}>
                                        <BasicInput
                                            type="text"
                                            name="name"
                                            label="Name"
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
                                                    value="Create New Pump"
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

export default inject('store')(observer(NewPump));