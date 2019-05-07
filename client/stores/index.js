import MessagesStore from './messages';
import ErrorsStore from './errors';
import AuthStore from './auth';
import UserStore from './user';
import PumpStore from './pump';

class IndexStore {
    constructor() {
        this.MessagesStore = new MessagesStore();
        this.ErrorsStore = new ErrorsStore();
        this.AuthStore = new AuthStore();
        this.UserStore = new UserStore();
        this.PumpStore = new PumpStore();
    }
}

export default IndexStore;