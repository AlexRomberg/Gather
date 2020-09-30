function CStorage() {
    this.storage = window.localStorage;

    // username
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

    // noontimes
    this.setNoontimes = function(times) {
        this.storage.setItem('noontimes', JSON.stringify(times));
    };

    this.getNoontimes = function() {
        return JSON.parse(this.storage.getItem('noontimes'));
    };
};

let storage = new CStorage();