import ApiService from '../services/api';
import {extendObservable} from 'mobx';
import AuthService from '../services/auth';

class AuthApi {
    async login(user) {
        return await ApiService.post('/auth/login', user);
    }
}

class AuthStore {
    api = new AuthApi();

    constructor(IndexStore) {
        this.IndexStore = IndexStore;

        extendObservable(this, {
            profile: {}
        });
    }

    async login(user) {
        this.profile = await this.api.login(user);
    }

    async setProfile() {
        try {
            this.profile = await AuthService.decodeToken();
        }
        catch (error) {
            this.profile = {};
        }
    }
}

export default AuthStore;