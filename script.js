// Profile modal open/close
const profileBtn = document.getElementById('profileBtn');
const modal = document.getElementById('profileModal');
const closeBtn = modal.querySelector('.close-btn');

profileBtn.addEventListener('click', () => {
    modal.classList.add('active');
    modal.focus();
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    profileBtn.focus();
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        profileBtn.focus();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        profileBtn.focus();
    }
});

// Notification System
const notificationBadge = document.getElementById('notificationBadge');
let notificationCount = 0;

function updateNotificationBadge() {
    if (notificationCount > 0) {
        notificationBadge.textContent = notificationCount;
        notificationBadge.style.display = 'flex';
    } else {
        notificationBadge.style.display = 'none';
    }
}

// Contact form submission
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email.toLowerCase())) {
        alert('Please enter a valid email address.');
        return;
    }

    try {
        // Simulate API call
        const response = await new Promise(resolve => setTimeout(() => {
            resolve({ ok: true });
        }, 1000));

        if (response.ok) {
            successMessage.style.display = 'block';
            form.reset();
            notificationCount++;
            updateNotificationBadge();

            setTimeout(() => {
                notificationCount--;
                if (notificationCount < 0) notificationCount = 0;
                updateNotificationBadge();
            }, 5000);

            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        } else {
            alert('Failed to send message. Please try again later.');
        }
    } catch (error) {
        alert('Error sending message. Please try again later.');
        console.error(error);
    }
});

// Dynamic Project Section
const projectsData = [
    {
        title: "CompusStay Website",
        description: "A platform to help students find and manage accommodation.",
        technologies: "HTML, CSS, JavaScript, SQL.",
        features: "Student login, room listing, search and filter.",
        role: "Frontend & Backend Development.",
        imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
    },
    {
        title: "E-commerce Platform",
        description: "A responsive e-commerce platform with product listings and a shopping cart.",
        technologies: "React, Node.js, Express, MongoDB.",
        features: "User authentication, product search, order management.",
        role: "Full-Stack Developer.",
        imageUrl: "https://images.unsplash.com/photo-1483985988355-fee21ee5828b?auto=format&fit=crop&w=600&q=80"
    },
    {
        title: "Task Management App",
        description: "A web app for personal task management, allowing users to create and manage tasks.",
        technologies: "Vue.js, Firebase.",
        features: "Real-time data synchronization, user-friendly interface.",
        role: "Frontend Developer.",
        imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80"
    },
     {
        title: "Blog Platform",
        description: "A full-featured blog with user accounts, post creation, and administrative controls.",
        technologies: "Python (Django), PostgreSQL.",
        features: "Markdown support, user roles, search functionality.",
        role: "Backend Developer.",
        imageUrl: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80"
    }
];

const projectsList = document.querySelector('.projects');

projectsData.forEach(project => {
    const li = document.createElement('li');
    li.innerHTML = `
        <img src="${project.imageUrl}" alt="${project.title} Screenshot" />
        <strong>${project.title}</strong>
        ${project.description}<br />
        ${project.technologies}<br />
        ${project.features}<br />
        ${project.role}
    `;
    projectsList.appendChild(li);
});