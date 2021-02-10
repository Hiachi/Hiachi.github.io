// question 5 ----------------------------------------------------
var clickAllProduct = document.querySelector('.click-all');
clickAllProduct.addEventListener('click', () => {
    document.querySelector('.container_rightbottom_row').innerHTML ='';
    Object.values(ps).map(x => {
        document.querySelector('.container_rightbottom_row').innerHTML += `
        <div class="product-card">
            <div class="product-card-img">
                <a href="product-details.html"><img src="${x.image}"></a>
            </div>
            <div class="product-card-name">
                <a href="product-details.html">${x.name}</a>
            </div>
            <div class="product-card-prices">
                <div class="card-price"><span>€</span><span>${x.price}</span></div>
                <div class="card-price0"><span>€</span><span>${x.subPrice}</span></div>
            </div>
            <div class="product-card-stock">
                <span>In Stock: ${x.stock}</span>
                <button class="t-addcart">Add to Cart</button>
            </div>
            <div class="product-card-selloff">
                <span class="product-card-selloff-per">${x.sellOff}%</span>
                <span class="product-card-selloff-off">off</span>
            </div>
        </div>    
        `
    });
    clickAddToCart()
})

var ps = [
    {
        id: 1,
        image: "img/sp01.png",
        inCart: 0,
        name: "Asus Strix G531GT HN553T i5 9300H/8GB/512G SSD",
        price: 949,
        subPrice: 1898,
        stock: 5,
        sellOff: 50
    },
    {
        id: 2,
        image: "img/sp02.png",
        inCart: 0,
        name: "Acer Swift 5 SF514 53T 720R/Core i7 8565U/NX.H7HSV.002",
        price: 919,
        subPrice: 1898,
        stock: 5,
        sellOff: 0
    },
    {
        id: 3,
        image: "img/sp03.png",
        inCart: 0,
        name: "MSI GF63 9SCSRi5 512GB SSD/Nvidia GTX1650Ti",
        price: 939,
        subPrice: 0,
        stock: 5,
        sellOff: 0
    },
    {
        id: 4,
        image: "img/sp04.png",
        inCart: 0,
        name: "MacBook Pro 16 2019 Touch Bar 2.3GHz Core i9 1TB",
        price: 2899,
        subPrice: 0,
        stock: 5,
        sellOff: 0
    },
    {
        id: 5,
        image: "img/sp12.png",
        inCart: 0,
        name: "MacBook Pro 13 2020 Touch Bar 2.0GHz Core i5 512GB",
        price: 1899,
        subPrice: 0,
        stock: 5,
        sellOff: 0
    },
    {
        id: 6,
        image: "img/sp06.png",
        inCart: 0,
        name: "ASUS Expertbook B9450FA BM0616R i7 1TB SSD",
        price: 1999,
        subPrice: 2665,
        stock: 5,
        sellOff: 25
    },
    {
        id: 7,
        image: "img/sp07.png",
        inCart: 0,
        name: "Dell XPS 15 9500 i7 10750H/16GB/512GB/GTX 1650 Ti 4GB",
        price: 2499,
        subPrice: 0,
        stock: 5,
        sellOff: 0
    },
    {
        id: 8,
        image: "img/sp10.png",
        inCart: 0,
        name: "Acer Nitro 5 AN515 54 779S i7 9750H/8GB/512GB",
        price: 1399,
        subPrice: 0,
        stock: 5,
        sellOff: 0
    },
    {
        id: 9,
        image: "img/sp09.png",
        inCart: 0,
        name: "Dell Vostro 5481/Core i5-8265U/V4I5227W",
        price: 769,
        subPrice: 0,
        stock: 5,
        sellOff: 0
    },
    {
        id: 10,
        image: "img/sp08.png",
        inCart: 0,
        name: "Dell Inspiron N7490 i5 512GB/NVIDIA MX250",
        price: 1021,
        subPrice: 0,
        stock: 5,
        sellOff: 0
    },
    {
        id: 11,
        image: "img/sp11.png",
        inCart: 0,
        name: "MacBook Air 13 2020 1.1GHz Core i5 512GB",
        price: 1459,
        subPrice: 0,
        stock: 5,
        sellOff: 0
    },
    {
        id: 12,
        image: "img/sp05.png",
        inCart: 0,
        name: "MacBook Pro 13 2019 Touch Bar 2.4GHz Core i5",
        price: 2099,
        subPrice: 0,
        stock: 5,
        sellOff: 0
    },
]