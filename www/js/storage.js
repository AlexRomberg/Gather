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

    // offline cache
    this.updateCache = function(votingData) {
        this.storage.setItem('cache', JSON.stringify(votingData));
    };

    this.getCacheDate = function() {
        let data = JSON.parse(this.storage.getItem('cache'));
        return data.date;
    };

    this.getCacheOptions = function() {
        let data = JSON.parse(this.storage.getItem('cache'));
        return data.options;
    };
};

let storage = new CStorage();