// Add event listener to show/hide the new post form
document.getElementById('new-post-btn').addEventListener('click', function() {
    var form = document.getElementById('new-post-form');
    form.style.display = (form.style.display === 'none') ? 'block' : 'none';
  });