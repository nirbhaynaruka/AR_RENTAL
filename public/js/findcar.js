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
var verified = "n";
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var user = firebase.auth().currentUser;
        if (user != null) {
            getveri(user.email);
            // window.email_id = user.email;
            // console.log(email_id+"...");
        }
    } else {
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
    }
});
function getveri(email_id){
    firestore.collection("users").doc(email_id).get().then(function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data();
            window.verified = myData.verified;
            console.log(myData.verified+"dd");
            getcars(verified);
        }
    });
}
function getcars(verified) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var user = firebase.auth().currentUser;
            if (user != null) {
                window.email_id = user.email;
            }
        }
    });
   
    var params = {};
    var pa = window.location.href.split('?')[1].split('&');
    for (var i in pa) {
        x = pa[i].split('=');
        params[x[0]] = x[1];
    }
    console.log(JSON.stringify(params));
    var pickupDate = Object.values(params)[0];
    var pickupTime = Object.values(params)[1];
    var city = Object.values(params)[2];
    var dropDate = Object.values(params)[3];
    var dropTime = Object.values(params)[4];
    const pickup = new Date(pickupDate);
    const drop = new Date(dropDate);
    const formatYmd = date => date.toISOString().slice(0, 10);
    document.getElementById("pickupDate").valueAsDate = pickup;
    var dateControl1 = document.getElementById("pickupDate");
    dateControl1.min = formatYmd(new Date());
    document.getElementById("dropDate").valueAsDate = drop;
    document.getElementById("pickuptime").value = pickupTime.substring(0, 2) + ":" + pickupTime.substring(5, 7);
    document.getElementById("droptime").value = dropTime.substring(0, 2) + ":" + dropTime.substring(5, 7);
    document.getElementById('city').value = city;

    var p = new Date(pickupDate);
    p.setHours(pickupTime.substring(0, 2));
    p.setMinutes(pickupTime.substring(5, 7))
    console.log(p);
    var d = new Date(dropDate);
    d.setHours(dropTime.substring(0, 2));
    d.setMinutes(dropTime.substring(5, 7));
    console.log(d);
    var hr = (d - p);
    var h = parseFloat(hr / 3600000).toPrecision(3);
   
    
                

    h >= 6 ? firestore.collection("Cars").where("city", "==", city)
        .get()
        .then((querySnapshot) => {
            
            querySnapshot.forEach((doc) => {
                // console.log("dd"+verified);
                console.log(email_id);
                var div = document.createElement('div');
                div.className = 'section';
                doc.data().packageType == "Base" ? (km = ' 120 Free KMs <span> ₹' + doc.data().excessKM + '/excess KM </span>') : (km = 'Unlimited Free KMs');
                doc.data().status == "Available" ?
                    (email_id == "none" ? div.innerHTML = '<div class="section-center"><div class="container"><div class="search-car"><div class="row"><div class="col-md-4 car-image"> <img src="' + doc.data().carImageURL + '\" alt="" srcset=""></div><div class="col-md-5 car-details"><h3>' + doc.data().companyName + '<span class="text-uppercase">' + doc.data().modelName + '</span>\</h3><h5>₹' + Math.ceil(h * doc.data().amount_hr) + '\</h5><p>' + km + '</p><ul><li><img src="../assets/type.png" width="25%">' + doc.data().transmission + '\</li><li><img src="../assets/petrol.png" width="25%">' + doc.data().type + '\</li><li><img src="../assets/seat.png" width="25%">' + doc.data().seats + '\ Seats</li></ul></div><div class="col-md-3 button-search"> <a href="signin.html"><button type="submit" class="btn btn-primary" >Log In to rent</button></a></div></div></div></div></div>' :
                        (verified == "no" ? div.innerHTML = '<div class="section-center"><div class="container"><div class="search-car"><div class="row"><div class="col-md-4 car-image"> <img src="' + doc.data().carImageURL + '\" alt="" srcset=""></div><div class="col-md-5 car-details"><h3>' + doc.data().companyName + '<span class="text-uppercase">' + doc.data().modelName + '</span>\</h3><h5>₹' + Math.ceil(h * doc.data().amount_hr) + '\</h5><p>' + km + '</p><ul><li><img src="../assets/type.png" width="25%">' + doc.data().transmission + '\</li><li><img src="../assets/petrol.png" width="25%">' + doc.data().type + '\</li><li><img src="../assets/seat.png" width="25%">' + doc.data().seats + '\ Seats</li></ul></div><div class="col-md-3 button-search"><a href="account.html"><button type="submit" class="btn btn-primary">Verify First</button></a></div></div></div></div></div>' : div.innerHTML = '<div class="section-center"><div class="container"><div class="search-car"><div class="row"><div class="col-md-4 car-image"> <img src="' + doc.data().carImageURL + '\" alt="" srcset=""></div><div class="col-md-5 car-details"><h3>' + doc.data().companyName + '<span class="text-uppercase">' + doc.data().modelName + '</span>\</h3><h5>₹' + Math.ceil(h * doc.data().amount_hr) + '\</h5><p>' + km + '</p><ul><li><img src="../assets/type.png" width="25%">' + doc.data().transmission + '\</li><li><img src="../assets/petrol.png" width="25%">' + doc.data().type + '\</li><li><img src="../assets/seat.png" width="25%">' + doc.data().seats + '\ Seats</li></ul></div><div class="col-md-3 button-search"> <button type="submit" class="btn btn-primary" onclick="bookcar(\'' + doc.data().carID.toString() + '\',\'' + h + '\',\'' + p + '\',\'' + d + '\',\'' + city + '\')">Rent This Car</button></div></div></div></div></div>')) :
                    div.innerHTML = '<div class="section-center"><div class="container"><div class="search-car"><div class="row"><div class="col-md-4 car-image"> <img src="' + doc.data().carImageURL + '\" alt="" srcset=""></div><div class="col-md-5 car-details"><h3>' + doc.data().companyName + '<span class="text-uppercase">' + doc.data().modelName + '</span>\</h3><h5>₹' + Math.ceil(h * doc.data().amount_hr) + '\</h5><p>' + km + '</p><ul><li><img src="../assets/type.png" width="25%">' + doc.data().transmission + '\</li><li><img src="../assets/petrol.png" width="25%">' + doc.data().type + '\</li><li><img src="../assets/seat.png" width="25%">' + doc.data().seats + '\ Seats</li></ul></div><div class="col-md-3 button-search"> <button type="disabled" class="btn">Unavailable</button></div></div></div></div></div>';
                document.getElementById('AllCars').appendChild(div);


                // console.log(doc.id, " => ", doc.data());
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        }) : (

            document.getElementById('invaliddetails').innerHTML = '<div><h1>Select Valid Date and Time </h1><br> <span style="color:grey">Select atleast 6 hr of journey time</span></div>'
        );

}
// window.params = function () {

//     return getcars(city);
//   }();
//   function getcars(x){
//     console.log(x);
// }