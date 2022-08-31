const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
let userNameInput = document.getElementById('username');
let messageContentInput = document.getElementById('message-content');

let userName = '';

function login(event) {
  event.preventDefault();
  if (userNameInput.value === '') {
    return alert('Please fill username');
  } else {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
}

const sendMessage = (e) => {
  e.preventDefault();
  if (messageContentInput.value === '') {
    return alert('This field cannot be empty!');
  } else {
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = '';
  }
};

const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add('message', 'message--received');
  author === userName ? message.classList.add('message--self') : '';
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author}</h3>
    <div class="message__content">
      ${content}
    </div>
  `;

  messagesList.appendChild(message);
};

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);
