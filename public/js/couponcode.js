var Coupon = 0;

function checkcoupon(city) {
    var couponcode = document.getElementById("couponCode").value.toUpperCase();
    
    firestore.collection("CouponCodes").where("city", "==", city).where("couponCode", "==", couponcode)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                document.getElementById('coupon').style.display = "block";
                document.getElementById('couponCharge').style.display = "block";
                document.getElementById("couponCharge").innerHTML = "- ₹" + parseInt((couponc * doc.data().finalAmount) / 100);
                Coupon = parseInt((couponc * doc.data().finalAmount) / 100);
                document.getElementById("netpayable").innerHTML = "₹" +  (netpayable - parseInt(Coupon));
                // console.log(doc.id, " => ", doc.data(), doc.data().finalAmount);
            });

        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

async function bookcar(e) {
    // coupon == null ? coupon = 0 : coupon;
    var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date(dropDate));
    console.log(typeof (myTimestamp));
    var orderId = Date.now().toString();
    var address = document.getElementById("fleet").value;
    var userphone;
    var walletcharge = 0;
    var userName;
    var dropDate1 = firebase.firestore.Timestamp.fromDate(new Date(dropDate));
    var pickDate1 = firebase.firestore.Timestamp.fromDate(new Date(pickDate));
    await firestore.collection("users").doc(email_id).get().then(function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data();
            userName = myData.name;
            userphone = myData.phone;
            walletcharge = myData.mywalletmoney;
            console.log(userphone);
        }
    }).catch(function (error) {
        console.log("got an error" + error);
    });

     await console.log(couponc, orderId, carid, modelName,
                "address" + address,
                "carImageurl" + carImageURL,
                "carName" + companyName,
                "couponCharge" + parseInt(Coupon),
                "dropDate" + dropDate1,
                "excessKM" + excessKM,
                "extraCharge" + 0,
                "orderId" + orderId,
                "pickupDate" + pickDate1,
                "security" + 500,
                "status" + "incoming",
                "total" + (netpayable - parseInt(Coupon) - walletcharge),
                "user" + email_id,
                "userphoneno" + userphone, "walletcharge" + walletcharge);

    var options = {
        "key": "rzp_test_NKlINcf4dh5TQX", // Enter the Key ID generated from the Dashboard
        "amount": (netpayable - parseInt(Coupon) - walletcharge) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "AR Rental Car",
        "description": "Wallet Charge Deducted (-₹"+ walletcharge+")",
        // "image": "https://example.com/your_logo",
        // "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": async function (response) {
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)
           
            await firebase.firestore().collection("users").doc(email_id).collection("orders").doc(orderId).set({
                    "address": address,
                    "baseCharge": couponc,
                    "bookingTime": parseInt(orderId),
                    "bookingcarId": carid,
                    "bookingmodel": modelName,
                    "carImageurl": carImageURL,
                    "carName": companyName,
                    "couponCharge": parseInt(Coupon),
                    "dropDate": dropDate1,
                    "excessKM": excessKM,
                    "extraCharge": 0,
                    "orderId": parseInt(orderId),
                    "pickupDate": pickDate1,
                    "security": 500,
                    "status": "incoming",
                    "total": parseFloat(netpayable - parseInt(Coupon) - walletcharge),
                    "user": email_id,
                    "userphoneno": userphone,
                    "walletcharge": walletcharge,
                    "paymentID": response.razorpay_payment_id,
                })
                .then(async () => {
                    await proceedreferral(email_id);

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
                    "couponCharge": parseFloat(Coupon),
                    "dropDate": dropDate1,
                    "excessKM": excessKM,
                    "extraCharge": 0,
                    "orderId": parseInt(orderId),
                    "pickupDate": pickDate1,
                    "security": 500,
                    "status": "incoming",
                    "total": parseFloat(netpayable - parseInt(Coupon) - walletcharge),
                    "user": email_id,
                    "userphoneno": userphone,
                    "walletcharge": walletcharge,
                    "paymentID": response.razorpay_payment_id,
                })
                .then(() => {
                    window.location.href = "successPage.html" +
                        "?OrderID=" +
                        orderId +
                        "&Payment ID=" +
                        response.razorpay_payment_id +
                        "&Email=" +
                        email_id +
                        "&Mobile=" +
                        userphone +
                        "&Amount Paid=" +
                        parseFloat(netpayable - parseInt(Coupon) - walletcharge) + "&Booking Time=" + orderId;
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        },
        "prefill": {
            "name": userName,
            "email": email_id,
            "contact": userphone
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#494f9d"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response){
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
            window.location.href = "failurePage.html";
    });

    rzp1.open();
    e.preventDefault();

}

async function proceedreferral(email_id) {
    await firebase.firestore()
        .collection("users")
        .doc(email_id)
        .get()
        .then(function (doc) {
            if (doc && doc.exists) {
                const myData = doc.data();
                referral = myData.referral;
                referralused = myData.referralused;
                bookingCount = myData.bookingCount;
                firebase.firestore()
                    .collection("users")
                    .doc(email_id).update({
                        "bookingCount": bookingCount + 1
                    })
                console.log("booking..");
            }
        }).catch(function (error) {
            console.log("got an error" + error);
        });

    await checkreferral(referral, email_id);
}

async function checkreferral(referral, email_id) {
    console.log("check refe.." + referral);

    var referralUser;
    await firebase.firestore()
        .collection("referrals").where("referrals", "==", referral)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                referralUser = doc.data().user;
                console.log(doc.data());
            });
        }).catch(function (error) {
            console.log("got an error" + error);
        });
    await updatewallet(referralUser, email_id);
    // } catch (e) {
    //     print(e);
    // }
}
async function updatewallet(referralUser, email_id) {
    var usermoney, referralused;
    console.log(email_id);
    console.log("update wallet.." + referralUser);

    await firebase.firestore()
        .collection("users")
        .doc(referralUser)
        .get()
        .then(function (doc) {
            if (doc && doc.exists) {
                const myData = doc.data();
                usermoney = myData.mywalletmoney;
                referralused = myData.referralused;
                console.log("update wallet done.." + usermoney, referralused);

            }
        }).catch(function (error) {
            console.log("got an error" + error);
        });

    await firebase.firestore()
        .collection("users")
        .doc(referralUser).update({
            "mywalletmoney": usermoney + 50,
            "referralused": referralused + 1,
        }).then(() => {
            usermoney = 0;
            referralused = 0;
            firebase.firestore()
                .collection("users")
                .doc(email_id).update({
                    "referral": "referralUsed",
                    "mywalletmoney": 50
                });
            console.log("update wallet 50.." + usermoney, referralused);

            referral = "referralUsed";
        })

    // FirebaseFirestore.instance.collection("users").doc(referralUser).update({
    //   "mywalletmoney": usermoney + 500,
    //   "referralused": referralused + 1,
    // }).then((value) {
    //   setState(() {
    //     usermoney = 0;
    //     referralused = 0;
    //     FirebaseFirestore.instance
    //         .collection("users")
    //         .doc(loggedInUser.email)
    //         .update({"referral": "referralUsed", "mywalletmoney": 50});
    //     referral = "referralUsed";
    //   });
    // });
}