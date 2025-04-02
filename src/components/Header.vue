<script setup>
defineOptions({
  name: 'AppHeader',
})
</script>

<template>
  <header>
    <div id="left"><img alt="FastSushi logo" class="logo" src="../assets/logo_blanc.png" /></div>
    <h1 class="title">FastSushi</h1>
    <div id="connection">
      <button id="Register">Register</button>
      <button id="Login">Login</button>
    </div>
  </header>
</template>

<style scoped>
.title {
  font-size: 2rem;
  color: white;
}

header {
  display: flex;
  line-height: 1.5;
  width: 100vw;
  height: 7vh;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.logo {
  height: 5rem;
  height: 5rem;
  margin-left: 1rem;
}

#msg {
  display: flex;
  align-items: center;
  height: 7vh;
}

#connection {
  display: flex;
  height: 2rem;
  width: 13rem;
  justify-content: space-between;
}

#Login,
#Register {
  border: 0.2rem solid #000000;
  border-radius: 5px;
  color: white;
  background-color: #1e1e2f;
  font-weight: bold;
  height: 2.5rem;
  width: 5rem;
  cursor: pointer;
}

#Login:hover,
#Register:hover {
  color: white;
  background-color: #000;
  border: 0.2rem solid white;
}
</style>
