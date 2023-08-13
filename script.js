const users = document.querySelectorAll('.user');
const timesIcon = document.querySelector('.times');
let selectedUser = null;
const staff = [];

const storedStaffData = JSON.parse(localStorage.getItem('staffData'));

if (storedStaffData && storedStaffData.length > 0) {
    const storedId = storedStaffData[0].id;

    users.forEach(user => {
        if (user.getAttribute('data-id') === storedId) {
            user.classList.add('selected');
            selectedUser = user;
            timesIcon.style.display = 'block';
        }
    });
}

users.forEach(user => {
    user.addEventListener('click', () => {
        if (selectedUser) {
            selectedUser.classList.remove('selected');
        }
        user.classList.add('selected');
        selectedUser = user;
        timesIcon.style.display = 'block';

        // Вызываем функцию при клике на selectedUser
        handleUserSelection(selectedUser);
    });
});

timesIcon.addEventListener('click', () => {
    if (selectedUser) {
        selectedUser.classList.remove('selected');
        selectedUser = null;
    }
    timesIcon.style.display = 'none';
    localStorage.removeItem("staffData");
});

const nextButton = document.querySelector('.next');
const error = document.querySelector('.error');

nextButton.addEventListener('click', () => {
    // Вызываем функцию при клике на nextButton
    handleUserSelection(selectedUser);
});

// Определите функцию для обработки выбора пользователя и перехода на следующую страницу
function handleUserSelection(user) {
    let selectedUserName = "";

    if (user) {
        selectedUserName = user.querySelector('.info-container h2').textContent;
    }

    if (!selectedUserName) {
        error.style.display = 'flex'; // Показываем блок с ошибкой
    } else {
        error.style.display = 'none'; // Скрываем блок с ошибкой

        if (user.classList.contains('selected')) {
            const id = user.getAttribute('data-id');
            const name = user.querySelector('.info-container h2').textContent;
            const email = user.querySelector('.info-container p').textContent;
            const image = user.querySelector('.image-container img').getAttribute('src');

            staff.push({
                id: id,
                name: name,
                email: email,
                image: image
            });

            window.location.href = 'page2.html';
            localStorage.setItem('staffData', JSON.stringify(staff));

            console.log("Selected Staff:", staff);
        }
    }
}
