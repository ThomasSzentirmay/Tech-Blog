// Show Password Functionality
function togglePasswordVisibility() {
  const passwordField = document.getElementById("password");
  if (passwordField.type === "password") {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
}


// Updated Blog Button Functionality
function toggleUpdateContainer(id) {
  const updateContainer = document.getElementById(`update-container-${id}`);
  if (updateContainer) {
    updateContainer.classList.toggle('hidden');
  }
}