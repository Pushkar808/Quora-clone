function toggle(id){
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
function description(){
    console.log("DESCR")
}
function checkbothPass(){
    if($('#password').val() == $('#cpassword').val()){
        console.log("Password match")
        alert('password Changed succesfully')
        return true;//both passwords match submit the form;
    }
    else{
        alert("Passwords doesn't match try again");
        return false;
    }
}