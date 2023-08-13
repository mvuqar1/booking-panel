const users = document.querySelectorAll('.user');
const timesIcon = document.querySelector('.times');
let selectedUser = null;
const staff = [];

const storedStaffData = JSON.parse(localStorage.getItem('staffData'));
const confirmBooking = JSON.parse(localStorage.getItem('confirmBooking'));

if (confirmBooking) {
    console.log(confirmBooking)
}

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
    handleUserSelection(selectedUser);
});

function handleUserSelection(user) {
    let selectedUserName = "";

    if (user) {
        selectedUserName = user.querySelector('.info-container h2').textContent;
    }

    if (!selectedUserName) {
        error.style.display = 'flex';
    } else {
        error.style.display = 'none';

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
            localStorage.removeItem("confirmBooking")
            localStorage.setItem('staffData', JSON.stringify(staff));

            console.log("Selected Staff:", staff);
        }
    }
}
