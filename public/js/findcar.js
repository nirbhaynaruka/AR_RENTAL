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
    console.log(h);
    h >= 6 ? firestore.collection("Cars").where("city", "==", city)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var div = document.createElement('div');
                div.className = 'section';
                doc.data().packageType == "Base" ? (km = 120) : (km = 'unlimited');
                doc.data().status == "Available" ?
                    div.innerHTML = '<div class="section-center"><div class="container"><div class="search-car"><div class="row"><div class="col-md-4 car-image"> <img src="' + doc.data().carImageURL + '\" alt="" srcset=""></div><div class="col-md-5 car-details"><h3>' + doc.data().companyName + '\ || ' + doc.data().modelName + '\</h3><h5>Rs. ' + Math.ceil(h*doc.data().amount_hr) + '\</h5><p>' + km + '\ KMs Free || Rs.' + doc.data().excessKM + '\ /excessKM</p><ul><li>' + doc.data().transmission + '\</li><li>' + doc.data().packageType + '\</li><li>' + doc.data().type + '\</li><li>' + doc.data().seats + '\ Seats</li></ul></div><div class="col-md-3 button-search"> <button type="submit" class="btn btn-primary" onclick="bookcar(\''+  doc.data().carID.toString()+'\',\''+h+'\',\'' +p+'\',\''+d+'\',\''+city+'\')">Book</button></div></div></div></div></div>'

                    :
                    div.innerHTML = '<div class="section-center"><div class="container"><div class="search-car"><div class="row"><div class="col-md-4 car-image"> <img src="' + doc.data().carImageURL + '\" alt="" srcset=""></div><div class="col-md-5 car-details"><h3>' + doc.data().companyName + '\ || ' + doc.data().modelName + '\</h3><h5>Rs. ' + Math.ceil(h*doc.data().amount_hr) + '\</h5><p>' + km + '\ KMs Free || Rs. ' + doc.data().excessKM + '\ /excessKM</p><ul><li>' + doc.data().transmission + '\</li><li>' + doc.data().packageType + '\</li><li>' + doc.data().type + '\</li></ul></div><div class="col-md-3 button-search"> <button type="disabled" class="btn">Not Available</button></div></div></div></div></div>';
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