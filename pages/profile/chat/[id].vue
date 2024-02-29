<template>
  <base-container>
    <ui-breadCrumb :to="localePath('/profile/chat')">
      <template v-slot:mainPage>المحادثه </template>
      <template v-slot:currentPage> تفاصيل المحادثه </template>
    </ui-breadCrumb>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <ui-base-card class="chatCard">
          <div class="chatContainer">
            <div class="row">
              <div class="col-md-7">
                <div class="d-flex gap-2 align-items-center mb-3 sender" v-for="message in messages" :key="message.id">
                  <img src="@/assets/imgs/G2.png" a alt="" class="userImgc" />
                  <div class="containMessege">

                    <div class="messege" v-if="message.type === 'text'">
                      {{ message.content }}
                    </div>
                    <img v-if="message.image" :src="message.image" alt="Sent Image">
                    <!-- <img :src="message.content" alt="Image" /> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-content-end">
              <div class="col-md-7">
                <div class="d-flex gap-2 align-items-center mb-3 reciever">
                  <div class="containMessege ">
                    messege
                    <div class="messege"></div>
                  </div>
                  <img src="@/assets/imgs/G2.png" alt="" class="userImgc" />
                </div>
              </div>
            </div>
          </div>
          <div class="inputContainer p-2">
            <input ref="fileInput" type="file" @change="handleFileUpload" accept="image/*" />
            <textarea v-model="inputMessage" placeholder="Type your message"></textarea>

            <!-- <input type="text" class="flex-grow" placeholder="اكتب رسالتك.." v-model="messageText" @keyup.enter="sendMessage" /> -->
            <ui-base-button mode="sendMsg main_btn sm" @click="sendMessage">
              <font-awesome-icon :icon="['fas', 'paper-plane']" class="iconSend" />
              <span class="send"> ارسال </span>
            </ui-base-button>
          </div>
        </ui-base-card>
      </div>
    </div>
  </base-container>
</template>
<script>
export default {
  data() {
    return {
      localePath: useLocalePath(),
      messageText: "",
      selectedFile: null,
      messages: [],
      imagePreview: null,
      inputMessage: ''

    };
  },
  // mounted() {
  //   this.socket = io('http://localhost:3000'); /
  //   this.socket.on('chat message', (message) => {
  //     this.messages.push(message);
  //   });
  // },
  // beforeUnmount() {
  //   if (this.socket) {
  //     this.socket.disconnect();
  //   }
  // },
  methods: {
  sendMessage() {
    if (this.inputMessage.trim() !== '' || this.selectedFile) {
      const message = { id: Date.now() };

      if (this.inputMessage.trim() !== '') {
        message.type = 'text';
        message.content = this.inputMessage;
      }

      if (this.selectedFile) {
        // Handle file upload logic here
        // You can use libraries like axios to send the file to the server
        // Example:
        const formData = new FormData();
        formData.append('image', this.selectedFile);

        this.$axios.post('/upload', formData)
          .then(response => {
            message.type = 'image';
            message.content = response.data.imageUrl;
            this.messages.push(message);
            this.inputMessage = '';
            this.selectedFile = null;
            // Scroll to bottom after adding the message
            this.scrollToBottom();
            // Emit the message to the server
            // this.socket.emit('chat message', message); 
          })
          .catch(error => {
            console.error('Error uploading image:', error);
          });
      } else {
        this.messages.push(message);
        this.inputMessage = '';
        // Scroll to bottom after adding the message
        this.scrollToBottom();
        // Emit the message to the server
        // this.socket.emit('chat message', message); 
      }
    }
  },
  handleFileUpload(event) {
    this.selectedFile = event.target.files[0];
  },
  openFileInput() {
    this.$refs.fileInput.click();
  },
  scrollToBottom() {
    const container = this.$refs.chatContainer;
    container.scrollTop = container.scrollHeight;
    const bottomSpace = 50; // Desired bottom space
    container.scrollTop = container.scrollHeight - container.clientHeight  - bottomSpace;
    console.log('ss')
  }
}

}
</script>

<style scoped lang="scss" >
.chatCard {

  position: relative;
}

.chatContainer {
  height: 300px;
  overflow: auto;
  margin-bottom: 30px;
}

.inputContainer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  display: flex;
  align-items: center;
  gap: 10px;
}

.userImgc {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}

.containMessege {
  flex-grow: 1;
  padding: 5px;
  border: 1px solid #d5d1d1;
  border-radius: 4px;
}

.ltr {
  direction: ltr !important;

  html[lang="en-Us"] {
    direction: rtl !important;
  }
}

html[lang="en-US"] {
  .justify-content-start {
    justify-content: flex-end !important;
  }
}

.base-image-input {
  width: 30px;
  height: 30px;
}

.base-image-input {
  border-radius: 5px;
}

textarea {
  flex-grow: 1;
  border: unset;
  border: unset !important;

  &:focus-visible {
    border: unset;
    outline: unset;
  }
}

.form-control:focus {
  border-color: unset !important;
  outline: 0;
  box-shadow: unset !important;
}

.main_btn {
  width: fit-content !important;
  padding: 8px !important;

  .iconSend {
    display: none;

    @media (max-width: 768px) {
      display: block;
    }
  }

  .send {

    @media (max-width: 768px) {
      display: none;
    }
  }
}

.removeSrc {
  display: none;
}

.select svg {
  width: 15px !important;
  height: 15px !important;
}

.recieve {
  text-align: end;
}</style> 
  