const model = {}
model.currentUser = undefined
model.conversations = undefined
model.currentConversation = undefined
model.collectionName = 'conversations'
model.register = async(data) => {
    try {
        await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        firebase.auth().currentUser.updateProfile({
            displayName: data.firstName + ' ' + data.lastName
        })
        firebase.auth().currentUser.sendEmailVerification()
        alert('The  email have been registered, please check the email')
        view.setActiveScreen('loginScreen')
    } catch (err) {
        console.log(err)
        alert(err.message)
    }
    //.then((res) => {
    //     firebase.auth().currentUser.updateProfile({
    //         displayName: data.firstName + ' ' + data.lastName
    //     })
    //     firebase.auth().currentUser.sendEmailVerification()
    // }).catch((err) => {
    //     console.log(err)
    // })

}
model.login = async(dataLogin) => {
    try {
        const response = await firebase.auth().signInWithEmailAndPassword(dataLogin.email, dataLogin.password)
        console.log(response)
            // if (response.user.emailVerified === false) {
            //     alert('Please verify your email')
            // } else {
            //     model.currentUser = {
            //         displayName: response.user.displayName,
            //         email: response.user.email
            //     }
            //     view.setActiveScreen('chatScreen')
            // }
    } catch (err) {
        console.log(err)
        alert(err.message)
    }
}
model.addMessage = (message) => {
    const dataToUpdate = {
        messages: firebase.firestore.FieldValue.arrayUnion(message)
    }
    firebase.firestore().collection(model.collectionName).doc('5Yus4IAlPldWLsFGn8OM').update(dataToUpdate)
}
model.loadConversations = async() => {
    const response = await firebase.firestore().collection(model.collectionName).where('users', 'array-contains', model.currentUser.email).get()
    model.conversations = getDataFromDocs(response.docs)
    if (model.conversations.length > 0) {
        model.currentConversation = model.conversations[0]
        view.showCurrentConversation()
    }
    view.showConversations()
}
model.listenConversationsChange = () => {
    let isFisrstRun = true
    firebase.firestore().collection(model.collectionName).where('users', 'array-contains', model.currentUser.email).onSnapshot((res) => {
        if (isFisrstRun) {
            isFisrstRun = false
            return
        }
        const docChanges = res.docChanges()
        console.log(docChanges)
        for (oneChange of docChanges) {
            const type = oneChange.type
                //update lai model conversations
            if (type === 'modified') {
                const docData = getDataFromDoc(oneChange.doc);
                console.log(docData);
                console.log(model.currentConversation.users);
                if (docData.users.length > model.currentConversation.users.length) {
                    // Update list users
                    view.addUser(docData.users[docData.users.length - 1])
                } else {
                    // Update conversations
                    for (let index = 0; index < model.conversations.length; index++) {
                        if (model.conversations[index].id === docData.id) {
                            model.conversations[index] = docData
                        }
                    }
                    // Update currentConversation
                    if (docData.id === model.currentConversation.id) {
                        model.currentConversation = docData;
                        const lastMessage = docData.messages[docData.messages.length - 1];
                        view.addMessage(lastMessage);
                    }
                }
            } else if (type === 'added') {
                const docData = getDataFromDoc(oneChange.doc)
                model.conversations.push(docData)
                view.addConversation(docData)
            }
        }
    })
}
model.createConversation = (conversation) => {
    firebase.firestore().collection(model.collectionName).add(conversation)
}