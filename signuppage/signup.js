document.getElementById("signupform").addEventListener("submit", submitform);

// store all the array if there any otherwise empty array 
let user = JSON.parse(localStorage.getItem('user')) || [];

//function to match email with regex to validate
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;

    return regex.test(email);
}

let flag = true;
 function submitform(e){
    e.preventDefault(); 

    // taking the value

    let fname =document.getElementById("fname").value;
    let lname =document.getElementById("lname").value;
    let emailid =document.getElementById("emailid").value;
    let password =document.getElementById("password").value;
    let cpassword = document.getElementById("cpassword").value;

 if(fname=="" ||
    lname=="" ||
    emailid=="" ||
    password=="" ||
    password!=cpassword
 ){
    alert("Fill all the require details")
 }
 else{
    if (!validateEmail(emailid)) {
        alert("Invalid email ID");
    }
    else{
        for (var i = 0; i < user.length; i++) {
            if (user[i].email === emailid) {
              alert('Email already in use.');
              return;
            }
    }
    
    let details = {
        id: user.length,
        firstName: document.getElementById("fname").value,
        lastName: document.getElementById("lname").value,
        email: document.getElementById("emailid").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("cpassword").value,
    };
    user.push(details);

 
     localStorage.setItem("user", JSON.stringify(user));
    console.log(user);
    alert("signup successful");
}

}
}