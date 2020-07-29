const init = () => {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyB-GTJb8eYa945i34u-rOvedSTYaQUIzqg",
        authDomain: "chat-6bc04.firebaseapp.com",
        databaseURL: "https://chat-6bc04.firebaseio.com",
        projectId: "chat-6bc04",
        storageBucket: "chat-6bc04.appspot.com",
        messagingSenderId: "71368848088",
        appId: "1:71368848088:web:c3182f74002be640a19dad"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    console.log(firebase.app().name)
    console.log('Windown loaded')

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            if (user.emailVerified) {
                model.currentUser = {
                    displayName: user.displayName,
                    email: user.email
                }
                view.setActiveScreen('chatScreen')
            } else {
                view.setActiveScreen('loginScreen')
                alert('Please verify your email')
            }
        } else {
            view.setActiveScreen('loginScreen')
        }
    });
}
window.onload = init
