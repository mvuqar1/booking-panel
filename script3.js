const calendarContainer = document.getElementById('calendar');
const selectedDateText = document.getElementById('selected-date');
const rezervTimeList = document.querySelector('.rezerv-time-list');
const rezervTimes = document.querySelectorAll('.rezerv-time');

let rezervArray = [];
let selectedDate = '';

const storedServicesData = JSON.parse(localStorage.getItem('rezerv'));
if (storedServicesData && storedServicesData.date) {
    selectedDate = storedServicesData.date;
    selectedDateText.textContent = selectedDate;
    rezervTimeList.style.display = 'flex';

    rezervTimes.forEach(rezervTime => {
        const timeElements = rezervTime.querySelectorAll('ol');
        const startTime = timeElements[0].textContent.trim();
        const endTime = timeElements[1].textContent.trim();

        if (
            storedServicesData.start_time === startTime &&
            storedServicesData.end_time === endTime
        ) {
            rezervTime.classList.add('selected-date');
        } else {
            rezervTime.classList.remove('selected-date');
        }
    });
} else {
    selectedDateText.textContent = 'Select date';
    rezervTimeList.style.display = 'none';
    updateSelectedDate(null);
}

flatpickr(calendarContainer, {
    dateFormat: 'Y-m-d',
    minDate: 'today',
    inline: true,
    defaultDate: selectedDate,
    showMonths: 1,
    prevArrow: '<',
    nextArrow: '>',
    locale: {
        // ...
    },
    onDayCreate: function(dObj, dStr, fp, dayElem) {
        dayElem.classList.add('custom-date');
    },
    onChange: function(selectedDates, dateStr, instance) {
        if (selectedDates.length > 0) {
            selectedDate = instance.formatDate(selectedDates[0], 'Y-m-d');
            selectedDateText.textContent = selectedDate;
            rezervTimeList.style.display = 'flex';
            updateSelectedDate(selectedDate);

            rezervTimes.forEach(rezervTime => {
                const timeElements = rezervTime.querySelectorAll('ol');
                const startTime = timeElements[0].textContent.trim();
                const endTime = timeElements[1].textContent.trim();

                if (
                    storedServicesData &&
                    storedServicesData.date === selectedDate &&
                    storedServicesData.start_time === startTime &&
                    storedServicesData.end_time === endTime
                ) {
                    rezervTime.classList.add('selected-date');
                } else {
                    rezervTime.classList.remove('selected-date');
                }
            });

            // Остальной код обработки выбранной даты...
        } else {
            selectedDateText.textContent = 'Select date';
            rezervTimeList.style.display = 'none';
            updateSelectedDate(null); 
        }
    }
});

rezervTimes.forEach(rezervTime => {
    rezervTime.addEventListener('click', () => {
        rezervTimes.forEach(item => item.classList.remove('selected-date'));
        rezervTime.classList.add('selected-date');
        
        if (rezervTime.classList.contains('selected-date')) {
            const timeElements = rezervTime.querySelectorAll('ol');
            const startTime = timeElements[0].textContent.trim();
            const endTime = timeElements[1].textContent.trim();
            
            rezervArray = {
                start_time: startTime,
                end_time: endTime,
                date: selectedDate,
            };
            localStorage.setItem("rezerv", JSON.stringify(rezervArray));
            window.location.href = 'page4.html';
        }
    });
});

const nextButton = document.querySelector('.next');
const error = document.querySelector('.error');

const back = document.querySelector('.back');

back.addEventListener("click", () => {
    window.location.href = "page2.html";
});

nextButton.addEventListener('click', () => {
    if (!storedServicesData) {
        error.style.display = 'flex';
    } else {
        error.style.display = 'none';
        window.location.href = 'page4.html';
    }
});

function updateSelectedDate(date) {
    selectedDate = date;
}
