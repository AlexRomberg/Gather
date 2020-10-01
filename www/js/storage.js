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
    this.updateCache = function(data) {
        console.log("cache: ", data);
        if (data != undefined || "" || null) {
            console.log("waring cach refreshed: ", data);
            this.storage.setItem('cache', JSON.stringify(data));
        }
    };

    this.getCacheDate = function() {
        let data = JSON.parse(this.storage.getItem('cache'));
        return data.date;
    };

    this.getCacheOptions = function() {
        let data = JSON.parse(this.storage.getItem('cache'));
        return data.options;
    };

    this.getCacheVotes = function() {
        let data = JSON.parse(this.storage.getItem('cache'));
        return data.votings;
    };

    // other
    this.addLocation = function(name) {
        let data = JSON.parse(this.storage.getItem('cache'));
        data.options.push(name);
        this.storage.setItem('cache', JSON.stringify(data));
        return data.options.length - 1;
    }
};

let storage = new CStorage();