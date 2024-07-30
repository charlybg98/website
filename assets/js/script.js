let navLinks = document.querySelectorAll('a.inner-link');

navLinks.forEach((item) => {
    item.addEventListener('click', function () {
        document.querySelector('nav ul li a.active').classList.remove('active')
        document.querySelector(`nav ul li a[href='${item.getAttribute('href')}']`).classList.add('active')
        document.querySelector('main > section.active').classList.remove('active')
        document.querySelector(`main > section${item.getAttribute('href')}`).classList.add('active');
    })
})

document.querySelector('#sidebar .toggle-sidebar').addEventListener('click', function () {
    document.querySelector('#sidebar').classList.toggle('open')
})

var options = {
    strings: ['Data Scientist', 'Machine Learning Enthusiast', 'AI Developer'],
    loop: true,
    typeSpeed: 80,
    backSpeed: 10
};

new Typed('.field h2', options)

for (let i = 1; i <= 15; i++) {
    let meteor = document.createElement('span');
    meteor.classList = 'meteor'
    document.querySelector('#home .meteor-shower').append(meteor);
}