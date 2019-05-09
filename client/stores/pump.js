import ApiService from '../services/api';
import {extendObservable} from 'mobx';
import PumpViewModel from '../view_models/pump';

class PumpApi {
    async post(pump) {
        await ApiService.post('/pumps', pump);
    }

    async all() {
        return await ApiService.get('/pumps');
    }

    async one(id) {
        return await ApiService.get('/pumps/' + id);
    }

    async put(id, pump) {
        await ApiService.put('/pumps/' + id, pump);
    }

    async delete(id) {
        await ApiService.delete('/pumps/' + id);
    }
}

class PumpStore {
    api = new PumpApi();

    constructor(IndexStore) {
        this.IndexStore = IndexStore;

        extendObservable(this, {
            pumps: [],
            pump: new PumpViewModel()
        });
    }

    async post(pump) {
        await this.api.post(pump);
    }

    async all() {
        try {
            const response = await this.api.all();
            this.pumps = response;
        }
        catch (error) {
            this.pumps = [];
        }
    }

    async one(id) {
        try {
            const response = await this.api.one(id);
            this.pump = response;
        }
        catch (error) {
            this.pump = {};
        }
    }

    async put(id, pump) {
        await this.api.put(id, pump);
    }

    async delete(id) {
        await this.api.delete(id);
    }

    setPumps(pumps) {
        this.pumps = pumps;
    }

    setPump(pump) {
        this.pump = pump;
    }
}

export default PumpStore;