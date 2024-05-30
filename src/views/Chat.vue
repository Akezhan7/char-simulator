<template>
    <div class="chat">
      <div class="user-list-com">
        <UserList @selectChat="selectChat" />
      </div>
      <div class="chat-window">
        <div v-if="selectedChat" class="chat-header">
          <h2>Чат с {{ selectedChat }}</h2>
        </div>
        <ChatWindow :messages="messages" @sendMessage="sendMessage" v-if="selectedChat" />
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  import { useUserStore } from '../stores/userStore';
  import UserList from '../components/UserList.vue';
  import ChatWindow from '../components/ChatWindow.vue';
  
  export default {
    name: 'Chat',
    components: { UserList, ChatWindow },
    setup() {
      const userStore = useUserStore();
      const selectedChat = ref(null);
  
      onMounted(() => {
        userStore.loadMessages();
      });
  
      const selectChat = (user) => {
        selectedChat.value = user;
      };
  
      const sendMessage = (message) => {
        if (selectedChat.value) {
          userStore.sendMessage(selectedChat.value, message);
        }
      };
  
      const messages = computed(() => {
        if (selectedChat.value) {
          return userStore.getMessagesWithUser(selectedChat.value);
        }
        return [];
      });
  
      return {
        currentUser: userStore.currentUser,
        selectedChat,
        selectChat,
        sendMessage,
        messages,
      };
    },
  };
  </script>
  
  <style>
  body {
    margin: 0;
    padding: 0;
  }
  .chat {
    display: flex;
    height: 100vh;
  }
  .user-list-com {
    width: 20%;
    background-color: #201f1f;
    color: white;
    border-right: 1px solid #555454;
  }
  .chat-window {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .chat-header {
    padding: 10px;
    background-color: #201f1f;
    color: white;
    border-bottom: 1px solid #555454;
  }
  </style>
  