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
    strings: ['Ingeniero de Machine Learning', 'Científico de Datos', 'Especialista en IA'],
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


const shuffleInstance = new Shuffle(document.querySelector('#my_work .work-items'), {
    itemSelector: '.item'
});

const filterButtons = document.querySelectorAll('#my_work .filters button')
filterButtons.forEach((item) => {
    item.addEventListener('click', workFilter)
});

function workFilter() {
    const clickedButton = event.currentTarget;
    const clickedButtonGroup = clickedButton.getAttribute('data-group');
    const activeButton = document.querySelector('#my_work .filters button.active');

    activeButton.classList.remove('active');
    clickedButton.classList.add("active");

    shuffleInstance.filter(clickedButtonGroup)
}

var workModal = new bootstrap.Modal(document.getElementById('workModal'))
const workElements = document.querySelectorAll("#my_work .work-items .wrap");

workElements.forEach((item) => {
    item.addEventListener('click', function () {
        document.querySelector('#workModal .modal-body img').setAttribute('src', item.getAttribute('data-image'))
        document.querySelector('#workModal .modal-body .title').innerText = item.getAttribute('data-title')
        document.querySelector('#workModal .modal-body .description').innerText = item.getAttribute('data-description')
        document.querySelector('#workModal .modal-body .type .value').innerText = item.getAttribute('data-type')
        document.querySelector('#workModal .modal-body .completed .value').innerText = item.getAttribute('data-completed')
        document.querySelector('#workModal .modal-body .skills .value').innerText = item.getAttribute('data-skills')
        document.querySelector('#workModal .modal-body .project-link a').setAttribute('href', item.getAttribute('data-project-link'))

        workModal.show();
    })
})

var workModalElement = document.getElementById('workModal')
workModalElement.addEventListener('show.bs.modal', function (event) {
    document.getElementById('my_work').classList.add('blur');
    document.getElementById('sidebar').classList.add('blur');
})

workModalElement.addEventListener('hide.bs.modal', function (event) {
    document.getElementById('my_work').classList.remove('blur');
    document.getElementById('sidebar').classList.remove('blur');
})

let contactFromItems = document.querySelectorAll('#contact_me .form input, #contact_me .form textarea');

contactFromItems.forEach((item) => {
    item.addEventListener('focus', function () {
        item.parentElement.classList.add('focus')
    })

    item.addEventListener('blur', function () {
        if (!item.value) {
            item.parentElement.classList.remove('focus')
        }
    })
})

function onSubmit(e) {
    e.preventDefault();

    grecaptcha.ready(function () {
        grecaptcha.execute('6LdBoB8qAAAAAHqcXpmWKGEV2CrpMJGJrHjUv1PU', { action: 'submit' }).then(function (token) {
            const data = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                subject: document.getElementById("subject").value,
                message: document.getElementById("message").value,
                'g-recaptcha-response': token
            };

            fetch("https://w8e7rbc1of.execute-api.us-east-1.amazonaws.com/prod/sendemail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Response data:", data);
                    document.querySelector('.form').innerHTML = `
                        <div class="text-center form-success">
                            <h3>¡Gracias por tu mensaje!</h3>
                            <p>Tu mensaje ha sido enviado exitosamente. Se te proporcionará una respuesta en breve.</p>
                        </div>
                    `;
                })
                .catch(error => {
                    console.error("Error:", error);
                    document.querySelector('.form').innerHTML = `
                        <div class="text-center form-error">
                            <h3>¡Ocurrió un error!</h3>
                            <p>Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente más tarde.</p>
                        </div>
                    `;
                });
        });
    });
}