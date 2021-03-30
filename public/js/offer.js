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
var email_id = "none";
var myCity = "none";
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var user = firebase.auth().currentUser;
        if (user != null) {
            getDoc(user.email);
            window.email_id = user.email;
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
    docRef.get().then(function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data();
            window.myCity = myData.city;
            getOffers(myCity);
        }
    }).catch(function (error) {
        console.log("got an error" + error);
    })
};

function getOffers(myCity) {
    firestore.collection("banner").where("city", "==",myCity)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // alert(querySnapshot.size);
            // for(var i = 0;i<querySnapshot.size;i++){
                // carousel-item active
                var div = document.createElement('div');
                div.className = 'carousel-item';
                // var 
                div.innerHTML = '<img src=\'' + doc.data().bannerthumbnail + '\'  class="d-block" alt=\'' + doc.data().city + '\'>'
                document.getElementById('carousel-inner').appendChild(div);

                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

}