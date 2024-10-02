let index = 1;
const firestore = firebase.firestore();
const auth = firebase.auth();

// Call the function to load student data when the page loads
window.addEventListener("load", () => {
  // Check authentication state before loading data
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, call the function to load data
      loadStudentData();
      console.log(user);
    } else {
      // User is not signed in, handle accordingly
      console.error("User is not signed in.");
    }
  });
});

function openStudentEntryModel(str) {
  // Show the modal overlay
  document.getElementById("modalOverlay").style.display = "flex";
  if (str == "admission") {

    document.getElementById("TC").style.display = "none";
  } else {
    document.getElementById("TC").style.display = "block";
  }
}

function closeStudentEntryModel() {
  // Hide the modal overlay
  document.getElementById("modalOverlay").style.display = "none";
}

function loadStudentData() {
  const tableBody = document.querySelector("#student-table tbody");

  // Check if the user is authenticated
  const user = auth.currentUser;
  if (!user) {
    // Handle the case where the user is not authenticated
    console.error("User is not authenticated.");
    return;
  }

  // Clear existing table rows
  tableBody.innerHTML = "";

  const studentsCollection = firestore
    .collection("Schools")
    .doc(user.uid)
    .collection("Students");

  studentsCollection
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const studentData = doc.data();
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${index}</td>
            <td>${studentData.usiNo}</td>
            <td>${studentData.name}</td>
            <td>${studentData.gender}</td>
            <td>${studentData.class}</td>
            <td>${studentData.section}</td>
            <td>
            <button style="background-color:transparent; border: transparent;" onclick="editStudent('${doc.id}')"><img src="Assets/editing.png"></button>
            </td>
          `;

        // Append the new row to the table
        tableBody.appendChild(newRow);
        index++;
      });
    })
    .catch((error) => {
      console.error("Error loading student data: ", error);
    });
}

async function newAdmission() {
  index = 1;

  // Retrieving values for personal information
  const name = document.querySelector("#name").value;
  const usiNo = document.querySelector("#usiNo").value;
  const aadhaar = document.querySelector("#aadhaar").value;
  const dob = document.querySelector("#DOB").value;
  const gender = document.querySelector("#gender").value;
  const bloodGroup = document.querySelector("#blood-group").value;
  const motherTongue = document.querySelector("#mother-tounge").value;
  const religion = document.querySelector("#religion").value;
  const community = document.querySelector("#community").value;

  // Retrieving values for family details
  const fathersName = document.querySelector("#fathers-name").value;
  const fathersOccupation = document.querySelector("#fathers-occupation").value;
  const fathersEducation = document.querySelector("#fathers-education").value;
  const mothersName = document.querySelector("#mothers-name").value;
  const mothersOccupation = document.querySelector("#mothers-occupation").value;
  const mothersEducation = document.querySelector("#mothers-education").value;
  const familyIncome = document.querySelector("#family-income").value;

  // Retrieving values for communication details
  const mobileNumber = document.querySelector("#mobile-number").value;
  const emailId = document.querySelector("#email-id").value;
  const cityName = document.querySelector("#city-name").value;
  const district = document.querySelector("#district").value;
  const pincode = document.querySelector("#pincode").value;

  // Retrieving values for academic details
  const studentClass = document.querySelector("#class").value;
  const section = document.querySelector("#section").value;
  // const academicPercentage = document.querySelector("#ac-percentage").value;
  const mediumOfInstruction = document.querySelector(
    "#medium-of-instruction"
  ).value;

  // Retrieving values for bank details
  const ifscCode = document.querySelector("#ifsc-code").value;
  const bankName = document.querySelector("#bank-name").value;
  const accountNumber = document.querySelector("#account-no").value;
  const accountType = document.querySelector("#account-type").value;
  closeStudentEntryModel();

  let schoolData;
  await firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      schoolData = doc.data();
    });

    const schoolName = schoolData && schoolData.name ? schoolData.name : '';
    const schooltype = schoolData && schoolData.type ? schoolData.type : '';


  const studentData = {
    name: name,
    usiNo: usiNo,
    aadhaar: aadhaar,
    dob: dob,
    gender: gender,
    bloodGroup: bloodGroup,
    motherTongue: motherTongue,
    religion: religion,
    community: community,
    fathersName: fathersName,
    fathersOccupation: fathersOccupation,
    fathersEducation: fathersEducation,
    mothersName: mothersName,
    mothersOccupation: mothersOccupation,
    mothersEducation: mothersEducation,
    familyIncome: familyIncome,
    mobileNumber: mobileNumber,
    emailId: emailId,
    city: cityName,
    district: district, // Change this variable name to avoid conflicts
    pincode: pincode,
    class: studentClass,
    section: section,
    mediumOfInstruction: mediumOfInstruction,
    ifscCode: ifscCode,
    bankName: bankName,
    accountNumber: accountNumber,
    accountType: accountType,
    school: schoolName,
    // academicPercentage:academicPercentage,
    schoolType: schooltype,
    discontinue: "No",
  };

  // Check if a student with the same EMIS number exists in the "Pool" collection
  const poolDocRef = firestore.collection("Pool").doc(usiNo);
  const poolDocSnapshot = await poolDocRef.get();

  if (poolDocSnapshot.exists) {
    // Student with the same EMIS number exists in the pool, so remove it and add to "Schools" collection
    firestore
      .collection("Pool")
      .doc(usiNo)
      .delete()
      .catch((error) => {
        console.error("Error deleting student from pool: ", error);
      });
  }

  // Add the student to the "Schools" collection
  firestore.collection("All Students").doc(usiNo).set(studentData).catch((error) => {
    console.error("Error adding student to schools collection: ", error);
  });
  await firestore
    .collection("Schools")
    .doc(auth.currentUser.uid)
    .collection("Students")
    .doc(usiNo)
    .set(studentData)
    .then(() => {
      // Once the student is added, load the updated student data
      loadStudentData();
    })
    .catch((error) => {
      console.error("Error adding student to schools collection: ", error);
    });
    closeStudentEntryModel();
    
}

function editStudent(docId) {
  const studentRef = firestore
    .collection("Schools")
    .doc(auth.currentUser.uid)
    .collection("Students")
    .doc(docId);

  studentRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const studentData = doc.data();
        // Populate form fields with existing data for editing
        document.querySelector("#name").value = studentData.name;
        document.querySelector("#usiNo").value = studentData.usiNo;
        document.querySelector("#aadhaar").value = studentData.aadhaar;
        document.querySelector("#DOB").value = studentData.dob;
        document.querySelector("#gender").value = studentData.gender;
        document.querySelector("#blood-group").value = studentData.bloodGroup;
        document.querySelector("#mother-tounge").value =
          studentData.motherTongue;
        document.querySelector("#religion").value = studentData.religion;
        document.querySelector("#community").value = studentData.community;
        document.querySelector("#fathers-name").value = studentData.fathersName;
        document.querySelector("#fathers-occupation").value =
          studentData.fathersOccupation;
        document.querySelector("#fathers-education").value =
          studentData.fathersEducation;
        document.querySelector("#mothers-name").value = studentData.mothersName;
        document.querySelector("#mothers-occupation").value =
          studentData.mothersOccupation;
        document.querySelector("#mothers-education").value =
          studentData.mothersEducation;
        document.querySelector("#family-income").value =
          studentData.familyIncome;
        document.querySelector("#mobile-number").value =
          studentData.mobileNumber;
        document.querySelector("#email-id").value = studentData.emailId;
        document.querySelector("#city-name").value = studentData.city;
        document.querySelector("#district").value = studentData.district;
        document.querySelector("#pincode").value = studentData.pincode;
        document.querySelector("#class").value = studentData.class;
        document.querySelector("#section").value = studentData.section;
        // document.querySelector("#ac-percentage").value = studentData.academicPercentage;
        

        document.querySelector("#medium-of-instruction").value =
          studentData.mediumOfInstruction;

        document.querySelector("#ifsc-code").value = studentData.ifscCode;
        document.querySelector("#bank-name").value = studentData.bankName;
        document.querySelector("#account-no").value = studentData.accountNumber;
        document.querySelector("#account-type").value = studentData.accountType;

        // Show the modal overlay
        openStudentEntryModel("edit");

        // Set up a callback for the Submit button to update the data
        document.querySelector("#submit-button").onclick = function () {
          updateStudent(docId);
        };
      } else {
        console.error("Student document does not exist.");
      }
    })
    .catch((error) => {
      console.error("Error retrieving student data for editing: ", error);
    });
}

function updateStudent(docId) {
  // Retrieve form values as you did in the newAdmission function
  const name = document.querySelector("#name").value;
  const usiNo = document.querySelector("#usiNo").value;
  const aadhaar = document.querySelector("#aadhaar").value;
  const dob = document.querySelector("#DOB").value;
  const gender = document.querySelector("#gender").value;
  const bloodGroup = document.querySelector("#blood-group").value;
  const motherTongue = document.querySelector("#mother-tounge").value;
  const religion = document.querySelector("#religion").value;
  const community = document.querySelector("#community").value;

  // Retrieving values for family details
  const fathersName = document.querySelector("#fathers-name").value;
  const fathersOccupation = document.querySelector("#fathers-occupation").value;
  const fathersEducation = document.querySelector("#fathers-education").value;
  const mothersName = document.querySelector("#mothers-name").value;
  const mothersOccupation = document.querySelector("#mothers-occupation").value;
  const mothersEducation = document.querySelector("#mothers-education").value;
  const familyIncome = document.querySelector("#family-income").value;

  // Retrieving values for communication details
  const mobileNumber = document.querySelector("#mobile-number").value;
  const emailId = document.querySelector("#email-id").value;
  const cityName = document.querySelector("#city-name").value;
  const district = document.querySelector("#district").value;
  const pincode = document.querySelector("#pincode").value;

  // Retrieving values for academic details
  const studentClass = document.querySelector("#class").value;
  const section = document.querySelector("#section").value;
  // const academicPercentage = document.querySelector("#ac-percentage").value;
  const mediumOfInstruction = document.querySelector(
    "#medium-of-instruction"
  ).value;

  // Retrieving values for bank details
  const ifscCode = document.querySelector("#ifsc-code").value;
  const bankName = document.querySelector("#bank-name").value;
  const accountNumber = document.querySelector("#account-no").value;
  const accountType = document.querySelector("#account-type").value;

  // Update the student data in the database
  firestore
    .collection("Schools")
    .doc(auth.currentUser.uid)
    .collection("Students")
    .doc(docId)
    .update({
      name: name,
      usiNo: usiNo,
      aadhaar: aadhaar,
      dob: dob,
      gender: gender,
      bloodGroup: bloodGroup,
      motherTongue: motherTongue,
      religion: religion,
      community: community,
      fathersName: fathersName,
      fathersOccupation: fathersOccupation,
      fathersEducation: fathersEducation,
      mothersName: mothersName,
      mothersOccupation: mothersOccupation,
      mothersEducation: mothersEducation,
      familyIncome: familyIncome,
      mobileNumber: mobileNumber,
      emailId: emailId,
      city: cityName,
      district: district, // Change this variable name to avoid conflicts
      pincode: pincode,
      class: studentClass,
      section: section,
      mediumOfInstruction: mediumOfInstruction,
      ifscCode: ifscCode,
      bankName: bankName,
      accountNumber: accountNumber,
      accountType: accountType,
      // academicPercentage:academicPercentage,
      discontinue:"No",
    })
    .then(() => {
      console.log("Student data updated successfully.");
      // Close the form modal
      closeStudentEntryModel();
      // Reload the student data
      loadStudentData();
    })
    .catch((error) => {
      console.error("Error updating student data: ", error);
    });
}


function pushToCommonPool() {
  // Retrieve form values as you did in the newAdmission function
  const name = document.querySelector("#name").value;
  const usiNo = document.querySelector("#usiNo").value;
  const aadhaar = document.querySelector("#aadhaar").value;
  const dob = document.querySelector("#DOB").value;
  const gender = document.querySelector("#gender").value;
  const bloodGroup = document.querySelector("#blood-group").value;
  const motherTongue = document.querySelector("#mother-tounge").value;
  const religion = document.querySelector("#religion").value;
  const community = document.querySelector("#community").value;
  
  // Retrieving values for family details
  const fathersName = document.querySelector("#fathers-name").value;
  const fathersOccupation = document.querySelector("#fathers-occupation").value;
  const fathersEducation = document.querySelector("#fathers-education").value;
  const mothersName = document.querySelector("#mothers-name").value;
  const mothersOccupation = document.querySelector("#mothers-occupation").value;
  const mothersEducation = document.querySelector("#mothers-education").value;
  const familyIncome = document.querySelector("#family-income").value;

  // Retrieving values for communication details
  const mobileNumber = document.querySelector("#mobile-number").value;
  const emailId = document.querySelector("#email-id").value;
  const cityName = document.querySelector("#city-name").value;
  const district = document.querySelector("#district").value;
  const pincode = document.querySelector("#pincode").value;
  
  // Retrieving values for academic details
  const studentClass = document.querySelector("#class").value;
  const section = document.querySelector("#section").value;
  // const academicPercentage = document.querySelector("#ac-percentage").value;
  const mediumOfInstruction = document.querySelector(
    "#medium-of-instruction"
    ).value;
    
    // Retrieving values for bank details
    const ifscCode = document.querySelector("#ifsc-code").value;
    const bankName = document.querySelector("#bank-name").value;
    const accountNumber = document.querySelector("#account-no").value;
    const accountType = document.querySelector("#account-type").value;
    const discontinue = document.querySelector("#discontinue").value;
    
    // Prompt the user for confirmation
    const confirmation = prompt("Type 'push' to confirm moving to Common Pool:");
    
    // Check if the user typed 'push' (case insensitive)
    if (confirmation && confirmation.toLowerCase() === "push") {
      // User confirmed moving to Common Pool, proceed with the operation
      
      firestore
      .collection("Pool")
      .doc(usiNo)
      .set({
        name: name,
        usiNo: usiNo,
        aadhaar: aadhaar,
        dob: dob,
        gender: gender,
        bloodGroup: bloodGroup,
        motherTongue: motherTongue,
        religion: religion,
        community: community,
        fathersName: fathersName,
        fathersOccupation: fathersOccupation,
        fathersEducation: fathersEducation,
        mothersName: mothersName,
        mothersOccupation: mothersOccupation,
        mothersEducation: mothersEducation,
        familyIncome: familyIncome,
        mobileNumber: mobileNumber,
        emailId: emailId,
        city: cityName,
        district: district, // Change this variable name to avoid conflicts
        pincode: pincode,
        class: studentClass,
        section: section,
        mediumOfInstruction: mediumOfInstruction,
        ifscCode: ifscCode,
        bankName: bankName,
        accountNumber: accountNumber,
        accountType: accountType,
        discontinueReason: discontinue,
        discontinue:"Yes",
        // dateOfDiscontinue: new Date().toString(),
        // academicPercentage:academicPercentage,
      })
      .then(() => {
        firestore
        .collection("Schools")
        .doc(auth.currentUser.uid)
        .collection("Students")
        .doc(usiNo)
        .delete()
        .catch((error) => {
          console.error(error.message);
        });
        loadStudentData();
        // closeStudentEntryModel();
      })
      .catch((error) => {
        console.error(error.message);
      });

    // loadStudentData();
    closeStudentEntryModel();
  }
}



function signo(){
  auth.signOut()
  .then(() => {
    // Sign-out successful.
    console.log("Sign-out successful.");
    window.location.href = '../Access/auth.html'
  })
  .catch((error) => {
    // An error happened.
    console.log("An error happened.");
  });
}

// Function to delete a student
// function deleteStudent(docId) {

// // Prompt the user for confirmation
// const confirmation = prompt("Type 'delete' to confirm deletion:");

// // Check if the user typed 'delete' (case insensitive)
// if (confirmation && confirmation.toLowerCase() === "delete") {
//   // User confirmed deletion, proceed with deleting the student document
//   const studentRef = firestore
//     .collection("Schools")
//     .doc(auth.currentUser.uid)
//     .collection("Students")
//     .doc(docId);

//   studentRef
//     .delete()
//     .then(() => {
//       console.log("Student data deleted successfully.");
//       // Reload the student data
//       loadStudentData();
//     })
//     .catch((error) => {
//       console.error("Error deleting student data: ", error);
//     });
// } else {
//   // User did not confirm deletion or typed something else
//   console.log("Deletion canceled or incorrect confirmation.");
// }
// }