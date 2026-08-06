"use strict";

/* ===================================
   PayNest Premium
   Dashboard
=================================== */

const transactionForm =
    document.getElementById("transactionForm");

const transactionTable =
    document.getElementById("transactionTable");

const incomeTotal =
    document.getElementById("incomeTotal");

const expenseTotal =
    document.getElementById("expenseTotal");

const balanceTotal =
    document.getElementById("balanceTotal");

const userEmail =
    document.getElementById("userEmail");

const addTransactionBtn =
    document.getElementById("addTransactionBtn");

const searchInput =
    document.getElementById("searchInput");

/* ===================================
   Current User
=================================== */

let currentUser = null;

let transactions = [];

/* ===================================
   Auth Check
=================================== */

auth.onAuthStateChanged(async(user)=>{

    if(!user){

        location.href = "login.html";

        return;

    }

    currentUser = user;

    userEmail.textContent = user.email;

    await loadTransactions();

});
/* ===================================
   Modal
=================================== */

if(addTransactionBtn){

    addTransactionBtn.addEventListener("click",()=>{

        openModal("transactionModal");

    });

}
