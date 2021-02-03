// product: p , cart, item in local storage

// Data product --------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
var ps = [];                                                                                // ARRAY OF OBJECT: ps[i]
var arr = document.querySelectorAll('.product-card');
for (let i=0; i<arr.length; i++) {
    let p = {
        id : i+1,
        name : arr[i].querySelector('.product-card-name').innerText,
        image : arr[i].querySelector('.product-card-img img').getAttribute('src'),
        price : parseInt(arr[i].querySelector('.card-price span:nth-child(2)').innerText),
        inCart : 0,
    }
    ps.push(p);
}

// Query from pages cart
let nameS = document.querySelectorAll(".t-name b");

let bell = document.querySelector('.header_navbar_icon_cart span');
let totalNum = document.querySelector('.t-total span');

let quantityS = document.querySelectorAll('.t-minusplus span');
let subtotalS = document.querySelectorAll(".t-col5 span");
let totalPrice = document.querySelector('.t-grandprice span');

// Query from local storage 
let item_totalNum = localStorage.getItem('item_totalNum'); item_totalNum = parseInt(item_totalNum);
let item_cartS = localStorage.getItem('item_cartS'); item_cartS = JSON.parse(item_cartS);   // ALWAYS: A STRING    // OBJECT OF OBJECT
    // ALWAYS: A STRING                                 // OBJECT OF OBJECT

let item_totalPrice = localStorage.getItem('item_totalPrice'); item_totalPrice = parseInt(item_totalPrice);                                           

// Click on homepage ---------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
let carts = document.querySelectorAll('.t-addcart');
for (let i=0; i<carts.length; i++) {
    carts[i].addEventListener('click', () =>{
        cart_totalNum();
        cart_Products(ps[i]);
        cart_totalPrice(ps[i]);
    })
}

// 111 - cart_totalNum
function cart_totalNum() {
    let item_totalNum = localStorage.getItem('item_totalNum');                              // LƯU Ý: PHẢI CÓ , DO KO THỂ PARSEINT(RỖNG)
    if (item_totalNum) {
        item_totalNum = parseInt(item_totalNum);
        localStorage.setItem('item_totalNum',item_totalNum + 1);                            // tưởng tượng có 2 cột
        bell.innerText = item_totalNum + 1;
    } else {
        localStorage.setItem('item_totalNum',1);
        bell.innerText = 1;
    }
}

function  onLoad() {                                                                        // LƯU Ý: F5, bell cart vẫn lưu số mới
    if (item_totalNum) {
        bell.innerText = item_totalNum;
    }
}
onLoad();

// 222 - cart_Products
function cart_Products(p) {
    if (item_cartS != null) {
        if (item_cartS[p.id] == undefined) {                                                // OBJECT OF OBJECT: item_cartS[i]
            item_cartS = {
                ...item_cartS,                                                              // !!!
                [p.id]: p
            }
        }
        item_cartS[p.id].inCart += 1; 
    } else {
        p.inCart = 1;
        item_cartS = {[p.id]: p};
    }
    localStorage.setItem('item_cartS', JSON.stringify(item_cartS));
}

// 333 - cart_totalPrice
function cart_totalPrice(p) {
    let item_totalPrice = localStorage.getItem('item_totalPrice')                           // LƯU Ý: PHẢI CÓ , DO KO THỂ PARSEINT(RỖNG)
    if (item_totalPrice != null) {
        item_totalPrice = parseInt(item_totalPrice);
        localStorage.setItem('item_totalPrice', item_totalPrice + p.price);
    } else {
        localStorage.setItem('item_totalPrice', p.price);
    }
}

// 444 - displayCarts
function displayCarts() {
    let container = document.querySelector('.t-items');
    if (item_cartS && container) {                                                              // ???
        container.innerHTML ='';
        Object.values(item_cartS).map(x => {
            container.innerHTML += `
            <div class="t-item">
                <div class="t-col1">
                    <img src= ${x.image}>
                </div>
                <div class="t-col2">
                    <div class="t-name"><a href="product-details.html"><b>${x.name}</b></a></div>
                    <div class="t-gray">Delete</div>
                </div>
                <div class="t-col3">
                    <div class="t-gray">Price</div>
                    <div class="t-red">&euro;<span>${x.price}</span></div>
                </div>
                <div class="t-col4">
                    <div class="t-gray">Quantity</div>
                    <div class="t-minusplus">
                        <i class="fas fa-minus"></i>
                        <span>${x.inCart}</span>
                        <i class="fas fa-plus"></i>
                    </div>
                </div>
                <div class="t-col5">
                    <div class="t-gray">Subtotal</div>
                    <div>&euro;<span>${x.price * x.inCart}</span></div>
                </div>
            </div>
            `
        bell.innerText = item_totalNum;
        totalNum.innerText = item_totalNum;

        totalPrice.innerText = item_totalPrice;
        })
    }
}
displayCarts();

// Click ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// Query from pages cart                                                                    // LƯU Ý: PHẢI UPDATE, do lúc đặt biến có rỗng trong đó
nameS = document.querySelectorAll(".t-name b");

    // bell = document.querySelector('.header_navbar_icon_cart span');
    // totalNum = document.querySelector('.t-total span');

quantityS = document.querySelectorAll('.t-minusplus span');
subtotalS = document.querySelectorAll(".t-col5 span");
    // totalPrice = document.querySelector('.t-grandprice span');

// UP-------------------------------------------------------------------------------------
let upS = document.querySelectorAll('.fa-plus');
for (let i=0; i<upS.length; i++) {
    upS[i].addEventListener('click', () =>{
        upDetail(i);
    })
}

function upDetail(i) {
    item_totalNum += 1;
    localStorage.setItem('item_totalNum', item_totalNum);
    bell.innerText = item_totalNum;
    totalNum.innerText = item_totalNum;

    pName = nameS[i].innerText;
    
    let key = Object.keys(item_cartS);                                                      // ko để chung chỗ dc ??? Query from local storage 
    for (j in key) {
        let itemId = parseInt(key[j]);
        let itemName = item_cartS[itemId].name;
        if (itemName == pName) {
            item_cartS[itemId].inCart += 1;
            localStorage.setItem('item_cartS', JSON.stringify(item_cartS));
            quantityS[i].innerText = item_cartS[itemId].inCart;
            subtotalS[i].innerText = item_cartS[itemId].inCart * item_cartS[itemId].price;

            item_totalPrice += item_cartS[itemId].price;
            localStorage.setItem('item_totalPrice', item_totalPrice);
            totalPrice.innerText = item_totalPrice;
        }
    }
}

// Down-----------------------------------------------------------------------------------
let downS = document.querySelectorAll('.fa-minus');
for (let i=0; i<downS.length; i++) {
    downS[i].addEventListener('click', () =>{
        downDetail(i);
    })
}

function downDetail(i) {
    pName = nameS[i].innerText;                                                             // sao ko để let vẫn dc ???
    let key = Object.keys(item_cartS);                                                      // sao bik dùng delete hay vại ???
    for (j in key) {
        let itemId = parseInt(key[j]);
        let itemName = item_cartS[itemId].name;
        if (itemName == pName) {
            if (item_cartS[itemId].inCart > 0) {
                item_totalNum -= 1;
                localStorage.setItem('item_totalNum', item_totalNum);
                bell.innerText = item_totalNum;
                totalNum.innerText = item_totalNum;

                item_cartS[itemId].inCart -= 1;
                localStorage.setItem('item_cartS', JSON.stringify(item_cartS));
                quantityS[i].innerText = item_cartS[itemId].inCart;
                subtotalS[i].innerText = item_cartS[itemId].inCart * item_cartS[itemId].price;
    
                item_totalPrice -= item_cartS[itemId].price;
                localStorage.setItem('item_totalPrice', JSON.stringify(item_totalPrice));
                totalPrice.innerText = item_totalPrice;
            }
        }
    }
}

// Delete-------------------------------------------------------------------------------
let arrDel = document.querySelectorAll('.t-col2 .t-gray');                               // ko nên có thẻ a khi bấm del :((
for (let i=0; i<arrDel.length; i++) {
    arrDel[i].addEventListener('click', () =>{
        delDetail(i);
    })
}

function delDetail(i) {
    pName = nameS[i].innerText;
    let key = Object.keys(item_cartS);
    for (j in key) {
        let itemId = parseInt(key[j]);
        let itemName = item_cartS[itemId].name;
        if (itemName == pName) {
            item_totalNum = item_totalNum - item_cartS[itemId].inCart;
            localStorage.setItem('item_totalNum', item_totalNum);
            bell.innerText = item_totalNum;
            totalNum.innerText = item_totalNum;

            item_totalPrice = item_totalPrice - item_cartS[itemId].inCart * item_cartS[itemId].price;
            localStorage.setItem('item_totalPrice', item_totalPrice);
            totalPrice.innerText = item_totalPrice;

            delete item_cartS[key[j]];
            localStorage.setItem('item_cartS', JSON.stringify(item_cartS));

            location.reload();
        }
    }
}