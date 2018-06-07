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
const recalculate = 'recalculate';

function addBookedHoursLine(){
    $('form#form table:first-of-type tr:last-of-type').after(`<tr class="${totalBookedHours}"><td class="label">Totaal ingegeven <button id="${recalculate}">&#8634;</button></td><td><div class="${tally}"></div></td></tr>`);
    $(`#${recalculate}`).on('click', (event) => {
        event.preventDefault();
        updateTrackedFields();
    });
}

function calculateHours(){
    const days = $(`.tsInput.${tracked}`)
        .toArray()
        .map((element) => {
             const $tracked = $(element);
             const $input = $tracked.children('input');

             return $input.length > 0 ?  $input.val() : $tracked.text().trim();
        })
        .map(text => Number.isNaN(text) ? 0 : new Number(text).valueOf());

    const hours = days.length > 0 ? days.reduce((total = 0, val) => total + val) : 0;
    $(`.${tally}`).text(hours);
}

function updateTrackedFields(){
    $(`.tsInput:not(.${tracked})`)
        .addClass(tracked)
        .find('input[type="text"]')
        .on('change blur', calculateHours);

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
    GM_addStyle(`.${tracked} input[type="text"] { background-color: orange !important; }`);
    GM_addStyle(`.${tracked} { color: orange !important; }`);
    GM_addStyle(`.${totalBookedHours} .label { font-weight: 600; color: orange; }`);
}

$(document).ready(function() {
    addBookedHoursLine();
    evaluateTrackedFields();
    addStyles();
});
