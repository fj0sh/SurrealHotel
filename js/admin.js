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

function cardDisplay(){
    $.ajax({
        type: "GET",
        url: "../../php/adminDbCards.php",
        data: "",
        success: function (response) {
            var res = JSON.parse(response);
            console.log(res);

            var cardCont = document.querySelector(".d-content-card");

            var template = ` <div class="d-card">
                                    <p>View Users</p>
                                    <div class="card-below">
                                    <i class="fa-solid fa-users"></i>
                                    <p id="usersTotal">${res.totalguest}</p>
                                    </div>
                                </div>
                                <div class="d-card">
                                    <p>Booked Room</p>
                                    <div class="card-below">
                                    <i class="fa-solid fa-list-check"></i>
                                    <p id="bookedRooms">${res.totalbooked}</p>
                                    </div>        
                                </div>
                                <div class="d-card">
                                    <p>Available Room</p>
                                    <div class="card-below">
                                    <i class="fa-solid fa-door-open"></i>
                                    <p id="avRooms">${res.availableRooms}</p>
                                    </div>    
                                </div>
                                <div class="d-card">
                                    <p>Feedback</p>
                                    <div class="card-below">
                                    <i class="fa-regular fa-message"></i>
                                    <p id="feedbacks">${res.totalFeedback}</p>
                                    </div>
                            </div>`
                            ;    

            cardCont.insertAdjacentHTML('beforeend',template);
        }
    });
}

function displayUserDb(){
    $.ajax({
        type:"GET",
        url: "../../php/userInfoDb.php",
        data:"",
        success: function(response){
            var res = JSON.parse(response);
            console.log(res);

            var userCont = document.getElementById('userTable');
            res.map(users => {
                var template = `
                                <tr>
                                    <td>${users.firstName} ${users.lastName}</td>
                                    <td>${users.email}</td>
                                    <td>${users.dateOfBirth}</td>
                                    <td>${users.address}</td>
                                </tr>`

                userCont.insertAdjacentHTML('beforeend', template);
            })
        }
    })
}

function displayFeedbackDb(){
    $.ajax({
        type:"GET",
        url: "../../php/dbFeedback.php",
        data:"",
        success: function(response){
            var res = JSON.parse(response);
            console.log(res);

            var userCont = document.getElementById('feedbackDb');
            res.map(feedback => {
                var template = `
                                <tr>
                                    <td>${feedback.message}</td>
                                </tr>`

                userCont.insertAdjacentHTML('afterbegin', template);
            })
        }
    })
}

function feedbackDisplay(){
    $.ajax({
        type:"GET",
        url: "../../php/feedback.php",
        data:"",
        success: function(response){
            var res = JSON.parse(response);
            console.log(res);

            var userCont = document.getElementById('feedback-cont');
            res.data.map(feedbacks => {
                var template = `<div class="msg-cnt">
                                    <ul>
                                    <li>${feedbacks.firstName} ${feedbacks.lastName}</li>
                                    <li>${feedbacks.dateUploaded}</li>
                                    </ul>
                                    <p>${feedbacks.message}</p>
                                </div>`
                userCont.insertAdjacentHTML('afterbegin', template);
            })
        }
    })
}

function displayRooms(){
    $.ajax({
        type:"GET",
        url: "../../php/displayRooms.php",
        data:"",
        success: function(response){
            var res = JSON.parse(response);
            console.log(res);

            var userCont = document.getElementById('roomsCont');
            res.map(rooms => {
                var template = `<tr>
                                    <td style="display:none;">${rooms.room_id}</td>
                                    <td>${rooms.roomNumber}</td>
                                    <td>${rooms.roomType}</td>
                                    <td><i class="fa-solid fa-peso-sign"></i>${rooms.price}</td>
                                    <td>${rooms.guestLimit}</td>
                                    <td>${rooms.status}</td>
                                    <td class="inventory-btn">
                                    <button onclick="updateModal(this)">Update</button>
                                    </td>
                                </tr>`

                userCont.insertAdjacentHTML('beforeend', template);
            })
        }
    })
}

function updateModal(button){
  
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    span.onclick = function() {
    modal.style.display = "none";
    }

    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }

    var roomId = button.parentNode.parentNode.cells[0].textContent
    var roomNum = button.parentNode.parentNode.cells[1].textContent
    var roomType = button.parentNode.parentNode.cells[2].textContent
    var roomLimit = button.parentNode.parentNode.cells[3].textContent
    var roomPrice = button.parentNode.parentNode.cells[4].textContent

    document.getElementById('roomId').value = roomId;    
    document.getElementById('roomNumber').value = roomNum;
    document.getElementById('roomType').value = roomType;
    document.getElementById('roomLimit').value = roomPrice;
    document.getElementById('roomPrice').value = roomLimit;

}

function updateRooms(){
    var data = $('#updateForm').serialize();
    $.ajax({
        type:"POST",
        url: "../../php/updateRooms.php",
        data:data,
        success: function(response){
            var res = JSON.parse(response);
            console.log(res);

        }
    })
}

function displayPendingBooked() {
    $.ajax({
        type: "POST",
        url: "../../php/displayBooking.php",
        data: "",
        success: function (response) {
            var res = JSON.parse(response);
            var table = document.getElementById('bookingTable');
            console.log(res);

            // Check if res is defined and contains data
            if (res && res.length > 0) {
                res.map(data => {
                    var template = `<tr>
                                        <td style="display:none;">${data.booking_id}</td>
                                        <td>${data.firstName} ${data.lastName}</td>
                                        <td>${data.checkInDate}</td>
                                        <td>${data.checkOutDate}</td>
                                        <td>${data.roomNumber}</td>
                                        <td>${data.roomType}</td>
                                        <td>${data.numberOfGuests}</td>
                                        <td class='bookingStatus'>${data.status}</td>
                                        <td class='booking-btn'>
                                            <button class='accept' onclick='acceptConfirmation(this)'>Accept</button>
                                            <button class='declinebtn' onclick='declineConfirmation(this)'>Decline</button>
                                        </td>
                                    </tr>`;

                    table.insertAdjacentHTML('beforeend', template);
                });

                const bookingStats = document.querySelectorAll(".bookingStatus");
                const declineBtns = document.querySelectorAll(".declinebtn");
                const acceptBtns = document.querySelectorAll(".accept");

                bookingStats.forEach((bookingStat, index) => {
                    if (bookingStat.textContent === "booked") {
                        declineBtns[index].style.display = "none";
                        acceptBtns[index].disabled = true;
                    }
                });
            } else {
                console.error("No booking data found");
            }
        }
    });
}





function acceptBooking(button){
    var booking_id = "booking_id= "+ button.parentNode.parentNode.cells[0].innerText;
    $.ajax({
        type:"POST",
        url: "../../php/acceptBooking.php",
        data: booking_id,
        success: function(){
            alert("Booking Successfully Accepted")            
        }
    });

}

function declineBooking(button){
    var booking_id = "booking_id= "+ button.parentNode.parentNode.cells[0].innerText;
    $.ajax({
        type:"POST",
        url: "../../php/declineBooking.php",
        data: booking_id,
        success: function(){
            alert("Booking Successfully Declined")
        }
    });
}

function declineConfirmation(button){
    var decline = window.confirm("Decline??");

    if(decline){
        declineBooking(button);
        location.reload();
    }
}
function acceptConfirmation(button){
    var accept = window.confirm("accept??");

    if(accept){
        acceptBooking(button);
        location.reload();
    }
}

function checkoutBooking(){
    $.ajax({
        type:"POST",
        url: "../../php/checkout.php",
        data:"",
        success: function(){
            console.log("checkout running.......")            
        }
    });
}
setInterval(checkoutBooking, 10000);

function displayFeedback(){
    $.ajax({
        type:"GET",
        url: "../../php/displayFeedback.php",
        data:"",
        success: function(response){
        var res = JSON.parse(response);
        var feedbackCont = document.getElementById("feedback-cont");
        
        res.data.map(data =>{
        var template = `<div class="msg-cnt">
                            <div class="header">
                                <h3>${data.firstName} ${data.lastName}</h3>
                                <p>${data.dateUploaded}</p>
                            </div>
                            <div class="message">
                                <h4>${data.title}</h4>
                                <p style="word-wrap:break-word;">${data.message}</p>
                            </div>
                        </div>`

        
        feedbackCont.insertAdjacentHTML('afterbegin', template);
        });

        }
    });
    e.preventDefault();
}

function logout(e){
    $.ajax({
        type:"POST",
        url: "../../php/logout.php",
        data: "",
        success: function(){
           window.location.replace("../loginPage.html");            
        }
    });
    e.preventDefault();
}




function displayDb(){
    cardDisplay();
    displayRooms();
    displayUserDb();
    displayFeedbackDb();
    displayPendingBooked();
    displayFeedback();
}


