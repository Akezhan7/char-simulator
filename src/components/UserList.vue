<template>
    <div class="user-list">
      <h2>Пользователи:</h2>
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
    name: 'UserList',
    emits: ['selectChat'],
    setup(_, { emit }) {
      const userStore = useUserStore();
      const users = userStore.users.filter(user => user !== userStore.currentUser);
  
      const selectUser = (user) => {
        emit('selectChat', user);
      };
  
      return {
        users,
        selectUser,
      };
    },
  };
  </script>
  
  <style>
  .user-list {
    padding: 10px;
  }
  .user-list ul {
    list-style: none;
    padding: 0;
  }
  .user-list li {
    cursor: pointer;
    margin: 5px 0;
    padding: 10px;
    border: 1px solid #ccc;
    text-align: left;
    border-radius: 15px;
  }
  </style>
  