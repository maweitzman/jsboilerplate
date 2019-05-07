import config from '../../api/config/config';

class ApiService {
    createMessagesStore(MessagesStore) {
        this.MessagesStore = MessagesStore;
    }

    createErrorsStore(ErrorsStore) {
        this.ErrorsStore = ErrorsStore;
    }

    makeFetch(url, method, body) {
        const fullUrl = config.api_url + url;
    
        const fetchObject = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: method,
            body: JSON.stringify(body)
        };

        return fetch(fullUrl, fetchObject)
            .then((res) =>  {
                this.bannerMessages(res);
                return res.json();
            })
            .then((response) => {
                this.handleStatus(response);
                return response;
            });
    }

    
    bannerMessages(res) {
        // this.MessagesStore.clearMessages();
        const success = res.headers.get('X-Message-Success');
        const warning = res.headers.get('X-Message-Warning');
        const error = res.headers.get('X-Message-Error');
        if (success) {
            this.MessagesStore.addMessage(success, 'success');
        } else if (warning) {
            this.MessagesStore.addMessage(warning, 'warn');
        } else if (error) {
            this.MessagesStore.addMessage(error, 'danger');
        }
    }
    
    handleStatus(response) {
        if (response.errors) {
            this.ErrorsStore.setErrors(response.errors);
        }
        if (response.status === 400) {
            throw response.errors;
        }
        if (response.status === 401) {
            window.history.pushState({}, 'Not Authorized', '/login');
            window.history.go();
        }
        if (response.status === 403) {
            window.history.go(-1);
        }
    }
    
    post(url, body) {
        return this.makeFetch(url, 'POST', body);
    }

    get(url) {
        return this.makeFetch(url, 'GET', undefined);
    }

    put(url, body) {
        return this.makeFetch(url, 'PUT', body);
    }

    delete(url) {
        return this.makeFetch(url, 'DELETE', undefined);
    }
}

export default new ApiService();