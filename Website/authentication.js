

const firestore = firebase.firestore();
const auth = firebase.auth();
// Login
const loginForm = document.querySelector("#login-form");
const errorTag = document.querySelector("#error");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const emis = loginForm.querySelector("#emis").value;
  const password = loginForm.querySelector("#password").value;

  // if (emis.length < 8 || emis == null) {
  //   errorTag.innerHTML = "ERROR: EMIS must be at least 8 characters";
  //   return;
  // }
  if (password.length < 6 || password == null) {
    errorTag.innerHTML = "ERROR: Password must be at least 6 characters";
    return;
  }

  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      emis + "@gmail.com",
      password
    );

    const userDoc = await firestore.collection("users").doc(userCredential.user.uid).get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      if (userData.userRole === "school") {
        redirectToDashboard(userCredential.user.uid, "school");
      } else {
        redirectToDashboard(userCredential.user.uid, "government");
      }
    } else {
      errorTag.innerHTML = "ERROR: User document does not exist.";
    }
  } catch (error) {
    errorTag.innerHTML = "ERROR: " + error.message;
  }
});

// Function to redirect to the appropriate dashboard
function redirectToDashboard(userId, userRole) {
  if (userRole === "school") {
    window.location.href = "../Student Portal/student.html";
  } else if (userRole === "government") {
    window.location.href = "./Dashboard/dashboard.html";
  } else {
    console.error("Unknown user role:", userRole);
  }
}


// Sign Up
// const signupForm = document.querySelector('#signup-form');
// signupForm.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const email = signupForm.querySelector('#signup-email').value;
//     const password = signupForm.querySelector('#signup-password').value;
//     const schoolname = signupForm.querySelector('#signup-schoolname').value;
//     const emis = signupForm.querySelector('#emis').value;
//     const state = signupForm.querySelector('#state').value;
//     const district = signupForm.querySelector('#district').value;

//     try {
//         const userCredential = await auth.createUserWithEmailAndPassword(email, password);

//         // User registered successfully, add user role to Firestore
//         const user = userCredential.user;

// const userData = {
//     emis: emis,
//     schoolName: schoolname,
//     uid: user.uid,
//     email: email,
//     password: password,
//     state: state,
//     district: district,
//     verified: "no",
//     userRole: "school"
// };

//         // Store user data in Firestore
//         await firebase.firestore().collection('users').doc(user.uid).set(userData);

//         console.log('User registered and account disabled initially.');
//     } catch (error) {
//         const errorMessage = error.message;
//         console.error(errorMessage);
//     }
// });
