
/* =========================
   DOM FORM
========================= */

const borrowForm =
    document.getElementById("borrowForm");

const borrowId =
    document.getElementById("borrowId");

const borrowerName =
    document.getElementById("borrowerName");

const bookId =
    document.getElementById("bookId");

const category =
    document.getElementById("category");

const borrowDate =
    document.getElementById("borrowDate");

const dueDate =
    document.getElementById("dueDate");

const phone =
    document.getElementById("phone");

const email =
    document.getElementById("email");

const note =
    document.getElementById("note");

/* =========================
   DOM ERROR
========================= */

const borrowIdError =
    document.getElementById("borrowIdError");

const nameError =
    document.getElementById("nameError");

const bookIdError =
    document.getElementById("bookIdError");

const categoryError =
    document.getElementById("categoryError");

const borrowDateError =
    document.getElementById("borrowDateError");

const dueDateError =
    document.getElementById("dueDateError");

const phoneError =
    document.getElementById("phoneError");

const emailError =
    document.getElementById("emailError");

const statusError =
    document.getElementById("statusError");

const noteError =
    document.getElementById("noteError");

/* =========================
   XÓA LỖI
========================= */

function clearErrors() {

    borrowIdError.textContent = "";
    nameError.textContent = "";
    bookIdError.textContent = "";
    categoryError.textContent = "";
    borrowDateError.textContent = "";
    dueDateError.textContent = "";
    phoneError.textContent = "";
    emailError.textContent = "";
    statusError.textContent = "";
    noteError.textContent = "";

}

/* =========================
   VALIDATE FORM
========================= */

function validateForm() {

    clearErrors();

    let isValid = true;

    /* ===== MÃ PHIẾU ===== */

    const borrowRegex =
        /^PM-\d{4}$/;

        if(
            !borrowForm.dataset.editIndex
        ){

            const existed = borrows.some(

                borrow =>

                    borrow.borrowId ===
                    borrowId.value.trim()

            );

            if(existed){

                borrowIdError.textContent =
                    "Mã phiếu đã tồn tại";

                isValid = false;

            }

        }

    if (
        !borrowRegex.test(
            borrowId.value.trim()
        )
    ) {

        borrowIdError.textContent =
            "Mã phiếu phải có dạng PM-XXXX";

        isValid = false;
    }

    /* ===== HỌ TÊN ===== */

    const nameRegex =
        /^[A-Za-zÀ-ỹ\s]{2,40}$/;

    if (
        !nameRegex.test(
            borrowerName.value.trim()
        )
    ) {

        nameError.textContent =
            "Họ tên từ 2 đến 40 ký tự";

        isValid = false;
    }

    /* ===== MÃ SÁCH ===== */

    const bookRegex =
        /^BK\d{5}$/;

    if (
        !bookRegex.test(
            bookId.value.trim()
        )
    ) {

        bookIdError.textContent =
            "Mã sách phải dạng BK12345";

        isValid = false;
    }

    /* ===== THỂ LOẠI ===== */

    if (
        category.value === ""
    ) {

        categoryError.textContent =
            "Vui lòng chọn thể loại";

        isValid = false;
    }

    /* ===== NGÀY MƯỢN ===== */

    const today =
    new Date();

        today.setHours(
            0,
            0,
            0,
            0
        );

    const borrow =
        new Date(
            borrowDate.value
        );

    if (
        borrowDate.value === ""
    ) {

        borrowDateError.textContent =
            "Chọn ngày mượn";

        isValid = false;
    }
    else if (
        borrow > today
    ) {

        borrowDateError.textContent =
            "Ngày mượn không hợp lệ";

        isValid = false;
    }

    /* ===== HẠN TRẢ ===== */

    const due =
        new Date(
            dueDate.value
        );

    if (
        dueDate.value === ""
    ) {

        dueDateError.textContent =
            "Chọn hạn trả";

        isValid = false;
    }
    else {

        const diffDays =
            (due - borrow)
            /
            (1000 * 60 * 60 * 24);

        if (
            due < borrow
        ) {

            dueDateError.textContent =
                "Hạn trả phải sau ngày mượn";

            isValid = false;
        }

        if (
            diffDays > 30
        ) {

            dueDateError.textContent =
                "Không được quá 30 ngày";

            isValid = false;
        }

    }

    /* ===== ĐIỆN THOẠI ===== */

    const phoneRegex =
        /^(03|05|07|08|09)\d{8}$/;

    if (
        !phoneRegex.test(
            phone.value.trim()
        )
    ) {

        phoneError.textContent =
            "SĐT không hợp lệ";

        isValid = false;
    }

    /* ===== EMAIL ===== */

    const emailRegex =
        /^[a-zA-Z0-9._%+-]+@library\.vn$/;

    if (
        !emailRegex.test(
            email.value.trim()
        )
    ) {

        emailError.textContent =
            "Email phải kết thúc @library.vn";

        isValid = false;
    }

    /* ===== TRẠNG THÁI ===== */

    const status =
        document.querySelector(
            'input[name="status"]:checked'
        );

    if (
        !status
    ) {

        statusError.textContent =
            "Chọn trạng thái";

        isValid = false;
    }

    /* ===== GHI CHÚ ===== */

    const htmlRegex =
        /<script|<img|<iframe/i;

    if (
        note.value.trim().length > 120
    ) {

        noteError.textContent =
            "Không quá 120 ký tự";

        isValid = false;
    }

    if (
        htmlRegex.test(
            note.value
        )
    ) {

        noteError.textContent =
            "Không được nhập HTML";

        isValid = false;
    }

    return isValid;

}

/* =========================
   CRUD + LOCAL STORAGE
========================= */

let borrows = [];

const savedBorrows =
    localStorage.getItem("borrows");

if(savedBorrows){

    borrows =
        JSON.parse(savedBorrows);

}

/* =========================
   LOAD JSON
========================= */

async function loadData(){

    try{

        const response =
            await fetch("data.json");

        const data =
            await response.json();

        borrows = data;

        saveToLocalStorage();

        renderBorrows();

    }
    catch(error){

        console.log(
            "Lỗi đọc JSON:",
            error
        );

    }

}

const borrowList =
    document.getElementById("borrowList");

const message =
    document.getElementById("message");

const borrowModal =
    document.getElementById("borrowModal");

const formTitle =
    document.getElementById("formTitle");

const openModalBtn =
    document.getElementById("openModalBtn");

const closeModalBtn =
    document.getElementById("closeModalBtn");

/* =========================
   THỐNG KÊ
========================= */

const totalBorrows =
    document.getElementById("totalBorrows");

const borrowingCount =
    document.getElementById("borrowingCount");

const returnedCount =
    document.getElementById("returnedCount");

/* =========================
   LOCAL STORAGE
========================= */

function saveToLocalStorage(){

    localStorage.setItem(
        "borrows",
        JSON.stringify(borrows)
    );

}

/* =========================
   THÔNG BÁO
========================= */

function showMessage(text){

    message.textContent = text;

    setTimeout(function(){

        message.textContent = "";

    },3000);

}

/* =========================
   CẬP NHẬT THỐNG KÊ
========================= */

function updateStatistics(){

    totalBorrows.textContent =
        borrows.length;

    const borrowing =
        borrows.filter(

            borrow =>

                borrow.status ===
                "Đang mượn"

        ).length;

    const returned =
        borrows.filter(

            borrow =>

                borrow.status ===
                "Đã trả"

        ).length;

    borrowingCount.textContent =
        borrowing;

    returnedCount.textContent =
        returned;
    }

/* =========================
   HIỂN THỊ DANH SÁCH
========================= */

function renderBorrows(){

    borrowList.innerHTML = "";

    borrows.forEach(
        (borrow,index)=>{

            const tr =
                document.createElement("tr");

            tr.innerHTML = `

                <td>${borrow.borrowId}</td>
                <td>${borrow.borrowerName}</td>
                <td>${borrow.bookId}</td>
                <td>${borrow.category}</td>
                <td>${borrow.borrowDate}</td>
                <td>${borrow.dueDate}</td>
                <td>${borrow.phone}</td>
                <td>${borrow.email}</td>
                <td>${borrow.status}</td>
                <td>${borrow.note}</td>

                <td>

                    <button
                        class="editBtn"
                        data-index="${index}">
                        Sửa
                    </button>

                    <button
                        class="deleteBtn"
                        data-index="${index}">
                        Xóa
                    </button>

                </td>

            `;

            borrowList.appendChild(tr);

        });

        updateStatistics();

}

/* =========================
   MỞ MODAL
========================= */

openModalBtn.addEventListener(
    "click",
    function(){

        borrowModal.classList.remove(
            "hidden"
        );

        borrowForm.reset();

        clearErrors();

        formTitle.textContent =
            "Thêm phiếu mượn";

        delete borrowForm.dataset.editIndex;

    }
);

/* =========================
   ĐÓNG MODAL
========================= */

closeModalBtn.addEventListener(
    "click",
    function(){

        borrowModal.classList.add(
            "hidden"
        );

    }
);

/* =========================
   SUBMIT FORM
========================= */

borrowForm.addEventListener(
    "submit",
    function(event){

        event.preventDefault();

        if(!validateForm()){

            return;

        }

        const status =
            document.querySelector(
                'input[name="status"]:checked'
            );

        const borrow = {

            borrowId:
                borrowId.value.trim(),

            borrowerName:
                borrowerName.value.trim(),

            bookId:
                bookId.value.trim(),

            category:
                category.value,

            borrowDate:
                borrowDate.value,

            dueDate:
                dueDate.value,

            phone:
                phone.value.trim(),

            email:
                email.value.trim(),

            status:
                status.value,

            note:
                note.value.trim()

        };

        if(
            borrowForm.dataset.editIndex
            !== undefined
        ){

            const index =
                borrowForm.dataset.editIndex;

            borrows[index] =
                borrow;

            delete borrowForm.dataset.editIndex;

            showMessage(
                "Cập nhật thành công!"
            );

        }
        else{

            borrows.push(
                borrow
            );

            showMessage(
                "Thêm thành công!"
            );

        }

        saveToLocalStorage();

        renderBorrows();

        borrowModal.classList.add(
            "hidden"
        );

        borrowForm.reset();

    }
);

/* =========================
   SỬA / XÓA
========================= */

borrowList.addEventListener(
    "click",
    function(e){

        /* ===== XÓA ===== */

        if(
            e.target.classList.contains(
                "deleteBtn"
            )
        ){

            const index =
                e.target.dataset.index;

            if(
                confirm(
                    "Bạn có chắc muốn xóa?"
                )
            ){

                borrows.splice(
                    index,
                    1
                );

                saveToLocalStorage();

                renderBorrows();

                showMessage(
                    "Xóa thành công!"
                );

            }

        }

        /* ===== SỬA ===== */

        if(
            e.target.classList.contains(
                "editBtn"
            )
        ){

            const index =
                e.target.dataset.index;

            const borrow =
                borrows[index];

            borrowId.value =
                borrow.borrowId;

            borrowerName.value =
                borrow.borrowerName;

            bookId.value =
                borrow.bookId;

            category.value =
                borrow.category;

            borrowDate.value =
                borrow.borrowDate;

            dueDate.value =
                borrow.dueDate;

            phone.value =
                borrow.phone;

            email.value =
                borrow.email;

            note.value =
                borrow.note;

            document.querySelector(
                `input[name="status"][value="${borrow.status}"]`
            ).checked = true;

            borrowForm.dataset.editIndex =
                index;

            formTitle.textContent =
                "Cập nhật phiếu mượn";

            borrowModal.classList.remove(
                "hidden"
            );

        }

    }
);

/* =========================
   LOAD DATA
========================= */



if(borrows.length === 0){

    loadData();

}
else{

    renderBorrows();

}