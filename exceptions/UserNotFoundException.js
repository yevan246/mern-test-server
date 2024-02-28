class UserNotFoundException extends Error {
    constructor(message) {
        super();

        this.message = message
        this.statusCode = 404
    }
}

module.exports = UserNotFoundException
