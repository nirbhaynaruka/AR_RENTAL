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
    // window.location.href = "home.html";


  } else {
    // No user is signed in.

    //   document.getElementById("user_div").style.display = "none";
    //   document.getElementById("login_div").style.display = "block";

  }
});



// function signUpWithEmailPassword() {


//   var email = document.getElementById("email_field").value;
//   var password = document.getElementById("password_field").value;
//   var number = document.getElementById('number').value;

//   firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       var user = userCredential.user;
//       console.log("email done...");
//       document.getElementById("otpid").style.display = "block";
//       document.getElementById("signupid").style.display = "none";
//       phoneAuth(number);
//       // ...
//     })
//     .catch((error) => {
//       var errorCode = error.code;
//       var errorMessage = error.message;

//       window.alert("Error : " + errorMessage);
//       // ..
//     });
//   // [END auth_signup_password]
// }
// Mask the global 'window' for this snippet file
window.onload = function () {
  render();
};

function render() {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  recaptchaVerifier.render();
}

function phoneAuth() {
  //get the number
  console.log("number start...");
  var number = document.getElementById('number').value;

  firebase.auth().signInWithPhoneNumber(number, window.recaptchaVerifier).then(function (confirmationResult) {

    window.confirmationResult = confirmationResult;
    coderesult = confirmationResult;
    console.log(coderesult);
    alert("Message sent");
    document.getElementById("otpid").style.display = "block";
    document.getElementById("signupid").style.display = "none";
  }).catch(function (error) {
    console.log(error);
    alert(error.message);
  });
}

function codeverify() {
  var code = document.getElementById('verificationCode').value;
  var name = document.getElementById('name').value;
  var city = document.getElementById('city').value;
  var referral = document.getElementById('referral').value;
  var phone = document.getElementById('number').value;
  // var myReferral;
  console.log(code + ".....");

  coderesult.confirm(code).then(function (result) {
    var email = document.getElementById("email_field").value;
    var password = document.getElementById("password_field").value;
    console.log(email);
    var credential = firebase.auth.EmailAuthProvider.credential(email, password);
    firebase.auth().currentUser.linkWithCredential(credential)
      .then((usercred) => {
        var user = usercred.user;
        firebase.firestore().collection("users").doc(email).set({
            "email": email,
            "name": name,
            "city": city,
            "referral": referral,
            "phone": phone, //+_phoneTextEditingController.text.trim(),
            "verified": "no",
            "bookingCount": 0,
            "userLevel": "Basic",
            "profileImage": "null",
            "mywalletmoney": 0,
            "referralused": 0,
            "myReferral": "",
          })
          .then(() => {
            window.location.href = "account.html";
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        console.log("Account linking success", user);
      }).catch((error) => {
        console.log("Account linking error", error);
      });
  }).catch(function (error) {
    alert(error.message);
  });
}