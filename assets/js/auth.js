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
   Login
=================================== */

if(loginForm){

    loginForm.addEventListener("submit",(event)=>{

        event.preventDefault();

        const email =

            document.getElementById("email").value.trim();

        const password =

            passwordInput.value.trim();

        if(!email || !password){

            PayNest.showToast(

                "กรุณากรอกข้อมูลให้ครบ",

                "warning"

            );

            return;

        }

        PayNest.showToast(

            "เข้าสู่ระบบสำเร็จ (Demo)",

            "success"

        );

    });

}
