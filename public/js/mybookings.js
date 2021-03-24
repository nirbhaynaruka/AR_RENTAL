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
            myfunc(user.email);
            window.email_id = user.email;
            // console.log(email_id);
        }
    } else {
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
    }
});

function myfunc(email_id) {
    console.log("starting..." + email_id);
    firestore.collection("users").doc(email_id).collection("orders").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // alert(querySnapshot.size);
                // for(var i = 0;i<querySnapshot.size;i++){
                    var div = document.createElement('tbody');
                    div.innerHTML = '<tr><td><a href="">' + doc.data().orderId + '\</a></td><td>' + doc.data().carName + '\</td><td>' + new Date(doc.data().orderId).toDateString() + '\</td><td><span class="label " style="color:green;">' + doc.data().status.toUpperCase() + '\</span></td><td><button id="details" onclick="getorder(' + doc.data().orderId + '\)">Details</button></td></tr>'
                    document.getElementById('table').appendChild(div);
                    // }
                // var d = new Date(doc.data().orderId).toDateString();
                // console.log(d);
                // console.log(doc.id, " => ", doc.data());
                // function details(x) {
                //     console.log("incomig..."+x);
                    // document.getElementById("cardetails").innerHTML =
                    //   '<h4>Your booking Details</h4><div class="alert alert-info"> <strong>Need Help!</strong> Call: 0141 4106979</div>Order ID :' + doc.data().orderId + '\ | Transaction ID : 109765506827 | PaidVIA : Unified Payments-UPI | Order Status :<span class="label label-default" style="color:white;background-color:green;">COMPLETED</span> <br> FLEET/Pickup Location: <b>VAISHALI NAGAR(<i>209, Block-A,Nemi Nagar Extension, Vaishali Nagar</i>)</b><hr> Car Name : BREZZA | Seats : 5 | Fuel : 45Ltr | Car type : SUV | Package: BASE | Free KM: 112';
                //   }
          
                //   document
                //     .getElementById("details")
                //     .addEventListener("click", details, true);
            });

        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
};