// EnergyConserve - JavaScript
// Created by Prince Chikukwa

document.addEventListener('DOMContentLoaded', function() {
    // Update footer year automatically
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('#current-year');
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });

    // Highlight the active page in the navigation bar
    setActivePage();

    // Initialize energy calculator
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateEnergyCost();
        calculateBtn.addEventListener('click', calculateEnergyCost);

        const inputs = document.querySelectorAll('#tv-type, #hours, #standby, #rate');
        inputs.forEach(input => {
            input.addEventListener('input', calculateEnergyCost);
        });
    }
});

function calculateEnergyCost() {
    const tvType = document.getElementById('tv-type');
    const hours = document.getElementById('hours');
    const standby = document.getElementById('standby');
    const rate = document.getElementById('rate');
    const result = document.getElementById('result');

    if (tvType && hours && standby && rate && result) {
        const power = parseFloat(tvType.value);
        const dailyHours = parseFloat(hours.value);
        const standbyHours = parseFloat(standby.value);
        const electricityRate = parseFloat(rate.value);

        if (isNaN(power) || isNaN(dailyHours) || isNaN(standbyHours) || isNaN(electricityRate)) {
            result.textContent = 'Invalid input';
            return;
        }

        // Simple model: dailyEnergy = (active + standby) / 1000 * rate
        const dailyEnergy = (power * dailyHours + 5 * standbyHours) / 1000;
        const annualCost = dailyEnergy * 365 * electricityRate;

        result.textContent = '$' + annualCost.toFixed(2);
    }
}

function setActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        const linkPage = href.split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }

        // Default active state for home if no path
        if (currentPage === '' && linkPage === 'index.html') {
            link.classList.add('active');
        }
    });
}
