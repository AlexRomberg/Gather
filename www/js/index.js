/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

// variables
document.addEventListener('deviceready', onDeviceReady, false);
let menu = document.getElementById('menu');
let menuBtn = document.getElementById('menuOpenBtn');
let addBtn = document.getElementById('addBtn');
let resultBtn = document.getElementById('resultBtn');
let voteBtn = document.getElementById('voteBtn');
let surveyBox = document.getElementById('survey-box');
let checkboxes = new Array();


// eventlisteners
menuBtn.addEventListener('click', showMenu);
menu.addEventListener('click', hideMenu);
addBtn.addEventListener('click', addLocation);
resultBtn.addEventListener('click', openResultpage);
voteBtn.addEventListener('click', vote);

// functions

// loads cache and redirects to setup-page if username is unset
function onDeviceReady() {
    if (!storage.usernameExists()) {
        window.location.replace("setup.html");
    }
    storageService.readDataBase()
        .then((data) => {
            storage.updateCache(data);
            createSurveybox("Essen " + storage.getCacheDate(), storage.getCacheOptions());
            showVote();
        })
        // loads cached infos on error
        .catch((error) => {
            console.log(error);
            createSurveybox("Essen " + storage.getCacheDate(), storage.getCacheOptions());
            showVote();
        });
    showNotification();
}

// displays a repetitive notification
function showNotification() {
    cordova.plugins.notification.local.schedule({
        title: 'Gather',
        text: 'Bitte stimme für ein Mittagessen ab.',
        trigger: {
            every: {
                hour: 9,
                minute: 5,
                second: 0
            }
        },
        smallIcon: 'img/logo.png',
        foreground: true
    });
}

// displays the Menu on click
function showMenu(e) {
    menu.classList.remove('hidden');
}

// hides the Menu on click
function hideMenu(e) {
    menu.classList.add('hidden');
}

// generates box containing checkboxes and title
function createSurveybox(title, names) {
    let h2 = document.createElement("h2");
    h2.innerText = title;
    surveyBox.innerHTML = "";
    surveyBox.classList.remove("loader");
    surveyBox.appendChild(h2);
    addCheckboxes(names);
}

// generates checkboxes from list
function addCheckboxes(names) {
    for (let i = 0; i < names.length; i++) {
        let div = document.createElement("div");
        div.classList.add("option");

        let extendetCheckbox = document.createElement("div");
        extendetCheckbox.classList.add("extendetCheckbox");

        let box = document.createElement("input");
        box.id = i;
        box.type = 'checkbox';

        let p = document.createElement("p");
        p.classList.add("name");
        p.innerText = names[i];

        checkboxes.push(box);
        extendetCheckbox.appendChild(box);
        div.appendChild(extendetCheckbox);
        div.appendChild(p);
        surveyBox.appendChild(div);
    }
}

// handles input of new location
function addLocation() {
    var newLocationName = prompt("Wie heisst der neue Ort", "");
    if (!(newLocationName == null || "")) {
        addCheckboxes([newLocationName]);
        let id = storage.addLocation(newLocationName);
        storageService.addNewPlace(id, newLocationName);
    }
}

// redirects to result-page
function openResultpage() {
    window.location.href = "result.html";
}

// handles voting and sends it to server; shows visual feedback
function vote() {
    let vote = new Array();
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            vote.push(i);
        }
    }
    storageService.registerVoting(storage.getUsername(), vote);
    resultBtn.style.display = "block";
    voteBtn.style.transition = "0s";
    voteBtn.style.width = "50%";
    voteBtn.style.backgroundColor = "var(--positive-background)"
    setTimeout(hideGreen, 1000);
}

// hides visual feedback
function hideGreen() {
    voteBtn.style.transition = "2s";
    voteBtn.style.backgroundColor = "#f0f0f0";
}

// loads votings and checks boxes
function showVote() {
    if (storage.getUsername() in storage.getCacheVotes()) {
        let persVotes = JSON.parse(storage.getCacheVotes()[storage.getUsername()]);
        persVotes.forEach(id => {
            checkboxes[id].checked = true;
        });
    } else {
        resultBtn.style.display = "none";
        voteBtn.style.width = "100%";
    }
}

// reloads surveyBox
function refreshSurveyBox(options) {
    createSurveybox("Essen " + storage.getCacheDate(), options);
}