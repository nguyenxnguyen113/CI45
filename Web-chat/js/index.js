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

    // firestoreFunction()

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

firestoreFunction = async() => {
    // get one document
    const documentId = 'JObjyW5eTWxDXwPmwKDg'
    const response = await firebase.firestore().collection('users').doc(documentId).get()
    const user = getDataFromDoc(response)


    // get many document
    const response2 = await firebase.firestore().collection('users').where('name', '==', 'David').get()
    const listUser = getDataFromDocs(response2.docs)
    console.log(listUser)


    // add document
    const userToAdd = {
        name: 'JJJ',
        age: '2',
        email: 'n@gmail.com'
    }

    // firebase.firestore().collection('users').add(userToAdd)

    // update document
    const documentIdToUpdate = 'JObjyW5eTWxDXwPmwKDg'
    const dataToUpDate = {
        name: 'Dang Hieu Duc',
        // phoneNumber: firebase.firestore.FieldValue.arrayUnion('093')
    }
    firebase.firestore().collection('users').doc(documentIdToUpdate).update(dataToUpDate)

    // delete document

    const docToDelete = 'JObjyW5eTWxDXwPmwKDg'
    firebase.firestore().collection('users').doc(docToDelete).delete()
}
getDataFromDoc = (doc) => {
    const data = doc.data()
    data.id = doc.id
    return data
}
getDataFromDocs = (docs) => {
    return docs.map(item => getDataFromDoc(item))
        // for (let index = 0; index < listData.length; index++) {
        //     const element = getDataFromDoc(docs[index])
        //     listData.push(element)
        // }
        // return listData;

}