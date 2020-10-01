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
let buttonNext = document.getElementById("btnNext");
let buttonFinish = document.getElementById("btnFinish");
let main = document.getElementsByTagName("main")[0];
let name = document.getElementById("nameInput");
let lunch = document.getElementById("lunchtimeInput");
let nameField = document.getElementById('txtField');

// eventListener
buttonNext.addEventListener('click', toggleClasses);
buttonFinish.addEventListener('click', goToIndex);

// prepare for setup
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('settings') != null) {
    name.classList.remove('hidden');
    lunch.classList.remove('hidden');
    nameField.value = storage.getUsername();
    setCheckstates(storage.getNoontimes());
}

// functions
function toggleClasses() {
    if (nameField.value != null) {
        name.classList.toggle('hidden') && lunch.classList.toggle('hidden');
    } else {
        nameField.style.borderColor = 'red';
    }

}

function goToIndex() {
    storage.setUsername(nameField.value);
    storage.setNoontimes(getCheckstates());
    window.location.replace("index.html");
}

function getCheckstates() {
    let checkstates = new Array();
    let checkboxes = document.getElementsByClassName('ckBox');
    for (let day = 0; day < 5; day++) {
        let tmp = new Array();
        for (let time = 0; time < 3; time++) {
            tmp.push(checkboxes[3 * day + time].checked);
        }
        checkstates.push(tmp);
    }
    return (checkstates);
}

function setCheckstates(checkstates) {
    let checkboxes = document.getElementsByClassName('ckBox');
    for (let day = 0; day < 5; day++) {
        for (let time = 0; time < 3; time++) {
            checkboxes[3 * day + time].checked = checkstates[day][time];
        }
    }
}

// (un)ready for options menu
if (name.classList.contains('hidden') || lunch.classList.contains('hidden')) {
    main.classList.add('no-scroll');
} else {
    main.classList.remove('no-scroll');
}