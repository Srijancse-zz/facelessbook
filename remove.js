var dict = {};

elementList = document.querySelectorAll(".UFICommentActorName");

console.log("yes")





var COLORS = [];
while (COLORS.length < 100) {
    COLORS.push(`rgb(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)})`);
}

// random number generator
function rand(frm, to) {
    return ~~(Math.random() * (to - frm)) + frm;
}