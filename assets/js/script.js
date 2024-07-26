let navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach((item) => {
    item.addEventListener('click', function () {
        document.querySelector('nav ul li a.active').classList.remove('active')
        item.classList.add('active')
        document.querySelector('main > section.active').classList.remove('active')
        document.querySelector(`main > section${item.getAttribute('href')}`).classList.add('active')
        console.log(item.getAttribute('href'))
    })
})

document.querySelector('#sidebar .toggle-sidebar').addEventListener('click', function () {
    document.querySelector('#sidebar').classList.toggle('open')
})

var options = {
    strings: ['Data Scientist', 'Machine Learning Enthusiast'],
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