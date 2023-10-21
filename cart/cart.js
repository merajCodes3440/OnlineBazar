let itemslist = document.querySelector(".items");
let getItems = JSON.parse(localStorage.getItem("cart")) || [];

// SHOWING ALL ITEM -------------
// <h4>Stock: ${elem.stock}</h4>
function rendor(elem){
       return `
        <div class="cont">
         <h2>${elem.title}</h2>
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
     </div> `
     
   }
  //  <p>${elem.description ? elem.description.slice(0,80) : ''}...</p>
     function showall(){
         getItems.forEach((x)=>{
         itemslist.innerHTML += rendor(x);
        showchecklist(); // updata the checklist items
   })
}
showall();
console.log(getItems)


let basket = JSON.parse(localStorage.getItem("basket")) || [];
basket.map((x)=>{

  console.log("basket ++"+x.id+ " "+ x.item)
})


//---------removing the items from cart(localstrage)-----------------
//let basket =[];


function remove(id) {
   console.log("remove " + id);
   getItems = getItems.filter((item) => item.id !== id);
   localStorage.setItem("cart", JSON.stringify(getItems));
   // changing the basket items num..
  
  //  basket = basket.filter((item)=>item.id !==id);
  //  localStorage.setItem("cart", JSON.stringify(basket));

   itemslist.innerHTML = ""; // Clear the items list
   showall(); // Refresh the displayed items after removal
   //totalprice(); //  update total price function --
}
 //   -------- check list code --------------------

function checklist(elem){
    return `
    <div class="item-list">
    <div class="imgdiv">
      <img src="${elem.thumbnail}" alt="${elem.brand}">
    </div>
    <div class="desc">
      <h2>${elem.title}</h2>
      <p>${elem.description.slice(0, 50)}...</p>
    </div>
    <div class="increment">
       <div>
        <i onClick="up(${elem.id})" class="fa-solid fa-chevron-up" ></i>
       </div>
       <h3 class="itemq" id="${elem.id}" > ${1}</h3>
       <div>
        <i onClick="down(${elem.id})" class="fa-solid fa-chevron-down" ></i>
       </div>
    </div>
    <div class="pricediv">
      <div class="item-price">
           <h3>${elem.price}</h3>
      </div>
      <div class="tprice">
        <h3 class="tp" id="tpi-${elem.id}">${elem.price}</h3>
      </div>
    </div>

  </div>
    `
};

//--------------showing the checklist items ----
function showchecklist(){

  let html1= getItems.map((items)=> checklist(items) )
  let checklistitems = document.querySelector(".checklist-items");
  checklistitems.innerHTML =html1.join("");
  
}
showchecklist();

//---runing the increment and decriment --------

function up(id){
    let selecteditem = id;
   let search = basket.find((x)=>x.id===selecteditem);
   
   if(search===undefined){
    basket.push({
      id:selecteditem,
      item:1,
    })
   }
   else{
      search.item+=1;
   }
   localStorage.setItem("basket", JSON.stringify(basket));
   console.log(basket)
   update(id);

}
  function down(id){
   let selecteditem = id;
   let search = basket.find((x)=>x.id===selecteditem)
   if(search===undefined || search.item===0){
    localStorage.setItem("basket", JSON.stringify(basket));
      return;
   }
   else{
      search.item-=1;
    }
    basket = basket.filter((x)=>x.item>0)
    localStorage.setItem("basket", JSON.stringify(basket));
    //console.log(removeitem);
    update(id);
  }
  // update the quantitty of items ------
  // we got id from the items whom quantity we want to decrise...
  let update =(id)=>{
    let search =basket.find((x)=>x.id===id);
    document.getElementById(id).innerText = search.item || "";
    localStorage.setItem("basket", JSON.stringify(basket));
    itemsump(id);   
  }
// item total price ----------------------
let itemsump =(id)=>{
  //console.log("price update"+ id)
   const item = getItems.find((x) => x.id === id);
   const basketItem = basket.find((x) => x.id === id);
   const totalItemPrice = item.price * basketItem.item;

   const totalPriceElement = document.getElementById(`tpi-${id}`);
   totalPriceElement.innerHTML =totalItemPrice;
  }
// checkout price of items -------------------


function totalprice(){
  let basketdata =  JSON.parse(localStorage.getItem("basket"));
  console.log("basket data"+ basketdata);

    if(basketdata.length!==0){
      let amount  = basketdata.map((x)=>{
        let {item,id} =x;
        let search =getItems.find((y)=>y.id===id);
        return item* search.price;
      }).reduce((x,y)=>x+y);
      let tpr = document.querySelector("#tpr");
      tpr.innerHTML =(amount-5)+" $";
      console.log(amount);
    } 
    else{
      console.log("no items for checkout...")
      return;
    }
  }
totalprice();

// let tpr = document.querySelector("#tpr");
//         console.log(tpr);

// // check out prince-----------

// check out btn funtion -----
function checkout(){
  alert("check out btn clicked...")
}

// let totalp =  basket.reduce((x,y)=>x+y.price,0);
