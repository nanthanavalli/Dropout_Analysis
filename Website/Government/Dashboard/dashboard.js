
// Initialize Firebase with your configuration
// firebase.initializeApp({
//     apiKey: "AIzaSyBJdDIRnBMoxclW3RWFlLQHqg2EjZrEUYs",
//     authDomain: "sih-23-65cac.firebaseapp.com",
//     projectId: "sih-23-65cac",
//     storageBucket: "sih-23-65cac.appspot.com",
//     messagingSenderId: "962780375707",
//     appId: "1:962780375707:web:40d2983ce19a7bbd8e743e"
// });

window.addEventListener('load',(e)=>{
    e.preventDefault();
    loadData();

})

function drawBarChart(data,barColor){
    const xValues = data[0];
    const yValues = data[1];
  
    const config = {
      type: 'bar',
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColor,
          data: yValues,
          borderColor:barColor,
          borderWidth: 1
        }]

        
    
      },
      options: {
        scales: {
            y: {
              beginAtZero: true
            }
          },
        responsive:true,
        plugins:{
            legend:{
                position:'right',
            },
            title: {
                display: true,
                text: "Class"
            }
        }
        
      } 
      
    };
  }

  function drawPieChart(text_attr,data,BarColor){
    const xValues = data[0];
    const yValues = data[1];
    console.log(xValues,yValues);
    const config={
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
              backgroundColor: BarColor,
              data: yValues
            }]
        },
        options: {
          responsive:true,
          plugins:{
              legend:{
                  position:'right',
              },
              title: {
                  display: true,
                  text: text_attr
              }
          }
          
        }
    };
    return config;
  }
  

function drawDougnutChart(text_attr,data,barColor){
    const xValues = data[0];
    const yValues = data[1];
    
    const config = {
      type: 'doughnut',
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColor,
          data: yValues,
          hoverOffset:4
        }]
    
      }, 		
      options: {
        
        responsive:true,
        plugins:{
            legend:{
                position:'right',
            },
            title: {
                display: true,
                text: text_attr
            }
        }
        
      }
    };
    return config;
  }
  
async function loadData() {

    const color = ["#b91d47", "#00aba9", "#2b5797", "#9c27b0", "#ff9800", "#009688", "#cddc39"]
    // Initialize Firebase with your configuration
    // firebase.initializeApp({
    //     apiKey: "AIzaSyBJdDIRnBMoxclW3RWFlLQHqg2EjZrEUYs",
    //     authDomain: "sih-23-65cac.firebaseapp.com",
    //     projectId: "sih-23-65cac",
    //     storageBucket: "sih-23-65cac.appspot.com",
    //     messagingSenderId: "962780375707",
    //     appId: "1:962780375707:web:40d2983ce19a7bbd8e743e"
    // }); 	Neelofar Keer 	Male 	12th 	Amreli 	GANDHI VIDYALAYA 	Private 	

    // async function fetchFirestoreData() {
        const db = firebase.firestore();
        const CasteRef = await db.collection('Details').doc('Student Details').collection('Common Pool').doc('Caste').get();
        const GenderRef = await db.collection('Details').doc('Student Details').collection('Common Pool').doc('Gender').get();
        const ClassRef = await db.collection('Details').doc('Student Details').collection('Common Pool').doc('Class').get();


        if (CasteRef.exists) {
            const docData = CasteRef.data();
            console.log(docData)
            const casteData = [['General', 'SEBC', 'SC', 'ST', 'OBC', 'NT', 'DT'], [docData["General"], docData["SEBS"], docData["SC"], docData["ST"], docData["OBC"], docData["NT"], docData["DT"]]];  // Put General count in an array
            console.log(casteData);
            // Update the HTML element
            const genAnalyticElement = document.getElementById("gen-analytic");
            new Chart("myChart1", drawDougnutChart('CASTE',casteData, color));
        } else {
            console.log('No such document');
        }

        if (GenderRef.exists) {
            const docData = GenderRef.data();
            const genderData = [['Male', 'Female'], [docData["Male"], docData["Female"]]];  // Put General count in an array
            console.log(genderData);
        } else {
            console.log('No such document');
        }

        if (ClassRef.exists) {
            const docData = ClassRef.data();
            const classData = [["1st class", "2nd class", "3rd class", "4th class", "5th class", "6th class", "7th class", "8th class", "9th class", "10th class", "11th class",],
            [docData["1st"], docData["2nd"], docData["3rd"], docData["4th"], docData["5th"], docData["6th"], docData["7th"], docData["8th"], docData["9th"], docData["10th"], docData["11th"]]];  // Put General count in an array
            console.log(classData);
            new Chart("myChart2",drawPieChart('CLASS',classData,color));
        } else {
            console.log('No such document');
        }
    // }
}

async function fetchFirestoreData() {
    const db = firebase.firestore();
    const CasteRef = await db.collection('Details').doc('Student Details').collection('Common Pool').doc('Caste').get();
    const GenderRef = await db.collection('Details').doc('Student Details').collection('Common Pool').doc('Gender').get();
    const ClassRef = await db.collection('Details').doc('Student Details').collection('Common Pool').doc('Class').get();


    if (CasteRef.exists) {
        const docData = CasteRef.data();
        const casteData = [['General', 'SEBS', 'SC', 'ST', 'OBC', 'NT', 'DT'], [docData["General"], docData["SEBC"], docData["SC"], docData["ST"], docData["OBC"], docData["NT"], docData["DT"]]];  // Put General count in an array
        console.log(casteData);
        // Update the HTML element
        const genAnalyticElement = document.getElementById("gen-analytic");
        genAnalyticElement.innerHTML = data_.map(([key, value]) => `${key}: ${value}`).join(', ');
    } else {
        console.log('No such document');
    }

    if (GenderRef.exists) {
        const docData = GenderRef.data();
        const genderData = [['Male', 'Female'], [docData["Male"], docData["Female"]]];  // Put General count in an array
        console.log(genderData);
    } else {
        console.log('No such document');
    }

    if (ClassRef.exists) {
        const docData = classRef.data();
        const classData = [["1st class", "2nd class", "3rd class", "4th class", "5th class", "6th class", "7th class", "8th class", "9th class", "10th class", "11th class",],
        [docData["1st"], docData["2nd"], docData["3rd"], docData["4th"], docData["5th"], docData["6th"], docData["7th"], docData["8th"], docData["9th"], docData["10th"], docData["11th"]]];  // Put General count in an array
        console.log(classData);
    } else {
        console.log('No such document');
    }
}

function signo() {
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
