// Form switching functionality
function switchToSignup() {
  document.getElementById('loginForm').classList.remove('active');
  document.getElementById('signupForm').classList.add('active');
  hideMessage();
}

function switchToLogin() {
  document.getElementById('signupForm').classList.remove('active');
  document.getElementById('loginForm').classList.add('active');
  hideMessage();
}

// Message display functionality
function showMessage(text, type) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = 'block';
}

function hideMessage() {
  const messageDiv = document.getElementById('message');
  messageDiv.style.display = 'none';
}

// Form validation and submission
document.getElementById('login').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  
  // Basic validation
  if (username.length < 3) {
    showMessage('USERNAME TOO SHORT!', 'error');
    return;
  }
  
  if (password.length < 6) {
    showMessage('PASSWORD TOO SHORT!', 'error');
    return;
  }
  
  // Simulate login (you'll replace this with real authentication)
  const savedUser = localStorage.getItem('minecraftClub_' + username);
  if (savedUser) {
    const userData = JSON.parse(savedUser);
    if (userData.password === password) {
      showMessage('WELCOME BACK TO THE CLUB!', 'success');
      // Redirect or perform login actions here
      setTimeout(() => {
        // You can redirect to your main club page here
        alert('Login successful! Welcome to Minecraft Club!');
      }, 1000);
    } else {
      showMessage('WRONG PASSWORD!', 'error');
    }
  } else {
    showMessage('USER NOT FOUND! PLEASE SIGN UP.', 'error');
  }
});

document.getElementById('signup').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('signupUsername').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const minecraftUsername = document.getElementById('minecraftUsername').value;
  
  // Basic validation
  if (username.length < 4) {
    showMessage('USERNAME TOO SHORT!', 'error');
    return;
  }
  
  if (password.length < 6) {
    showMessage('PASSWORD TOO SHORT!', 'error');
    return;
  }
  
  if (!email.includes('@')) {
    showMessage('INVALID EMAIL ADDRESS!', 'error');
    return;
  }
  
  if (minecraftUsername.length < 3) {
    showMessage('MINECRAFT USERNAME TOO SHORT!', 'error');
    return;
  }
  
  // Check if user already exists
  if (localStorage.getItem('minecraftClub_' + username)) {
    showMessage('USERNAME ALREADY TAKEN!', 'error');
    return;
  }
  
  // Save user data (you'll replace this with real database storage)
  const userData = {
    username: username,
    email: email,
    password: password,
    minecraftUsername: minecraftUsername,
    joinDate: new Date().toISOString()
  };
  
  localStorage.setItem('minecraftClub_' + username, JSON.stringify(userData));
  
  showMessage('WELCOME TO MINECRAFT CLUB!', 'success');
  
  // Switch to login form after successful signup
  setTimeout(() => {
    switchToLogin();
    document.getElementById('loginUsername').value = username;
    showMessage('NOW LOGIN WITH YOUR NEW ACCOUNT!', 'success');
  }, 1500);
});

// Add some fun Minecraft sound effects (optional)
document.addEventListener('DOMContentLoaded', function() {
  // Add click sound to buttons
  document.querySelectorAll('.minecraft-btn').forEach(button => {
    button.addEventListener('click', function() {
      // You can add actual Minecraft sound files here if desired
      console.log('*Minecraft button click sound*');
    });
  });
});
