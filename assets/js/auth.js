"use strict";

/* ===================================
   PayNest Premium
   Firebase Authentication
=================================== */

/* ---------- Elements ---------- */

const loginForm = document.getElementById("loginForm");

const registerForm = document.getElementById("registerForm");

const passwordInput = document.getElementById("password");

const confirmPasswordInput =
    document.getElementById("confirmPassword");

const togglePassword =
    document.getElementById("togglePassword");

const toggleConfirmPassword =
    document.getElementById("toggleConfirmPassword");

/* ---------- Toggle Password ---------- */

function toggleInput(input, button){

    if(!input || !button) return;

    const show = input.type === "password";

    input.type = show ? "text" : "password";

    button.innerHTML = show
        ? '<i class="fa-solid fa-eye-slash"></i>'
        : '<i class="fa-solid fa-eye"></i>';

}

if(togglePassword){

    togglePassword.addEventListener("click",()=>{

        toggleInput(passwordInput,togglePassword);

    });

}

if(toggleConfirmPassword){

    toggleConfirmPassword.addEventListener("click",()=>{

        toggleInput(

            confirmPasswordInput,

            toggleConfirmPassword

        );

    });

}

/* ---------- Validation ---------- */

function isValidEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}

function showError(message){

    PayNest.showToast(

        message,

        "danger"

    );

}

function showSuccess(message){

    PayNest.showToast(

        message,

        "success"

    );

}
/* ===================================
   Register
=================================== */

if(registerForm){

    registerForm.addEventListener("submit", async (e)=>{

        e.preventDefault();

        const fullname =
            document.getElementById("fullname").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            passwordInput.value;

        const confirmPassword =
            confirmPasswordInput.value;

        if(fullname.length < 2){

            return showError("กรุณากรอกชื่อ-นามสกุล");

        }

        if(!isValidEmail(email)){

            return showError("รูปแบบอีเมลไม่ถูกต้อง");

        }

        if(password.length < 6){

            return showError("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");

        }

        if(password !== confirmPassword){

            return showError("รหัสผ่านไม่ตรงกัน");

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

            showSuccess("สมัครสมาชิกสำเร็จ");

            setTimeout(()=>{

                location.href = "dashboard.html";

            },1000);

        }catch(error){

            showError(error.message);

        }

    });

}

/* ===================================
   Login
=================================== */

if(loginForm){

    loginForm.addEventListener("submit", async (e)=>{

        e.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            passwordInput.value;

        if(!isValidEmail(email)){

            return showError("รูปแบบอีเมลไม่ถูกต้อง");

        }

        if(password.length < 6){

            return showError("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");

        }

        try{

            await auth.signInWithEmailAndPassword(

                email,

                password

            );

            const remember =
                document.getElementById("remember");

            if(remember?.checked){

                localStorage.setItem(

                    "paynest-email",

                    email

                );

            }else{

                localStorage.removeItem(

                    "paynest-email"

                );

            }

            showSuccess("เข้าสู่ระบบสำเร็จ");

            setTimeout(()=>{

                location.href = "dashboard.html";

            },800);

        }catch(error){

            showError(firebaseError(error));

        }

    });

}
/* ===================================
   Firebase Error (Thai)
=================================== */

function firebaseError(error){

    switch(error.code){

        case "auth/email-already-in-use":
            return "อีเมลนี้ถูกใช้งานแล้ว";

        case "auth/invalid-email":
            return "รูปแบบอีเมลไม่ถูกต้อง";

        case "auth/user-not-found":
            return "ไม่พบบัญชีผู้ใช้";

        case "auth/wrong-password":
            return "รหัสผ่านไม่ถูกต้อง";

        case "auth/invalid-credential":
            return "อีเมลหรือรหัสผ่านไม่ถูกต้อง";

        case "auth/weak-password":
            return "รหัสผ่านสั้นเกินไป";

        case "auth/too-many-requests":
            return "มีการพยายามเข้าสู่ระบบหลายครั้ง กรุณาลองใหม่ภายหลัง";

        default:
            return error.message;

    }

}

/* ===================================
   Forgot Password
=================================== */

async function resetPassword(email){

    if(!isValidEmail(email)){

        return showError("กรุณากรอกอีเมลให้ถูกต้อง");

    }

    try{

        await auth.sendPasswordResetEmail(email);

        showSuccess("ส่งลิงก์รีเซ็ตรหัสผ่านแล้ว");

    }catch(error){

        showError(firebaseError(error));

    }

}

/* ===================================
   Logout
=================================== */

async function logout(){

    try{

        await auth.signOut();

        location.href = "login.html";

    }catch(error){

        showError(firebaseError(error));

    }

}

/* ===================================
   Auth State
=================================== */

auth.onAuthStateChanged((user)=>{

    if(user){

        console.log("Login :",user.email);

    }else{

        console.log("Guest");

    }

});

/* ===================================
   Remember Me
=================================== */

const remember = document.getElementById("remember");

const emailInput = document.getElementById("email");

if(remember && emailInput){

    const saved = localStorage.getItem("paynest-email");

    if(saved){

        emailInput.value = saved;

        remember.checked = true;

    }

}

/* ===================================
   Global
=================================== */

window.logout = logout;

window.resetPassword = resetPassword;
