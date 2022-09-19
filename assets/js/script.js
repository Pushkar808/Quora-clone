function toggle(id){
    console.log("KCC")
    let signinForm=document.getElementById('Login-container');
    let signupForm=document.getElementById('Signup-form');
    if(signinForm.style.display=="none"){
        signinForm.style.display="flex";
        signupForm.style.display="none";
    }
    else{
        signinForm.style.display="none";
        signupForm.style.display="block";
    }
}