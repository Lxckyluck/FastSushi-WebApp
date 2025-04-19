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

  fetch(`https://fast-sushi-api.vercel.app/users/logout/${id}`, requestOptions)
    .then((response) => response.text())
    .catch((error) => console.log('error', error))
  localStorage.removeItem('authToken')
  localStorage.removeItem('authName')
  localStorage.removeItem('authId')
  localStorage.removeItem('Cart')
  isLoggedIn.value = false
  location.reload()
}
</script>

<template>
  <header>
    <div id="left">
      <img
        alt="FastSushi logo"
        class="logo"
        src="../assets/logo_blanc.png"
        @click="goToPage('../')"
      />
    </div>
    <nav class="navbar">
      <ul>
        <li><a @click="goToPage('/Cart')">🛒 Panier</a></li>
        <li><a @click="goToPage('/Profile')">👤 Profil</a></li>
      </ul>
    </nav>
    <div id="connection">
      <template v-if="isLoggedIn">
        <button id="logout" @click="logout">Se déconnecter</button>
      </template>
      <template v-else>
        <button id="Register" @click="goToPage('/Register')">S'enregister</button>
        <button id="Login" @click="goToPage('/Login')">Se connecter</button>
      </template>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 7vh;
  padding: 0 2vw;
  box-sizing: border-box;
  background-color: #0e0e1a;
}

nav.navbar {
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: transparent;
}

nav.navbar ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

nav.navbar li {
  position: relative;
}

nav.navbar a,
nav.navbar {
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.2s ease;
  text-decoration: none;
}

nav.navbar a:hover,
nav.navbar {
  color: #b9aaff;
}

.logo {
  height: clamp(3rem, 5vh, 6rem);
  cursor: pointer;
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
  width: clamp(6rem, 8vw, 8rem);
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
