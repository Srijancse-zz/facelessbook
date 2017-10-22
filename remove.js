{

/**
 * Singleton id <--> color mapping. It's like caching.
 */
class IdColorMap {
  constructor() {
    this.data = new Map();
  }
  static create() {
    return new this();
  }
  static decToHex(dec) {
    let hex = dec.toString(16);
    while(hex.length < 6) hex = '0' + hex;
    return hex;
  }
  get(hash) {
    if(!this.data.has(hash)) {
      this.reset(hash);
    }
    return IdColorMap.decToHex(this.data.get(hash));
  }
  reset(hash) {
    this.data.set(hash, Math.floor((Math.abs(Math.sin(hash) * 16777215)) % 16777215));
    return this;
  }
  toString() {
    return String(this.data);
  }
}

let selfStyleEl = document.querySelector("style#fbless") || (el => {
  el.id = "fbless";
  document.head.appendChild(el);
  return el;
})(document.createElement("style"));

let selfStyle = selfStyleEl.sheet;

let knownElements = new Set();
let knownLike = new Set();
let colorMap = IdColorMap.create();

function extractID(path) {
  return new URLSearchParams(path.substr(1+path.indexOf("?"))).get('id')
}

function getCurrrentDOM_Elements() {
  return Array.prototype.filter.call(document.querySelectorAll('[data-hovercard]'),el=>/^\/ajax\/hovercard\/(user|hovercard|group|page)\.php/.test(el.dataset.hovercard));
}

function getCurrrentDOM_ElementsLike() {
  return Array.prototype.filter.call(document.querySelectorAll(".UFILikeSentence"),el=>/^\/ajax\/hovercard\/(user|hovercard|group|page)\.php/.test(el.dataset.hovercard));
}


// new Set(Array.prototype.filter.call(document.querySelectorAll('[data-hovercard]'),el=>/^\/ajax\/hovercard\/(user|hovercard|group)\.php/.test(el.dataset.hovercard)).map(el=>new URLSearchParams(el.dataset.hovercard.substr(1+el.dataset.hovercard.indexOf("?"))).get('id')))

var dict = {};

let entityMap = new Map();

function updateKnownElements() {
  return getCurrrentDOM_Elements().map(el=>knownElements.add(el));
}

function updateKnownElementsLike() {
  return getCurrrentDOM_ElementsLike().map(el=>knownLike.add(el));
}


updateKnownElements();
updateKnownElementsLike();

knownLike.forEach(el => {
  el.style.opacity = "0";
});

knownElements.forEach(el => {
  let img;
  el.style.background = `#${colorMap.get(extractID(el.dataset.hovercard))}`;
  el.style.color = "transparent";
  el.style.borderRadius = "1em"
  if(img = el.querySelector("img")) {
    img.style.opacity = "0";
  }
  window.aaa = el;
});


console.log("yes")

}