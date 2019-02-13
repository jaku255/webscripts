// ==UserScript==
// @name         mimuw.edu.pl Resource QoL
// @namespace    http://jaku255.github.io/
// @version      0.2
// @description  Inject missing MathJax in wazniak and smurf export, replace formula images with real formulas, render formulas in pre tags, and more!
// @author       jaku255
// @updateURL    https://gitcdn.link/repo/jaku255/webscripts/master/scripts/pl.edu.mimuw.user.js
// @downloadURL  https://gitcdn.link/repo/jaku255/webscripts/master/scripts/pl.edu.mimuw.user.js
// @match        http://wazniak.mimuw.edu.pl/*
// @match        http://smurf.mimuw.edu.pl/book/export/html/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.MathJax = {
        tex2jax: {
            inlineMath: [ ['$','$'], ["\\(","\\)"], ["<math>", "</math>"] ],
            skipTags:["script","noscript","style"],
            processEscapes: true
        }
    }
    const scrNode = document.createElement('script');

    scrNode.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML';
    document.head.appendChild(scrNode);

})();

window.addEventListener('load', function() {
    'use strict';
    document.getElementById("content").style = "font-family: Cambria;font-size: 11pt;";
    var formulas = document.querySelectorAll("img.tex");
    console.log("Replacing "+formulas.length+" images");
    //for (var i = 0; i < formulas.length; i++) {formulas[i].outerHTML='<math>'+formulas[i].alt+'</math>';};
    for (var i = 0; i < formulas.length; i++) {
        const f = formulas[i].alt.replace(/<\/?math>/g, '');
        var nd = document.createTextNode('<math>'+f+'</math>');

        formulas[i].parentNode.insertBefore(nd, formulas[i]);
        formulas[i].parentNode.removeChild(formulas[i]);
    };
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}, false);