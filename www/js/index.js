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
let surveyBox = document.getElementById('survey-box');
let checkboxes = new Array();


// eventlisteners
menuBtn.addEventListener('click', showMenu);
menu.addEventListener('click', hideMenu);
addBtn.addEventListener('click', addLocation);
resultBtn.addEventListener('click', openResultpage);

// functions
function onDeviceReady() {
    // storage.updateCache(JSON.parse('{"date": "31.09.","options": ["coop","migros","Pfefferbox"],"votings": {"Alexander": [0,2],"Noah": [1,2]}}'));
    if (!storage.usernameExists()) {
        window.location.replace("setup.html");
    }
    createSurveybox("Essen " + storage.getCacheDate(), storage.getCacheOptions());
}

function showNotification() {
    cordova.plugins.notification.local.schedule({
        title: 'Hey there',
        text: 'This app can notify you :)',
        foreground: true
    });
}

function showMenu(e) {
    menu.classList.remove('hidden');
}

function hideMenu(e) {
    menu.classList.add('hidden');
}

function createSurveybox(title, names) {
    let h2 = document.createElement("h2");
    h2.innerText = title;
    surveyBox.appendChild(h2);
    addCheckboxes(names);
}

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

function addLocation() {
    var newLocationName = prompt("Wie heisst der neue Ort", "");
    if (!(newLocationName == null || "")) {
        addCheckboxes([newLocationName]);
        storage.addLocation(newLocationName);
    }
}

function openResultpage() {
    window.location.href = "result.html";
}

function boxChanged(e) {
    // todo: update vote on
}