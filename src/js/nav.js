const navLinks = document.querySelectorAll('[data-navLink]');

navLinks.forEach((link) => {
	if (link.getAttribute('href') === window.location.pathname) {
		link.classList.add('color-blue-600');
	}
});
