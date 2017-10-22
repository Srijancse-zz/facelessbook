{

/**
 * Singleton id <--> color mapping. It's like caching.
 */
class IdColorMap {
  constructor() {
    this.data = new Map();
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

let knownElements = new Set();
let knownLike = new Set();
let colorMap = new IdColorMap();

function extractID(path) {
  return new URLSearchParams(path.substr(1+path.indexOf("?"))).get('id')
}

function getCurrrentDOM_Elements() {
  return Array.prototype.filter.call(document.querySelectorAll('[data-hovercard]'),el=>/^\/ajax\/hovercard\/(user|hovercard|group|page)\.php/.test(el.dataset.hovercard));
}

function getCurrrentDOM_ElementsLike() {
  return Array.prototype.filter.call(document.querySelectorAll(".UFILikeSentence [data-hover='tooltip'],.UFIReplyActorPhotoWrapper img,.UFIReplySocialSentenceLinkText"),el=>el);
}

function updateKnownElements() {
  getCurrrentDOM_Elements().map(el=>knownElements.add(el));
  return knownElements;
}

function updateKnownElementsLike() {
  getCurrrentDOM_ElementsLike().map(el=>knownLike.add(el));
  return knownLike;
}

updateKnownElementsLike().forEach(el => (el.style.opacity = 0));

updateKnownElements().forEach(el => {
  Object.assign(el.style, {
    background: `#${colorMap.get(extractID(el.dataset.hovercard))}`,
    color: 'transparent',
    borderRadius: '1em'
  });
  Array.prototype.map.call(el.querySelectorAll('*'), el=>(el.style.opacity = 0));
});

}