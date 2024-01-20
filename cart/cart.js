let itemslist = document.querySelector(".items");
let getItems = JSON.parse(localStorage.getItem("cart")) || [];
let basket = JSON.parse(localStorage.getItem("basket")) || [];

// SHOWING ALL ITEM -------------
function rendor(elem) {
  return `
        <div class="cont">
         <h2>${elem.title.slice(0, 15)}...</h2>
          <img src="${elem.thumbnail}" alt="${elem.brand}">
         <div class="price rating">
            <h4>price: ${elem.price}</h4>
           <h4>Rating: ${elem.rating}⭐</h4>
         </div>
           <div class="desc">
              <p>${elem.description.slice(0, 80)}...</p>
           </div>
           <div class="btn-rating">
           <button class="remove" onClick="remove(${elem.id})" >Remove</button>
        </div>
     </div> `;
}

function showall() {
  getItems.forEach((x) => {
    const existingItem = basket.find((item) => item.id === x.id);

    if (!existingItem || existingItem.item < 1) {
      basket.push({ ...x, item: 1 });
      localStorage.setItem("basket", JSON.stringify(basket));
    }
    itemslist.innerHTML += rendor(x);
  });
  totalprice();
}
// showchecklist(); // updata the checklist items
showall();

//---------removing the items from cart(localstrage)-----------------

function remove(id) {

  getItems = getItems.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(getItems));
  // changing the basket items num..
  basket = basket.filter((item) => item.id !== id);
  localStorage.setItem("basket", JSON.stringify(basket));

  itemslist.innerHTML = "";
  // Clear the items list
  showall(); // Refresh the displayed items after removal
  showchecklist();
  totalprice(); // after removing the items from the cart we should be update the price of the check list also
}
//   -------- check list code --------------------

function checklist(elem) {
  return `
    <div class="item-list">
    <div class="imgdiv">
      <img src="${elem.thumbnail}" alt="${elem.brand}">
    </div>
    <div class="desc">
      <h2>${elem.title.slice(0, 15)} ...</h2>
      <p>${elem.description.slice(0, 50)}...</p>
    </div>
    <div class="increment">
       <div>
        <i onClick="up(${elem.id})" class="fa-solid fa-chevron-up" ></i>
       </div>
       
       <h3 class="itemq" id="${elem.id}" > ${elem.item || 0}</h3>
       <div>
        <i onClick="down(${elem.id})" class="fa-solid fa-chevron-down" ></i>
       </div>
    </div>
    <div class="pricediv">
      <div class="item-price">
           <h3>${elem.price}</h3>
      </div>
      <div class="tprice">
        
      </div>
    </div>
  </div>
    `;
    /// <h3 class="tp" id="tpi-${elem.id}">${elem.price}</h3>
}

//--------------showing the checklist items -----------
function showchecklist() {
  let checklistitems = document.querySelector(".checklist-items");
  if (basket.length <= 0) {
    let html1 = getItems.map((items) => checklist(items));
    checklistitems.innerHTML = html1.join("");
  } else {
    let html1 = basket.map((items) => checklist(items));
    checklistitems.innerHTML = html1.join("");
    console.log("basket item------")
  }
}
showchecklist();

//---runing the increment and decriment --------

function up(id) {
  let selecteditem = id;
  let search = basket.find((x) => x.id === selecteditem);
  let getItemsSearch = getItems.find((x) => x.id === selecteditem);
  if (search === undefined) {
    basket.push({
      ...getItemsSearch,
      id: selecteditem,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  localStorage.setItem("basket", JSON.stringify(basket));
  update(id);
}

function down(id) {
  let selecteditem = id;
  let search = basket.find((x) => x.id === selecteditem);
  if (search === undefined || search.item === 1) {
    localStorage.setItem("basket", JSON.stringify(basket));
    alert("Removing the items from the cart");
    remove(id); // call to remove items---
    return;
  } else {
    search.item -= 1;
  }
  update(id);
}
// update the quantitty of items ------
// we got id from the items whom quantity we want to decrise...
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerText = search.item || "";
  localStorage.setItem("basket", JSON.stringify(basket));
  // itemsump(id);
  totalprice();
};
// item total price ----------------------

// ----------------need to work on this ara -----------------////////////////
// let itemsump = (id) => {

//   let itemPrice  = JSON.parse(localStorage.getItem("itemPrice")) || [];

//   const item = getItems.find((x) => x.id === id);
//   const basketItem = basket.find((x) => x.id === id);
//   const totalPriceElement = document.getElementById(`tpi-${id}`);
//         const totalItemPrice = item.price * (basketItem.item || 0);
//         if(itemPrice){
//           totalPriceElement.innerHTML = itemPrice ;
//           console.log("items price "+itemPrice)
//         }
//         else{
//           totalPriceElement.innerHTML = totalItemPrice;
//           console.log("total price without localstorage"+totalPriceElement);
//           itemPrice.push({
//             ...itemPrice,
//             itemPrice:totalItemPrice,
//             id:id
//           })
//         }
//         localStorage.setItem("itemPrice", JSON.stringify(itemPrice));

// };

// let itemsump = (id) => {
//   let itemPrices = JSON.parse(localStorage.getItem("itemPrices")) || [];

//   const item = getItems.find((x) => x.id === id);
//   const basketItem = basket.find((x) => x.id === id);
//   const totalPriceElement = document.getElementById(`tpi-${id}`);

//   const totalItemPrice = item.price * (basketItem.item || 0);

//   if (itemPrices.some((price) => price.id === id)) {
//     // If item price is in localStorage, use it
//     const storedItemPrice = itemPrices.find((price) => price.id === id).itemPrice;
//     totalPriceElement.innerHTML = storedItemPrice;
//     console.log("Item price from localStorage: " + storedItemPrice);
//   } else {
//     // If not in localStorage, calculate and store the total item price
//     totalPriceElement.innerHTML = totalItemPrice;
//     console.log("Total price without localStorage: " + totalItemPrice);
    
//     itemPrices.push({
//       id: id,
//       itemPrice: totalItemPrice,
//     });

//     localStorage.setItem("itemPrices", JSON.stringify(itemPrices));
//   }
// };


// checkout price of items -------------------

function totalprice() {
  let basketdata = JSON.parse(localStorage.getItem("basket"));
  // console.log("basket 3-->"+basketdata)
  
  if (basketdata.length !== 0) {
    let amount = basketdata.map((x) => {
        let { item, id } = x;
        let search = getItems.find((y) => y.id === id);
        return item * search.price;
      })
      .reduce((x, y) => x + y);
    let tpr = document.querySelector("#tpr");
    tpr.innerHTML = amount - 5 + " $";
   // console.log(amount);
  } else {
    console.log("no items for checkout...");
    return;
  }
}
totalprice();

// check out btn funtion -----
function checkout() {
  //alert("please provide us your shiping address")

  window.location.href="../signuppage/index.html"
}

// let totalp =  basket.reduce((x,y)=>x+y.price,0);
