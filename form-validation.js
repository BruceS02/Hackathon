// Get the form element
let form = document.querySelector("#voter-registration-form");

// Get the register button element
let registerBtn = document.querySelector("#register-btn");

// Add an event listener to the register button
registerBtn.addEventListener("click", function(event) {
  event.preventDefault(); // prevent the form from submitting

  // Get the form data
  let formData = new FormData(form);

  // Create an object to store the form data
  let data = {};
  formData.forEach(function(value, key) {
    data[key] = value;
  });

  // Validate the form data
  let errors = validateForm(data);
  if (errors.length > 0) {
    // Display error messages
    displayErrors(errors);
    return;
  }

  // Send the form data to the server
  sendFormData(data)
    .then(response => {
      if(response.status === 200){
        // Show success message
        // Redirect user to confirmation page
        alert("Registration Successful! Redirecting to confirmation page");
        window.location.href = "/confirmation.html";
      }else{
        // Show error message
        alert("Error Occured. Please try again later");
      }
    })
    .catch(err => {
      console.log("Error Occured while sending data to the server",err);
    });
});

// Function to validate the form data
function validateForm(data) {
  let errors = [];

  // check if required fields are filled out
  if (!data["firstName"]) {
    errors.push("First name is required");
  }
  if (!data["lastName"]) {
    errors.push("Last name is required");
  }
  if (!data["email"]) {
    errors.push("Email is required");
  }
  if (!data["dob"]) {
    errors.push("Date of birth is required");
  }

  // check if the email is valid
  if (data["email"] && !isValidEmail(data["email"])) {
    errors.push("Invalid email address");
  }

  // check if the date of birth is in the past
  if (data["dob"] && !isValidDOB(data["dob"])) {
    errors.push("Invalid date of birth");
  }
  return errors;
}

// Function to send the form data to the server
function sendFormData(data) {
  // Use an AJAX library such as jQuery or axios to send the data
  return axios.post("/register", data);
}

// Function to display error messages
function displayErrors(errors) {
  let errorContainer = document.querySelector("#error-container");
  let errorList = "<ul>";
  for (let i = 0; i < errors.length; i++) {
    errorList += "<li>" + errors[i] + "</li>";
  }
  errorList += "</ul>";
  errorContainer.innerHTML = errorList;
}

// Function to check if an email is valid
function isValidEmail(email) {
  let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

// Function to check if a date of birth is in the past
function isValidDOB(dob) {
  let dobDate = new Date(dob);
  let today = new Date();
  return dobDate < today;
}