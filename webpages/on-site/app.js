class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            sgst1: document.querySelector('.sgst1__btn'),
            sgst2: document.querySelector('.sgst2__btn'),
            sgst3: document.querySelector('.sgst3__btn'),
            sgst4: document.querySelector('.sgst4__btn')
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const {openButton, chatBox, sendButton, sgst1, sgst2, sgst3, sgst4} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))
        sendButton.addEventListener('click', () => this.onSendButton(chatBox))
        sgst1.addEventListener('click', () => this.onSgst1Button(chatBox))
        sgst2.addEventListener('click', () => this.onSgst2Button(chatBox))
        sgst3.addEventListener('click', () => this.onSgst3Button(chatBox))
        sgst4.addEventListener('click', () => this.onSgst4Button(chatBox))

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
    onSgst4Button(chatbox) {
      var suggest4 = chatbox.querySelector('button');
      let sgt4 = "Can you send me some useful links?"
      
      let msgbtn4 = { name: "User", message:sgt4 }
      this.messages.push(msgbtn4);
  
      fetch('http://127.0.0.1:5000/predict', {
                  method: 'POST',
                 body: JSON.stringify({ message: sgt4}),
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
                  suggest4.value = ''
  
          }).catch((error) => {
              console.error('Error:', error);
              this.updateChatText(chatbox)
              suggest4.value = ''
            });
  }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "LAMPBot")
            {
              if (item.message.includes("profile")) {
                html += '<div class="messages__item messages__item--visitor">A form will be shown, and edit it to your liking.<br><img src = "images/inst/profile/3rd.PNG"><hr><br></div>'
                html += '<div class="messages__item messages__item--visitor">Click the "Update Profile" button.<br><img src = "images/inst/profile/2nd.PNG"><hr><br></div>'
                html += '<div class="messages__item messages__item--visitor">After logging in to the LAMP, <br>press the 3-dot-menu on the upper left, then click your profile picture.<br><img src = "images/inst/profile/1st.PNG"><hr><br></div>'
              }
              else if (item.message.includes("Generated")) {
                html += '<div class="messages__item messages__item--visitor">Hmmm, remembering that generated password is hard. You will be directed to change your password. Don\'t make it too easy to be secured, but also don\'t make it too hard for you to forget ;).<hr><br></div>'
                html += '<div class="messages__item messages__item--visitor"> Try using that generated password in your log in! It works right?<hr><br></div>'
                html += '<div class="messages__item messages__item--visitor"> Your generated password would pop-up. Be sure to copy that!<br><img src = "images/inst/pw/generated-pass.png"><hr><br></div>'
                html += '<div class="messages__item messages__item--visitor"> You will be directed to a form that you will need to fill-in. Read the instructions carefully<br><img src = "images/inst/pw/form-forgot.png"><hr><br></div>'
                html += '<div class="messages__item messages__item--visitor">Click the "Click Here" link under the LOGIN button.<br><img src = "images/inst/pw/forgot-clickhere.png"><hr><br></div>' 
              }
              else if (item.message.includes("If you want to change password")) {
                html += '<div class="messages__item messages__item--visitor">After that, a form will pop up. Fill it in. Goodluck!.<br><img src = "images/inst/pw/change-pass.png"><hr><br></div>' 
                html += '<div class="messages__item messages__item--visitor">Then, you\'ll be directed to view your personal information. There, you will see two buttons available, click Change password.<br><img src = "images/inst/pw/changepass_button.png"><hr><br></div>' 
                html += '<div class="messages__item messages__item--visitor">See your profile picture on the upper left corner? Click it.<br><img src = "images/inst/pw/1st.png"><hr><br></div>' 
              }
              else if (item.message.includes("You can view your schedule by following this:")) {
                html += '<div class="messages__item messages__item--visitor">Then below the date, click the Class Schedule button. <br><img src = "images/inst/sched/sched.png"><hr><br></div>'
                html += '<div class="messages__item messages__item--visitor">In the sidebar on the left, click Classes<br><img src = "images/inst/sched/1.png"><hr><br></div>'
              }
              else if (item.message.includes("links")) {
                html += '<div class="messages__item messages__item--visitor"><a href="https://tinyurl.com/GCEmailDirectory" class="linx">Gordon College\'s Email Directory (email addresses of offices and program coordinators)</a><hr><br>'+
                '<a target="_blank" href="https://tinyurl.com/GCCurricularProgramOfferings" class="linx">Gordon College Curricular Program Offerings</a><hr><br>'+
                '<a target="_blank" href ="https://tinyurl.com/ActivateDomainEmail" class="linx">How to activate your GC Domain Email Address?</a><hr><hr><br>'+
                '<a target="_blank" href ="https://tinyurl.com/accessGCLAMP" class="linx">How to access GCLAMP?</a><hr><hr><br>'+
                '<a target="_blank" href ="https://tinyurl.com/accessGCLAMP" class="linx">How to access GCLAMP?</a><hr><hr><br>'+
                '<a target="_blank" href ="https://tinyurl.com/GCOnlineRequestRecords" class="linx">Online Request for Student Records</a><hr><hr><br>'+
                '<a target="_blank" href ="https://tinyurl.com/accessGCLAMP" class="linx">Application for Change in Program</a><hr><hr><br>'+
                '<a target="_blank" href ="https://tinyurl.com/GC-AppForReadmission" class="linx">Online Application for Re-admission</a><hr><hr><br>'+
                '<a target="_blank" href ="https://tinyurl.com/GC-ApplicationForGraduation" class="linx">Application for Graduation</a><hr><hr><br>'+
                '<a target="_blank" href ="https://tinyurl.com/GCApplyLOA" class="linx">Application for Permit for Leave of Absence</a><hr><hr><br>'+
                '<a target="_blank" href ="https://tinyurl.com/GCApplyWithdrawal" class="linx">Application for Discontinuance of Studies/Withdrawal from the Institution</a><hr><hr><br>'+
                '<a target="_blank" href ="https://tinyurl.com/GCAddDropClasses1" class="linx">Adding/Dropping of Classes</a><hr><hr><br>'+
                '<a target="_blank" href ="https://tinyurl.com/GCAlternativeModesOfPayment" class="linx">Alternative Modes of Payment (Wire Transfer/Bank Deposit)</a><hr><hr><br></div>'
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