class AuthService {
    decodeToken() {
        let decoded = false;
        if (document.cookie) {
            const token = document.cookie.split('=')[1];
            const payload = token.split('.')[1];
            decoded = JSON.parse(window.atob(payload));
        }
        return decoded;
    }
    
    isAuthorized(role) {
        const decoded = this.decodeToken();
        if (decoded.roles.includes(role)) {
            return true;
        } else {
            return false;
        }
    }

    isActive(username) {
        const decoded = this.decodeToken();
        if (decoded.username === username) {
            return true;
        } else {
            return false;
        }
    }
}

export default new AuthService();