import React from 'react';
import App, {Container} from 'next/app';
import {Provider} from 'mobx-react';

import indexStore from '../stores/index';
const IndexStore = new indexStore();

import Messages from '../components/messages';

import {library, config} from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import {faPenSquare, faMinusSquare} from '@fortawesome/free-solid-svg-icons';
library.add(faPenSquare, faMinusSquare);

import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/styles/index.scss';

class Layout extends React.Component {
    render() {
        const {children} = this.props;
        return <div className="Layout">{children}</div>
    }
}

export default class GlobalApp extends App {
    constructor() {
        super();
    }

    componentDidMount() {
        IndexStore.AuthStore.setProfile();
    }

    render() {
        const {Component, pageProps} = this.props;
        return (
            <Container>
                <Provider store={IndexStore}>
                    <Layout>
                        <Messages/>
                        <Component {...pageProps}/>
                    </Layout>
                </Provider>
            </Container>
        );
    }
}