<template>
  <base-container>
    <ui-breadCrumb :to="path('/profile/chat')">
      <template v-slot:mainPage>المحادثه </template>
      <template v-slot:currentPage> تفاصيل المحادثه </template>
    </ui-breadCrumb>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <ui-base-card class="chatCard">
          <div ref="chatContainer" class="chatContainer">
            <div
              class=" "
              :class="{ receiver: !message.is_sender }"
              v-for="message in allMessages"
              :key="message.id"
            >
              <div class="message message d-flex gap-2 align-items-center mb-3">
                <img
                  :src="receiverImage"
                  alt="img"
                  class="userImgc"
                  v-if="!message.is_sender"
                  loading="lazy"
                />
                <img
                  :src="user.image"
                  alt="img"
                  class="userImgc"
                  v-else
                  loading="lazy"
                />

                <div class="containMessege">
                  <p v-if="message.type === 'text'" class="wordwrap mb-2">
                    {{ message.body }}
                  </p>
                  <img
                    v-if="message.type === 'file'"
                    :src="message.body"
                    alt="Sent_Image"
                    class="messagebodyImg mb-2"
                    loading="lazy"
                  />
                  <div class="text-start text-muted f-10 d-block">
                    <font-awesome-icon
                      :icon="['far', 'clock']"
                      class="m-end-5 text-muted"
                    />
                    <span> {{ message.created_dt }}</span>
                  </div>
                </div>
              </div>
            </div>
            <form ref="chatForm" @submit.prevent="sendMessage">
              <div class="inputContainer p-2">
                <label :for="id" class="base-image-input">
                  <span class="select">
                    <font-awesome-icon :icon="['far', 'image']" />
                  </span>
                  <input
                    ref="fileInput"
                    type="file"
                    @change="handleFileChange"
                    hidden
                    :id="id"
                    name="message"
                    accept="image/*"
                  />
                </label>
                <textarea
                  v-model="message"
                  :placeholder="$t('typeYourMessage')"
                  name="message"
                  @keyup.enter="sendMessage"
                  :disabled="imageUrl !== ''"
                ></textarea>

                <div class="position-relative px-3">
                  <span @click="removeImage" class="removeImg">
                    <font-awesome-icon
                      :icon="['fas', 'xmark']"
                      v-if="imageUrl"
                      class="text-danger"
                    />
                  </span>
                  <img
                    v-if="imageUrl !== ''"
                    :src="imageUrl"
                    alt="Image Preview"
                    class="messageImg"
                  />
                </div>

                <ui-base-button mode="sendMsg main_btn sm">
                  <font-awesome-icon
                    :icon="['fas', 'paper-plane']"
                    class="iconSend"
                  />
                  <span class="send"> ارسال </span>
                </ui-base-button>
              </div>
            </form>
          </div>
        </ui-base-card>
      </div>
    </div>
  </base-container>
</template>
<script>
import { useAuthStore } from "@/store/authStore";
// import io from 'socket.io-client';
// import socket from "@/plugins/socket";
import moment from "moment";
import { faDebian } from "@fortawesome/free-brands-svg-icons";

export default {
  data() {
    return {
      path: useLocalePath(),
      messageText: "",
      selectedFile: null,
      messages: [],
      allMessages: [],
      imagePreview: null,
      message: "",
      imageUrl: "",
      socket: null,
      members: [],
      uploadedimg: "",
      receiverImage: "",
      receiverId: "",
    };
  },

  async mounted() {
    this.token = useAuthStore().token;
    this.user = useAuthStore().user;
    this.initializeChat();
    await this.getMesseges();
  },

  methods: {
    uploadImage(e) {
      const userImage = e.target.files[0];
      if (userImage) {
        const reader = new FileReader();
        reader.readAsDataURL(userImage);
        reader.onload = (e) => {
          this.uploadedimg = e.target.result;
          this.uploadedName = userImage.name;
        };
      }
    },
    removePreview() {
      this.uploadedimg = "";
      if (this.$refs.fileImgUp) {
        this.$refs.fileImgUp.value = "";
      }
    },

    initializeChat() {
      this.$socket.emit("enterChat", {
        user_id: useAuthStore().user.id,
        user_type: "User",
        room_id: useRoute().params.id,
      });
      this.$socket.on(
        "sendMessageRes",
        function (data) {
          this.allMessages.push(data);
        }.bind(this)
      );
    },
    /// send mesege to socket
    sendMessageTosocket(messageBody, type) {
      this.$socket.emit("sendMessage", {
        sender_id: useAuthStore().user.id,
        sender_type: "User",
        sender_name: useAuthStore().user.name,
        avater: useAuthStore().user.image,
        receiver_id: this.receiverId,
        receiver_type: "User",
        room_id: this.$route.params.id,
        type: type,
        body: messageBody,
        flag: this.MsgLength,
      });

      console.log("nnnnn");
    },

    handleFileChange(e) {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (e) => {
          this.imageUrl = e.target.result;
        };
        this.selectedFile = selectedFile;
        console.log(this.selectedFile.name);
      }
    },
    removeImage() {
      this.selectedFile = "";
      this.imageUrl = "";
      this.$refs.fileInput.value = "";
    },
    pushMessage(messageBody, type) {
      if (!this.allMessages.value) {
        this.allMessages.value = [];
      }
      this.allMessages.push({
        is_sender: 1,
        type: type,
        body: messageBody,
        created_dt: moment()
          .locale(localStorage.getItem("lang") || "ar")
          .fromNow(),
      });
    },
    sendMessage() {
      if (this.message.trim() !== "") {
        const fd = new FormData();
        fd.append("message", this.message);
        this.sendMassagApi(fd);
        this.sendMessageTosocket(this.message, "text");
        this.pushMessage(this.message, "text");
        console.log(this.receiverId);
        this.message = "";
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      } else if (this.selectedFile) {
        const fd = new FormData(this.$refs.chatForm);
        fd.append("message", this.selectedFile);
        fd.append("type", "file"); // Include type information for the server
        this.sendMassagApi(fd);
        console.log(this.receiverId);
        this.sendMessageTosocket(this.imageUrl, "file");
        this.pushMessage(this.imageUrl, "file");

        this.imageUrl = "";
        this.selectedFile = null;
        this.$refs.fileInput.value = "";

        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    sendMassagApi(fd) {
      const token = useAuthStore().token;
      const roomId = useRoute().params.id;

      if (!token) {
        console.error("Authentication token is missing.");
        return;
      }

      if (!roomId) {
        console.error("Room ID is missing.");
        return;
      }

      // this.$axios.post(`/send-message/${roomId}`, fd, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     Authorization: `Bearer ${token}`,
      //   },
      // })
      // .then((response) => {
      //   if (response.data.key === 'success') {
      //     console.log('Message sent successfully.');
      //   } else {
      //     console.log('Failed to send message:', response.data.message);
      //   }
      // })
      // .catch((error) => {
      //   console.error('Error sending message:', error);
      // });
    },

    async getMesseges() {
      await this.$axios
        .get(`/get-room-messages/${useRoute().params.id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          // console.log(res.data.data.messages.data)
          this.messages = res.data.data.messages.data;
          this.members = res.data.data.members;
          this.receiverImage = res.data.data.members[0].image;
          this.receiverId = res.data.data.members[0].id;
          console.log(this.receiverId);

          this.allMessages.push(...this.messages.reverse());
          console.log("message", this.allMessages.length);
          if (this.allMessages.length > 0) {
            this.MsgLength = true;
            console.log("Message sent:", this.MsgLength);
          } else {
            this.MsgLength = false;

            console.log("Message sent:", this.MsgLength);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    scrollToBottom() {
      const chatContainer = this.$refs.chatContainer;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    },
  },
};
</script>

<style scoped lang="scss">
.chatCard {
  position: relative;
}

.chatContainer {
  height: 500px;
  overflow-y: auto !important;
  margin-bottom: 30px;
  padding-bottom: 20px;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background-color: #12a6d85d;
  }
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

  textarea {
    flex-grow: 1;
    border: unset;
    border: unset !important;
    resize: unset;
    height: 28px;

    &:focus-visible {
      border: unset;
      outline: unset;
    }
  }

  .textarea:focus {
    border-color: unset !important;
    outline: 0;
    box-shadow: unset !important;
  }

  .main_btn {
    width: 100px;
    padding: 3px !important;
    font-size: 15px;

    @media (max-width: 768px) {
      width: fit-content;
      padding: 8px !important;

      svg {
        width: 10px;
        height: 10px;
      }
    }

    .iconSend {
      display: none;

      @media (max-width: 768px) {
        display: block;
      }
    }
  }

  .base-image-input {
    width: 30px;
    height: 30px;
    border: unset !important;
    border-radius: 5px;

    .select {
      /* background: white; */
      border-radius: 5px;
      background: #12a7d8;
      color: white !important;

      svg {
        width: 15px !important;
        height: 15px !important;
      }
    }
  }

  .send {
    @media (max-width: 768px) {
      display: none;
    }
  }
}

.userImgc {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  // flex-shrink: 0;
}

.containMessege {
  flex-grow: 1;
  padding: 5px;
  border: 1px solid #d5d1d1;
  border-radius: 4px;
}

.message {
  width: 50%;
}

.receiver {
  text-align: start;

  direction: ltr;
}

.messagebodyImg {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.messageImg {
  width: 30px;
  height: 30px;
}

.removeImg {
  position: absolute;
  top: -11px;
  left: 0;
}

.wordwrap {
  white-space: pre-wrap;
  /* CSS3 */
  white-space: -moz-pre-wrap;
  /* Firefox */
  white-space: -pre-wrap;
  /* Opera <7 */
  white-space: -o-pre-wrap;
  /* Opera 7 */
  word-wrap: break-word;
  /* IE */
  overflow: hidden;
  max-width: 350px;
}
</style>
