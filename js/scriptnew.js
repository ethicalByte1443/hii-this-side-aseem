const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

function sendEmail(){
    const bodyMessage = 'Full Name : ' + fullName.value + ' <br> Email : ' + email.value + ' <br> Phone : ' + phone.value + ' <br> Message : ' + mess.value + ' <br>';

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "example.aseempradhan@gmail.com",
        Password : "EED2A7678BCA76F318139EE31DFE7B6A7906",
        To : 'example.aseempradhan@gmail.com',
        From : "example.aseempradhan@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
      message => {
        if(message== "OK")
        {
            Swal.fire({
                title: "Confirm your Submission?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Confirm",
                denyButtonText: `Change it`
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  Swal.fire("Sent!", "", "success");
                } else if (result.isDenied) {
                  Swal.fire("Changes are not saved", "", "info");
                }
              });
        }
      }
    );
}

function checkInputs(){
    const items = document.querySelectorAll(".item");

    for(const item of items)
    {
        if(item.value == ""){
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if(items[1].value != ""){
            checkEmail();
        }

        items[1].addEventListener("keyup", () => {
            checkEmail();
        });

        item.addEventListener("keyup", () => {
            if(item.value!="")
            {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
            else
            {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }

    
}




function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

    const errorTxtEmail = document.querySelector(".error-txt.email");

    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if (email.value !== "") {
            errorTxtEmail.innerText = "Enter a Valid email address";
        } else {
            errorTxtEmail.innerText = "Email Address can't be blank";
        }
    } else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (
        !fullName.classList.contains("error") &&
        !email.classList.contains("error") &&
        !phone.classList.contains("error") &&
        !subject.classList.contains("error") &&  // Corrected this line
        !mess.classList.contains("error")
    ) {
        sendEmail();

        form.reset();
        return false;
    }
    //sendEmail(); 
})