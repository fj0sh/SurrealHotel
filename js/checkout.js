function checkoutBooking(){
    $.ajax({
        type:"POST",
        url: "../../php/checkout.php.php",
        data: booking_id,
        success: function(){
            console.log("checkout running.......")            
        }
    });
}

setInterval(checkoutBooking, 10000);