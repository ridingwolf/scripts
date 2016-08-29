// ==UserScript==
// @name         BBC Remove imperial
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  keep only the metric mesurements
// @author       You
// @match        http://www.bbc.co.uk/food/recipes/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    var imerialNotation = /\/\d*[¼¾]?(?:x\d*[¼¾]?)?(?:oz|fl|in)/gi;

    function removeImperialText(text){
        return !text ? "" : text.replace(imerialNotation, "");
    }

    function removeImperial(){
        $(".recipe-main-info")
            .find("li, p")
            .each(function(idx, el) { el.innerHTML = removeImperialText(el.innerHTML); });
    }

    removeImperial();
})();