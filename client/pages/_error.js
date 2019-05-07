import React from 'react';
import Router from 'next/router';

class Error extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            code: null,
            message: null
        };
    }

    static getInitialProps({res, err}) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null;
        return {statusCode};
    }

    componentDidMount() {
        if (Router.query.code) {
            this.setState({
                code: Router.query.code,
                message: Router.query.message
            });
        } else if (this.props.statusCode) {
            this.setState({
                code: this.props.statusCode
            }, () => {
                if (this.state.code === 404) {
                    this.setState({
                        message: 'The page or resource you requested was not found.'
                    });
                } else if (this.state.code === 500) {
                    this.setState({
                        message: 'An internal server occurred. Please try again.'
                    });
                }
            });
        }
    }

    render() {
        return (
            <div id="error-page">
                <div>
                    <h1>{this.state.code}</h1>
                    <div id="error-message">
                        <h2>{this.state.message}</h2>
                    </div>
                </div>
                <a href="javascript:history.back()">← Back</a>
                <style jsx>{`
                    #error-page {
                        height: 100vh;
                        display: flex;
                        text-align: center;
                        align-items: center;
                        flex-direction: column;
                        justify-content: center;
                    }
                    h1 {
                        margin: 0;
                        font-size: 34px;
                        padding-right: 12px;
                        vertical-align: top;
                        display: inline-block;
                        border-right: 2px solid black;
                    }
                    #error-message {
                        height: 40px;
                        line-height: 42px;
                        padding-left: 12px;
                        display: inline-block;
                    }
                    h2 {
                        margin: 0;
                        font-size: 18px;
                        font-weight: normal;
                        line-height: inherit;
                    }
                    a {
                        margin-top: 30px;
                    }
                `}</style>
            </div>
        );
    }
}

export default Error;