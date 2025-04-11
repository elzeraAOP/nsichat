// Initialisation de Firebase
const firebaseConfig = {
  apiKey: "TON_API_KEY",
  authDomain: "TON_DOMAINE.firebaseapp.com",
  databaseURL: "https://TON_DOMAINE.firebaseio.com",
  projectId: "TON_PROJECT_ID",
  storageBucket: "TON_DOMAINE.appspot.com",
  messagingSenderId: "TON_SENDER_ID",
  appId: "TON_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Récupérer le pseudo depuis localStorage
const pseudo = localStorage.getItem('pseudo');
if (!pseudo) {
  window.location.href = "index.html";
}

// Références DOM
const form = document.getElementById('message-form');
const input = document.getElementById('message');
const messagesContainer = document.getElementById('messages');

// Envoyer un message
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (message) {
    db.ref("messages").push({
      pseudo,
      message,
      timestamp: Date.now()
    });
    input.value = '';
  }
});

// Écouter les nouveaux messages
db.ref("messages").on("child_added", (snapshot) => {
  const data = snapshot.val();
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message');
  msgDiv.innerHTML = `<strong>${data.pseudo}</strong> : ${data.message}`;
  messagesContainer.appendChild(msgDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});
