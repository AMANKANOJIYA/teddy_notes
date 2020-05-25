

function login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithPopup(provider);
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            document.getElementById("display-name").innerHTML = `${user.displayName} (${user.email})`;
            document.getElementById("login").remove();
            showCards();
            createCard();
        }
    });
}

function showCards() {
    db = firebase.firestore();
    db.collection("notes")
        .onSnapshot(docs => {
            document.getElementById("notes").innerHTML = '';
            docs.forEach(doc => {
                document.getElementById("notes").innerHTML +=
                    `
                <div class="card "style="width: 18rem;" id="${doc.lE.key.path.segments[6]}">
                    <div class="card-body">
                        <h5 class="card-title">${doc.data().title}</h5>
                        <p class="card-text">${doc.data().desc}</p>
                        <input type="button" value="Delete" onclick="removeNote(this.parentElement.parentElement.id)">
                    </div>
			    </div>
                    `
            });
        });
};

function createCard() {
    document.getElementById("create-note").innerHTML +=
        `
            <div class="card w-50" style="width: 18rem;">
                <div class="card-body">
                <input type="text" id="input-title" placeholder="title">
                <input type="text" id="input-desc" placeholder="desc">
                </div>
                <button id="submit" type="submit" class="btn btn-dark" onclick="addNote()">Add Note</button>
            </div>
        `
}

function addNote() {
    db = firebase.firestore();
    db.collection("notes").add({
        title: `${document.getElementById("input-title").value }`,
        desc: `${document.getElementById("input-desc").value }`,
        show: true
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch(error =>  {
        console.error("Error writing document: ", error);
    });
}

function removeNote(id) {
    db = firebase.firestore();
    db.collection("notes").doc(id).delete()
    .then(() => {
        console.log("Document successfully removed!");
    })
    .catch(error => {
        console.error("Error removing document: ", error);
    });
}