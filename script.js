const SITE_REDIRECT = "https://sites.google.com/windhamacademy.org/minecraft-club-wa-2025/home";

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

// LocalStorage helpers
function getLoginsData() {
  const raw = localStorage.getItem('minecraftClub_logins');
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveLoginsData(arr) {
  localStorage.setItem('minecraftClub_logins', JSON.stringify(arr));
}

function logAuditEvent(event, username = '', minecraftUsername = '', email = '') {
  const audit = JSON.parse(localStorage.getItem('minecraftClub_audit') || '[]');
  audit.push({
    timestamp: new Date().toISOString(),
    event: event,
    username: username,
    minecraftUsername: minecraftUsername,
    email: email
  });
  localStorage.setItem('minecraftClub_audit', JSON.stringify(audit));
}

// Login flow
document.getElementById('login').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const minecraftUsername = document.getElementById('loginMinecraftUsername').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (username.length < 3 || minecraftUsername.length < 3 || password.length < 6) {
    showMessage('Please enter valid credentials.', 'error');
    return;
  }

  const logins = getLoginsData();
  const found = logins.find(u => u.username === username && u.minecraftUsername === minecraftUsername && u.password === password);

  if (found) {
    logAuditEvent('LOGIN_SUCCESS', username, minecraftUsername, found.email);
    showMessage('Login successful! Redirecting...', 'success');
    setTimeout(() => { window.location.href = SITE_REDIRECT; }, 800);
  } else {
    logAuditEvent('LOGIN_FAILED', username, minecraftUsername);
    showMessage('Invalid credentials. Please signup or try again.', 'error');
  }
});

// Signup flow
document.getElementById('signup').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('signupUsername').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const minecraftUsername = document.getElementById('minecraftUsernameSignup').value.trim();

  if (username.length < 3 || password.length < 6 || !email.includes('@') || minecraftUsername.length < 3) {
    showMessage('Please fill in all fields correctly.', 'error');
    return;
  }

  const logins = getLoginsData();
  const exists = logins.find(u => u.username === username);
  if (exists) {
    showMessage('USERNAME ALREADY TAKEN!', 'error');
    return;
  }

  const newUser = {
    username: username,
    email: email,
    password: password,
    minecraftUsername: minecraftUsername,
    joinDate: new Date().toISOString()
  };

  logins.push(newUser);
  saveLoginsData(logins);
  logAuditEvent('SIGNUP_SUCCESS', username, minecraftUsername, email);

  showMessage('Signup successful! Redirecting to the club page...', 'success');
  setTimeout(() => {
    window.location.href = SITE_REDIRECT;
  }, 900);
});

// Initial DOM setup
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('loginForm').classList.add('active');
});
