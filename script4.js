confirmButton.removeEventListener("click", handleConfirmButtonClick);
confirmButton.addEventListener("click", handleConfirmButtonClick);

const rezervData = JSON.parse(localStorage.getItem('rezerv'));
if (!rezervData) {
    window.location.href = "page3.html";
}

document.addEventListener("DOMContentLoaded", function () {
    const closeButtons = document.querySelectorAll(".close-warning, .close-success");
    const servicesDataParse = JSON.parse(localStorage.getItem('servicesData'));

    if (!servicesDataParse) {
        window.location.href = "page3.html";
    }

    const timesIcon = document.querySelector('.times');
    const staffNote = document.querySelector('.note-local:nth-child(1) .local');
    const serviceNote = document.querySelector('.note-local:nth-child(2) .local');
    const dateNote = document.querySelector('.note-local:nth-child(3) .local');
    const reservationNote = document.querySelector('.note-local:nth-child(4) .local');
    const back = document.querySelector('.back');
    
    const inputs = document.querySelectorAll('.info input');
    const confirmButton = document.getElementById("confirmButton");
    const warningModal = document.querySelector(".warning-modal");
    const successModal = document.querySelector(".success-modal");

    // const rezervData = JSON.parse(localStorage.getItem('rezerv'));
    const staffData = JSON.parse(localStorage.getItem('staffData'))[0];
    const servicesData = servicesDataParse[0];

    closeButtons.forEach(button => {
        button.addEventListener("click", handleCloseModal);
    });

    function handleCloseModal() {
        warningModal.style.display = "none";
        successModal.style.display = "none";
        if (this.classList.contains("close-success")) {
            window.location.href = "index.html";
        }
    }

    staffNote.innerHTML = `<span>Staff:</span> ${staffData.name}`;
    serviceNote.innerHTML = `<span>Service:</span> ${servicesData.name}`;
    dateNote.innerHTML = `<span>Date:</span> ${rezervData.date} / ${rezervData.start_time} - ${rezervData.end_time}`;
    reservationNote.innerHTML = `<span>Staff:</span> $ ${servicesData.price}`;
    reservationNote.style.color = '#4FBF65';

    back.addEventListener("click", () => {
        window.location.href = "page3.html";
    });

    timesIcon.addEventListener("click", handleTimesIconClick);

    function handleTimesIconClick() {
        inputs.forEach(input => {
            input.value = '';
        });
        timesIcon.style.display = 'none';
    }

    inputs.forEach(input => {
        input.addEventListener("input", handleInputChange);
    });

    function handleInputChange() {
        const valuesNotEmpty = Array.from(inputs).some(input => input.value.trim() !== '');
        timesIcon.style.display = valuesNotEmpty ? 'block' : 'none';
        warningModal.style.display = "none";
    }

    confirmButton.addEventListener("click", handleConfirmButtonClick);

    function handleConfirmButtonClick() {
        const [firstName, lastName, email, phone] = inputs;

        if (firstName.value.trim() === '' || lastName.value.trim() === '' || email.value.trim() === '') {
            warningModal.style.display = "block";
        } else {
            warningModal.style.display = "none";
            timesIcon.style.display = 'block';
            const userData = {
                "customer": { name: firstName.value, surname: lastName.value, email: email.value, phone: phone.value },
                "date": rezervData.date,
                "service_id": servicesData.id,
                "staff_id": staffData.id,
                "time": rezervData.start_time
            };
            console.log(userData);
            localStorage.setItem("confirmBooking", JSON.stringify(userData));
            successModal.style.display = "block";
            inputs.forEach(input => {
                input.value = ''; 
            });
            localStorage.removeItem('staffData');
            localStorage.removeItem('servicesData');
            localStorage.removeItem('rezerv');
        }
    }
});
