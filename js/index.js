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


function broonzeQueenRoomsModal(){
    var bookingModal = document.getElementById('bookingModal');
    var span = document.getElementsByClassName("close")[0];

    bookingModal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        bookingModal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == bookingModal) {
        bookingModal.style.display = "none";
        }
    }
}

function showBookingInformation() {
    var dropdownContent = document.getElementById("book-dropdown");
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    } 
  }

  function showCurrentBookRoom(){
    var CurrentModal = document.getElementById('current-booking');
    var span = document.getElementsByClassName("close")[0];

    CurrentModal.style.display = "block";

    span.onclick = function() {
      CurrentModal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == CurrentModal) {
        CurrentModal.style.display = "none";
      }
    }


  }

  function showBookingHistory(){
    var HistoryModal = document.getElementById('booking-history');
    var span = document.getElementsByClassName("close")[0];
    
    HistoryModal.style.display = "block";

    span.onclick = function() {
      HistoryModal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == HistoryModal) {
        HistoryModal.style.display = "none";
      }
    }

  }

  // slideshow image

  let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");

  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}