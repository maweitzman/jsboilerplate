import React from 'react';
import Link from 'next/link';
import {inject, observer} from 'mobx-react';
import config from '../../../api/config/config';
import 'isomorphic-unfetch';

import {Col, Row} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class AllPumps extends React.Component {
    constructor(props) {
        super(props);

        this.PumpStore = this.props.store.PumpStore;
    }

    static async getInitialProps({req}) {
        if (req) {
            const res = await fetch(config.api_url + '/pumps', {
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
            this.PumpStore.setPumps(this.props.init);
        } else {
            this.PumpStore.all();
        }
    }

    delete = async (id) => {
        try {
            await this.PumpStore.delete(id);
            this.PumpStore.all();
        }
        catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className="AllPumps">
                <h1>Pump Dashboard</h1>
                <p>Here are some links:</p>
                <ul>
                    <li>
                        <Link href='/pumps/new' prefetch>
                            <a>Create New Pump</a>
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
                    <Col md={6}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Delete</th>
                                    <th>Name</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.PumpStore.pumps.length > 0 && this.PumpStore.pumps.map((pump, index) =>
                                    <tr key={index}>
                                        <td
                                            style={{
                                                'textAlign': 'center'
                                            }}
                                        >
                                            <span
                                                style={{
                                                    'cursor': 'pointer'
                                                }}
                                                onClick={() => {
                                                    this.delete(pump.id);
                                                }}
                                            >
                                                <FontAwesomeIcon icon="minus-square" color="#a71e32"/>
                                            </span>
                                        </td>
                                        <td>{pump.name}</td>
                                        <td
                                            style={{
                                                'textAlign': 'center'
                                            }}
                                        >
                                            <Link href={'/pumps/edit?id=' + pump.id} as={'/pumps/' + pump.id + '/edit'} prefetch>
                                                <span
                                                    style={{
                                                        'cursor': 'pointer'
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon="pen-square" color="#007bff"/>
                                                </span>
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default inject('store')(observer(AllPumps));