
function login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithPopup(provider);
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user)
            document.getElementById("display-name").innerHTML = `${user.displayName} (${user.email})`;
            document.getElementById("login").remove();
        }
    });
}

