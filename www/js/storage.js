function CStorage() {
    this.storage = window.localStorage;

    // username
    // replaces localy storred username
    this.setUsername = function(name) {
        this.storage.setItem('username', name);
    };

    // returns username
    this.getUsername = function() {
        return this.storage.getItem('username');
    };

    // checks if username is set
    this.usernameExists = function() {
        let username = this.storage.getItem('username');
        return (username != null);
    };

    // noontimes
    // sets times where user has lunch break
    this.setNoontimes = function(times) {
        this.storage.setItem('noontimes', JSON.stringify(times));
    };

    // returns times where user has lunch break
    this.getNoontimes = function() {
        return JSON.parse(this.storage.getItem('noontimes'));
    };

    // offline cache
    // saves local cache
    this.updateCache = function(data) {
        console.log("cache: ", data);
        if (data != undefined || "" || null) {
            console.log("waring cach refreshed: ", data);
            this.storage.setItem('cache', JSON.stringify(data));
        }
    };

    // retuns cached date
    this.getCacheDate = function() {
        let data = JSON.parse(this.storage.getItem('cache'));
        return data.date;
    };

    // returns cached votingoptions
    this.getCacheOptions = function() {
        let data = JSON.parse(this.storage.getItem('cache'));
        return data.options;
    };

    // returns cached votes
    this.getCacheVotes = function() {
        let data = JSON.parse(this.storage.getItem('cache'));
        return data.votings;
    };

    // other
    // adds new votingoption to cache
    this.addLocation = function(name) {
        let data = JSON.parse(this.storage.getItem('cache'));
        data.options.push(name);
        this.storage.setItem('cache', JSON.stringify(data));
        return data.options.length - 1;
    }
};

let storage = new CStorage();