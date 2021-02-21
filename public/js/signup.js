

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        window.location.href="home.html";
      // User is signed in.
  
    //   document.getElementById("user_div").style.display = "block";
    //   document.getElementById("login_div").style.display = "none";
  
    //   var user = firebase.auth().currentUser;
  
    //   if(user != null){
  
    //     var email_id = user.email;
    //     document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
  
    //   }
  
    } else {
      // No user is signed in.
  
    //   document.getElementById("user_div").style.display = "none";
    //   document.getElementById("login_div").style.display = "block";
  
    }
  });
  
function signUpWithEmailPassword() {
    

  var email = document.getElementById("email_field").value;
  var password = document.getElementById("password_field").value;
  // [START auth_signup_password]
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      
      window.alert("Error : " + errorMessage);
      // ..
    });
  // [END auth_signup_password]
}
