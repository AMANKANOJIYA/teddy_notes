

function login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithPopup(provider);
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            document.getElementById("display-name").innerHTML = `${user.displayName} (${user.email})`;
            document.getElementById("login").remove();
            showCards();
        }
    });
}

function showCards() {
    db = firebase.firestore();
    db.collection("notes")
        .onSnapshot(docs => {
            document.getElementById("notes").innerHTML = '';
            docs.forEach(function (doc) {
                document.getElementById("notes").innerHTML +=
                    `
                <div class="card col" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${doc.data().title}</h5>
                        <p class="card-text">${doc.data().desc}</p>
                    </div>
			    </div>
                    `
            });
        });
};