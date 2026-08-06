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
/* ===================================
   Load Transactions
=================================== */

async function loadTransactions(){

    try{

        const snapshot = await db
            .collection("users")
            .doc(currentUser.uid)
            .collection("transactions")
            .orderBy("date","desc")
            .get();

        transactions = [];

        snapshot.forEach(doc=>{

            transactions.push({

                id:doc.id,

                ...doc.data()

            });

        });

        renderTransactions();

        updateSummary();

    }catch(error){

        showError(error.message);

    }

}

/* ===================================
   Summary
=================================== */

function updateSummary(){

    let income = 0;

    let expense = 0;

    transactions.forEach(item=>{

        const amount = Number(item.amount);

        if(item.type === "income"){

            income += amount;

        }else{

            expense += amount;

        }

    });

    incomeTotal.textContent =
        PayNest.formatCurrency(income);

    expenseTotal.textContent =
        PayNest.formatCurrency(expense);

    balanceTotal.textContent =
        PayNest.formatCurrency(

            income - expense

        );

}

/* ===================================
   Render Table
=================================== */

function renderTransactions(){

    if(transactions.length === 0){

        transactionTable.innerHTML = `

        <tr>

            <td colspan="5"
                style="text-align:center;">

                ยังไม่มีข้อมูล

            </td>

        </tr>

        `;

        return;

    }

    transactionTable.innerHTML = "";

    transactions.forEach(item=>{

        transactionTable.innerHTML += `

        <tr>

            <td>

                ${PayNest.formatDate(item.date)}

            </td>

            <td>

                ${item.title}

            </td>

            <td>

                ${item.type === "income"

                    ? "รายรับ"

                    : "รายจ่าย"}

            </td>

            <td>

               ${PayNest.formatDate(
    item.date?.toDate
        ? item.date.toDate()
        : item.date
)}

            </td>

            <td>

                <button
                    class="btn"

                    onclick="deleteTransaction('${item.id}')">

                    ลบ

                </button>

            </td>

        </tr>

        `;

    });

}
/* ===================================
   Add Transaction
=================================== */

if(transactionForm){

    transactionForm.addEventListener("submit", async (e)=>{

        e.preventDefault();

        const type =
            document.getElementById("type").value;

        const title =
            document.getElementById("title").value.trim();

        const amount =
            Number(document.getElementById("amount").value);

        const date =
            document.getElementById("date").value;

        if(title === ""){

            return showError("กรุณากรอกรายการ");

        }

        if(amount <= 0){

            return showError("จำนวนเงินไม่ถูกต้อง");

        }

        try{

            await db
                .collection("users")
                .doc(currentUser.uid)
                .collection("transactions")
                .add({

                    type,

                    title,

                    amount,

                    date: firebase.firestore.Timestamp.fromDate(
                        new Date(date)
                    ),

                    createdAt:
                        firebase.firestore.FieldValue.serverTimestamp()

                });

            closeModal("transactionModal");

            transactionForm.reset();

            loadTransactions();

            showSuccess("บันทึกสำเร็จ");

        }catch(error){

            showError(error.message);

        }

    });

}

/* ===================================
   Delete
=================================== */

async function deleteTransaction(id){

    if(!confirm("ลบรายการนี้ใช่หรือไม่?")){

        return;

    }

    try{

        await db
            .collection("users")
            .doc(currentUser.uid)
            .collection("transactions")
            .doc(id)
            .delete();

        loadTransactions();

        showSuccess("ลบรายการสำเร็จ");

    }catch(error){

        showError(error.message);

    }

}

window.deleteTransaction =
    deleteTransaction;
/* ===================================
   Search
=================================== */

if(searchInput){

    searchInput.addEventListener("input",()=>{

        const keyword =
            searchInput.value.toLowerCase();

        const rows =
            transactionTable.querySelectorAll("tr");

        rows.forEach(row=>{

            row.style.display =

                row.innerText
                    .toLowerCase()
                    .includes(keyword)

                ? ""

                : "none";

        });

    });

}
