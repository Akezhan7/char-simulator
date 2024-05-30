<template>
    <div class="chat-window">
      <div class="messages" ref="messagesContainer">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <strong>{{ message.from }} {{ message.message }}</strong> 
        </div>
      </div>
      <input
        v-model="newMessage"
        @keyup.enter="handleSendMessage"
        placeholder="Message"
      />
      <button @click="handleSendMessage">Отправить</button>
    </div>
  </template>
  
  <script>
  import { ref, nextTick, watch } from 'vue';
  
  export default {
    name: 'ChatWindow',
    props: {
      messages: {
        type: Array,
        required: true,
      },
    },
    emits: ['sendMessage'],
    setup(props, { emit }) {
      const newMessage = ref('');
      const messagesContainer = ref(null);
  
      const handleSendMessage = () => {
        if (newMessage.value.trim()) {
          emit('sendMessage', newMessage.value.trim());
          newMessage.value = '';
        }
      };
  
      // Scroll to bottom when messages change
      watch(() => props.messages, () => {
        nextTick(() => {
          if (messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
          }
        });
      });
  
      return {
        newMessage,
        handleSendMessage,
        messagesContainer,
      };
    },
  };
  </script>
  
  <style>
  .chat-window {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    background: url("https://pixelbox.ru/wp-content/uploads/2021/09/background-chat-vk-75.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    color: white;
  }
  .message {
    margin-bottom: 10px;
    background-color: #8774e1;
    padding: 10px;
    border-radius: 15px;
    width: auto;
    text-wrap: wrap;
  }
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-top: none;
  }
  button {
    padding: 10px;
    border: none;
    background: #007bff;
    color: white;
    cursor: pointer;
  }
  </style>
  