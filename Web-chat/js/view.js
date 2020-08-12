const view = {}
view.setActiveScreen = (screenName, fromCreateConversation = false) => {
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
                    owner: model.currentUser.email,
                    createdAt: new Date().toLocaleString()
                }
                if (message.content.trim() === '') {
                    alert('Please type something to send message')
                } else {
                    // view.addMessage(message)

                    model.addMessage(message)
                    sendMessageForm.message.value = ""
                }
            })
            if (!fromCreateConversation) {
                model.loadConversations()
                model.listenConversationsChange()
            } else {
                view.showConversations()
                view.showCurrentConversation()
            }
            const logOut = document.querySelector('.log-out')
            logOut.addEventListener('click', (e) => {
                e.preventDefault()
                firebase.auth().signOut().then(() => {
                    console.log('user signed out')
                    view.setActiveScreen('loginScreen')
                })
            })
            document.querySelector('.create-conversation .btn').addEventListener('click', () => {
                view.setActiveScreen('createConversationScreen')
            })
            break;
        case 'createConversationScreen':
            document.getElementById('app').innerHTML = components.createConversationScreen
            document.getElementById('back-to-chat').addEventListener('click', () => {
                view.setActiveScreen('chatScreen', true)
            })
            const createConversationForm = document.getElementById('create-conversation-form')
            createConversationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const data = {
                    title: createConversationForm.conversationTitle.value,
                    friend: createConversationForm.conversationEmail.value,

                }
                controller.createConversation(data)
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
    view.scrollToEnd()
}
view.showCurrentConversation = () => {
    document.querySelector('.list-messages').innerHTML = ""
        // change conversation name
    document.getElementsByClassName('conversation-header')[0].innerText = model.currentConversation.title

    // Print all conversation to screen
    for (message of model.currentConversation.messages) {
        view.addMessage(message)
    }
}
view.scrollToEnd = () => {
    const listMessage = document.querySelector('.list-messages')
    listMessage.scrollTop = listMessage.scrollHeight
}
view.showConversations = () => {
    for (oneConversation of model.conversations) {
        view.addConversation(oneConversation)
    }
}
view.addConversation = (conversation) => {
    const conversationWrapper = document.createElement('div')
    conversationWrapper.className = 'conversation cursor-pointer'
    if (model.currentConversation.id == conversation.id) {
        conversationWrapper.classList.add('current')
    }
    conversationWrapper.innerHTML = `
       <div class="conversation-title">${conversation.title}</div>
       <div class="conversation-num-user">${conversation.users.length} users</div>   
    `
    conversationWrapper.addEventListener('click', () => {
        // change interface, change current
        document.querySelector('.current').classList.remove('current')
        conversationWrapper.classList.add('current')

        // change model.currentConversation
        model.currentConversation = conversation
        view.showCurrentConversation()
    })
    document.querySelector('.list-conversations').appendChild(conversationWrapper)
}