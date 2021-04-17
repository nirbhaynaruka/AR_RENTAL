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

      document.getElementById("user").innerHTML = "Welcome, " + myData.name;
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
            '<div class="updateProfile"><h3>Update Profile Picture</h3><div class="form-group"><label for="exampleFormControlFile1">Select Profile Photo</label><input type="file" class="form-control-file" accept="image/*" id="photo"></div><button class="btn btn-primary" onclick="uploadImage(\'' + email_id + '\')">Upload Image</button><p><img id="output" width="200" /></p></div>';
        }

        function wallet() {
          myData.myReferral == null || myData.myReferral == "" ? document.getElementById("singlePage").innerHTML =
            '<div class="wallet"> <img src="../assets/refer.png" alt="Refer&Earn"><div class="referPara"><p class="text-center">Refer your friends and get Rs 50 in your AR Rental Car wallet, when your friend signup and completes his/her ride using your referral code.</p></div><div class="row"><div class="col-md-6 text-center"><p class="referralbutton" id="code"><button class="btn btn-lg btn-primary btn-block" id="referralfunc" onclick="referralfunc(\'' + email_id + '\')" type="button">Get Referral Code</button></p></a><p class="codeText">Your Referral Code</p></div><div class="col-md-6 text-center"><p id="amount"> \'' + myData.mywalletmoney + '\'</p><p class="amountText">AR Rental Balance</p></div></div></div>' :
            document.getElementById("singlePage").innerHTML =
            '<div class="wallet"> <img src="../assets/refer.png" alt="Refer&Earn"><div class="referPara"><p class="text-center">Refer your friends and get Rs 50 in your AR Rental Car wallet, when your friend signup and completes his/her ride using your referral code.</p></div><div class="row"><div class="col-md-6 text-center"><p id="code">' + myData.myReferral + '</p><p class="codeText">Your Referral Code</p></div><div class="col-md-6 text-center"><p id="amount"> ' + myData.mywalletmoney + '\</p><p class="amountText">AR Rental Balance</p></div></div></div>';
        }

        function editProfile() {
          document.getElementById("singlePage").innerHTML =
            '<div class="editProfile"><h3>Edit Profile</h3><form><div class="form-group"> <label for="inputName1">Name</label> <input type="email" class="form-control" id="inputName1" aria-describedby="nameHelp" placeholder="Name"> <small id="nameHelp" class="form-text text-muted">You can change your name in case you wrongly enters it in the first place.</small></div><div class="form-group"> <label for="inputEmail2">Email address</label> <input type="email" class="form-control" id="inputEmail2" aria-describedby="emailHelp" placeholder="\'' + myData.email + '\'" readonly> <small id="emailHelp" class="form-text text-muted">We will never share your email with anyone else.</small></div><div class="form-group"> <label for="inputMobile2">Mobile</label> <input type="number" class="form-control" id="inputMobile2" placeholder="\'' + myData.phone + '\'" readonly></div> <button type="button" onclick="myName(\'' + email_id + '\')" value="Submit" class="btn btn-primary">Submit</button></form></div>';
        }

        function updatePassword() {

          firestore.collection("users").doc(email_id).get().then(function (doc) {
            if (doc && doc.exists) {
              const myData = doc.data();
              window.verified = myData.verified;
              console.log(myData.verified);
            }
          });
          document.getElementById("singlePage").innerHTML = (verified == "no" ? '<div class="referPara"><p class="text-center">Please Verify your ID from our Android App <a href="https://play.google.com/store/apps/details?id=com.twp.car_rental"><span style="color:orange">AR_CarRental</span></a><br>By submitting your Aadhar card and Driving License<br>*Physical copy of Aadhar card and Driving License is <br>required when coming to recieve the car at fleet</p></div>' :
            '<div class="wallet"> <img src="../assets/verified.png" alt="verified"><div class="referPara"><p class="text-center">Hooray ! Your ID is verified and you <br> are eligible for bookings</p><p>*Physical copy of Aadhar card and Driving License is <br>required when coming to recieve the car at fleet</p></div></div>');
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