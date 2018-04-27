// Basic ES5 

//initialize firebase for trains
var config = {
  apiKey: "AIzaSyDf86OPuHAQz6Jj2jmDj08EctuE8Ck_4yc",
  authDomain: "my-db-exploration01.firebaseapp.com",
  databaseURL: "https://my-db-exploration01.firebaseio.com",
  projectId: "my-db-exploration01",
  storageBucket: "my-db-exploration01.appspot.com",
  messagingSenderId: "893517913614"
};
firebase.initializeApp(config);
var database = firebase.database();

// Train Constructor
function Train(trainName, destination, firstTrainTime, frequency) {
  this.trainName = name;
  this.destination = destination;
  this.firstTrainTime = firstTrainTime;
  this.frequency = frequency;
  // Not sure about the calculated fields
  // First Time (pushed back 1 year to make sure it comes before current time_)
  let firstTimeConverted = moment(this.firstTrainTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);
  // Current Time
  let currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
  // Difference between the times
  let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  this.nextArrival = nextTrain;
  this.minutesAway = tMinutesTillTrain;
}


// UI Constructor
function UI() {}

// Add Book to List
UI.prototype.addTrainToList = function(train){
  database.ref().push({
    trainName: train.trainName,
    destination: train.destination,
    firstTrainTime: train.firstTrainTime,
    frequency: train.frequency
  });
  const list = document.getElementById('train-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insert columns
// Need to calculate nextArrival and minutesAway
  row.innerHTML = `
    <td>${train.trainName}</td>
    <td>${train.destination}</td>
    <td>${train.frequency}</td>
    <td>${train.nextArrival}</td>
    <td>${train.minutesAway}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add Classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#train-schedule-form');
  // Insert alert
  container.insertBefore(div, form);
  // Timeout after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

// Delete Employee
UI.prototype.deletTrain = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }

}

// Clear Form Fields
UI.prototype.clearFields = function() {
  document.getElementById('train-name-input').value = '';
  document.getElementById('destination-input').value = '';
  document.getElementById('first-train-time-input').value = '';
  document.getElementById('frequency-inputl').value = '';  
  
}

// Event listeners for Add Employee
document.getElementById('train-schedule-form').addEventListener('submit', function(e){
  

// Get form values
const trainName = document.getElementById('train-name-input').value,
      destination = document.getElementById('destination-input').value,
      firstTrainTime = document.getElementById('first-train-time-input').value;
      frequency = document.getElementById('frequency-input').value;
      

// Instantiate Train object
const train = new Train(trainName, destination, firstTrainTime, frequency);

// Instantiate UI
const ui = new UI();

// Validate
if(trainName === '' || destination === '' || firstTrainTime === '' || frequency === '') {
  // Error alert
  ui.showAlert('Please fill in all fields', 'error');
} else {
  // Add Employye to list
ui.addTrainToList(employee);

// Show Success
ui.showAlert('Train Added!', 'success');

// Clear Fields
ui.clearFields();
}

  e.preventDefault();
});

// Event Delegation - Event Listener for Delete
// Because this is dynamic attach to parent book-list
document.getElementById('train-list').addEventListener('click', function(e){

  // Instantiate UI
  const ui = new UI();

  ui.deletTrain(e.target);

  // Show alert
  ui.showAlert('Train Removed', 'success');

  
  e.preventDefault();

});

database.ref().on("value", function(snapshot) {
  var trainData = snapshot.val();
  console.log(trainData);
});