const firestore = firebase.firestore();
const auth = firebase.auth();

function signo(){
    auth.signOut()
    .then(() => {
      // Sign-out successful.
      console.log("Sign-out successful.");
      window.location.href = '../../Access/auth.html'
    })
    .catch((error) => {
      // An error happened.
      console.log("An error happened.");
    });
  }