function togglePasswordVisibility() {
  const passwordField = document.getElementById("password");
  if (passwordField.type === "password") {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
}


const blogCommentInput = document.getElementById('blog-comment');

blogCommentInput.addEventListener('input', function () {
  this.style.height = 'auto'; // Reset the height
  this.style.height = `${this.scrollHeight}px`; // Set the height to match the scrollHeight
});