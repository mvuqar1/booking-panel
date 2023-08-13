const services = document.querySelectorAll('.service');
const timesIcon = document.querySelector('.times');
let selectedService = null;
const servicesArray = [];

const storedServicesData = JSON.parse(localStorage.getItem('servicesData'));
const staffData = JSON.parse(localStorage.getItem('staffData'));

if(!staffData){
    window.location.href = "index.html";
}

if (storedServicesData && storedServicesData.length > 0) {
    const storedId = storedServicesData[0].id;

    services.forEach(service => {
        if (service.getAttribute('data-id') === storedId) {
            service.classList.add('selected');
            selectedService = service;
            timesIcon.style.display = 'block';
        }
    });
}

services.forEach(service => {
    service.addEventListener('click', () => {
        if (selectedService) {
            selectedService.classList.remove('selected');
        }
        service.classList.add('selected');
        selectedService = service;
        timesIcon.style.display = 'block';
        handleServiceSelection(selectedService);
    });
});

timesIcon.addEventListener('click', () => {
    if (selectedService) {
        selectedService.classList.remove('selected');
        selectedService = null;
    }
    timesIcon.style.display = 'none';
    localStorage.removeItem("servicesData");
});

const nextButton = document.querySelector('.next');
const error = document.querySelector('.error');

nextButton.addEventListener('click', () => {
    handleServiceSelection(selectedService);
});

const back = document.querySelector('.back');

back.addEventListener("click", () => {
    selectedService = null;
    window.location.href = "index.html";
});

function handleServiceSelection(service) {
    let selectedServiceName = "";

    if (service) {
        selectedServiceName = service.querySelector('.info-container h2').textContent;
    }

    if (!selectedServiceName) {
        error.style.display = 'flex';
    } else {
        error.style.display = 'none';

        if (service.classList.contains('selected')) {
            const id = service.getAttribute('data-id');
            const name = service.querySelector('.info-container h2').textContent;
            const duration = service.querySelector('.info-container p').textContent;
            const priceText = service.querySelector('.price').textContent;
            const image = service.querySelector('.image-container img').getAttribute('src');

            const price = parseFloat(priceText.replace(/[^\d.]/g, '')).toFixed(2);

            servicesArray.push({
                id: id,
                name: name,
                duration: duration,
                image: image,
                price: price
            });

            window.location.href = 'page3.html';
            localStorage.setItem('servicesData', JSON.stringify(servicesArray));

            console.log("Selected Services:", servicesArray);
        }
    }
}
