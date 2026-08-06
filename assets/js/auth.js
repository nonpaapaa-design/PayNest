"use strict";

/* ===================================
   Elements
=================================== */

const loginForm =
    document.getElementById("loginForm");

const registerForm =
    document.getElementById("registerForm");

const passwordInput =
    document.getElementById("password");

const confirmPasswordInput =
    document.getElementById("confirmPassword");

const togglePassword =
    document.getElementById("togglePassword");

const toggleConfirmPassword =
    document.getElementById("toggleConfirmPassword");

/* ===================================
   Toggle Password
=================================== */

if(togglePassword && passwordInput){

    togglePassword.onclick = ()=>{

        const show =
            passwordInput.type === "password";

        passwordInput.type =
            show ? "text" : "password";

        togglePassword.innerHTML =
            show
            ? '<i class="fa-solid fa-eye-slash"></i>'
            : '<i class="fa-solid fa-eye"></i>';

    };

}

if(toggleConfirmPassword && confirmPasswordInput){

    toggleConfirmPassword.onclick = ()=>{

        const show =
            confirmPasswordInput.type === "password";

        confirmPasswordInput.type =
            show ? "text" : "password";

        toggleConfirmPassword.innerHTML =
            show
            ? '<i class="fa-solid fa-eye-slash"></i>'
            : '<i class="fa-solid fa-eye"></i>';

    };

}

/* ===================================
   Validation
=================================== */

function isValidEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}
/* ===================================
   Register Firebase
=================================== */

if(registerForm){

    registerForm.addEventListener("submit", async (event)=>{

        event.preventDefault();

        const fullname =
            document.getElementById("fullname").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            passwordInput.value;

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

        try{

            const userCredential =

                await auth.createUserWithEmailAndPassword(

                    email,

                    password

                );

            await db
                .collection("users")
                .doc(userCredential.user.uid)
                .set({

                    fullname,

                    email,

                    createdAt:

                        firebase.firestore.FieldValue.serverTimestamp()

                });

            PayNest.showToast(

                "สมัครสมาชิกสำเร็จ",

                "success"

            );

            setTimeout(()=>{

                location.href =

                    "dashboard.html";

            },1000);

        }catch(error){

            PayNest.showToast(

                error.message,

                "danger"

            );

        }

    });

}
/* ===================================
   Firebase Login
=================================== */

if(loginForm){

    loginForm.addEventListener("submit", async (event)=>{

        event.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            passwordInput.value;

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

        try{

            await auth.signInWithEmailAndPassword(

                email,

                password

            );

            const remember =
                document.getElementById("remember");

            if(remember && remember.checked){

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

                "เข้าสู่ระบบสำเร็จ",

                "success"

            );

            setTimeout(()=>{

                location.href =
                    "dashboard.html";

            },800);

        }catch(error){

            PayNest.showToast(

                error.message,

                "danger"

            );

        }

    });

}
/* ===================================
   Auth State
=================================== */

auth.onAuthStateChanged((user)=>{

    if(user){

        console.log(

            "Login:",

            user.email

        );

    }else{

        console.log(

            "Not Login"

        );

    }

});
/* ===================================
   Logout
=================================== */

async function logout(){

    try{

        await auth.signOut();

        location.href = "login.html";

    }catch(error){

        PayNest.showToast(

            error.message,

            "danger"

        );

    }

}
