// updating the cart count number ------------------
function updateCartCount(){
  let cartNum = JSON.parse(localStorage.getItem("cart")) || [];
  document.querySelector(".cartqunt").innerText = cartNum.length;
}
updateCartCount();

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
    let responce = await fetch("https://dummyjson.com/products?limit=52");
    let data = await responce.json();
    itemdata = data.products;
    //console.log(itemdata);
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
//console.log(itemdata);
//console.log(phones);

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

// // we need to add functionality by which we can avoid to 
// // add duplicate items 

function addtoCart(idm) {
  // Check if the item with the given idm already exists in myCartArray
  const isDuplicate = myCartArray.some((elem) => elem.id === idm);

  // If it's a duplicate, do not add it again
  if (isDuplicate) {
    alert("Item is already in the cart.");
    return;
  }
  // If it's not a duplicate, find the item in itemdata and add it to myCartArray
  const newItem = itemdata.find((item) => item.id === idm);

  if (newItem) {
    myCartArray.push(newItem);
    console.log("Item added to the cart:", newItem);
  } else {
    console.log("Item not found in itemdata.");
  }
  // Update the cart in localStorage and the cart count
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

  // showwing the filter items ----------------
  allbtn.addEventListener("click", showall);

  function showall() {
   // console.log("showall...");
    let myhtml = itemdata.map((x)=>{
      // console.log(x)
      return rendor(x)
    })
    document.querySelector(".shopCont").innerHTML = myhtml.join("");
 }
console.log("testing.....");

 function filterprice(){
    itemdata.map((x)=>{
     console.log(x);
    })
  }
  filterprice();

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
  //console.log("fragrencess...");
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
let sitems = document.querySelector(".shopCont");

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

let s4 = document.getElementById("s4");
s4.addEventListener("change", handlePriceFilter1);

function handlePriceFilter1() {
  // Get the checked value of the checkbox
  const isChecked = s4.checked;

  if (isChecked) {
    // Sort itemdata based on price in ascending order
    itemdata.sort((a, b) => a.price - b.price);
  } else {
    // Reset the order to the original state
    itemdata.sort((a, b) => a.id - b.id);
  }

  // Update the displayed products
  showall();
}

let s5 = document.getElementById("s5");
s5.addEventListener("change", handlePriceFilter2);

function handlePriceFilter2() {
  // Get the checked value of the checkbox
  const isChecked = s5.checked;

  if (isChecked) {
    // Sort itemdata based on price in ascending order
    itemdata.sort((a, b) => b.price - a.price);
   } 
   
  // Update the displayed products
  showall();
}

// ... (your existing code)

let s9 = document.getElementById("s9");
let s10 = document.getElementById("s10");
let s11 = document.getElementById("s11");

s9.addEventListener("click", handlePriceFilterValue);
s10.addEventListener("click", handlePriceFilterValue);
s11.addEventListener("click", handlePriceFilterValue);

function handlePriceFilterValue() {

  // Get the checked values of the checkboxes
  
  const isChecked200 = s9.checked;
  const isChecked500 = s10.checked;
  const isChecked1000 = s11.checked;

  // Filter products based on the checked values

  let filteredProducts = itemdata.filter((item) => {
    if (isChecked200 && item.price <= 200) return true;
    if (isChecked500 && item.price <=500 ) return true;
    if (isChecked1000 && item.price <= 1000) return true;
    return false;
  });

  // If no checkboxes are checked, show all products
  if (!isChecked200 && !isChecked500 && !isChecked1000) {
    filteredProducts = itemdata;
  }

  // Update the displayed products
  displayFilteredProducts(filteredProducts);
}

function displayFilteredProducts(filteredProducts) {
  let filteredHtml = filteredProducts.map((item) => rendor(item));
  document.querySelector(".shopCont").innerHTML = filteredHtml.join("");
}


// ... (continue with the rest of your code)
// let s1 = document.getElementById("s9");
//  s1.addEventListener('click',()=>{
//     if(s1.checked===true){
//       console.log("checked")
//     } 
//     else{
//       console.log("not checked");
//     }
//  });

