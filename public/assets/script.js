let els = document.getElementsByClassName("mashImage");
function sendVote(user) {
    document.getElementById('status').innerHTML = "Voting...";
    var http = new XMLHttpRequest();
    http.open('POST', '/', true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            document.getElementById('status').innerHTML = "Voted!";
            window.location.href = "/";
        }
    }
    console.log(user);
    http.send(`url=${user}`);
};

window.onkeydown = function (event) {
    if (event.keyCode === 37) {
        sendVote(els[0].name);
    }
    else if (event.keyCode === 39) {
        sendVote(els[1].name);
    }
};

[].forEach.call(els, function (element) {
    element.onclick = function () {
        sendVote(this.name);
    }
});