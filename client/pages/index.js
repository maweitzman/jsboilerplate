import React from 'react';
import Link from 'next/link';

import AuthService from '../services/auth';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Home">
                <h1>Home</h1>
                <ul>
                    {process.browser && AuthService.isAuthorized('Admin') &&
                        <li>
                            <Link href="/users" prefetch>
                                <a>Users</a>
                            </Link>
                        </li>
                    }
                    {process.browser && AuthService.isAuthorized('User') &&
                        <li>
                            <Link href="/pumps" prefetch>
                                <a>Pumps</a>
                            </Link>
                        </li>
                    }
                    <li>
                        <Link href="/logout">
                            <a>Logout</a>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Home;