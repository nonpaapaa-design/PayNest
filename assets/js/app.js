/* ===================================
   PayNest Premium
   App
=================================== */

"use strict";

/* ===================================
   DOM
=================================== */

const loader = document.getElementById("loader");

const header = document.querySelector(".header");

/* ===================================
   Loader
=================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        if(loader){

            loader.style.opacity = "0";

            loader.style.visibility = "hidden";

        }

    },500);

});

/* ===================================
   Smooth Header
=================================== */

window.addEventListener("scroll", () => {

    if(!header) return;

    if(window.scrollY > 20){

        header.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.08)";

    }

    else{

        header.style.boxShadow = "none";

    }

});

/* ===================================
   Utility
=================================== */

const $ = selector =>

    document.querySelector(selector);

const $$ = selector =>

    document.querySelectorAll(selector);

/* ===================================
   Local Storage
=================================== */

const Storage = {

    set(key,value){

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    },

    get(key){

        const value =

            localStorage.getItem(key);

        return value ?

            JSON.parse(value)

            : null;

    },

    remove(key){

        localStorage.removeItem(key);

    }

};
/* ===================================
   Toast
=================================== */

function showToast(

    message,

    type = "primary",

    duration = 3000

){

    const toast = document.createElement("div");

    toast.className = `toast toast-${type}`;

    toast.textContent = message;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {

        toast.style.transform = "translateY(0)";

        toast.style.opacity = "1";

    });

    setTimeout(() => {

        toast.style.opacity = "0";

        toast.style.transform = "translateY(20px)";

        setTimeout(() => {

            toast.remove();

        },300);

    },duration);

}

/* ===================================
   Modal
=================================== */

function openModal(id){

    const modal = document.getElementById(id);

    if(!modal) return;

    modal.classList.add("active");

}

function closeModal(id){

    const modal = document.getElementById(id);

    if(!modal) return;

    modal.classList.remove("active");

}

document.addEventListener("click",(event)=>{

    if(event.target.classList.contains("modal")){

        event.target.classList.remove("active");

    }

});

/* ===================================
   Theme Manager
=================================== */

const Theme = {

    key:"paynest-theme",

    init(){

        const theme = Storage.get(this.key);

        if(theme === "dark"){

            document.body.classList.add("dark");

        }

    },

    toggle(){

        document.body.classList.toggle("dark");

        const current =

            document.body.classList.contains("dark")

            ? "dark"

            : "light";

        Storage.set(this.key,current);

    }

};

Theme.init();
/* ===================================
   Scroll Reveal
=================================== */

const revealElements = document.querySelectorAll(".fade-up");

const revealOnScroll = () => {

    const trigger = window.innerHeight * 0.9;

    revealElements.forEach(element => {

        const top = element.getBoundingClientRect().top;

        if(top < trigger){

            element.style.opacity = "1";

            element.style.transform = "translateY(0)";

        }

    });

};

window.addEventListener("scroll",revealOnScroll);

window.addEventListener("load",revealOnScroll);

/* ===================================
   Back To Top
=================================== */

const backToTop = document.getElementById("backToTop");

if(backToTop){

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 300){

            backToTop.classList.add("show");

        }else{

            backToTop.classList.remove("show");

        }

    });

    backToTop.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/* ===================================
   Event Manager
=================================== */

document.addEventListener("DOMContentLoaded",()=>{

    console.log("PayNest Premium Loaded");

});

/* ===================================
   Utilities
=================================== */

function formatCurrency(number){

    return new Intl.NumberFormat("th-TH",{

        style:"currency",

        currency:"THB",

        minimumFractionDigits:2

    }).format(number);

}

function formatDate(date){

    return new Intl.DateTimeFormat("th-TH",{

        day:"2-digit",

        month:"short",

        year:"numeric"

    }).format(new Date(date));

}

function generateID(length = 12){

    const chars =

        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let id = "";

    for(let i=0;i<length;i++){

        id += chars.charAt(

            Math.floor(Math.random()*chars.length)

        );

    }

    return id;

}

/* ===================================
   Export
=================================== */

window.PayNest = {

    Storage,

    Theme,

    showToast,

    openModal,

    closeModal,

    formatCurrency,

    formatDate,

    generateID

};
