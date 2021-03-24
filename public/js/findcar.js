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
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var user = firebase.auth().currentUser;
        if (user != null) {

        }
    } else {
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
    }
});
window.onload = function () {
    firestore.collection("Cars")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var div = document.createElement('div');
                div.className = 'section';
                doc.data().status == "Available" ?  
                div.innerHTML = '<div class="section-center"><div class="container"><div class="search-car"><div class="row"><div class="col-md-4 car-image"> <img src="' + doc.data().carImageURL + '\" alt="" srcset=""></div><div class="col-md-5 car-details"><h3>' + doc.data().companyName + '\ || ' + doc.data().modelName + '\</h3><h5>$3345</h5><p>120 KMs Free Rs.11/excessKM</p><ul><li>' + doc.data().transmission + '\</li><li>' + doc.data().packageType + '\</li><li>' + doc.data().type + '\</li><li>' + doc.data().seats  + '\ Seats</li></ul></div><div class="col-md-3 button-search"> <button type="submit" class="btn btn-primary" onclick="bookcar(\'' + doc.data().carID.toString() + '\')">Book</button></div></div></div></div></div>' 
                
                : div.innerHTML = '<div class="section-center"><div class="container"><div class="search-car"><div class="row"><div class="col-md-4 car-image"> <img src="' + doc.data().carImageURL + '\" alt="" srcset=""></div><div class="col-md-5 car-details"><h3>' + doc.data().companyName + '\ || ' + doc.data().modelName + '\</h3><h5>$3345</h5><p>120 KMs Free Rs.11/excessKM</p><ul><li>' + doc.data().transmission + '\</li><li>' + doc.data().packageType + '\</li><li>' + doc.data().type + '\</li></ul></div><div class="col-md-3 button-search"> <button type="disabled" class="btn">Not Available</button></div></div></div></div></div>';
                document.getElementById('AllCars').appendChild(div);


                // console.log(doc.id, " => ", doc.data());
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

}