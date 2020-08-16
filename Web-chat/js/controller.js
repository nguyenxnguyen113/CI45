const controller = {}
controller.register = (data) => {
    if (data.firstName.trim() === '') {
        view.setErrorMessage('first-name-error', 'Please input first name')
    } else {
        view.setErrorMessage('first-name-error', '')
    }
    if (data.lastName.trim() === '') {
        view.setErrorMessage('last-name-error', 'Please input last name')
    } else {
        view.setErrorMessage('last-name-error', '')
    }
    if (data.email.trim() === '') {
        view.setErrorMessage('email-error', 'Please input email')
    } else {
        view.setErrorMessage('email-error', '')
    }
    if (data.password === '') {
        view.setErrorMessage('password-error', 'Please input password')
    } else {
        view.setErrorMessage('password-error', '')
    }
    if (data.confirmPassword === '') {
        view.setErrorMessage('confirm-password-error', 'Please confirm password')
        return
    } else if (data.confirmPassword != data.password) {
        view.setErrorMessage('confirm-password-error', 'Password not match')
        return
    }
    if (data.firstName !== '' && data.lastName !== '' && data.email !== '' && data.password !== '' && data.confirmPassword !== '') {
        model.register(data)
    }
}

controller.login = (dataLogin) => {
    if (dataLogin.email.trim() === '') {
        view.setErrorMessage('email-error', 'Please input email')
    } else {
        view.setErrorMessage('email-error', '')
    }
    if (dataLogin.password === '') {
        view.setErrorMessage('password-error', 'Pleasse input password')
    } else {
        view.setErrorMessage('password-error', '')
    }
    if (dataLogin.email !== '' && dataLogin.password !== '') {
        model.login(dataLogin)
    }
}
controller.createConversation = (conservation) => {
    if (conservation.title.trim() === '') {
        view.setErrorMessage('conversation-name-error', 'Please input your title message')
    } else {
        view.setErrorMessage('conversation-name-error', '')
    }
    if (conservation.friend.trim() === '') {
        view.setErrorMessage('conversation-email-error', 'Please input your friend email')
    } else {
        view.setErrorMessage('conversation-email-error', '')
    }
    if (conservation.title.trim() !== '' && conservation.friend.trim() !== '') {
        model.createConversation({
            title: conservation.title,
            users: [conservation.friend, model.currentUser.email],
            createdAt: new Date().toLocaleString(),
            messages: []
        })
    }

}