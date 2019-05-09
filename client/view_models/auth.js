class AuthViewModel {
    constructor(username, password) {
        this.username = username || '';
        this.password = password || '';
    }
}

export default AuthViewModel;