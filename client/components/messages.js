import React from 'react';
import {inject, observer} from 'mobx-react';

import {UncontrolledAlert} from 'reactstrap';

class Messages extends React.Component {
    timeout;

    constructor(props) {
        super(props);

        this.MessagesStore = this.props.store.MessagesStore;
    }

    createMessage = (message, index) => {
        if (message.type !== 'danger') {
            this.timeout = window.setTimeout(
                () => {
                    this.MessagesStore.removeMessage(message);
                },
                3500
            );
        }
        return (
            <UncontrolledAlert
                key={index}
                color={message.type}
                toggle={() => {
                    this.onDismissAlert(message);
                }}
            >
                {message.message}
            </UncontrolledAlert>
        )
    }

    onDismissAlert = (message) => {
        window.clearTimeout(this.timeout);
        this.MessagesStore.removeMessage(message);
    }

    render() {
        if (this.MessagesStore.messages.length <= 0) {
            return null;
        }
        return (
            <div id="Messages">
                {this.MessagesStore.messages.length > 0 && this.MessagesStore.messages.map((message, index) =>
                    this.createMessage(message, index)
                )}
                <style jsx global>{`
                    .alert {
                        margin-bottom: 0;
                    }
                `}</style>
            </div>
        );
    }
}

export default inject('store')(observer(Messages));