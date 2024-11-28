<template>
    <div class="home">
      <h1>Welcome to the Visa Portal</h1>
      <p>Please select an option below:</p>
      <nav>
        <router-link to="/user">User Dashboard</router-link>
        <router-link to="/admin">Admin Dashboard</router-link>
        <router-link to="/wallet">Wallet Management</router-link>
      </nav>
    </div>
  </template>
  
  <script lang="ts" setup>
  // No additional logic needed for a simple home page
  </script>
  
  <style scoped>
  .home {
    text-align: center;
    margin-top: 50px;
  }
  nav {
    margin-top: 20px;
  }
  nav a {
    margin: 0 15px;
    text-decoration: none;
    color: #646cff;
  }
  nav a:hover {
    color: #535bf2;
  }
  </style>