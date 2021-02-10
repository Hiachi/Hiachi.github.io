// p: product , c: cart, i: item in local storage

// NOTE: ko let, var thì bell lại có thể dùng ở global !!!
function queryCartpage() {
    bell = document.querySelector('.header_navbar_icon_cart span');
    totalNum = document.querySelector('.t-total span');
    totalPrice = document.querySelector('.t-grandprice span');

    nameS = document.querySelectorAll(".t-name b");
    quantityS = document.querySelectorAll('.t-minusplus span');
    subtotalS = document.querySelectorAll(".t-col5 span");
    
}
queryCartpage()

function queryLocalStorage() {
    // NOTE: ItemTotalNum. Code convention gg. Ko viết hoa S cuối (dùng List or Arr)
    // NOTE: Do lúc đầu các query này là STRING rỗng >> parseINT ra false or JSON.parse ra false    
    item_totalNum = localStorage.getItem('item_totalNum');
    item_totalNum = parseInt(item_totalNum);
    
    item_cartS = localStorage.getItem('item_cartS');  // NOTE: A STRING
    item_cartS = JSON.parse(item_cartS);  // NOTE: OBJECT OF OBJECT
    
    item_totalPrice = localStorage.getItem('item_totalPrice');
    item_totalPrice = parseInt(item_totalPrice); 
}
queryLocalStorage()

// question 1,2,4 ------------------------------------------------
function clickAddToCart() {
    var queryAddToCarts = document.querySelectorAll('.t-addcart');
    for (let i = 0; i < queryAddToCarts.length; i++) {
        queryAddToCarts[i].addEventListener('click', () => {
            cartTotalNum();
            cartProducts(ps[i]);
            cartTotalPrice(ps[i]);
        })
    }
}
clickAddToCart()

function cartTotalNum() {
    if (item_totalNum) {
        item_totalNum = item_totalNum + 1;  // ??? cách 1: chọc từ dữ liệu expresion này
        localStorage.setItem('item_totalNum', item_totalNum);  // NOTE: tưởng tượng có 2 cột
        bell.innerText = item_totalNum;
    } else {
        item_totalNum = 1;
        localStorage.setItem('item_totalNum', item_totalNum);
        bell.innerText = 1;
    }
}

// Khi F5, bell cart vẫn lưu số mới (NOTE:)
function  onLoad() {
    if (item_totalNum) {
        bell.innerText = item_totalNum;
    }
}
onLoad();

function cartProducts(p) {
    if (item_cartS) {
        // NOTE: OBJECT OF OBJECT: item_cartS[i]
        if (item_cartS[p.id] == undefined) {                                                
            item_cartS = {
                ...item_cartS,  // !!!
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

function cartTotalPrice(p) {  // ??? cách 2: chọc từ local storage
    item_totalPrice = localStorage.getItem('item_totalPrice');
    item_totalPrice = parseInt(item_totalPrice);
    if (item_totalPrice) {
        localStorage.setItem('item_totalPrice', item_totalPrice + p.price);
    } else {
        localStorage.setItem('item_totalPrice', p.price);
    }
}

function displayCarts() {
    let container = document.querySelector('.t-items');
    // NOTE: container dùng để check lỗi hậu kỳ, do: nếu ko query dc, sẽ ko báo lỗi đâu
    if (item_cartS && container) {
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
        })
        bell.innerText = item_totalNum;
        totalNum.innerText = item_totalNum;

        totalPrice.innerText = item_totalPrice;
    }
}
displayCarts();

// question 3 ----------------------------------------------------
// UPS
queryCartpage()
let upS = document.querySelectorAll('.fa-plus');
for (let i = 0; i < upS.length; i++) {
    upS[i].addEventListener('click', () => {
        upDetail(i);
    })
}

function upDetail(i) {
    localStorage.setItem('item_totalNum', item_totalNum += 1);
    bell.innerText = item_totalNum;
    totalNum.innerText = item_totalNum;
    
    pName = nameS[i].innerText;
    let key = Object.keys(item_cartS); // NOTE: trả về 1 array CURRENT
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

// DOWNS
let downS = document.querySelectorAll('.fa-minus');
for (let i = 0; i < downS.length; i++) {
    downS[i].addEventListener('click', () => {
        downDetail(i);
    })
}

function downDetail(i) {
    pName = nameS[i].innerText;
    let key = Object.keys(item_cartS);                                    
    for (j in key) {
        let itemId = parseInt(key[j]);
        let itemName = item_cartS[itemId].name;
        if (itemName == pName) {
            if (item_cartS[itemId].inCart > 0) {
                localStorage.setItem('item_totalNum', item_totalNum -= 1);
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

// DELETE
let arrDel = document.querySelectorAll('.t-col2 .t-gray');  // NOTE: ko nên có thẻ a khi bấm del :((
for (let i=0; i<arrDel.length; i++) {
    arrDel[i].addEventListener('click', () => {
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

            delete item_cartS[key[j]];  // sao bik dùng delete hay vại ???
            localStorage.setItem('item_cartS', JSON.stringify(item_cartS));

            location.reload();
        }
    }
}