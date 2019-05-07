class UserInterface {
    constructor(firstName, lastName, email, username, password) {
        this.firstName = firstName || '';
        this.lastName = lastName || '';
        this.email = email || '';
        this.username = username || '';
        this.password = password || '';
    }
}

export default UserInterface;