function checkcoupon(city) {
    var couponcode = document.getElementById("couponCode").value;
    
    firestore.collection("CouponCodes").where("city", "==", city).where("couponCode", "==", couponcode)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                document.getElementById("couponCharge").innerHTML = "-" + (couponc * doc.data().finalAmount) / 100;
                coupon = (couponc * doc.data().finalAmount) / 100;
                document.getElementById("netpayable").innerHTML = (netpayable - coupon);
                // console.log(doc.id, " => ", doc.data(), doc.data().finalAmount);
            });

        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

async function bookcar() {
    console.log(email_id);
    var orderId = Date.now().toString();
    var address = document.getElementById("fleet").value;
    var userphone;
    var walletcharge = 0;
    await firestore.collection("users").doc(email_id).get().then(function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data();
            userphone = myData.phone;
            walletcharge = myData.mywalletmoney;
            console.log(userphone);
        }
    }).catch(function (error) {
        console.log("got an error" + error);
    })
    await console.log(couponc, orderId, carid, modelName,
        "address" + address,
        "carImageurl" + carImageURL,
        "carName" + companyName,
        "couponCharge" + coupon,
        "dropDate" + dropDate,
        "excessKM" + excessKM,
        "extraCharge" + 0,
        "orderId" + orderId,
        "pickupDate" + pickDate,
        "security" + 2000,
        "status" + "incoming",
        "total" + (netpayable - coupon - walletcharge),
        "user" + email_id,
        "userphoneno" + userphone, "walletcharge" + walletcharge);
    await firebase.firestore().collection("users").doc(email_id).collection("orders").doc(orderId).set({
            "address": address,
            "baseCharge": couponc,
            "bookingTime": parseInt(orderId),
            "bookingcarId": carid,
            "bookingmodel": modelName,
            "carImageurl": carImageURL,
            "carName": companyName,
            "couponCharge": coupon,
            "dropDate": dropDate,
            "excessKM": excessKM,
            "extraCharge": 0,
            "orderId": parseInt(orderId),
            "pickupDate": pickDate,
            "security": 2000,
            "status": "incoming",
            "total": (netpayable - coupon - walletcharge),
            "user": email_id,
            "userphoneno": userphone,
            "walletcharge": walletcharge,
        })
        .then(() => {
            // window.location.href = "account.html";
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    await firebase.firestore().collection("orders").doc(orderId).set({
            "address": address,
            "baseCharge": couponc,
            "bookingTime": parseInt(orderId),
            "bookingcarId": carid,
            "bookingmodel": modelName,
            "carImageurl": carImageURL,
            "carName": companyName,
            "couponCharge": coupon,
            "dropDate": dropDate,
            "excessKM": excessKM,
            "extraCharge": 0,
            "orderId": parseInt(orderId),
            "pickupDate": pickDate,
            "security": 2000,
            "status": "incoming",
            "total": (netpayable - coupon - walletcharge),
            "user": email_id,
            "userphoneno": userphone,
            "walletcharge": walletcharge,
        })
        .then(() => {
            // window.location.href = "account.html";
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}