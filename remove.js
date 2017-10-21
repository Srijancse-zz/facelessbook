{

let knownElements = new Set();

function extractID(path) {
  return new URLSearchParams(path.substr(1+path.indexOf("?"))).get('id')
}

function getCurrrentDOM_Elements() {
  return Array.prototype.filter.call(document.querySelectorAll('[data-hovercard]'),el=>/^\/ajax\/hovercard\/(user|hovercard|group)\.php/.test(el.dataset.hovercard));
}

// new Set(Array.prototype.filter.call(document.querySelectorAll('[data-hovercard]'),el=>/^\/ajax\/hovercard\/(user|hovercard|group)\.php/.test(el.dataset.hovercard)).map(el=>new URLSearchParams(el.dataset.hovercard.substr(1+el.dataset.hovercard.indexOf("?"))).get('id')))

var dict = {};

let entityMap = new Map();

function updateKnownElements() {
  getCurrrentDOM_Elements().map(el=>knownElements.add(el));
}

// updateKnownElements();

knownElements.forEach(el => {
  el.innerHTML = "";
});


console.log("yes")

}


// var COLORS = [];
// while (COLORS.length < 100) {
//     COLORS.push(`rgb(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)})`);
// }

// // random number generator
// function rand(frm, to) {
//     return ~~(Math.random() * (to - frm)) + frm;
// }