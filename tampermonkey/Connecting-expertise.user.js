// ==UserScript==
// @name         Connecting-expertise
// @namespace    https://connecting-expertise.com
// @version      0.1
// @description  try to take over the world! and tally up the filled in hours
// @author       http://twitter.com/wolfcraft_io
// @match        *.connecting-expertise.com/*
// @grant        GM_addStyle
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

const totalBookedHours = "total-booked-hours";
const tally = "tally";
const tracked = 'tracked';

function addBookedHoursLine(){
    $('form table:first-of-type tr:last-of-type')
        .after(`<tr class="${totalBookedHours}"><td class="label">Totaal ingegeven</td><td class="${tally}"></td></tr>`);
}

function calculateHours(){
    console.log('calculating... or at least it should be');
}

function updateTrackedFields(){
    console.log('update tracked fields');
    // selected untracked fields
    // on change/blur caculate hours
    // set tracked class

    // recalculate
    calculateHours();
}

function evaluateTrackedFields(){
    // delay updating tracked fields until they are rendered
    $('input[type="button"]').on('click', () => setTimeout(updateTrackedFields, 1000));

    // initial track fields
    updateTrackedFields();
}

function addStyles(){
    GM_addStyle(`.${tracked} { background-color: green; }`);
    GM_addStyle(`.${totalBookedHours} .label { font-weight: 600; color: orange; }`);
}

$(document).ready(function() {
    addBookedHoursLine();
    evaluateTrackedFields();
    addStyles();
});
