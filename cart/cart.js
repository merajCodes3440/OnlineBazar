let itemslist = document.querySelector(".items");
let getItems = JSON.parse(localStorage.getItem("cart")) || [];
console.log(getItems.length);

let qunt1 =0;
// SHOWING ALL ITEM -------------
function rendor(elem){
       return `
        <div class="cont">
         <h2>${elem.title}</h2>
          <img src="${elem.thumbnail}" alt="${elem.brand}">
         <div class="price rating">
            <h4>price: ${elem.price}</h4>
           <h4>Rating: ${elem.rating}⭐</h4>
           <h4>Stock: ${elem.stock}</h4>
         </div>
           <div class="desc">
              <p>${elem.description.slice(0,80)}...</p>
           </div>
           <div class="btn-rating">
           <button class="remove" onClick="remove(${elem.id})" >Remove</button>
        </div>
     </div> `
     
   }
  
     function showall(){
         getItems.forEach((x)=>{
         itemslist.innerHTML += rendor(x);
        showchecklist(); // updata the checklist items
   })
}
showall();

//  ---------removing the items from cart(localstrage)-----------------


function remove(id) {
   console.log("remove " + id);
   getItems = getItems.filter((item) => item.id !== id);
   localStorage.setItem("cart", JSON.stringify(getItems));
   itemslist.innerHTML = ""; // Clear the items list
   showall(); // Refresh the displayed items after removal
   showchecklist(); // updata the checklist items
   totalprice(); //  update total price function --
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
       <h3 class="itemq" > ${0}</h3>
       <div>
        <i onClick="down(${elem.id})" class="fa-solid fa-chevron-down" ></i>
       </div>
    </div>
    <div class="pricediv">
      <div class="item-price">
           <h3>${elem.price }</h3>
      </div>
      <div class="tprice">
        <h3>${elem.price}</h3>
      </div>
    </div>

  </div>
    `
};
// ---------------showing the checklist items ----
function showchecklist(){

  let html1= getItems.map((items)=> checklist(items) )
  let checklistitems = document.querySelector(".checklist-items");
  checklistitems.innerHTML =html1.join("");
  
}
showchecklist();

//---runing the increment and decriment --------
getItems.forEach((elem)=>{
    //  increment(elem);
    //  decrement(elem);
}) 
// incriment items no---------------


// function increment(elem){
//   let incbtn =document.querySelectorAll(".fa-chevron-up");
//    let itemq = document.querySelectorAll(".itemq"); 
  
//    incbtn.forEach((btn1,index)=>{
//     console.log(btn1);
//     btn1.addEventListener('click',()=>{
//       console.log("up...")
//          qunt1++;
//          if(qunt1>10){
//            alert("you reach maximam limit of purchasing an items ")
//          }
//          else{
//            itemq[index].innerHTML=qunt1;
//          }
//     })
//   })
//  }
//  increment();
  
// // decriment items no-------------------
//  function decrement(){

//    let decbtn =document.querySelectorAll(".fa-chevron-down");
//    let itemq = document.querySelectorAll(".itemq");

//    decbtn.forEach((btn2,index)=>{
//      btn2.addEventListener('click',()=>{
//       console.log("down...")
//       qunt1--;
//       if(qunt1<=0){
//          alert("qunatity is 0 , plesase incrise the quntity")
//       }
//       else{
//        itemq[index].innerHTML=qunt1;
//       }
//   })
// })
//  }
// decrement();

//function updatequant(){

let num = 1; // Initialize num outside of any function
let index = getItems.length;
function up(id,index) {
  let itemq = document.querySelectorAll(".itemq");
  if (id) {
    itemq[index].innerHTML = num;
    num++;
    console.log("up id : " + id);
  }
}

// You can now call the up function as needed


  // let num =1;
  // function up(id){
  //   let itemq = document.querySelectorAll(".itemq");
  //   if(id){
  //     itemq[0].innerHTML = num;
  //     num++;
  //      console.log("up id : "+ id);
  //   }
  // }
  
  function down(id){
    alert("down");
  }
   
// }
// updatequant();


// let {id , price }=getItems;
// // total price of items -----------
// let tp =document.querySelector("#tp");
// tp.innerHTML= qunt1*price;
function totalprice(){
    let totalp =  getItems.reduce((x,y)=>x+y.price,0);
     let tpr = document.querySelector("#tpr")
      tpr.innerHTML =(totalp-5)+" $";
}
totalprice();


// // check out prince-----------
 
// check out btn funtion -----
function checkout(){
   alert("check out btn clicked...")
}
