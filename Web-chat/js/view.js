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
        case 'chatScreen':
            document.getElementById('app').innerHTML = components.chatScreen
            const sendMessageForm = document.getElementById('send-message-form')
            sendMessageForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const message = {
                    content: sendMessageForm.message.value,
                    owner: model.currentUser.email
                }
                const messageFromBot = {
                    owner: 'Bot',
                    content: sendMessageForm.message.value
                }
                if (message.content.trim() === '') {
                    alert('Please type something to send message')
                } else {
                    view.addMessage(message)
                    view.addMessage(messageFromBot)
                    sendMessageForm.message.value = ""
                }
            })
            break;
    }
}
view.setErrorMessage = (elementId, message) => {
    document.getElementById(elementId).innerText = message;
}
view.addMessage = (message) => {
    const messageWrapper = document.createElement('div')
    messageWrapper.classList.add('message-container')
    if (message.owner === model.currentUser.email) {
        messageWrapper.classList.add('mine')
        messageWrapper.innerHTML = `
           <div class="content">
               ${message.content}
           </div>
        `
    } else {
        messageWrapper.classList.add('their')
        messageWrapper.innerHTML = `
        <div class='owner'>
            ${message.owner}
        </div>
        <div class="content">
            ${message.content}
        </div>
     `
    }
    document.querySelector('.list-messages').appendChild(messageWrapper)
    const listMessage = document.querySelector('.list-messages')
    listMessage.scrollTop = listMessage.scrollHeight
}