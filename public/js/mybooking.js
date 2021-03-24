function getorder(x) {
    var order = x.toString();
    const docRef = firestore.collection("orders").doc(order);

    docRef.get().then(function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data();
            var carID = myData.bookingcarId;
            const docRef2 = firestore.collection("Cars").doc(carID);
            docRef2.get().then(function (doc1) {
                if (doc1 && doc1.exists) {
                    const mycarData = doc1.data();
            //         console.log(mycarData);
            // console.log(myData.pickupDate);
            document.getElementById("cardetails").innerHTML =
                '<div class="container"><div id="cardetails"><h4>Your booking Details</h4><div class="alert alert-info"> <strong>Need Help!</strong> Call: 0141 4106979</div>Order ID :' +
                myData.orderId + '\ | Transaction ID : ' + myData.orderId +
                '\ | PaidVIA : Unified Payments-UPI | Order Status :<span class="label label-default" style="color:white;background-color:green;">' +
                myData.status + '\</span> <br> FLEET/Pickup Location: <b>' + myData.address +
                '\</b><hr> Car Name : ' + myData.bookingmodel + '\ | Seats : ' + mycarData.seats +
                '\ | Car type : ' + mycarData.companyName + '\ | Package: ' + mycarData.packageType + '\ </div><hr><hr> Security Deposit: ₹' +
                myData.security + '\<br> Base Charge: ₹' + myData.baseCharge +
                '\ <br>Coupon Applied: ₹' + myData.couponCharge + '\ <br>Extra Charge: ₹' + myData
                .extraCharge + '\ <br> Total Charge: ₹' + myData.total +
                '\ <br> Tax: 5% :₹75.65 GST EXCLUDED<br> Final Charge: ₹' + myData.total +
                '\<hr>Assigned Number: <span class="label label-default" style="color:white;background-color:brown;padding:5px;">' +
                mycarData.regNo + '\</span><hr> Booked on : ' + new Date(doc.data().orderId)
                .toDateString() + '\ | Pickup date : ' + myData.pickupDate.toDate() + '\ | Drop date : ' + myData
                .dropDate.toDate() +
                '\<hr><font color="red"> Copy of uploaded photos of vehicle you used , can be found in booking details section of your app or website. Please download it from website otherwise it will be removed within 24HRS from our server. </font> <br><br></div>';

            }
            })
        }
    })

}