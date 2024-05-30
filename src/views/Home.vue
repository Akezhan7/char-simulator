<template>
    <div class="home">
      <h1>Выберите Пользователя</h1>
      <ul>
        <li v-for="user in users" :key="user" @click="selectUser(user)">
          {{ user }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { useUserStore } from '../stores/userStore';
  
  export default {
    name: 'Home',
    setup() {
      const userStore = useUserStore();
      const users = userStore.users;
  
      const selectUser = (user) => {
        userStore.setCurrentUser(user);
        userStore.loadMessages();
        window.location.href = '/chat';
      };
  
      return {
        users,
        selectUser,
      };
    },
  };
  </script>
  
  <style>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .home ul {
    list-style: none;
    padding: 0;
  }
  .home li {
    cursor: pointer;
    margin: 5px 0;
    padding: 10px;
    border: 1px solid #ccc;
    width: 100px;
    text-align: center;
  }
  </style>
  