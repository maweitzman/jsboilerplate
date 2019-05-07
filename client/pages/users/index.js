import React from 'react';
import Link from 'next/link';
import {inject, observer} from 'mobx-react';
import config from '../../../api/config/config';
import 'isomorphic-unfetch';

import AuthService from '../../services/auth';

import {Col, Row} from 'reactstrap';
import{FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class AllUsers extends React.Component {
    constructor(props) {
        super(props);

        this.UserStore = this.props.store.UserStore;
    }

    static async getInitialProps({req}) {
        if (req) {
            const res = await fetch(config.api_url + '/users', {
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
            this.UserStore.setUsers(this.props.init);
        } else {
            this.UserStore.allUsers();
        }
    }

    delete = async (id) => {
        try {
            await this.UserStore.delete(id);
            this.UserStore.allUsers();
        }
        catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className="AllUsers">
                <h1>User Dashboard</h1>
                <ul>
                    <li>
                        <Link href="/users/new" prefetch>
                            <a>Create New User</a>
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
                            <legend>All Users</legend>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Delete</th>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.UserStore.users.length > 0 && this.UserStore.users.map((user, index) =>
                                        <tr key={index}>
                                            <td
                                                style={{
                                                    'textAlign': 'center'
                                                }}
                                            >
                                                {! AuthService.isActive(user.username) &&
                                                    <span
                                                        style={{
                                                            'cursor': 'pointer'
                                                        }}
                                                        onClick={() => {
                                                            this.delete(user.id);
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon="minus-square" color="#a71e32"/>
                                                    </span>
                                                }
                                            </td>
                                            <td>{user.firstName + ' ' + user.lastName}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td
                                                style={{
                                                    'textAlign': 'center'
                                                }}
                                            >
                                                {! AuthService.isActive(user.username) &&
                                                    <Link href={'/users/edit?id=' + user.id} as={'/users/' + user.id + '/edit'} prefetch>
                                                        <span
                                                            style={{
                                                                'cursor': 'pointer'
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon="pen-square" color="#007bff"/>
                                                        </span>
                                                    </Link>
                                                }
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </fieldset>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default inject('store')(observer(AllUsers));