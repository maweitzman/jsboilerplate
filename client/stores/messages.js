import {extendObservable, toJS} from "mobx";
import ApiService from '../services/api';

class MessagesStore {
    constructor(IndexStore) {
        this.IndexStore = IndexStore;

        ApiService.createMessagesStore(this);

        extendObservable(this, {
            messages: []
        });
    }

    addMessage(message, type) {
        const messages = this.messages || [];
        messages.push({
            message,
            type
        });
        this.messages = toJS(messages);
    }

    removeMessage(message) {
        let messages = toJS(this.messages);
        messages.map((current, index) => {
            if (current['message'] === toJS(message)['message']) {
                messages.splice(index, 1);
            }
        });
        this.messages = messages;
    }

    clearMessages() {
        let messages = toJS(this.messages);
        messages = [];
        this.messages = messages;
    }
};

export default MessagesStore;