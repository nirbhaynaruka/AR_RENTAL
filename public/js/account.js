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
var firestore = firebase.firestore();
var storage = firebase.storage();
var email = "none";
var referral;
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var user = firebase.auth().currentUser;

    if (user != null) {
      var email_id = user.email;
      // console.log(user.uid.substring(0, 5))
      window.referral = user.uid.substring(0, 5);
      myfunc(email_id);
      getDoc(user.email);
      
    //   firestore.collection("users").doc(email_id).update({
    //     "myReferral": referral,
    // })
    // .then(() => {
    //     console.log("Document successfully written!");
    // })
    // .catch((error) => {
    //     console.error("Error writing document: ", error);
    // });
    }
  } else {
    // No user is signed in.
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }
});
function getDoc(email) {
  const docRef = firestore.collection("users").doc(email);
  console.log(email);
  docRef.get().then(function (doc) {
      if (doc && doc.exists) {
          const myData = doc.data();
          console.log(myData.name);

          document.getElementById("user").innerHTML = "Welcome " + myData.name;
          document.getElementById("avatar").innerHTML = '<img src=\'' + myData.profileImage + '\' class="avatarimg" id="avatarimg">'
          document.getElementById("accounttd").innerHTML = myData.phone;
          // document.getElementById("bookingtd").innerHTML = myData.bookingCount;

      }
  }).catch(function (error) {
      console.log("got an error" + error);
  })
};




function myfunc(email_id) {
  const docRef = firestore.collection("users").doc(email_id);
  docRef.get().then(function (doc) {
    if (doc && doc.exists) {
      const myData = doc.data();
      email = myData.name;
      console.log(email);

      (function () {
   
        
        function updateProfile() {
          document.getElementById("singlePage").innerHTML =
            '<div class="updateProfile"><h3>Update Profile Picture</h3><div class="form-group"><label for="exampleFormControlFile1">Select Profile Photo</label><input type="file" class="form-control-file" accept="image/*" id="photo"></div><button class="btn btn-primary" onclick="uploadImage()">Upload Image</button><p><img id="output" width="200" /></p></div>';
        }

        function wallet() {
          myData.myReferral == null || myData.myReferral == "" ? document.getElementById("singlePage").innerHTML =
            '<div class="wallet"> <img src="../assets/refer.png" alt="Refer&Earn"><div class="referPara"><p class="text-center">Refer your friends and get Rs 50 in your AR Rental Car wallet, when your friend signup and completes his/her ride using your referral code.</p></div><div class="row"><div class="col-md-6 text-center"><p class="referralbutton" id="code"><button class="btn btn-lg btn-primary btn-block" id="referralfunc" onclick="referralfunc()" type="button">Get Referral Code</button></p></a><p class="codeText">Your Referral Code</p></div><div class="col-md-6 text-center"><p id="amount"> \'' + myData.mywalletmoney + '\'</p><p class="amountText">AR Rental Balance</p></div></div></div>' : document.getElementById("singlePage").innerHTML =
            '<div class="wallet"> <img src="../assets/refer.png" alt="Refer&Earn"><div class="referPara"><p class="text-center">Refer your friends and get Rs 50 in your AR Rental Car wallet, when your friend signup and completes his/her ride using your referral code.</p></div><div class="row"><div class="col-md-6 text-center"><p id="code">\'' + myData.myReferral + '\'</p><p class="codeText">Your Referral Code</p></div><div class="col-md-6 text-center"><p id="amount"> \'' + myData.mywalletmoney + '\'</p><p class="amountText">AR Rental Balance</p></div></div></div>';
        }

        function editProfile() {
          document.getElementById("singlePage").innerHTML =
            '<div class="editProfile"><h3>Edit Profile</h3><form><div class="form-group"> <label for="inputName1">Name</label> <input type="email" class="form-control" id="inputName1" aria-describedby="nameHelp" placeholder="Name"> <small id="nameHelp" class="form-text text-muted">You can change your name in case you wrongly enters it in the first place.</small></div><div class="form-group"> <label for="inputEmail2">Email address</label> <input type="email" class="form-control" id="inputEmail2" aria-describedby="emailHelp" placeholder="\'' + myData.email + '\'" readonly> <small id="emailHelp" class="form-text text-muted">We will never share your email with anyone else.</small></div><div class="form-group"> <label for="inputMobile2">Mobile</label> <input type="number" class="form-control" id="inputMobile2" placeholder="\'' + myData.phone + '\'" readonly></div> <button type="button" onclick="myName()" value="Submit" class="btn btn-primary">Submit</button></form></div>';
        }

        function updatePassword() {
          document.getElementById("singlePage").innerHTML =
            '<div class="updatePassword"> <label for="oldPassword">Old Password</label> <input type="password" id="oldPassword" class="form-control" aria-describedby="passwordHelpBlock"> <small id="passwordHelpBlock" class="form-text text-muted"> Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji. </small> <label for="newPassword">New Password</label> <input type="password" id="newPassword" class="form-control"> <button type="submit" class="btn btn-primary">Update Password</button></div>';
        }

        document
          .getElementById("updateProfile")
          .addEventListener("click", updateProfile, true);
        document.getElementById("wallet").addEventListener("click", wallet, true);
        document
          .getElementById("editProfile")
          .addEventListener("click", editProfile, true);
        document
          .getElementById("updatePassword")
          .addEventListener("click", updatePassword, true);
      })();



      // alert(email);
    }
  }).catch(function (error) {
    console.log("got an error" + error);
  })
};