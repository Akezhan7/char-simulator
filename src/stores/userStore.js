import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null,
    users: ['Даяна', 'Сергей', 'Аман'],
    messages: JSON.parse(localStorage.getItem('chatMessages')) || {},
  }),
  actions: {
    setCurrentUser(user) {
      this.currentUser = user;
    },
    sendMessage(to, message) {
      const chatKey = [this.currentUser, to].sort().join('-');
      if (!this.messages[chatKey]) {
        this.messages[chatKey] = [];
      }
      this.messages[chatKey].push({ from: this.currentUser, message });
      this.saveMessages();
    },
    saveMessages() {
      localStorage.setItem('chatMessages', JSON.stringify(this.messages));
    },
    loadMessages() {
      const storedMessages = localStorage.getItem('chatMessages');
      if (storedMessages) {
        this.messages = JSON.parse(storedMessages);
      }
    },
    getMessagesWithUser(user) {
      const chatKey = [this.currentUser, user].sort().join('-');
      return this.messages[chatKey] || [];
    }
  },
});
