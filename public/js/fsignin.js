// import firebase from "firebase/app";
// import "firebase/auth";
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
  
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
  
      var user = firebase.auth().currentUser;
  
      if(user != null){
  
        var email_id = user.email;
        document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
  
      }
  
    } else {
      // No user is signed in.
  
      document.getElementById("user_div").style.display = "none";
      document.getElementById("login_div").style.display = "block";
  
    }
  });
  
  function login(){
  
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
  
      // ...
    });
  
  }
  
  function logout(){
    firebase.auth().signOut();
  }
  


// function signInWithEmailPassword() {
//   var email = "n@n.com";
//   var password = "123456";
//   // [START auth_signin_password]
//   firebase.auth().signInWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       // Signed in
//       var user = userCredential.user;
//       // ...
//     })
//     .catch((error) => {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//     });
//   // [END auth_signin_password]
// }

// function signUpWithEmailPasswoerd() {
//   var email = "n@n.com";
//   var password = "123456";
//   // [START auth_signup_password]
//   firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       // Signed in 
//       var user = userCredential.user;
//       // ...
//     })
//     .catch((error) => {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // ..
//     });
//   // [END auth_signup_password]
// }

// function sendEmailVerification() {
//   // [START auth_send_email_verification]
//   firebase.auth().currentUser.sendEmailVerification()
//     .then(() => {
//       // Email verification sent!
//       // ...
//     });
//   // [END auth_send_email_verification]
// }

// function sendPasswordReset() {
//   const email = "sam@example.com";
//   // [START auth_send_password_reset]
//   firebase.auth().sendPasswordResetEmail(email)
//     .then(() => {
//       // Password reset email sent!
//       // ..
//     })
//     .catch((error) => {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // ..
//     });
//   // [END auth_send_password_reset]
// }