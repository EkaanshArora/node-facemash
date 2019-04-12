let x = 0;
let els = document.getElementsByClassName("mashImageHolder");
for (let i=0;i<10;i++) {
    var node = document.createElement("div");
    node.className='rank';
    var textnode = document.createTextNode(x+1);
    x++;
    node.appendChild(textnode);
    console.log(els[i]);
    els[i].appendChild(node);
};