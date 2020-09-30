function CStorage() {
    this.storage = window.localStorage;

    this.setUsername = function(name) {
        this.storage.setItem('username', name);
    };
    this.getUsername = function() {
        return this.storage.getItem('username');
    };
    this.usernameExists = function() {
        let username = this.storage.getItem('username');
        return (username != null);
    };
}