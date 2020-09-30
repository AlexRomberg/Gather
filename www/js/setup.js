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

// eventListener
buttonNext.addEventListener('click', toggleClasses);
buttonFinish.addEventListener('click', goToIndex);

// prepare for setup
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('settings') != null) {
    name.classList.remove('hidden');
    lunch.classList.remove('hidden');
}

// functions
function toggleClasses() {
    name.classList.toggle('hidden') && lunch.classList.toggle('hidden');
    if (document.getElementById('txtField').value == "Raph" || "Raphael") {
        navigator.vibrate(10000);
    }
}

function goToIndex() {
    window.location.replace("index.html");
}

// (un)ready for options menu
if (name.classList.contains('hidden') || lunch.classList.contains('hidden')) {
    main.classList.add('no-scroll');
} else {
    main.classList.remove('no-scroll');
}