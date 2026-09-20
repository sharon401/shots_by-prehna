document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.querySelector('.navbar');


    if(hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            const icon = hamburger.querySelector('i');

            if(icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });
    }

    document.querySelectorAll('.nav__links a').forEach(link => {
        link.addEventListener('click', () => {

            navLinks.classList.remove('active');
            
            if(hamburger)hamburger.querySelector('i').classList = 'fa-solid fa-bars';
        });
    });

    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            navbar.style.background = 'rgba (0,0,0,0.95)';
            navbar.style.padding = '12px 8%';
        }

        else{
            navbar.style.background = 'rgba (0,0,0,0.9)';
            navbar.style.padding = '18px 8%';
        }
    });

    const heroVideo = document.getElementById('heroVideo');

    if(heroVideo) {
        if (heroVideo.paused) {
            heroVideo.play();
        }

        else {
            heroVideo.pause();
        }
    }

    const fadeEls = document.querySelectorAll('.fade__in');

    fadeEls.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.8s ease ${i * 0.2}s`;

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200);
    });


    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {

                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.15 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


    document.querySelectorAll('service__card').forEach(card => {

        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(255, 215, 0, 0.15)'
        });

        card.addEventListener ('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
        });
    });


    const bookingForm = document.getElementById('bookingForm');

    if(bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {

            e.preventDefault();


            const name = bookingForm.name.value.trim();
            const email = bookingForm.email.value.trim();
            const date = bookingForm.date.value;
            const package = bookingForm.package.value;
            const location = bookingForm.location.value.trim();
            const shoot_type = bookingForm.shoot_type.value;

            if(!name || !email || !date || !package || !location || !shoot_type) {

                showToast('Please fill all required fields', 'error');

                return;
            }

            function validateEmail(email){
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            }

            if(!validateEmail(email)) {
                showToast('Please enter a valid email', 'error');

                return;
            }

            try {
                const response = await fetch('https://formspree.io/f/xwlekryb', {
                method: 'POST',
                body: new FormData(bookingForm),
                headers: {'Accept': 'application/json'}
                });

                if(response.ok){
                    showToast('Booking request sent! I`ll reply within 24hrs', 'success');

                    bookingForm.reset();
                }
                else {
                    showToast('Something went wrong. Please try again', 'error');
                }
            }
            catch (error) {
                console.error(error);

                showToast('Network error. Please try again.', 'error');
            }
        });
    }

    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if(target) {
                target.scrollIntoView({
                    behaviour:'smooth',
                    block: 'start'
                });
            }
        });
    });


    const yearEl = document.getElementById('year');
    
    if(yearEl) {
       yearEl.textContent = new Date().getFullYear(); 
    } 


    const backToTop = document.getElementById('backToTop');
    if(backToTop) {
        window.addEventListener('scroll', () => {

            if(window.scrollY > 400) {
                backToTop.classList.add('show');
            }
            else{
                backToTop.classList.remove('show');
            };
            });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behaviour: 'smooth'
            });
        });
    }
});   