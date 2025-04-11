function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById('auth').style.display = 'none';
      document.getElementById('chat').style.display = 'block';
      listenForMessages();
    })
    .catch(error => alert("Erreur : " + error.message));
}

function sendMessage() {
  const msg = document.getElementById('messageInput').value;
  if (msg.trim() === '') return;

  const user = firebase.auth().currentUser;
  firebase.database().ref("messages").push({
    user: user.email,
    message: msg,
    timestamp: Date.now()
  });

  document.getElementById('messageInput').value = '';
}

function listenForMessages() {
  firebase.database().ref("messages").on("child_added", snapshot => {
    const msg = snapshot.val();
    const div = document.createElement("div");
    div.textContent = `${msg.user}: ${msg.message}`;
    document.getElementById("messages").appendChild(div);
  });
}
