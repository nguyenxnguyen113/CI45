const view = {}
view.setActiveScreen = (screenName) => {
    switch (screenName) {
        case 'welcomeScreen':
            document.getElementById('app')
                .innerHTML = components.welcomeScreen
            break;
        case 'loginScreen':
            // in ra man login
            document.getElementById('app').innerHTML = components.loginScreen
            const loginForm = document.getElementById('login-form')
            loginForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const loginData = {
                    email: loginForm.email.value,
                    password: loginForm.password.value,
                }
                controller.login(loginData)
            })
            const redirectToRegister = document.getElementById('redirect-to-register')
            redirectToRegister.addEventListener('click', (e) => {
                view.setActiveScreen('registerScreen')
            })
            break;
        case 'registerScreen':
            document.getElementById('app').innerHTML = components.registerScreen
            const registerForm = document.getElementById('register-form')
            registerForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const data = {
                    firstName: registerForm.firstName.value,
                    lastName: registerForm.lastName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmPassword: registerForm.confirmPassword.value
                }
                controller.register(data)
            })
            const redirectToLogin = document.getElementById('redirect-to-login')
            redirectToLogin.addEventListener('click', (e) => {
                view.setActiveScreen('loginScreen')
            })
            break;
    }
}
view.setErrorMessage = (elementId, message) => {
    document.getElementById(elementId).innerText = message;
}