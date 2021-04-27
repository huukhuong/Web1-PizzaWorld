// XỬ lý phần quản lý admin
// ====================================
//             NHẢY MENU
// ====================================
var esanpham = document.getElementById('quanlysanpham');
var edonhang = document.getElementById('quanlydonhang');
var enguoidung = document.getElementById('quanlynguoidung');
var ethongke = document.getElementById('quanlythongke');

// Hiện sidebar
var sidebar = document.getElementsByClassName('sideMenu')[0];
var content = document.getElementsByClassName('content')[0];
function PhongSide() {
    sidebar.style.width = '200px';
}
// Ẩn sidebar
function ThuSide() {
    sidebar.style.width = '80px';
}

var noActive = document.getElementsByClassName('sidebar-link');

function hiensanpham() {
    for (i = 0; i < noActive.length; i++)
        if (noActive[i].classList.contains('isActive'))
            noActive[i].classList.remove('isActive');
    noActive[1].classList.add('isActive');
    breakpage1();
    esanpham.style.display = 'block';
    edonhang.style.display = 'none';
    enguoidung.style.display = 'none';
    ethongke.style.display = 'none';
}

function hiendonhang() {
    for (i = 0; i < noActive.length; i++)
        if (noActive[i].classList.contains('isActive'))
            noActive[i].classList.remove('isActive');
    noActive[3].classList.add('isActive');
    esanpham.style.display = 'none';
    enguoidung.style.display = 'none';
    ethongke.style.display = 'none';
    edonhang.style.display = 'block';
}

function hiennguoidung() {
    for (i = 0; i < noActive.length; i++)
        if (noActive[i].classList.contains('isActive'))
            noActive[i].classList.remove('isActive');
    noActive[2].classList.add('isActive');
    esanpham.style.display = 'none';
    edonhang.style.display = 'none';
    ethongke.style.display = 'none';
    enguoidung.style.display = 'block';
}

function hienthongke() {
    for (i = 0; i < noActive.length; i++)
        if (noActive[i].classList.contains('isActive'))
            noActive[i].classList.remove('isActive');
    noActive[0].classList.add('isActive');
    esanpham.style.display = 'none';
    edonhang.style.display = 'none';
    enguoidung.style.display = 'none';
    ethongke.style.display = 'block';
}


// =======================================
//              LOAD SẢN PHẨM
// =======================================
var sanpham = document.getElementById('row1');

for (i = 0; i < product_arr.length; i++) {
    let node = document.createElement('div');
    node.className = 'col-md-6 col-lg-3 col-12 mb-4 wrap-cart';

    let name = '\'' + product_arr[i].ten + '\'';
    let descrip = '\'' + product_arr[i].mota + '\'';
    let old = product_arr[i].giacu;
    let newp = product_arr[i].giamoi;

    node.innerHTML =
        '<div class="card">' +
        '<div class="inner-img">' +
        '<img class="card-img-top" src="' + product_arr[i].img + '">' +
        '</div>' +
        '<div class="card-body">' +
        '<h5 class="card-title">' + product_arr[i].ten + '</h5>' +
        '<p class="card-text">' + product_arr[i].mota + '</p>' +
        '<div class="cart-price">' +
        '<span class="card-old-price">' + product_arr[i].giacu + '</span>' +
        '<span class="card-current-price">' + product_arr[i].giamoi + '</span>' +
        '</div>' +
        '<div class="button-group">' +
        '<button type="button" data-toggle="modal" data-target="#chinhSua" onclick="chinhSua(' + name + ',' + descrip + ',' + old + ',' + newp + ');"' +
        'class="btn btn-success ml-auto"> Chỉnh sửa </button>' +
        '<button type="button"' +
        'class="btn btn-danger mr-auto"> Xoá </button>' +
        '</div>' +
        '</div>' +
        '</div> ';
    if (i >= 12) {
        sanpham = document.getElementById('row2');
    }
    sanpham.appendChild(node);
}


var remove_product = document.getElementsByClassName("btn-danger");
for (let i = 0; i < remove_product.length; i++) {
    let button = remove_product[i];
    button.addEventListener("click", function () {
        let button_remove = event.target;
        if (confirm('Bạn có chắc chắn muốn xoá?')) {
            let product_delete = button_remove.parentElement.parentElement.parentElement.parentElement;
            product_delete.classList.toggle('hidden');
            setTimeout(function () {
                product_delete.remove();
            }, 600);
        }
    })
}

var page1 = document.getElementById('row1');
var page2 = document.getElementById('row2');

function breakpage1() {
    page1.style.display = 'flex';
    page2.style.display = 'none';
    let btn1 = document.getElementById('btn-page1');
    let btn2 = document.getElementById('btn-page2');
    btn1.className = 'btn btn-page select-page';
    btn2.className = 'btn btn-page';
}
function breakpage2() {
    page1.style.display = 'none';
    page2.style.display = 'flex';
    let btn1 = document.getElementById('btn-page1');
    let btn2 = document.getElementById('btn-page2');
    btn1.className = 'btn btn-page';
    btn2.className = 'btn btn-page select-page';
}

// Sửa sản phẩm
function chinhSua(name, description, old_price, new_price) {
    document.getElementById('name-product').value = name;
    document.getElementById('description-product').value = description;
    document.getElementById('old-price-product').value = old_price + ".000";
    document.getElementById('new-price-product').value = new_price + ".000";
}

// XỬ LÝ TÀI KHOẢN

function kichHoat(e) {
    if (e.classList.contains('color-green')) {
        if (confirm('Bạn có chắc chắn muốn khoá tài khoản này?'))
            e.classList.toggle('color-green');
        e.parentElement.parentElement.style.backgroundColor = 'rgba(255,0,0,0.3)';
        e.parentElement.parentElement.style.textDecoration = 'line-through';
    }
    else {
        e.classList.toggle('color-green');
        e.parentElement.parentElement.style.backgroundColor = 'transparent';
        e.parentElement.parentElement.style.textDecoration = 'none';
    }
}


// Ném email vào tài khoản (100 email, pass, ngày tháng random từ web)

var listMail = ['', 'kcrona@wisoky.biz', 'king.beaulah@cole.biz', 'coleman86@kuvalis.com', 'aabernathy@yahoo.com', 'darian28@price.com', 'zmcclure@fisher.biz', 'qhand@gmail.com', 'schroeder.gloria@gmail.com', 'hermann.brando@hotmail.com', 'gust.langworth@hartmann.org', 'gerda.marvin@gmail.com', 'ohudson@hotmail.com', 'mclaughlin.lorine@hotmail.com', 'estefania31@yahoo.com', 'brown.jazmyn@towne.com', 'theresa76@nader.com', 'bschultz@quigley.com', 'parisian.karolann@hotmail.com', 'okeefe.wendy@hartmann.com', 'eileen.harris@hotmail.com', 'hellen.kirlin@hotmail.com', 'larkin.ernest@schiller.com', 'efunk@gmail.com', 'mdonnelly@rowe.com', 'nlegros@smith.com', 'yadira.haag@gmail.com', 'kfisher@gmail.com', 'gulgowski.tyson@gottlieb.com', 'aryanna.bechtelar@gmail.com', 'wjohnson@stanton.com', 'douglas.brant@hotmail.com', 'pansy18@doyle.com', 'marley78@gmail.com', 'winston.bashirian@renner.com', 'laurine.hoeger@yahoo.com', 'hester.corkery@gmail.com', 'keyon.halvorson@schamberger.biz', 'curt.hessel@emmerich.org', 'gorczany.santos@grant.com', 'epaucek@gmail.com', 'cmoore@wehner.biz', 'hgutkowski@senger.biz', 'hokuneva@yahoo.com', 'pfannerstill.chelsea@leannon.net', 'dickens.duncan@frami.com', 'rhodkiewicz@yahoo.com', 'melody74@powlowski.net', 'nsatterfield@champlin.com', 'monique80@welch.com', 'lou99@durgan.com', 'maximillia.runolfsdottir@hotmail.com', 'beier.craig@hotmail.com', 'jacinthe07@yahoo.com', 'emil.bogan@homenick.org', 'cathryn.heaney@ullrich.com', 'bwhite@johnson.com', 'julia.bashirian@gmail.com', 'yesenia20@mayert.org', 'qrogahn@keebler.com', 'destini.toy@hotmail.com', 'kiana28@koelpin.com', 'kohler.marcelo@stehr.com', 'tmitchell@okuneva.info', 'nader.eliezer@yahoo.com', 'willard55@dickens.info', 'mia.muller@quitzon.com', 'kwill@koepp.com', 'erna55@wisozk.com', 'gutmann.linnea@gmail.com', 'qbailey@yahoo.com', 'rory.durgan@hotmail.com', 'devonte91@volkman.biz', 'arthur57@yahoo.com', 'thoeger@champlin.com', 'dreichel@fay.com', 'tyree75@yahoo.com', 'pkozey@yahoo.com', 'ferne75@yahoo.com', 'elisabeth16@miller.com', 'qmante@keeling.org', 'salvatore.kiehn@becker.com', 'ohara.mckenzie@howe.com', 'bridget.wintheiser@shields.net', 'hschinner@gmail.com', 'lillie.mann@hotmail.com', 'funk.eryn@parisian.com', 'pcollier@corwin.net', 'kirk.frami@hotmail.com', 'lubowitz.samanta@yahoo.com', 'kane.ortiz@gmail.com', 'skreiger@kulas.net', 'imueller@morissette.info', 'beier.rae@hotmail.com', 'micah63@bernhard.net', 'witting.francesco@gmail.com', 'osinski.rocio@jerde.net', 'candice.muller@hotmail.com', 'ulices02@gmail.com', 'olen00@yahoo.com', 'nola19@yahoo.com'];
var listPass = ['', 'EyGA9nsjG3', 'fwVxkAzLRZ', 'bAq9D7d45a', 'Ta6B57cjK9', 'q3HfuXMXJY', '4ejnv263tm', 'pAFHTkdezC', 'ZCADDegHzs', 'w28vXdmtXV', 'SL7Skz6FA3', 'ZAkS2gYmfm', 'MT3DaC8asL', 'xZSqKAmS7z', '9TAdNCxwSk', 'hZBseYcSmV', 'PCTtR2pStn', 'vcPSDRQQ87', 'RxWYjPuJ7n', 'HytL6bDXMP', 'DwrY7naD3G', 'GYLQGNvtGP', 'VtpedCsaVr', 'ewjMa2b2d6', 'TyF3md94g8', 'fxAjZPQDP4', '9mrLCzk4E6', 'nb6H4kYeTj', '2K3ZjJxvBC', 'EYz7uXwTej', 'YmfB7kHskM', 'MXc59ukzne', 'FeyUc5abj7', '3hXZBpmw6C', 'VfTWx7sMQz', 'rKtRxBRr3m', '52JaBgkgMT', 'a3Njf3X5QQ', 'rNMrCnM4er', 'ne2DMZKWhu', 'ZMbWYtmgEz', 'bNdSXBsFEX', 'TAuGNhCTUz', 'ehTnFFtHSK', 'LFpJ9bB5hg', '8npdmNd6LF', 'tCdyurdjcx', 'L9ADez3tns', 'CLPqwbU6CS', 'xw6FN5PcUu', 'A4AcvcgWaT', '6WqYDbeJrb', '44Ft9fsAvb', '8PASnvcEjv', 'jnCwfah94Z', 'yXgTMRkrBg', 'mjrW8Mp6bn', 'E8GbLHPNWf', 'RP2V7cDh83', 'TJh3vB66qW', '4ML53GkM7D', 'Ury2MZGA8n', 'HU5NWsrabE', 'Tu8z5rMvVY', 'ZxrgNuttUp', 'hmLVRf6JaA', 'qeGgRkqPmw', 'WNgzpbtPXw', 'YPc9fcQ7A6', 'TF2b9zrZ5u', 'ZPFqQBQ4Yu', 'a8XyCvZ3Pg', 'QCExKxPuZV', 'BuTYsxRPMd', 'GW5BccmqZ3', 'Lx5G3Bj5Gf', 'YjxNyn26m5', 'KKM6FM5JGE', 'vevpNSvrTK', 'fQQVQnVTh4', 'KrZN5R2JXW', 'rk6zFYFahC', 'gTApJ3f6sW', 'nn7MGC9dWk', 'XUjdueQbnB', 'zfedmnJUNk', 'EvvQ2vrm93', 'pmzvxtdcNq', 'GExF99cdr7', 'ThHT5KmRHP', 'qdhQFkjwdm', 'LsAvnzhzCe', 'AwnnkZHRyp', 'zjw3KXnfbE', 'w3VW9h9GAh', 'V5JsMNGMyn', 'MbygCD2UsQ', 'GJkVkhHHjP', 'pnCrbrhTJj', 'vNNeYs6Pw8', 'UBntF2pZSF'];
var listDate = ['', '03/10/2020', '03/10/2020', '03/10/2020', '04/10/2020', '04/10/2020', '04/10/2020', '04/10/2020', '05/10/2020', '05/10/2020', '05/10/2020', '05/10/2020', '06/10/2020', '07/10/2020', '07/10/2020', '07/10/2020', '08/10/2020', '09/10/2020', '09/10/2020', '10/10/2020', '10/10/2020', '11/10/2020', '12/10/2020', '12/10/2020', '12/10/2020', '14/10/2020', '15/10/2020', '15/10/2020', '15/10/2020', '16/10/2020', '16/10/2020', '16/10/2020', '16/10/2020', '18/10/2020', '18/10/2020', '20/10/2020', '22/10/2020', '22/10/2020', '23/10/2020', '23/10/2020', '25/10/2020', '25/10/2020', '25/10/2020', '26/10/2020', '26/10/2020', '26/10/2020', '26/10/2020', '27/10/2020', '27/10/2020', '29/10/2020', '31/10/2020', '01/11/2020', '02/11/2020', '05/11/2020', '06/11/2020', '07/11/2020', '07/11/2020', '07/11/2020', '08/11/2020', '08/11/2020', '09/11/2020', '10/11/2020', '10/11/2020', '10/11/2020', '11/11/2020', '11/11/2020', '12/11/2020', '12/11/2020', '12/11/2020', '12/11/2020', '14/11/2020', '14/11/2020', '14/11/2020', '14/11/2020', '15/11/2020', '16/11/2020', '18/11/2020', '20/11/2020', '20/11/2020', '21/11/2020', '22/11/2020', '24/11/2020', '24/11/2020', '24/11/2020', '26/11/2020', '26/11/2020', '26/11/2020', '27/11/2020', '29/11/2020', '29/11/2020', '29/11/2020', '30/11/2020', '02/12/2020', '03/12/2020', '03/12/2020', '04/12/2020', '04/12/2020', '06/12/2020', '06/12/2020', '06/12/2020', '08/12/2020'];
var listActive = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1];


var tblTaiKhoan = document.getElementById('tblTaiKhoan1');
for (i = 1; i <= 100; i++) {
    let email = listMail[i];
    let pass = listPass[i];
    let date = listDate[i];
    let numActive = listActive[i];
    let active;
    let child;
    // Tạo thêm 1 hàng mới
    let node = document.createElement('tr');
    if (numActive == 1) {
        active = '<i class="fas fa-check-circle color-green" onclick="kichHoat(this);"';
    }
    else {
        active = '<i class="fas fa-check-circle" onclick="kichHoat(this);"';
        node.style.backgroundColor = 'rgba(255,0,0,0.3)';
        node.style.textDecoration = 'line-through'
    }
    child =
        '<tr>' +
        '<th scope="row">' + i + '</th>' +
        '<td>' + email + '</td>' +
        '<td>' + pass + '</td>' +
        '<td>' + date + '</td>' +
        '<td class="kichhoat">' + active + '</td>' +
        '</tr>';
    node.innerHTML = child;
    if (i == 26)
        tblTaiKhoan = document.getElementById('tblTaiKhoan2');
    else if (i == 51)
        tblTaiKhoan = document.getElementById('tblTaiKhoan3');
    else if (i == 76)
        tblTaiKhoan = document.getElementById('tblTaiKhoan4');
    tblTaiKhoan.appendChild(node);
}

//  Phân trang account
var tableAccount = document.getElementsByClassName('tableAccount');
//ẩn hết các page dưới khi load
for (i = 1; i < tableAccount.length; i++)
    tableAccount[i].style.display = 'none';

function hidePageAccount() {
    for (i = 0; i < tableAccount.length; i++)
        tableAccount[i].style.display = 'none';
}

var btn1 = document.getElementById('btn-page-account1');
var btn2 = document.getElementById('btn-page-account2');
var btn3 = document.getElementById('btn-page-account3');
var btn4 = document.getElementById('btn-page-account4');

function accountPage1() {
    hidePageAccount();
    btn1.classList.add('select-page');
    btn2.classList.remove('select-page');
    btn3.classList.remove('select-page');
    btn4.classList.remove('select-page');
    tableAccount[0].style.display = 'table';
}

function accountPage2() {
    hidePageAccount();
    btn1.classList.remove('select-page');
    btn2.classList.add('select-page');
    btn3.classList.remove('select-page');
    btn4.classList.remove('select-page');
    tableAccount[1].style.display = 'table';
}

function accountPage3() {
    hidePageAccount();
    btn1.classList.remove('select-page');
    btn2.classList.remove('select-page');
    btn3.classList.add('select-page');
    btn4.classList.remove('select-page');
    tableAccount[2].style.display = 'table';
}

function accountPage4() {
    hidePageAccount();
    btn1.classList.remove('select-page');
    btn2.classList.remove('select-page');
    btn3.classList.remove('select-page');
    btn4.classList.add('select-page');
    tableAccount[3].style.display = 'table';
}
