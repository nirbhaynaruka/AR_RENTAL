window.onload = function () {
    var params = {};
    var pa = window.location.href.split("?")[1].split("&");
    for (var i in pa) {
        x = pa[i].split("=");
        params[x[0]] = x[1];
    }
    // console.log(JSON.stringify(params));
    var orderid = Object.values(params)[0];
    var paymentid = Object.values(params)[1];
    var email = Object.values(params)[2];
    var mobile = Object.values(params)[3];
    var amountpaid = Object.values(params)[4];
    var bookingtime = Object.values(params)[5];
    var div = document.createElement('div');
    div.className = 'success_details';
    div.innerHTML = '<table class="table" id="table"><tbody><tr><td class="font-weight-bold">OrderID</td><td class="text-right">'+orderid+'\
    </td></tr><tr><td class="font-weight-bold">Payment ID</td><td class="text-right">'+paymentid+'\
    </td></tr><tr><td class="font-weight-bold">Email</td><td class="text-right">'+email+'\
    </td></tr><tr><td class="font-weight-bold">Mobile</td><td class="text-right">'+mobile+'\
    </td></tr><tr><td class="font-weight-bold">Amount Paid</td><td class="text-right">'+amountpaid+'\
    </td></tr><tr><td class="font-weight-bold">Booking Time</td><td class="text-right">'+new Date(parseInt(bookingtime))+'\</td></tr></tbody></table>'
    document.getElementById('successpage').appendChild(div);

}