// //  https://fakestoreapi.com/products
// // try{
// // fetch("https://fakestoreapi.com/products")
// //   .then(resp=>resp.json())
// //   .then(data=>console.log(data))
// //   console.log("SHOPPIN PAGE ")
// // }
// // catch(error){
// //     console.log(error+" SOME ERROR ");
// // } 

// fetchAPI("https://fakestoreapi.com/products");
// async function fetchAPI(url) {
//   try {
//     let data = await fetch(url);
//     console.log(data);
//     response = await data.json();
//      console.log(response);

//     men = response.filter((item) => {
//       return item.category == "men's clothing";
//     });
//     console.log(men);
//   }
  
//   catch(error){
//     console.log("error")
//   }
//  //  showAll();
 
// }
// let input = document.querySelector("#slider");
// let number = document.querySelector("#num1");

// input.addEventListener("input",()=>{
//   number.textContent = input.value;
// })
// // let cards  = document.querySelector(".cards")
// // let div = document.createElement(".card")
// // div.className="card"
// // let htmlcontent = map(()=>{
// //   `
// //   <div class="card">
// //   <img
// //     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS33OQ6-elg8aJvSr9DSr_cPpSpYFR6CuWRBQ&usqp=CAU"
// //     alt="product img"
// //   />
// //   <p>price: 30$</p>
// //   <p>Rating: 3.8 count: 300</p>
// //   </div>
// //   `
// // })

// // let card = cards.appendChild(htmlcontent);
// // card.innerHTML = card;
// /// card  data  ---------------

// let cards = document.querySelector(".cards");

// // Create a template for the card
// let cardTemplate = `
//   <div class="card">
//     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS33OQ6-elg8aJvSr9DSr_cPpSpYFR6CuWRBQ&usqp=CAU" alt="product img" />
//     <p>Price: 30$</p>
//     <p>Rating: 3.8 count: 300</p>
//   </div>
// `;

// // Define the number of times you want to repeat the card
// const numberOfCards = 10;

// // Loop to create and append multiple card instances
// for (let i = 0; i < numberOfCards; i++) {
//   // Create a new card element
//   let card2 = document.createElement("div");
//   card2.className = "card2";

//   // Set the HTML content of the card using the template
//   card2.innerHTML = cardTemplate;

//   // Append the card to the "cards" element
//   cards.appendChild(card2);
// }

//  <img src="${data.products.thumbnail}" alt="${}">
let container = document.querySelector(".container1");
let data = async () => {
let responce = await fetch("https://dummyjson.com/products");
let data = await responce.json();
  
  data.products.map((elem,index) => {
     let htmlelem = `
                   <div class="cont">
                    <h2>${elem.title}</h2>
                     <img src="${elem.thumbnail}" alt="${elem.brand}">
                    <div class="price rating">
                       <h4>price: ${elem.price}</h4>
                      <h4>Rating: ${elem.rating}</h4>
                    </div>
                      <div class="desc">
                         <p>${elem.description}</p>
                      </div>
                      <div class="btn-rating">
                      <button class="addtocart" onClick="addtoCart()" >Add to Cart</button>
                      <button class="buynow" onClick="payNow()" >Buy Now</button>
                   </div>
                </div> `
       container.insertAdjacentHTML("beforeEnd",htmlelem);
       console.log(data.products);
  });
}
data();

// handling add to cart functionality -------
let num =0;
function addtoCart(){
   console.log("clicked...")
  document.querySelector(".cartqunt").innerText =num;
  num++;
  
 } 
 function payNow(){
    alert("PAY NOW AND WE WILL SHIP YOUR PRODUCT AT YOUR PLACE WITH 10% OF DISCOUNT...")
 }
