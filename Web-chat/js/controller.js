const controller = {}
controller.register = (data) => {
    if (data.firstName === '') {
        view.setErrorMessage('first-name-error', 'Pls input first name')
    } else {
        view.setErrorMessage('first-name-error', '')
    }
    if (data.lastName === '') {
        view.setErrorMessage('last-name-error', 'Pls input last name')
    } else {
        view.setErrorMessage('last-name-error', '')
    }
    if (data.email === '') {
        view.setErrorMessage('email-error', 'Pls input email')
    } else {
        view.setErrorMessage('email-error', '')
    }
    if (data.password === '') {
        view.setErrorMessage('password-error', 'Pls input password')
    } else {
        view.setErrorMessage('password-error', '')
    }
    if (data.confirmPassword === '') {
        view.setErrorMessage('confirm-password-error', 'Pls confirm password')
    } else if (data.confirmPassword != data.password) {
        view.setErrorMessage('confirm-password-error', 'Password not match')
    }
}

controller.login = ({ email, password }) => {
    if (email === '') {
        view.setErrorMessage('email-error', 'Pls input email')
    } else {
        view.setErrorMessage('email-error', '')
    }
    if (password === '') {
        view.setErrorMessage('password-error', 'Pls input password')
    } else {
        view.setErrorMessage('password-error', '')
    }
}