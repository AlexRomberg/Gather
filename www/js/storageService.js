var storageService = (function() {

    let dbObj; // connection object

    let firebaseConfig = {
        apiKey: "AIzaSyAjvG_NHXLxkZttM4LHxxSECCieqYJtlok",
        authDomain: "gather-1b245.firebaseapp.com",
        databaseURL: "https://gather-1b245.firebaseio.com",
        projectId: "gather-1b245",
        storageBucket: "gather-1b245.appspot.com",
        messagingSenderId: "699789112029",
        appId: "1:699789112029:web:7630f0625b7e91b2e3a134",
        measurementId: "G-6M782WJ7TW"
    };


    const connectToFirebase = function() {
        let defaultProject = firebase.initializeApp(firebaseConfig);

        console.log('firebase-connection', defaultProject);

        dbObj = firebase.database();
    };

    const writeItem = function(path, data) {
        let ref = dbObj.ref(path);
        ref.set(data);

        console.log("Item added to firebase: " + path + "/" + data.id + ", " + data);
    };

    const removePath = function(path) {
        let ref = dbObj.ref(path);
        ref.remove();

        console.log("path deleted: " + path);
    };

    const mapSnapshotToObject = function(snapshot) {
        // default response if branch is empty
        var item = {};

        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            // create object with named properties
            item[childKey] = childData;
        })

        return item;
    };

    const readItems = function(path) { // returns a Promise
        let ref = dbObj.ref(path);
        let res = ref.once('value').then(mapSnapshotToObject);
        return res;
    };


    const subscribeItems = function(path, changeCallback) {
        let ref = dbObj.ref(path);

        ref.on('value', (snapshot) => {
            let obj = mapSnapshotToObject(snapshot);
            changeCallback(obj);
        });
    };

    // initialize
    connectToFirebase();

    // Demo-Usage
    writeItem("/demo/test/bla", { id: 10, ts: new Date().toString() });
    readItems("/demo/test/bla").then((items) => {
        console.log("data received", items);
    });

    // public
    return {
        writeItem,
        readItems,
        removePath,
        subscribeItems
    };
})();

const firebaseAdmin = require('firebase-admin')

firebaseAdmin.initializeApp();
var storage = firebaseAdmin.database().ref('gather-1b245')


writeItem("/bla", {
    "options": [],
    "votings": {"Noah"}
}
