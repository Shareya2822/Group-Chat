const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const socket = io('http://localhost:3000')

const user = prompt('What is your name?')
appendMessage("","right","you joiined")
socket.emit('new-user',user)

socket.on('chat-message',data=>{
  const side = data.user ? "left" : "right";
  appendMessage(data.user, side, data.message);
})


socket.on('user-connected',user=>{

  appendMessage("", "left", `${user} connected`);
})


msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  
  appendMessage(user, "right", msgText);
  socket.emit('send-chat-message', msgText );
  msgerInput.value = "";


});

function appendMessage(name, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}