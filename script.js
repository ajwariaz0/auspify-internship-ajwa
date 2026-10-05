document.addEventListener('DOMContentLoaded', () => {
    console.log("Auspify Technologies - Dashboard Loaded Successfully for Ajwa Riaz");

    const menuItems = document.querySelectorAll('.sidebar-menu li');
    const viewSections = document.querySelectorAll('.view-section');
    const pageTitle = document.getElementById('pageTitle');

    // Map titles to sections
    const titles = {
        'dashboard': 'Dashboard Overview',
        'analytics': 'Analytics & Reports',
        'users': 'User Management',
        'finances': 'Financial Statements',
        'settings': 'System Settings'
    };

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Update active state in menu
            menuItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Get target view id
            const targetView = item.getAttribute('data-target');

            // Switch views
            viewSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${targetView}-view`) {
                    section.classList.add('active');
                }
            });

            // Update Header Title
            if (titles[targetView]) {
                pageTitle.textContent = titles[targetView];
            }
        });
    });

    // Notification click simulation
    const bell = document.querySelector('.notification-badge');
    if (bell) {
        bell.addEventListener('click', () => {
            alert("System Notification: All modules functioning smoothly for Ajwa Riaz!");
        });
    }
});