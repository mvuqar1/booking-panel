document.addEventListener("DOMContentLoaded", function () {
    const staffData = JSON.parse(localStorage.getItem('staffData'))[0]; // Обратите внимание на [0] здесь
    const servicesData = JSON.parse(localStorage.getItem('servicesData'))[0]; // Обратите внимание на [0] здесь
    const rezervData = JSON.parse(localStorage.getItem('rezerv'));
    const timesIcon = document.querySelector('.times');
    const staffNote = document.querySelector('.note-local:nth-child(1) .local');
    const serviceNote = document.querySelector('.note-local:nth-child(2) .local');
    const dateNote = document.querySelector('.note-local:nth-child(3) .local');
    const reservationNote = document.querySelector('.note-local:nth-child(4) .local');
    const back = document.querySelector('.back');
    
    const inputs = document.querySelectorAll('.info input');

    const confirmButton = document.getElementById("confirmButton");
    const warningModal = document.querySelector(".warning-modal");
    const closeButton = document.querySelector(".close-warning");
    const successModal = document.querySelector(".success-modal");
    const closeSuccessButton = document.querySelector(".close-success");


    closeButton.addEventListener("click", function () {
        warningModal.style.display = "none";
    });
    closeSuccessButton.addEventListener("click", function () {
        successModal.style.display = "none";
        window.location.href = "index.html";
    });


    // Вставка данных в соответствующие элементы
    staffNote.innerHTML = `<span>Staff:</span> ${staffData.name}`;
    serviceNote.innerHTML = `<span>Service:</span> ${servicesData.name}`;
    dateNote.innerHTML = `<span>Date:</span> ${rezervData.date} / ${rezervData.start_time} - ${rezervData.end_time}`;
    reservationNote.innerHTML = `<span>Staff:</span> $ ${servicesData.price}`;
    reservationNote.style.color = '#4FBF65';

    back.addEventListener("click", () => {
        window.location.href = "page3.html";
    });

    timesIcon.addEventListener("click", function () {

        inputs.forEach(input => {
            input.value = ''; // Очищаем значение input
        });

        timesIcon.style.display = 'none'; // Скрываем иконку
    });

    inputs.forEach(input => {
        input.addEventListener("input", function () {
            const firstName = document.querySelector('.info:nth-child(1) input').value;
            const lastName = document.querySelector('.info:nth-child(2) input').value;
            const email = document.querySelector('.info:nth-child(3) input').value;
            const phone = document.querySelector('.info:nth-child(4) input').value;

            // Проверка заполненности хотя бы одного поля
            if (firstName !== '' || lastName !== '' || email !== '' || phone !== '') {
                timesIcon.style.display = 'block';
                warningModal.style.display = "none";
            } else {
                timesIcon.style.display = 'none';
            }
        });
    });


    confirmButton.addEventListener("click", function () {
        const firstName = document.querySelector('.info:nth-child(1) input').value;
        const lastName = document.querySelector('.info:nth-child(2) input').value;
        const email = document.querySelector('.info:nth-child(3) input').value;
        const phone = document.querySelector('.info:nth-child(4) input').value;
    
        // Проверка заполненности всех обязательных полей
        if (firstName === '' || lastName === '' || email === '') {
            warningModal.style.display = "block";
            timesIcon.style.display = 'none'; // Скрыть иконку, так как поля не заполнены
        } else {
            console.log("Fields are filled"); // Добавьте этот вывод для отладки
            warningModal.style.display = "none";
            timesIcon.style.display = 'block';
            const userData = {
                "customer":{firstName: firstName,lastName: lastName,email: email,phone: phone},
                "date":rezervData.date,
                "service_id":servicesData.id,
                "staff_id":staffData.id,
                "time":rezervData.start_time

                
            };
        
            console.log(userData);
            successModal.style.display = "block";
            inputs.forEach(input => {
                input.value = ''; // Очищаем значение input
            });
            localStorage.removeItem('staffData')
            localStorage.removeItem('servicesData')
            localStorage.removeItem('rezerv')
        }
    
    
    });
});
