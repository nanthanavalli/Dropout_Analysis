
const firestore = firebase.firestore();
const auth = firebase.auth();
let index = 1;

// Reference to the table body where data will be displayed
const tableBody = document.querySelector("#pool-table tbody");

// Function to load data from the "Pool" collection
function loadPoolData() {
  // Clear existing table rows
  tableBody.innerHTML = "";

  // Reference to the "Pool" collection
  const poolCollection = firestore.collection("Pool");

  // Retrieve data from the "Pool" collection
  poolCollection
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
                <td>${studentData.school}</td>
                <td>${studentData.schoolType}</td>
                <td>${studentData.discontinueReason}</td>

                <td>
                    <button id="std-view-btn" onclick="viewStudent('${doc.id}')">View Details</button>
                </td>

                <!-- Add more table cells for other fields as needed -->
                `;
        // Append the new row to the table
        tableBody.appendChild(newRow);
        index++;
      });
    })
    .catch((error) => {
      console.error("Error loading data from Pool collection: ", error);
    });
}

// Call the function to load data when the page loads
window.addEventListener("load", () => {
  // Load data from the "Pool" collection
  loadPoolData();
});

function viewStudent(docId) {
  firestore
    .collection("Pool")
    .doc(docId)
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
        document.querySelector("#medium-of-instruction").value =
          studentData.mediumOfInstruction;
        document.querySelector("#ifsc-code").value = studentData.ifscCode;
        document.querySelector("#bank-name").value = studentData.bankName;
        document.querySelector("#account-no").value = studentData.accountNumber;
        document.querySelector("#account-type").value = studentData.accountType;
        document.querySelector("#discontinue").value = studentData.discontinueReason;

        // Show the modal overlay
        openStudentDetailsModel();

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


function openStudentDetailsModel() {
  // Show the modal overlay
  document.getElementById("modal-overlay").style.display = "flex";
}

function closeStudentDetailsModel() {
  // Hide the modal overlay
  document.getElementById("modal-overlay").style.display = "none";
}

function signo(){
    auth.signOut()
    .then(() => {
      // Sign-out successful.
      console.log("Sign-out successful.");
      window.location.href = '../Government/index.html'
    })
    .catch((error) => {
      // An error happened.
      console.log("An error happened.");
    });
}

// function updateStudent(docId) {
//   // Retrieve form values as you did in the newAdmission function
//   const name = document.querySelector("#name").value;
//   const usiNo = document.querySelector("#usiNo").value;
//   const aadhaar = document.querySelector("#aadhaar").value;
//   const dob = document.querySelector("#DOB").value;
//   const gender = document.querySelector("#gender").value;
//   const bloodGroup = document.querySelector("#blood-group").value;
//   const motherTongue = document.querySelector("#mother-tounge").value;
//   const religion = document.querySelector("#religion").value;
//   const community = document.querySelector("#community").value;

//   // Retrieving values for family details
//   const fathersName = document.querySelector("#fathers-name").value;
//   const fathersOccupation = document.querySelector("#fathers-occupation").value;
//   const fathersEducation = document.querySelector("#fathers-education").value;
//   const mothersName = document.querySelector("#mothers-name").value;
//   const mothersOccupation = document.querySelector("#mothers-occupation").value;
//   const mothersEducation = document.querySelector("#mothers-education").value;
//   const familyIncome = document.querySelector("#family-income").value;

//   // Retrieving values for communication details
//   const mobileNumber = document.querySelector("#mobile-number").value;
//   const emailId = document.querySelector("#email-id").value;
//   const doorNumber = document.querySelector("#door-no").value;
//   const streetName = document.querySelector("#street-name").value;
//   const cityName = document.querySelector("#city-name").value;
//   const district = document.querySelector("#district").value;
//   const pincode = document.querySelector("#pincode").value;

//   // Retrieving values for academic details
//   const studentClass = document.querySelector("#class").value;
//   const section = document.querySelector("#section").value;
//   const dateOfJoining = document.querySelector("#date-of-joining").value;
//   const mediumOfInstruction = document.querySelector(
//     "#medium-of-instruction"
//   ).value;

//   // Retrieving values for bank details
//   const ifscCode = document.querySelector("#ifsc-code").value;
//   const bankName = document.querySelector("#bank-name").value;
//   const accountNumber = document.querySelector("#account-no").value;
//   const accountType = document.querySelector("#account-type").value;

//   // Update the student data in the database
//   firestore
//     .collection("Pool")
//     .doc(docId)
//     .update({
//       name: name,
//       usiNo: usiNo,
//       aadhaar: aadhaar,
//       dob: dob,
//       gender: gender,
//       bloodGroup: bloodGroup,
//       motherTongue: motherTongue,
//       religion: religion,
//       community: community,
//       fathersName: fathersName,
//       fathersOccupation: fathersOccupation,
//       fathersEducation: fathersEducation,
//       mothersName: mothersName,
//       mothersOccupation: mothersOccupation,
//       mothersEducation: mothersEducation,
//       familyIncome: familyIncome,
//       mobileNumber: mobileNumber,
//       emailId: emailId,
//       doorNumber: doorNumber,
//       streetName: streetName,
//       cityName: cityName,
//       studentDistrict: district, // Change this variable name to avoid conflicts
//       pincode: pincode,
//       studentClass: studentClass,
//       section: section,
//       dateOfJoining: dateOfJoining,
//       mediumOfInstruction: mediumOfInstruction,
//       ifscCode: ifscCode,
//       bankName: bankName,
//       accountNumber: accountNumber,
//       accountType: accountType,
//     })
//     .then(() => {
//       console.log("Student data updated successfully.");
//       // Close the form modal
//       closeStudentDetailsModel();
//       // Reload the student data
//       loadPoolData();
//     })
//     .catch((error) => {
//       console.error("Error updating student data: ", error);
//     });
// }