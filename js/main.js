// Xử lý thực đơn trên navbar
function pizza() {
    document.getElementById('combo').style.display = 'none';
    document.getElementById('pizza').style.display = 'block';
    document.getElementById('myy').style.display = 'none';
    document.getElementById('salad').style.display = 'none';
    document.getElementById('giaikhat').style.display = 'none';
    document.getElementById('search-content').style.display = 'none';
    let elmnt = document.getElementById("pizza");
    elmnt.scrollIntoView(true);
}
function myy() {
    document.getElementById('combo').style.display = 'none';
    document.getElementById('pizza').style.display = 'none';
    document.getElementById('myy').style.display = 'block';
    document.getElementById('salad').style.display = 'none';
    document.getElementById('search-content').style.display = 'none';
    document.getElementById('giaikhat').style.display = 'none';
    let elmnt = document.getElementById("myy");
    elmnt.scrollIntoView(true);
} function salad() {
    document.getElementById('combo').style.display = 'none';
    document.getElementById('pizza').style.display = 'none';
    document.getElementById('myy').style.display = 'none';
    document.getElementById('salad').style.display = 'block';
    document.getElementById('search-content').style.display = 'none';
    document.getElementById('giaikhat').style.display = 'none';
    let elmnt = document.getElementById("salad");
    elmnt.scrollIntoView(true);
} function giaikhat() {
    document.getElementById('combo').style.display = 'none';
    document.getElementById('pizza').style.display = 'none';
    document.getElementById('myy').style.display = 'none';
    document.getElementById('salad').style.display = 'none';
    document.getElementById('search-content').style.display = 'none';
    document.getElementById('giaikhat').style.display = 'block';
    let elmnt = document.getElementById("giaikhat");
    elmnt.scrollIntoView(true);
}
//Xu ly khi an Enter tim kiem
const node = document.getElementsByClassName("navbar-search-input")[0];

node.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        timKiem();
    }
});

//Xu ly nhan icon tim kiem
function timKiem() {
    let search_value = node.value;
    if (search_value.length > 0) {
        document.getElementById('combo').style.display = 'none';
        document.getElementById('pizza').style.display = 'none';
        document.getElementById('myy').style.display = 'none';
        document.getElementById('salad').style.display = 'none';
        document.getElementById('giaikhat').style.display = 'none';
        document.getElementById('carouselExampleIndicators').style.display = 'none';
        document.getElementById('search-content').style.display = 'block';
        timKiemNangCao();
    }
    else {
        alert('Vui lòng nhập từ khoá để tìm kiếm!');
    }
}

function timKiemNangCao() {
    let InnerSearch = document.getElementById('result-search1');
    document.getElementsByClassName('row product-list')[0].innerHTML = "";
    document.getElementsByClassName('row product-list')[1].innerHTML = "";
    let product_sort = product_arr;
    let search_value = node.value;
    node.value = "";
    let loai = document.getElementById('select-food').value;
    let minPrice = document.getElementById('filter-min-price').value;
    let maxPrice = document.getElementById('filter-max-price').value;
    let sort = document.getElementById('select-sort').value;
    if (minPrice == '') minPrice = 0;
    minPrice /= 1000;
    if (maxPrice == '') maxPrice = 999999;
    maxPrice /= 1000;
    console.log(minPrice + "  " + maxPrice);
    dem = 0;

    // Sắp xếp sản phẩm
    // Tăng dần
    if (sort == 'LowToHeight')
        for (i = 0; i < product_sort.length - 1; i++) {
            for (j = i; j < product_sort.length; j++)
                if (product_sort[i].giamoi * 1 > product_sort[j].giamoi * 1) {
                    let temp = product_sort[i];
                    product_sort[i] = product_sort[j];
                    product_sort[j] = temp
                }
        }
    // Giảm dần
    else
        for (i = 0; i < product_sort.length - 1; i++) {
            for (j = i; j < product_sort.length; j++)
                if (product_sort[i].giamoi * 1 < product_sort[j].giamoi * 1) {
                    let temp = product_sort[i];
                    product_sort[i] = product_sort[j];
                    product_sort[j] = temp
                }
        }

    for (i = 0; i < product_sort.length; i++) {
        let aLoai = product_sort[i].loai;
        let aGia = product_sort[i].giamoi;
        let aTen = product_sort[i].ten;

        if ((aLoai != loai && loai != 'all') || aGia < minPrice || aGia > maxPrice ||
            !aTen.toLocaleLowerCase().includes(search_value.toLocaleLowerCase()))
            continue;

        dem++;
        // Đưa sản phẩm vào giao diện
        let node = document.createElement('div');
        node.className = 'col-md-6 col-lg-3 col-12 search-product';

        let name = '\'' + aTen + '\'';
        let descrip = '\'' + product_sort[i].mota + '\'';
        let newp = aGia;
        let image = '\'' + product_sort[i].img.slice(6) + '\'';

        node.innerHTML =
            '<div class="card">' +
            '<div class="inner-img">' +
            '<img class="card-img-top" src="' + product_sort[i].img + '">' +
            '</div>' +
            '<div class="card-body">' +
            '<h5 class="card-title">' + product_sort[i].ten + '</h5>' +
            '<p class="card-text">' + product_sort[i].mota + '</p>' +
            '<div class="cart-price">' +
            '<span class="card-old-price">' + product_sort[i].giacu + '</span>' +
            '<span class="card-current-price">' + product_sort[i].giamoi + '</span>' +
            '<button type="button" data-toggle="modal" data-target="#chiTiet"' +
            'onclick="chiTiet(' + name + ',' + descrip + ',' + newp + ',' + image + ');"' +
            'class="btn btn-success btn-add-to-cart">Thêm vào giỏ hàng</button>' +
            ' </div>' +
            '</div>' +
            '</div>';
        if (dem == 13)
            InnerSearch = document.getElementById('result-search2');
        InnerSearch.appendChild(node);
    }
    document.getElementById('number-of-result').innerHTML = dem;
    if (dem == 0) {
        document.getElementsByClassName('search-break-page')[0].style.display = 'none';
        document.getElementsByClassName('search-break-page')[1].style.display = 'none';
        let node = document.createElement('div');
        node.id = 'no-result';
        node.innerHTML = '<img src="./img/not-found-product.png" alt="Không tìm thấy sản phẩm"><h5>Không tìm thấy. Vui lòng thử lại với từ khoá chung hơn.</h5>'
        InnerSearch.appendChild(node);
    }
    // Ẩn phân trang nếu chưa qua trang mới
    if (dem < 13) {
        document.getElementsByClassName('search-break-page')[0].style.display = 'none';
        document.getElementsByClassName('search-break-page')[1].style.display = 'none';
    }
    else {
        document.getElementsByClassName('search-break-page')[0].style.display = 'block';
        document.getElementsByClassName('search-break-page')[1].style.display = 'block';
    }
}

//Xu lu dang nhap
function dangNhap() {
    let email = document.getElementById('LogIn-email').value;
    let password = document.getElementById('LogIn-pass').value;
    if (email.length == 0 || password.length < 8) {
        if (email.length == 0) {
            document.getElementById('errorEmail').style.display = 'block';
            document.getElementById('LogIn-email').style.border = '1px solid red';
        }
        else {
            document.getElementById('errorEmail').style.display = 'none';
            document.getElementById('LogIn-email').style.border = '1px solid #ccc';
        }
        if (password.length < 8) {
            document.getElementById('errorPass').style.display = 'block';
            document.getElementById('LogIn-pass').style.border = '1px solid red';
        }
        if (password.length >= 8) {
            document.getElementById('errorPass').style.display = 'none';
            document.getElementById('LogIn-pass').style.border = '1px solid #ccc';
        }
    }
    else {
        alert("Đăng nhập thành công!");
        location.href = './user-index.html';
    }
}

//Xu ly dang ky
function dangKy() {
    let name = document.getElementById('RegisterForm-name').value;
    let address = document.getElementById('RegisterForm-address').value;
    let email = document.getElementById('RegisterForm-email').value;
    let password = document.getElementById('RegisterForm-pass').value;

    if (name.length == 0 || address.length == 0 || email.length == 0 || password.length < 8) {
        if (name.length == 0) {
            document.getElementById('errorName').style.display = 'block';
            document.getElementById('RegisterForm-name').style.border = '1px solid red';
        }
        if (name.length != 0) {
            document.getElementById('errorName').style.display = 'none';
            document.getElementById('RegisterForm-name').style.border = '1px solid #ccc';
        }
        if (address.length == 0) {
            document.getElementById('errorAddress').style.display = 'block';
            document.getElementById('RegisterForm-address').style.border = '1px solid red';
        }
        if (address.length != 0) {
            document.getElementById('errorAddress').style.display = 'none';
            document.getElementById('RegisterForm-address').style.border = '1px solid #ccc';
        }
        if (email.length == 0) {
            document.getElementById('errorEmailRegister').style.display = 'block';
            document.getElementById('RegisterForm-email').style.border = '1px solid red';
        }
        if (email.length != 0) {
            document.getElementById('errorEmailRegister').style.display = 'none';
            document.getElementById('RegisterForm-email').style.border = '1px solid #ccc';
        }
        if (password.length < 8) {
            document.getElementById('errorPassRegister').style.display = 'block';
            document.getElementById('RegisterForm-pass').style.border = '1px solid red';
        }
        if (password.length >= 8) {
            document.getElementById('errorPassRegister').style.display = 'none';
            document.getElementById('RegisterForm-pass').style.border = '1px solid #ccc';
        }
    }
    else {
        alert("Đăng ký thành công! Tự động đăng nhập...");
        location.href = './user-index.html';
    }
}

// xóa product cart
function xoaSP(e) {
    if (confirm('Bạn có chắc chắn muốn xoá?')) {
        let product_delete = e.parentElement.parentElement;
        product_delete.classList.toggle('hidden');
        setTimeout(function () {
            product_delete.remove();
        }, 500);
    }
    console.log(document.getElementById('modal-body-cart').childElementCount)
    if (document.getElementsByClassName('product-row').length == 2) {
        document.getElementById('no-product').style.display = 'block';
        document.getElementById('btn-success').style.display = 'none';
        document.getElementById('cart-total').style.display = 'none';
    }
}


// Mua hàng
function muaHangChuaLogin() {
    alert("Vui lòng đăng nhập trước khi mua hàng! Xin cảm ơn");
}

function datHang() {
    if (kiemTraSDT() == true && kiemTraDiaChi() == true) {
        location.href = './thanhToan.html';
    }
}

function kiemTraSDT() {
    let phone = document.getElementById('Order-phone').value;
    if (phone.length != 10 || phone[0] != 0) {
        document.getElementById('errorPhone').style.display = 'block';
        document.getElementById('Order-phone').style.border = '1px solid red';
        return false;
    }
    else {
        document.getElementById('errorPhone').style.display = 'none';
        document.getElementById('Order-phone').style.border = '1px solid #ccc';
        return true;
    }
}

function kiemTraDiaChi() {
    //Nếu chọn địa chỉ mới
    if (document.getElementById('newAddress').checked) {
        let address = document.getElementById('Order-Address').value;
        if (address.length == 0) {
            document.getElementById('errorAddress').style.display = 'block';
            document.getElementById('Order-Address').style.border = '1px solid red';
            return false;
        }
        else {
            document.getElementById('errorAddress').style.display = 'none';
            document.getElementById('Order-Address').style.border = '1px solid #ccc';
            return true;
        }
    }
    else {
        document.getElementById('errorAddress').style.display = 'none';
        document.getElementById('Order-Address').style.border = '1px solid #ccc';
        return true;
    }
}

// Mua bằng thẻ ngân hàng
function xuLyThe() {
    if (kiemTraPhuongThuc()) {
        alert('Đặt hàng thành công!');
        location.href = './user-index.html';
    }
}
function kiemTraPhuongThuc() {
    let e = document.getElementById('how-to-pay');
    let value = e.options[e.selectedIndex].value;
    let text = e.options[e.selectedIndex].text;
    if (text == 'Thanh toán khi nhận hàng') return true;
    else {
        let num = document.getElementById('Order-numberCard').value;
        if (num.length == 0) {
            document.getElementById('errorCard').style.display = 'block';
            document.getElementById('Order-numberCard').style.border = '1px solid red';
            return false;
        }
        else {
            document.getElementById('errorCard').style.display = 'none';
            document.getElementById('Order-numberCard').style.border = '1px solid #ccc';
            return true;
        }
    }
}
// Nhảy trang Pizza
var page1 = document.getElementById('pizza-page-1');
var page2 = document.getElementById('pizza-page-2');

function pizza1() {
    page1.style.display = 'flex';
    page2.style.display = 'none';
    let btn1 = document.getElementById('btn-page1');
    let btn2 = document.getElementById('btn-page2');
    console.log(btn1);
    console.log(btn2);
    btn1.className = 'btn btn-page select-page';
    btn2.className = 'btn btn-page';
}

function pizza2() {
    page1.style.display = 'none';
    page2.style.display = 'flex';
    let btn1 = document.getElementById('btn-page1');
    let btn2 = document.getElementById('btn-page2');
    console.log(btn1);
    console.log(btn2);
    btn1.className = 'btn btn-page';
    btn2.className = 'btn btn-page select-page';
}

// Nhảy trang tìm kiếm
var searchPage1 = document.getElementById('result-search1');
var searchPage2 = document.getElementById('result-search2');
function search1() {
    searchPage1.style.display = 'flex';
    searchPage2.style.display = 'none';
    let btn1 = document.getElementById('btn-search-page1');
    let btn1_1 = document.getElementById('btn-search-page1-1');
    let btn2 = document.getElementById('btn-search-page2');
    let btn2_1 = document.getElementById('btn-search-page2-1');
    console.log(btn1);
    console.log(btn2);
    btn1.className = 'btn btn-page select-page';
    btn1_1.className = 'btn btn-page select-page';
    btn2.className = 'btn btn-page';
    btn2_1.className = 'btn btn-page';
    document.documentElement.scrollTop = 0;
}
function search2() {
    searchPage1.style.display = 'none';
    searchPage2.style.display = 'flex';
    let btn1 = document.getElementById('btn-search-page1');
    let btn1_1 = document.getElementById('btn-search-page1-1');
    let btn2 = document.getElementById('btn-search-page2');
    let btn2_1 = document.getElementById('btn-search-page2-1');
    console.log(btn1);
    console.log(btn2);
    btn1.className = 'btn btn-page';
    btn1_1.className = 'btn btn-page';
    btn2.className = 'btn btn-page select-page';
    btn2_1.className = 'btn btn-page select-page';
    document.documentElement.scrollTop = 0;
}

// tinh tien modal
var input_quantity = document.getElementById('quantity-detail');
var Gia;

// Chi tiet modal
function chiTiet(Ten, MoTa, Gia, Anh) {
    let title = document.getElementById('detail-title');
    let description = document.getElementById('detail-description');
    let price = document.getElementById('price-total');
    let img = document.getElementById('detail-img');
    title.innerHTML = Ten;
    description.innerHTML = MoTa;
    price.innerHTML = Gia + '.000đ';
    img.src = './img/' + Anh;
    this.Gia = Gia;
    document.getElementById('quantity').value = 1;
}

// THEM SP VAO GIO HANG
function themVaoGio() {
    let total_price = parseInt(document.getElementById('number-total').innerText);
    // Lấy thông tin từ modal
    let srcImg = document.getElementById('detail-img').src
    let title = document.getElementById('detail-title').innerText;
    let description = document.getElementById('detail-description').innerText;
    let quantity = document.getElementById('quantity').value;
    let size = document.getElementById('sizePizza').value;
    let total = document.getElementById('price-total').innerText;

    // Đưa thông tin vào giỏ hàng
    let cart = document.getElementById('modal-body-cart'); //modal giỏ hàng
    let node = document.createElement('div');
    node.className = 'row product-row';
    node.innerHTML =
        '<div class="col-2">' +
        '<img src="' + srcImg + '" alt="hinh anh" class="cart-product-img">' +
        '</div>' +
        '<div class="col-5">' +
        '<span class="cart-product-name">' + title + '</span> <br>' +
        '<span class="cart-product-size-quantity">' +
        'Size: ' + size + '. Số lượng: ' + quantity +
        '</span>' +
        '</div>' +
        '<div class="col-3">' +
        '<span class="cart-product-price">' + total + '</span>' +
        '</div>' +
        '<div class="col-2">' +
        '<button class="btn btn-danger" type="button" onclick="xoaSP(this);">Xóa</button>' +
        '</div>'
    cart.appendChild(node);

    document.getElementById('no-product').style.display = 'none';
    document.getElementById('btn-success').style.display = 'block';
    document.getElementById('cart-total').style.display = 'flex';
    // Tính tiền
    document.getElementById('number-total').innerText = (total_price * 1000 + parseInt(total) * 1000).toLocaleString() + 'đ';

    alert('Thêm thành công!');
}
// if (document.getElementsByClassName('product-row').length == 0)
//     document.getElementById('no-product').style.display = 'block';

function tinhTien() {
    let size = document.getElementById('sizePizza').value;
    let price = document.getElementById('price-total');
    if (size == 'L') {
        price.innerHTML = (1000 * quantityInput.value * Gia + 10000).toLocaleString() + 'đ';
    }
    else if (size == 'XL') {
        price.innerHTML = (1000 * quantityInput.value * Gia + 20000).toLocaleString() + 'đ';
    }
    else {
        price.innerHTML = (1000 * quantityInput.value * Gia).toLocaleString() + 'đ';
    }
}
var quantityInput = document.getElementById('quantity');
quantityInput.addEventListener("change", function (e) {
    tinhTien();
}, false);