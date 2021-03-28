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
    div.innerHTML = '<table class="table" id="table"><tbody><tr><td>OrderID</td><td>'+orderid+'\
    </td></tr><tr><td>Payment ID</td><td>'+paymentid+'\
    </td></tr><tr><td>Email</td><td>'+email+'\
    </td></tr><tr><td>Mobile</td><td>'+mobile+'\
    </td></tr><tr><td>Amount Paid</td><td>'+amountpaid+'\
    </td></tr><tr><td>Booking Time</td><td>'+new Date(parseInt(bookingtime))+'\</td></tr></tbody></table>'
    document.getElementById('successpage').appendChild(div);

}