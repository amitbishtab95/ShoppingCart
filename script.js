let shop = document.getElementById('shop');


let basket = JSON.parse(localStorage.getItem('data')) || [];
let getShopData = () => {
    return (shop.innerHTML = shopItemData.map((item, index) => {
        let { id, name, price, img, description } = item;
        let searchLocal = basket.find((x) => x.id === id) || [];
        return (`<div id=product-id-${id} class="item">
            <img width="220" src=${img} alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${description}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash"></i>
                        <div id=${id} class="quantity">${searchLocal.item === undefined ? 0 : searchLocal.item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus"></i>
                    </div>
                </div>
            </div>
        </div>`)
    }).join(''))
}

getShopData();

let increment = (id) => {
    let search = basket.find((x) => x.id === id);
    if (search === undefined) {
        basket.push({
            id: id,
            item: 1
        });
    } else {
        search.item += 1;
    }
    localStorage.setItem('data', JSON.stringify(basket));
    update(id);
}
let decrement = (id) => {
    let search = basket.find((x) => x.id === id);
    if (search === undefined) return;
    if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    basket = basket.filter((x) => x.item !== 0)
    update(id);
    localStorage.setItem('data', JSON.stringify(basket));

}
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
}

let calculation = () => {
    let cartIcon = document.getElementById(cartAmountid);
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}
calculation();