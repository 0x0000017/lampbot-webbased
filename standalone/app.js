class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            sgst1: document.querySelector('.sgst1__btn'),
            sgst2: document.querySelector('.sgst2__btn'),
            sgst3: document.querySelector('.sgst3__btn')
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const {openButton, chatBox, sendButton, sgst1, sgst2, sgst3} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        sgst1.addEventListener('click', () => this.onSgst1Button(chatBox))

        sgst2.addEventListener('click', () => this.onSgst2Button(chatBox))

        sgst3.addEventListener('click', () => this.onSgst3Button(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);

        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {
            let msg2 = { name: "LAMPBot", message: r.answer };
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value = ''

        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
          });
    }


    onSgst1Button(chatbox) {
        var suggest1 = chatbox.querySelector('button');
        let sgt1 = "How can I reset my password ?"
        
        let msgbtn1 = { name: "User", message:sgt1 }
        this.messages.push(msgbtn1);
    
        fetch('http://127.0.0.1:5000/predict', {
                    method: 'POST',
                   body: JSON.stringify({ message: sgt1}),
                   mode: 'cors',
                    headers: {
                  'Content-Type': 'application/json'
                    },
                  })
                  .then(r => r.json())
                  .then(r => {
                    let msg2 = { name: "LAMPBot", message: r.answer };
                    this.messages.push(msg2);
                    this.updateChatText(chatbox)
                    suggest1.value = ''
    
            }).catch((error) => {
                console.error('Error:', error);
                this.updateChatText(chatbox)
                suggest1.value = ''
              });
    }
    onSgst2Button(chatbox) {
        var suggest2 = chatbox.querySelector('button');
        let sgt2 = "Is the GC-LAMP Down?"
        
        let msgbtn2 = { name: "User", message:sgt2 }
        this.messages.push(msgbtn2);
    
        fetch('http://127.0.0.1:5000/predict', {
                    method: 'POST',
                   body: JSON.stringify({ message: sgt2}),
                   mode: 'cors',
                    headers: {
                  'Content-Type': 'application/json'
                    },
                  })
                  .then(r => r.json())
                  .then(r => {
                    let msg2 = { name: "LAMPBot", message: r.answer };
                    this.messages.push(msg2);
                    this.updateChatText(chatbox)
                    suggest2.value = ''
    
            }).catch((error) => {
                console.error('Error:', error);
                this.updateChatText(chatbox)
                suggest2.value = ''
              });
    }

    onSgst3Button(chatbox) {
        var suggest3 = chatbox.querySelector('button');
        let sgt3 = "What is my schedule ?"
        
        let msgbtn3 = { name: "User", message:sgt3 }
        this.messages.push(msgbtn3);
    
        fetch('http://127.0.0.1:5000/predict', {
                    method: 'POST',
                   body: JSON.stringify({ message: sgt3}),
                   mode: 'cors',
                    headers: {
                  'Content-Type': 'application/json'
                    },
                  })
                  .then(r => r.json())
                  .then(r => {
                    let msg2 = { name: "LAMPBot", message: r.answer };
                    this.messages.push(msg2);
                    this.updateChatText(chatbox)
                    suggest3.value = ''
    
            }).catch((error) => {
                console.error('Error:', error);
                this.updateChatText(chatbox)
                suggest3.value = ''
              });
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "LAMPBot")
            {
              if (item.message.includes("Password")) {
                html += '<div class="messages__item messages__item--visitor"><img src = "images/placeholder.PNG"><hr><br></div>'                
              } else if (item.message.includes("schedule")) {
                html += '<div class="messages__item messages__item--visitor"><img src = "images/placeholder.PNG"><hr><br></div>'
              } else if (item.message.includes("profile")) {
                html += '<div class="messages__item messages__item--visitor"><img src = "images/placeholder.PNG"><hr><br></div>'
              } else if (item.message.includes("links")) {
                html += '<div class="messages__item messages__item--visitor"><a href="https://facebook.com" class="linx">wkwkwkwk</a><hr><br><a href="https://facebook.com" class="linx">wkwkwkwk</a><hr><br><a href ="https://facebook.com" class="linx">wkwkwkwk</a><hr><hr><br></div>'
              }
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div><br><hr>'
            }
            else
            {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div><br><hr>'
            }

          });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}


const chatbox = new Chatbox();
chatbox.display();
