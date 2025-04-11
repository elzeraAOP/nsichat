const socket = new WebSocket('ws://' + window.location.host);

const pseudo = localStorage.getItem('pseudo');
if (!pseudo) {
  window.location.href = "index.html";
}

const messagesContainer = document.getElementById('messages');
const form = document.getElementById('message-form');
const input = document.getElementById('message');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (message) {
    socket.send(JSON.stringify({ pseudo, message }));
    input.value = '';
  }
});

socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message');
  msgDiv.innerHTML = `<strong>${data.pseudo}</strong> : ${data.message}`;
  messagesContainer.appendChild(msgDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});