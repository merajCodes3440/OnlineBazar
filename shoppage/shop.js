console.log("shop page...");
// updating the cart count number ------------------
updateCartCount();
function updateCartCount(){
  let cartNum = JSON.parse(localStorage.getItem("cart") || []);
document.querySelector(".cartqunt").innerText = cartNum.length;
}


let itemdata= [];
let myCartArray = [];
let phones = [];
let laptops = [];
let fragrances = [];
//let skincare = [];
let groceries = [];
// let homeDecoretion = [];
let temp = JSON.parse(localStorage.getItem("cart"));
if (temp) {
   myCartArray = temp;
}


let data = async () => {
   try {
    let responce = await fetch("https://dummyjson.com/products?limit=102");
    let data = await responce.json();
    itemdata = data.products;
    console.log(itemdata);
    phones = itemdata.filter((x) => {
      return x.category == "smartphones";
    });
    laptops =itemdata.filter((x)=>{
      return x.category =="laptops"
    });
    fragrances=itemdata.filter((x)=>{
      return x.category =="fragrances"
    });
    groceries =itemdata.filter((x)=>{
      showall()
      return x.category =="groceries"

    });
  } catch (error) {
    console.log( "network erorr: "+ error);
  }
}
data();
console.log(phones);
  // rendor function--------------------------------

  function rendor(elem) {
    return `
   <div class="cont">
    <h2>${elem.title}</h2>
     <img src="${elem.thumbnail}" alt="${elem.brand}">
    <div class="price rating">
       <h4>price:${elem.price }</h4>
      <h4>Rating: ${elem.rating}⭐</h4>
    </div>
      <div class="desc">
         <p>${elem.description.slice(0, 80)}...</p>
      </div>
      <div class="btn-rating">
      <button class="addtocart" onClick="addtoCart(${
        elem.id
      })" >Add to Cart</button>
      <button class="buynow" onClick="payNow()" >Buy Now</button>
   </div>
</div> `;
  }

  // handling add to cart functionality -------
  function addtoCart(idm) {
    
    let temp = itemdata.filter((item) => {
      return item.id == idm;
    });
    myCartArray.push(temp[0]);
    localStorage.setItem("cart", JSON.stringify(myCartArray));
    updateCartCount();
  }

  // ALL FILER FUNCTIONALITY ---------------
  let allbtn = document.querySelector("#btnall");
  // console.log(allbtn);
  let phonesbtn = document.querySelector("#btnphones");
  let laptopbtn = document.querySelector("#btnlaptops");
  let fragbtn = document.querySelector("#btnfrag");
  let grocbtn = document.querySelector("#btngroc");

  // showwing the filter items ------------------------------
  allbtn.addEventListener("click", showall);

  function showall() {
    console.log("showall...");
    let myhtml = itemdata.map((x)=>{
      return rendor(x)
    })
    document.querySelector(".shopCont").innerHTML = myhtml.join("");
 }
// displaying phones on the screen-----------------
phonesbtn.addEventListener("click",phonesfunc);
 function phonesfunc() {
   console.log("phones...");
  let myhtml1 = phones.map((items) => {
    return rendor(items);
  });
  document.querySelector(".shopCont").innerHTML = myhtml1.join("");
}
 // displaing data for laptop--------------------
 laptopbtn.addEventListener("click",laptopsfunc);
 function laptopsfunc() {
   console.log("laptop...");
  let myhtml2 =  laptops.map((items) => {
    return rendor(items);
  });
  document.querySelector(".shopCont").innerHTML = myhtml2.join("");
}

// displaing data for fragrencess--------------------
fragbtn.addEventListener("click",fragfunc);
function fragfunc() {
  console.log("fragrencess...");
 let myhtml3 =fragrances.map((items) => {
   return rendor(items);
 });
 document.querySelector(".shopCont").innerHTML = myhtml3.join("");
}

// displaing data for grocries--------------------
grocbtn.addEventListener("click",grocfunc);
function grocfunc() {
  console.log("groceries...");
 let myhtml4 =  groceries.map((items) => {
   return rendor(items);
 });
 document.querySelector(".shopCont").innerHTML = myhtml4.join("");
}
// adding search functionality ---------------

let searchid = document.getElementById("searchid");
let sitems = document.querySelector(".shopCont")
searchid.addEventListener("keyup",(event)=>{
   let searchTerm = event.target.value.toLowerCase();
   console.log(searchTerm);
   // make empty --
   sitems.innerHTML="";  
 

   let result = itemdata.filter((item)=>{
     return item.title.toLowerCase().includes(searchTerm);
   })

   result.forEach((x)=>{
      sitems.innerHTML+=rendor(x);
   });
});
