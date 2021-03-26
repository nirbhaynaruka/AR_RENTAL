function referralfunc(email_id) {
    // console.log("oo"+referral);
    firestore.collection("users").doc(email_id).update({
            "myReferral": referral,
        })
        .then(() => {
            window.location.href = "account.html";
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

function updatepass() {
    var user = firebase.auth().currentUser;
    var newPassword = getASecureRandomPassword();

    user.updatePassword(newPassword).then(function () {
        alert("Success");
    }).catch(function (error) {
        alert(error);
    });

}

function myName(email_id) {
    var abc = document.getElementById("inputName1").value;
    console.log(".." + abc + email_id);
    firebase.firestore().collection("users").doc(email_id).update({
            "name": abc,
        })
        .then(() => {
            window.location.href = "account.html";
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });

}

function uploadImage(email_id) {
    const ref = firebase.storage().ref();
    const ref1 = ref.child("users");
    const ref2 = ref1.child(email_id);
    const ref3 = ref2.child("image");
    const file = document.querySelector("#photo").files[0];
    const name = email_id;
    const metadata = {
        contentType: file.type
    };
    const task = ref3.child(name).put(file, metadata);
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            window.location.href = "account.html";
        })
        .catch(console.error);
}