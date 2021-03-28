
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
  
const window1 = {
  recaptchaVerifier: undefined
};

function recaptchaVerifierInvisible() {
  function onSignInSubmit() {
    // TODO(you): Implement
  }

  // [START auth_phone_recaptcha_verifier_invisible]
  window1.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      onSignInSubmit();
    }
  });
  // [END auth_phone_recaptcha_verifier_invisible]
}

function recaptchaVerifierVisible() {
  // [START auth_phone_recaptcha_verifier_visible]
  window1.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    'size': 'normal',
    'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      // ...
    },
    'expired-callback': () => {
      // Response expired. Ask user to solve reCAPTCHA again.
      // ...
    }
  });
  // [END auth_phone_recaptcha_verifier_visible]
}

function recaptchaVerifierSimple() {
  // [START auth_phone_recaptcha_verifier_simple]
  window1.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  // [END auth_phone_recaptcha_verifier_simple]
}

function recaptchaRender() {
  /** @type {firebase.auth.RecaptchaVerifier} */
  const recaptchaVerifier = window1.recaptchaVerifier;

  // [START auth_phone_recaptcha_render]
  recaptchaVerifier.render().then((widgetId) => {
    window1.recaptchaWidgetId = widgetId;
  });
  // [END auth_phone_recaptcha_render]
}

function phoneSignIn() {
  function getPhoneNumberFromUserInput() {
    return "+15558675309";
  }

  // [START auth_phone_signin]
  const phoneNumber = getPhoneNumberFromUserInput();
  const appVerifier = window1.recaptchaVerifier;
  firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window1.confirmationResult = confirmationResult;
        // ...
      }).catch((error) => {
        // Error; SMS not sent
        // ...
      });
  // [END auth_phone_signin]
}

function verifyCode() {
  function getCodeFromUserInput() {
    return "1234";
  }

  /** @type {firebase.auth.ConfirmationResult} */
  const confirmationResult = undefined;

  // [START auth_phone_verify_code]
  const code = getCodeFromUserInput();
  confirmationResult.confirm(code).then((result) => {
    // User signed in successfully.
    const user = result.user;
    // ...
  }).catch((error) => {
    // User couldn't sign in (bad verification code?)
    // ...
  });
  // [END auth_phone_verify_code]
}

function getRecaptchaResponse() {
  const recaptchaWidgetId = "...";
  const grecaptcha = {};

  // [START auth_get_recaptcha_response]
  const recaptchaResponse = grecaptcha.getResponse(recaptchaWidgetId);
  // [END auth_get_recaptcha_response]
}