const contactBtn = document.getElementById("contactBtn");
const closeBtn = document.getElementById("closeBtn");
const closeCookieBtn = document.getElementById("closeCookieBtn");
const acceptBtn = document.getElementById("acceptBtn");
const declineBtn = document.getElementById("declineBtn");
const successModal = document.getElementById("success");
const inputs = document.contactForm.getElementsByTagName("input");
const successBtn = document.getElementById("successBtn");
const warning = document.getElementById("warning");
const contactBtns = document.getElementsByClassName("contactBtn");
const header = document.getElementById("header");
const headerMenu = document.getElementById("headerMenu");





document.addEventListener('scroll', function() {
    if (document.documentElement.scrollTop > 110) {
        header.classList.add('sticky');
        headerMenu.style.display = ('none');
    }
    else {
        header.classList.remove('sticky');
        headerMenu.style.display = ('block');
    }
})


Array.from(contactBtns).forEach(function(btn) {
    btn.addEventListener('click', function() {
        const popUp = document.getElementById('popUp');
        popUp.showModal();
    })
})

successBtn.onclick = function() {
    successModal.close();
}

closeCookieBtn.onclick = function() {
    warning.style.display = 'none';
}

acceptBtn.onclick = function() {
    warning.style.display = 'none';
}

declineBtn.onclick = function() {
    warning.style.display = 'none';
}

closeBtn.onclick = function() {
    successModal.close();
}



contactBtn.onclick = function() {
    const popUp = document.getElementById('popUp');
    popUp.showModal();
   
}

const contactForm = document.getElementById('contactForm');





contactForm.addEventListener('submit', function(event) {
    

    event.preventDefault();
    document.querySelectorAll(".validityError").forEach(el => el.remove());
    document.querySelectorAll(".validityErrorAll").forEach(el => el.remove());

    for (let i = 0; i<=2; i++) {
        let input = inputs[i];
        input.style.borderColor = '#F1F1F1';
    }
  
    let isNotEmpty = true;
    let isEmailValid = false;
    let isPhoneValid = false;


    
    for (let i = 0; i <= 2; i++) {

        let input = inputs[i];
        if (input.value === '') {
            let errorMsg = document.createElement('span');
            errorMsg.className = "validityError";
            errorMsg.innerHTML = "This field is required."
            input.after(errorMsg);
            input.style.borderColor = '#EC1211';
            isNotEmpty = false;
        }

        
        }

        if (!isNotEmpty) {
            let errorMsg = document.createElement('span');
            errorMsg.className = "validityErrorAll";
            errorMsg.innerHTML = "Please fill in all required fields"
            inputs[4].after(errorMsg);
        }

        if (inputs[2].value) {
            if (/\+7\s\(\d{3}\)\s\d{3}\s\d{4}/.test(inputs[2].value)) {
                isPhoneValid = true;
            }
            else {
            isPhoneValid = false;
            let errorMsg = document.createElement('span');
            errorMsg.className = "validityError";
            errorMsg.innerHTML = "Invalid phone number."
            inputs[2].after(errorMsg);
            inputs[2].style.borderColor = '#EC1211';
            
            }

        }

        if (inputs[1].value) {
            if (/^\S+@\S+\.\S+$/.test(inputs[1].value)) {
                isEmailValid = true;
            }
            else {
            let errorMsg = document.createElement('span');
            errorMsg.className = "validityError";
            errorMsg.innerHTML = "Invalid email."
            inputs[1].after(errorMsg);
            inputs[1].style.borderColor = '#EC1211';
            isEmailValid = false;
            }

        }

        
        let isValid = isNotEmpty && isEmailValid && isPhoneValid;

     
        
    

    if (isValid) {
        
       popUp.close();
       setTimeout(() => success.showModal(), 1);
    }
    }
)


window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.tel'), function(input) {
      let keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
          this.value = new_value;
        }
        if (event.type == "blur" && this.value.length < 5) {
          this.value = "";
        }
      }
  
      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);
  
    });
  
  });