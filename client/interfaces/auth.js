class AuthInterface {
    constructor(username, password) {
        this.username = username || '';
        this.password = password || '';
    }
}

export default AuthInterface;