"use strict";

/* ===================================
   Auth
=================================== */

const loginForm = document.getElementById("loginForm");

const passwordInput = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

/* ===================================
   Toggle Password
=================================== */

if(togglePassword && passwordInput){

    togglePassword.addEventListener("click",()=>{

        const isPassword =

            passwordInput.type === "password";

        passwordInput.type =

            isPassword ? "text" : "password";

        togglePassword.innerHTML = isPassword

            ? '<i class="fa-solid fa-eye-slash"></i>'

            : '<i class="fa-solid fa-eye"></i>';

    });

}


/* ===================================
   Remember Me
=================================== */

const remember = document.getElementById("remember");

if(remember){

    const savedEmail = localStorage.getItem("paynest-email");

    if(savedEmail){

        document.getElementById("email").value = savedEmail;

        remember.checked = true;

    }

}

/* ===================================
   Email Validation
=================================== */

function isValidEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}

/* ===================================
   Login Submit
=================================== */

if(loginForm){

    loginForm.addEventListener("submit",(event)=>{

        event.preventDefault();

        const email =

            document.getElementById("email").value.trim();

        const password =

            passwordInput.value.trim();

        if(!isValidEmail(email)){

            PayNest.showToast(

                "รูปแบบอีเมลไม่ถูกต้อง",

                "danger"

            );

            return;

        }

        if(password.length < 6){

            PayNest.showToast(

                "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",

                "warning"

            );

            return;

        }

        if(remember.checked){

            localStorage.setItem(

                "paynest-email",

                email

            );

        }else{

            localStorage.removeItem(

                "paynest-email"

            );

        }

        PayNest.showToast(

            "กำลังเข้าสู่ระบบ...",

            "primary"

        );

        /* Firebase Login
           จะเพิ่มในขั้นถัดไป */

    });

}
/* ===================================
   Register
=================================== */

const registerForm = document.getElementById("registerForm");

const confirmPasswordInput =
    document.getElementById("confirmPassword");

const toggleConfirmPassword =
    document.getElementById("toggleConfirmPassword");

/* ---------- Toggle Confirm Password ---------- */

if(toggleConfirmPassword && confirmPasswordInput){

    toggleConfirmPassword.addEventListener("click",()=>{

        const isPassword =
            confirmPasswordInput.type === "password";

        confirmPasswordInput.type =
            isPassword ? "text" : "password";

        toggleConfirmPassword.innerHTML = isPassword
            ? '<i class="fa-solid fa-eye-slash"></i>'
            : '<i class="fa-solid fa-eye"></i>';

    });

}

/* ---------- Register Submit ---------- */

if(registerForm){

    registerForm.addEventListener("submit",(event)=>{

        event.preventDefault();

        const fullname =
            document.getElementById("fullname").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            confirmPasswordInput.value;

        if(fullname.length < 2){

            PayNest.showToast(
                "กรุณากรอกชื่อ-นามสกุล",
                "warning"
            );

            return;

        }

        if(!isValidEmail(email)){

            PayNest.showToast(
                "รูปแบบอีเมลไม่ถูกต้อง",
                "danger"
            );

            return;

        }

        if(password.length < 6){

            PayNest.showToast(
                "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
                "warning"
            );

            return;

        }

        if(password !== confirmPassword){

            PayNest.showToast(
                "รหัสผ่านไม่ตรงกัน",
                "danger"
            );

            return;

        }

        PayNest.showToast(
            "ข้อมูลถูกต้อง พร้อมเชื่อม Firebase",
            "success"
        );

    });

}
