import {extendObservable} from 'mobx';
import ApiService from '../services/api';

class ErrorsStore {
    constructor(IndexStore) {
        this.IndexStore = IndexStore;

        ApiService.createErrorsStore(this);

        extendObservable(this, {
            errors: []
        });
    }

    setErrors(errors) {
        this.errors = errors;
    }

    clearErrors() {
        this.errors = [];
    }
};

export default ErrorsStore;