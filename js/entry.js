function register(e) {
    var data = $('#signUpForm').serialize();
    $.ajax({
        type: "POST",
        url: "../php/registerPage.php",
        data: data,
        success: function (response) {
            var res = JSON.parse(response);
            var errmsg = document.getElementById('errmsg');

            if(res.status == 200){
                window.location.replace("loginPage.html");
            }else if(res.status == 401){
                errmsg.innerText = "Input all fields"
            }else if(res.status == 402){
                errmsg.innerText = "Password not Match"
            }else{
                errmsg.innerText = "Email Already Exist"
            }
        }

    });
    e.preventDefault();
}

function login(e) {
    var data = $('#signInForm').serialize();
    $.ajax({
        type: "GET",
        url: "../php/login.php",
        data: data,
        success: function (response) {
            var res = JSON.parse(response);
            var err = document.getElementById('errmsg');
            if(res.status == 200){
                if(res.data.role == 'admin'){
                    window.location.replace("Admin/admin_dashboard.html");
                }else{
                    window.location.replace("RegularUser/userFacilities.html");
                }
            }else if(res.status == 400){
                err.innerText = "Input all fields";
            }
            else if(res.status == 401){
                err.innerText = "Password not matched";
            }else if(res.status == 402){
                err.innerText = "Account does not exist";
            }else{
                err.innerText = "Account does not exist";
            }


        }

    });
    e.preventDefault();
}

