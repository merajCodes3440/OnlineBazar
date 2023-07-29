let email=document.getElementById("emailid");
let password =document.getElementById("password");
let loginBtn = document.getElementById("loginBtn")

// loginbtn.addEventListener("click",checkCred);
loginBtn.addEventListener("click", checkCred);

function checkCred(e){
   e.preventDefault(); 
   
   const valid =JSON.parse(localStorage.getItem('user'));

   if(!valid){
    alert("No user found. Please register first.");
    return;
   }

   for (let i = 0; i < valid.length; i++) {
    if (valid[i].email === email.value && valid[i].password === password.value) {
       // console.log("hello");
        let currentUser = valid[i];
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        window.location.href = "../shoppage/index.html";
        return;
    }
}
alert("Credentials do not match");

}


