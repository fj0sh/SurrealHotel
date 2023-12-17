function getName(){
    $.ajax({
        type: "GET",
        url: "../../php/getUsername.php",
        data:"",
        success:function(response){
            var res = JSON.parse(response);

            var nameCont = document.getElementById("nameCont");
            var fullname = res[0].firstName + " " + res[0].lastName

            nameCont.textContent = fullname;
        }
    })
}

getName();

function roomsModal(button) {

    var bookingModal = document.getElementById('bookingModal');
    var span = document.getElementsByClassName("close")[0];

    bookingModal.style.display = "block";

    span.onclick = function () {
        bookingModal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == bookingModal) {
            bookingModal.style.display = "none";
        }
    }
    console.log(button.value)

    var roomType = document.getElementById('roomType');
    var type = button.value;

    roomType.value = type;

    console.log(roomType)

}


function requestRoom(e) {
    var data = $('#roomForm').serialize();
    console.log(data);
    $.ajax({
        type: "POST",
        url: "../../php/requestBooking.php",
        data: data,
        success: function (response) {
            var res = JSON.parse(response);
            var modal = document.getElementById("bookingModal")

            if (res.status == 200) {
                alert('booked successfully');
                $('#roomForm')[0].reset();
                modal.style.display = "none";
            } else if (res.status == 401) {
                alert('input all fields');
            } else {
                alert('Room Full');
            }
        }

    })
    e.preventDefault();
}

function availabilityCheck() {
    $.ajax({
        type: "GET",
        url: "../../php/roomAvailabiltyCheck.php",
        data: "",
        success: function (response) {
            var res = JSON.parse(response);

            var availableBronzeQueen = res.availablebq;
            var availableBronzeKing = res.availablebk;
            var availableSilverKing = res.availablesk;
            var availableGoldKing = res.availablegk;
            var availableGoldTwin = res.availablegt;

            var bronzeqBtn = document.getElementById("bronzeq-btn");
            var bronzekBtn = document.getElementById("bronzek-btn");
            var silverkBtn = document.getElementById("silverk-btn");
            var goldkBtn = document.getElementById("goldk-btn");
            var goldtBtn = document.getElementById("goldt-btn");

            if (availableBronzeQueen == 0) {
                bronzeqBtn.disabled = true;
                bronzeqBtn.textContent = "Fully Booked";
            }

            if (availableBronzeKing == 0) {
                bronzekBtn.disabled = true;
                bronzekBtn.textContent = "Fully Booked";
            }

            if (availableSilverKing == 0) {
                silverkBtn.disabled = true;
                silverkBtn.textContent = "Fully Booked";
            }

            if (availableGoldKing == 0) {
                goldkBtn.disabled = true;
                goldkBtn.textContent = "Fully Booked";
            }

            if (availableGoldTwin == 0) {
                goldtBtn.disabled = true;
                goldtBtn.textContent = "Fully Booked";
            }
        }
    });
}
function checkoutBooking() {
    $.ajax({
        type: "POST",
        url: "../../php/checkout.php",
        data: "",
        success: function () {
            console.log("checkout running.......")
        }
    });
}
setInterval(checkoutBooking, 10000);

function submitFeedback(e) {
    var data = $("#feedbackForm").serialize();
    $.ajax({
        type: "POST",
        url: "../../php/submitFeedback.php",
        data: data,
        success: function (response) {
            var res = JSON.parse(response);
            var mssg = document.getElementById("mssg");
            if (res.status == 401) {
                mssg.textContent = "Input all fields";
                mssg.style.color = "red";
            } else {
                mssg.textContent = "Feedback Submitted Successfully";
                mssg.style.color = "green";

                $("#feedbackForm")[0].reset();
            }




        }
    });
    e.preventDefault();
}

function displayBookingHistory() {
    $.ajax({
        type: "GET",
        url: "../../php/displayBookingHistory.php",
        data: "",
        success: function(response) {
            var res = JSON.parse(response);
            var table = document.getElementById("historytbl");

            res.data.map(data => {
                var template = `<div>
                                    <tr>
                                        <td>${data.firstName} ${data.lastName}</td>
                                        <td>${data.checkInDate}</td>
                                        <td>${data.checkOutDate}</td>
                                        <td>${data.status}</td>
                                    </tr>
                                </div>`
                
                table.insertAdjacentHTML('beforeend', template);
            });

        }
    });
}

function displayCurrentBooking(){
    $.ajax({
        type: "GET",
        url: "../../php/displayCurrentBooking.php",
        data: "",
        success: function(response) {
            var res = JSON.parse(response);
            var bookedtbl  = document.getElementById("bookedtbl");

            console.log(res);
            res.bookingData.map(data =>{
                var template = `
                <tr>
                    <td style="display:none;">${data.booking_id}</td>
                    <td style="display:none;">${data.room_id}</td>
                    <td>${data.firstname} ${data.lastname}</td>
                    <td>${data.checkInDate}</td>
                    <td>${data.checkOutDate}</td>
                    <td>${data.numberOfGuests}</td>
                    <td>${data.roomNumber}</td>
                    <td>${data.roomType}</td>
                    <td>
                    <button onclick="cancelBooking(this)">Cancel</button>
                    </td>
                </tr>
                `
                bookedtbl.insertAdjacentHTML('beforeend', template);
            });


        }
    });
}


function cancelBooking(button){
    var bookingId = button.parentNode.parentNode.cells[0].innerText;
    var roomId = button.parentNode.parentNode.cells[1].innerText;
    
    console.log(bookingId)
    console.log(roomId)
    
    $.ajax({
        type:"POST",
        url: "../../php/cancelBooking.php",
        data: {roomId:roomId,bookingId:bookingId},
        success: function(response){
            var res = JSON.parse(response);
            console.log(res);
            
            alert("booking cancelled successfully")
            
            
        }
    })
    
}
function confirmCancellation(button){
    var cancellation = window.confirm("Are you sure you want to cancel this booking??");

    if(cancellation){
        cancelBooking(button);
        location.reload();
    }
}

displayCurrentBooking();
displayBookingHistory();
setInterval(availabilityCheck, 1000);
