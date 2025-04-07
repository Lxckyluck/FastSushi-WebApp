<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'AppHeader',
})

const router = useRouter()
const isLoggedIn = ref(false)

const checkAuth = () => {
  isLoggedIn.value = !!localStorage.getItem('authToken')
}

onMounted(() => {
  checkAuth()
})

const goToPage = (page) => {
  router.push(page)
}

const logout = () => {
  const id = localStorage.getItem('authId')
  const requestOptions = {
    method: 'PUT',
    redirect: 'follow',
  }

  fetch(`http://localhost:3000/users/logout/${id}`, requestOptions)
    .then((response) => response.text())
    .catch((error) => console.log('error', error))
  router.push('/')
  localStorage.removeItem('authToken')
  localStorage.removeItem('authName')
  localStorage.removeItem('authId')
  isLoggedIn.value = false
  router.push('/Home')
}
</script>

<template>
  <header>
    <div id="left">
      <img alt="FastSushi logo" class="logo" src="../assets/logo_blanc.png" />
    </div>
    <h1 class="title">FastSushi</h1>
    <div id="connection">
      <template v-if="isLoggedIn">
        <button id="logout" @click="logout">Se déconnecter</button>
      </template>
      <template v-else>
        <button id="Register" @click="goToPage('/Register')">Register</button>
        <button id="Login" @click="goToPage('/Login')">Login</button>
      </template>
    </div>
  </header>
</template>

<style scoped>
.title {
  font-size: clamp(1.2rem, 2.5vw, 3rem);
  color: white;
  margin: 0;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 7vh;
  padding: 0 2vw;
  box-sizing: border-box;
  margin-top: 1vh;
}

.logo {
  height: clamp(3rem, 5vh, 6rem);
}

#connection {
  display: flex;
  gap: 3vw;
}

#Login,
#Register {
  border: 0.15rem solid #000000;
  border-radius: 0.5rem;
  color: white;
  background-color: #1e1e2f;
  font-weight: bold;
  font-size: clamp(0.8rem, 1.2vw, 1rem);
  height: clamp(2rem, 5vh, 2.5rem);
  width: clamp(5rem, 7vw, 7rem);
  cursor: pointer;
  transition: all 0.2s ease;
}

#Login:hover,
#Register:hover {
  color: white;
  background-color: #000;
  border: 0.15rem solid white;
}

#logout {
  border: 0.15rem solid #000000;
  border-radius: 0.5rem;
  color: white;
  background-color: #1e1e2f;
  font-weight: bold;
  font-size: clamp(0.8rem, 1.2vw, 1rem);
  height: clamp(2rem, 5vh, 2.5rem);
  width: clamp(7rem, 9vw, 9rem);
  cursor: pointer;
  transition: all 0.2s ease;
}
#logout:hover {
  color: white;
  background-color: #000;
  border: 0.15rem solid white;
}
</style>
