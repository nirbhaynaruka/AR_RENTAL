
var firebaseConfig = {
  apiKey: "AIzaSyCSrz_WzvNeSyb5KinqgPbOdFOKIdjoSXg",
  authDomain: "ar-carrental.firebaseapp.com",
  projectId: "ar-carrental",
  storageBucket: "ar-carrental.appspot.com",
  messagingSenderId: "655577676197",
  appId: "1:655577676197:web:861ff437996c0e3a19d04c",
  measurementId: "G-VEEQWJ4ETM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    window.location.href = "home.html";
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
// Mask the global 'window' for this snippet file
window.onload=function () {
  render();
};
function render() {
    window.recaptchaVerifier=new firebase.auth.RecaptchaVerifier('recaptcha-container');
    recaptchaVerifier.render();
}
function phoneAuth() {
    //get the number
    var number=document.getElementById('number').value;
    //phone number authentication function of firebase
    //it takes two parameter first one is number,,,second one is recaptcha
    firebase.auth().signInWithPhoneNumber(number,window.recaptchaVerifier).then(function (confirmationResult) {
        //s is in lowercase
        window.confirmationResult=confirmationResult;
        coderesult=confirmationResult;
        console.log(coderesult);
        alert("Message sent");
    }).catch(function (error) {
      console.log(error);
        alert(error.message);
    });
}
function codeverify() {
    var code=document.getElementById('verificationCode').value;
    coderesult.confirm(code).then(function (result) {
        alert("Successfully registered");
        var user=result.user;
        console.log(user);
    }).catch(function (error) {
        alert(error.message);
    });
}