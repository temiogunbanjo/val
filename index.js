document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Hardcoded password for simplicity
    const correctPassword = 'KEFO';
  
    // Get the input value
    const passwordInput = document.getElementById('password').value;
  
    if (passwordInput === correctPassword) {
      // Redirect to the next page if password is correct
      window.location.href = '/home';
    } else {
      alert('Incorrect password!');
    }
  });
  