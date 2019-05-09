import ApiService from '../services/api';
import {extendObservable} from 'mobx';
import UserViewModel from '../view_models/user';

class UserApi {
    async post(user) {
        await ApiService.post('/users', user);
    }

    async allUsers() {
        return await ApiService.get('/users');
    }

    async allRoles() {
        return await ApiService.get('/users/roles');
    }

    async one(id) {
        return await ApiService.get('/users/' + id);
    }

    async putInfo(id, user) {
        await ApiService.put('/users/' + id + '/info', user);
    }

    async putRoles(id, roles) {
        await ApiService.put('/users/' + id + '/roles', roles);
    }

    async delete(id) {
        await ApiService.delete('/users/' + id);
    }
}

class UserStore {
    api = new UserApi();
    
    constructor(IndexStore) {
        this.IndexStore = IndexStore;

        extendObservable(this, {
            users: [],
            roles: [],
            user: new UserViewModel()
        });
    }


    async post(user) {
        await this.api.post(user);
    }

    async allUsers() {
        try {
            const response = await this.api.allUsers();
            this.users = response;
        }
        catch (error) {
            this.users = [];
        }
    }

    async allRoles() {
        try {
            const response = await this.api.allRoles();
            this.roles = response;
        }
        catch (error) {
            this.roles = [];
        }
    }

    async one(id) {
        try {
            const response = await this.api.one(id);
            this.user = response;
        }
        catch (error) {
            this.user = {};
        }
    }

    async putInfo(id, user) {
        await this.api.putInfo(id, user);
    }

    async putRoles(id, roles) {
        await this.api.putRoles(id, roles);
    }

    async delete(id) {
        await this.api.delete(id);
    }

    setUsers(users) {
        this.users = users;
    }

    setRoles(roles) {
        this.roles = roles;
    }

    setUser(user) {
        this.user = user;
    }
}

export default UserStore;