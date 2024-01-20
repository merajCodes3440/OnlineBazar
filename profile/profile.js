console.log("form...")

document.getElementById("submit").addEventListener("click",()=>{
    let fname =document.getElementById('fname').value;
    let sname =document.getElementById('sname').value;
    let add1 =document.getElementById('add1').value; 
    let add2 =document.getElementById('add2').value; 
    let pincode =document.getElementById('pincode').value; 
    let landmark =document.getElementById('landmark').value; 
    let num =document.getElementById('num').value; 
    alert("your form has submitted." ,fname)
})
