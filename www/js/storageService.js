var storageService = (function () {

    let dbObj; // connection object

    var firebaseConfig = {
        apiKey: "AIzaSyAjvG_NHXLxkZttM4LHxxSECCieqYJtlok",
        authDomain: "gather-1b245.firebaseapp.com",
        databaseURL: "https://gather-1b245.firebaseio.com",
        projectId: "gather-1b245",
        storageBucket: "gather-1b245.appspot.com",
        messagingSenderId: "699789112029",
        appId: "1:699789112029:web:7630f0625b7e91b2e3a134",
        measurementId: "G-6M782WJ7TW"
      };


    const connectToFirebase = function () {
        let defaultProject = firebase.initializeApp(firebaseConfig);

        console.log('firebase-connection', defaultProject);

        dbObj = firebase.database();
    };

    // initialize
    connectToFirebase();

    // Update date
    const setNewDate = function(date){
        dbObj.ref("/date").set(date.toString());
    }

    // Add a place to eat
    const addNewPlace = function(place){
        dbObj.ref("/options").push().set(place);
    }

    // Register voting
    const registerVoting = function(name, array){
        dbObj.ref("/votings").set(name);
        dbObj.ref("/votings/"+name).set(JSON.stringify(array));      
    }

    const mapSnapshotToObject = function (snapshot) {
        // default response if branch is empty
        var item = {};

        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            // create object with named properties
            item[childKey] = childData;
        })

        return item;
    };

    // give Back the whole DataBase
    const readDataBase = function(){
        res = dbObj.ref("/").once('value').then(mapSnapshotToObject);       
        return res;
    }

    // listener for options and voting to trigger readBase()
    const subscribeItems = function() {
        dbObj.ref("/options").on('value', (snapshot) => {
            let obj = mapSnapshotToObject(snapshot);
            storage.updateCache(readDataBase());
        });
        dbObj.ref("/votings").on('value', (snapshot) => {
            let obj = mapSnapshotToObject(snapshot);
            storage.updateCache(readDataBase());
        });
    };

    subscribeItems();

    // public
    return {
        setNewDate,
        addNewPlace,
        registerVoting,
        readDataBase
    };
})();

