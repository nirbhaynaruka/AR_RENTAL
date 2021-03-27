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
            // getDoc(user.email);
            window.email_id = user.email;
            // console.log(email_id);
        }
    } else {
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
    }
});

window.onload = function () {

    var params = {};
    // console.log(window.location.href);
    var pa = window.location.href.split("?")[1].split("&");
    for (var i in pa) {
        x = pa[i].split("=");
        params[x[0]] = x[1];
    }
    console.log(JSON.stringify(params));
    var carID = Object.values(params)[0];
    var totaltime = parseInt(Object.values(params)[1]);
    var pickup = Object.values(params)[2];
    var drop = Object.values(params)[3];
    var city = Object.values(params)[4];

    var pick = pickup.replaceAll("%20", " ");

    var dropD = drop.replaceAll("%20", " ");


    // console.log(pick);

    const m = new Date(pick);
    const n = new Date(dropD);

    // var p = pickupDate.replace(" (India Standard Time)", "");
    var pickDateString =
        m.getFullYear() +
        "/" +
        ("0" + (m.getMonth() + 1)).slice(-2) +
        "/" +
        ("0" + m.getDate()).slice(-2) +
        " " +
        ("0" + m.getHours()).slice(-2) +
        ":" +
        ("0" + m.getMinutes()).slice(-2) +
        ":" +
        ("0" + m.getSeconds()).slice(-2);
    var dropDateString =
        n.getFullYear() +
        "/" +
        ("0" + (n.getMonth() + 1)).slice(-2) +
        "/" +
        ("0" + n.getDate()).slice(-2) +
        " " +
        ("0" + n.getHours()).slice(-2) +
        ":" +
        ("0" + n.getMinutes()).slice(-2) +
        ":" +
        ("0" + n.getSeconds()).slice(-2);
    // document.getElementById("pickupDate").innerHTML = pickDateString;
    // document.getElementById("dropDate").innerHTML = dropDateString;
    // document.getElementById("hours").innerHTML = totaltime;
    var Coupon = 0;
    firestore.collection("Cars").where("carID", "==", carID)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var div = document.createElement('div');
                div.className = 'row'; {
                    firestore.collection("CityFleet").doc(doc.data().city)
                        .get().then(function (doc1) {
                            if (doc1 && doc1.exists) {
                                const myData = doc1.data();
                                // var i =(myData.fleet).length;
                                for (var i = 0; i < (myData.fleet).length; i++) {
                                    var option = document.createElement('option');
                                    option.value = myData.fleet[i];
                                    option.innerHTML = myData.fleet[i];
                                    document.getElementById('fleet').appendChild(option);
                                    console.log(myData.fleet[i]);
                                }
                            }
                        }).catch(function (error) {
                            console.log("got an error" + error);
                        })
                }


                doc.data().packageType == "Base" ? (km = 120) : (km = 'unlimited');
                couponc = (Math.ceil(totaltime * doc.data().amount_hr))
                netpayable = (Math.ceil(totaltime * doc.data().amount_hr) + 2000 - Coupon);
                excessKM = doc.data().excessKM;
                companyName = doc.data().companyName;
                carImageURL = doc.data().carImageURL;
                modelName = doc.data().modelName;
                carid = doc.data().carID;
                dropDate = dropDateString;
                pickDate = pickDateString;
                console.log(".."+Coupon);

                div.innerHTML = '<div class="left_side col-md-5"><div class="car_img"> <img src="' + doc.data().carImageURL + '\" alt="" srcset="" /></div><div class="necessary_details included"><h4 class="text-uppercase text-underline">Included</h4><ul class="text-uppercase"><li>VEHICLE INSURANCE (USER+3RD PARTY)</li><li>TOEING AND IMPOUNDING (CAUSED BY VEHICLE FAILURE)</li><li>MAINTENNANCE AND CLEANING</li><li>24X7 SUPPORT SERVICE</li></ul></div><div class="necessary_details exlcuded"><h4 class="text-uppercase text-underline">EXCLUDED</h4><ul class="text-uppercase"><li>FUEL</li><li>PARKING</li><li>STATE AND TOLL TAXES</li><li>TRAFFIC VOILATIONS AND PENALTIES</li><li>TOEING AND IMPOUNDING (CAUSED BY COUSTOMER FAILURE)</li></ul></div></div><div class="right_side col-md-7"><div class="car_model"><h5>' + doc.data().modelName + '\</h5><h3 class="text-uppercase">' + doc.data().companyName + '\</h3><ul class="text-uppercase"><li><img src="../assets/type.png" width="5%"> ' + doc.data().transmission + '\</li><li><img src="../assets/petrol.png" width="4%">' + doc.data().type + '\</li><li><img src="../assets/seat.png" width="4%"> ' + doc.data().seats + '\ Seat</li></ul></div><div class="booking_details"><div class="row"><div class="col-md-4 booking_para"><ul><li>Pickup Date</li><li>Drop Date</li><li>Hours</li><li>Free KMs</li><li>Package Type</li><li>Type</li><li>Base Charge</li><li id="coupon">Coupon Charge</li><li> Security Deposit <br /> <span>(Refundable within 7 days)</span></li></ul></div><div class="col-md-8 booking_values"><ul><li id="pickupDate">' + pickDateString + '\</li><li id="dropDate">' + dropDateString + '\</li><li id="hours">' + totaltime + '\</li><li id="freeKms">' + km + '\</li><li id="package">' + doc.data().packageType + '\</li><li id="type">' + doc.data().type + '\</li><li id="baseAmount">₹' + Math.ceil(totaltime * doc.data().amount_hr) + '\</li><li id="couponCharge">₹' + Coupon + '\</li><li id="security">2000</li></ul></div></div><div class="select_fleet"><h6>Select Fleet</h6> <select class="text-uppercase" id="fleet" name="fleet"></select></div><div class="coupon"><h6>Coupon Code</h6><div class="form-group"> <input type="text" class="form-control text-uppercase" id="couponCode" placeholder="Coupon Code" /></div> <button class="btn btn-primary" onclick="checkcoupon(\'' + doc.data().city + '\')">Apply</button></div><div class="netAmount"><div class="row"><div class="col-md-6 total_text"><p class="text-uppercase">Net Payable</p></div><div class="col-md-3 total" id="netpayable">₹' +
                    netpayable + '\</div><div class="col-md-3"> <button class="btn btn-primary" id="book" onclick="bookcar()">Book</button></div></div></div></div></div>'
                document.getElementById('booking_page').appendChild(div);
                console.log(".."+Coupon);

            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });


}
// amount_hr: 149
// amount_min: 2.4833333333333334
// bookingCount: 0
// carID: "BOLEROJHUB"
// carImageURL: "https://firebasestorage.googleapis.com/v0/b/ar-carrental.appspot.com/o/Car-Image%2FBOLEROJHUB?alt=media&token=c52cd59a-174c-412c-83b4-fdfbc5aacd36"
// city: "GUDHA"
// companyName: "Mahindra"
// excessKM: 10
// modelName: "Bolero power +"
// packageType: "Base"
// regNo: "RJ18TA3746"
// seats: 7
// status: "Available"
// transmission: "Manual"
// type: "Diesel"
// uploadTime: "2021-03-14 02:17:18"
// uploader: null