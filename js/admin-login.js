function dangNhapAdmin() {
    let user = document.getElementById('user-name').value;
    let pass = document.getElementById('password').value;
    if (user != 'admin' && pass != 'admin')
        document.getElementById('error').style.display = 'block';
    else
        location.href = './admin-index.html';
}

var input = document.getElementById("password");
var input2 = document.getElementById("user-name");

input.addEventListener("keyup", function (event) {
    // Enter
    if (event.keyCode === 13) {
        event.preventDefault();
        dangNhapAdmin();
    }
});
input2.addEventListener("keyup", function (event) {
    // Enter
    if (event.keyCode === 13) {
        event.preventDefault();
        dangNhapAdmin();
    }
});