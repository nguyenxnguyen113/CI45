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
    view.setActiveScreen('registerScreen')
}
window.onload = init
