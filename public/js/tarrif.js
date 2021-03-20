window.onload = function () {
    firestore.collection("Cars")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // alert(querySnapshot.size);
            // for(var i = 0;i<querySnapshot.size;i++){
                var div = document.createElement('div');
                div.className = 'tarrif-cards row';
                for(var i=0;i<2;i++){
                    // alert(div);
                    div.innerHTML = '<div class="col-md-6 tarrif-cards-items"><div class="card"> <img src=\'' + doc.data().carImageURL + '\' class="card-img-top" alt="..." /><div class="card-body"><h2 class="card-title text-uppercase text-center">\'' + doc.data().companyName + '\'</h2><ul class="card-list list-inline text-center"><li class="list-inline-item">\'' + doc.data().modelName + '\'</li><li class="list-inline-item">\'' + doc.data().transmission + '\'</li><li class="list-inline-item">\'' + doc.data().seats + '\' Seat</li></ul><div class="row"><div class="col-md-8"><p>\'' + doc.data().packageType + '\'</p></div><div class="col-md-4"><p>Rs. \'' + doc.data().amount_hr + '\' /hr </p></div></div><p class="card-text text-center"> Rs \'' + doc.data().excessKM + '\' /Excess Km</p></div></div></div>'
                }
                document.getElementById('newtarrifid').appendChild(div);
            // }

                    // document.getElementById("allCars").innerHTML = '<div class="container booking_page"><div class="row"><div class="left_side col-md-6"><div class="car_img"> <img src=\'' + doc.data().carImageURL + '\' alt="carImage" srcset=""></div><div class="necessary_details included"><h4 class="text-uppercase">Included</h4><ul class="text-uppercase"><li>VEHICLE INSURANCE (USER+3RD PARTY)</li><li>TOEING AND IMPOUNDING (CAUSED BY VEHICLE FAILURE)</li><li>MAINTENNANCE AND CLEANING</li><li>24X7 SUPPORT SERVICE</li></ul></div><div class="necessary_details exlcuded"><h4 class="text-uppercase">EXCLUDED</h4><ul class="text-uppercase"><li>FUEL</li><li>PARKING</li><li>STATE AND TOLL TAXES</li><li>TRAFFIC VOILATIONS AND PENALTIES</li><li>TOEING AND IMPOUNDING (CAUSED BY COUSTOMER FAILURE)</li></ul></div></div><div class="right_side col-md-6"><div class="car_model"><h5>\''+ doc.data().modelName + '\'</h5><h3 class="text-uppercase">\'' + doc.data().companyName + '\'</h3><ul class="mr-auto mt-2 mt-lg-0 text-uppercase"><li>\'' + doc.data().transmission + '\'</li><li>\'' + doc.data().type + '\'</li><li>\'' + doc.data().seats + '\'</li></ul></div><div class="booking_details"></div></div></div></div>'

                

                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

}