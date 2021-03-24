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
var email_id = "none";
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var user = firebase.auth().currentUser;
        if (user != null) {
            getDoc(user.email);
            window.email_id = user.email;
            // console.log(email_id);
        }
    } else {
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
    }
});
// window.onload = function () {
// alert(email_id);
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

window.onload = function () {
    firestore.collection("Cars")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // alert(querySnapshot.size);
            // for(var i = 0;i<querySnapshot.size;i++){
                var div = document.createElement('div');
                div.innerHTML = '<div class="container booking_page"><div class="row"><div class="left_side col-md-6"><div class="car_img"> <img src=\'' + doc.data().carImageURL + '\' alt="carImage" srcset=""></div><div class="necessary_details included"><h4 class="text-uppercase">Included</h4><ul class="text-uppercase"><li>VEHICLE INSURANCE (USER+3RD PARTY)</li><li>TOEING AND IMPOUNDING (CAUSED BY VEHICLE FAILURE)</li><li>MAINTENNANCE AND CLEANING</li><li>24X7 SUPPORT SERVICE</li></ul></div><div class="necessary_details exlcuded"><h4 class="text-uppercase">EXCLUDED</h4><ul class="text-uppercase"><li>FUEL</li><li>PARKING</li><li>STATE AND TOLL TAXES</li><li>TRAFFIC VOILATIONS AND PENALTIES</li><li>TOEING AND IMPOUNDING (CAUSED BY COUSTOMER FAILURE)</li></ul></div></div><div class="right_side col-md-6"><div class="car_model"><h5>\''+ doc.data().modelName + '\'</h5><h3 class="text-uppercase">\'' + doc.data().companyName + '\'</h3><ul class="mr-auto mt-2 mt-lg-0 text-uppercase"><li>\'' + doc.data().transmission + '\'</li><li>\'' + doc.data().type + '\'</li><li>\'' + doc.data().seats + '\'</li></ul></div><div class="booking_details"></div></div></div></div>'
                document.getElementById('holder').appendChild(div);
            // }
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

}