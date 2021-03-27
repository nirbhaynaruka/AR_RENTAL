window.onload = function () {
    var params = {};
    var pa = window.location.href.split('?')[1].split('&');
    for (var i in pa) {
        x = pa[i].split('=');
        params[x[0]] = x[1];
    }
    console.log(JSON.stringify(params));
    var city = Object.values(params)[0];
    document.getElementById("city").value = city;
    getCars();
}

function getCars() {
    var city = document.getElementById("city").value;
    console.log("..."+city);
    firestore.collection("Cars").where("city", "==", city)
        .get()
        .then((querySnapshot) => {
           if(querySnapshot){

               querySnapshot.forEach((doc) => {
                   var div = document.createElement('div');
                   div.className = 'tarrif-cards row';
                   // for (var i = 0; i < 2; i++) {
                       div.innerHTML = '<div class="col-md-9 tarrif-cards-items"><div class="card"> <img src=\'' + doc.data().carImageURL + '\' class="card-img-top" alt="..." /><div class="card-body"><h2 class="card-title text-uppercase text-center"> ' + doc.data().companyName + '\</h2><ul class="card-list list-inline text-center"><li class="list-inline-item">' + doc.data().modelName + '\</li><li class="list-inline-item">' + doc.data().transmission + '\</li><li class="list-inline-item">' + doc.data().seats + '\ Seat</li></ul><div class="row"><div class="col-md-6"><p>' + doc.data().packageType + '\</p></div><div class="col-md-6"><p>Rs. ' + doc.data().amount_hr + '\ /hr </p></div></div><p class="card-text text-center"> Rs ' + doc.data().excessKM + '\ /Excess Km</p></div></div></div>'
                    //    div.innerHTML = '<p>olalalal</p>'
                       document.getElementById('newtarrifid').appendChild(div);
                       console.log(doc.id, " => ", doc.data());
                    });
                }
                else{
                    console.log("No Cars");
                }
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

}