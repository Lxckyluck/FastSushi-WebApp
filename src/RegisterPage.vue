<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')

const router = useRouter()

const goToPage = (page) => {
  router.push(page)
}

const SignUp = () => {
  const formData = new URLSearchParams()
  formData.append('name', name.value)
  formData.append('email', email.value)
  formData.append('password', password.value)

  fetch('https://fast-sushi-api.vercel.app/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erreur lors de la connexion')
      }
      return response.json()
    })
    .then((data) => {
      if (data.id) {
        localStorage.setItem('authId', data.id)
      }
      if (data.name) {
        localStorage.setItem('authName', data.name)
      }
      if (data.token) {
        localStorage.setItem('authToken', data.token)
        return router.push('/Home')
      }
      throw new Error('Token non trouvé dans la réponse')
    })
    .catch((error) => {
      console.error('Erreur:', error)
    })
}
</script>

<template>
  <header>
    <div id="left">
      <img
        alt="FastSushi logo"
        class="logo"
        src="./assets/logo_blanc.png"
        @click="goToPage('Home')"
      />
    </div>
    <h1 class="title">Enregistrement</h1>
  </header>
  <body>
    <div class="container">
      <div class="box">
        <p id="SignIn" @click="goToPage('/Login')">Vous avez déjà un compte ? Connectez-vous</p>
        <div id="forms">
          <p class="credential">Votre Prénom/Nom :</p>
          <input type="text" placeholder="Prénom/Nom" v-model="name" class="input" />
          <p class="credential">Votre email :</p>
          <input type="text" placeholder="email" v-model="email" class="input" />
          <br />
          <p class="credential">Votre Mot de passe :</p>
          <input type="password" placeholder="mot de passe" v-model="password" class="input" />
        </div>
        <div id="SignUp">
          <button @click="SignUp">Créer le compte</button>
        </div>
      </div>
    </div>
  </body>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  width: 100vw;
  height: 7vh;
  padding: 0 2vw;
  box-sizing: border-box;
}

header,
body {
  background-color: #0e0e1a;
}

.logo {
  height: clamp(3rem, 5vh, 6rem);
  cursor: pointer;
}

.title {
  font-size: clamp(1.2rem, 2.5vw, 3rem);
  color: white;
  margin: 0 auto;
  font-weight: bold;
  text-align: center;
}

.container {
  height: 87vh;
  margin-top: 5vh;
  width: 100vw;
}

.box {
  margin-left: 38%;
  margin-top: 10%;
  background-color: #1a1a2e;
  border-radius: 1rem;
  padding: 3rem 2rem;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  text-align: center;
}

#SignIn,
#forms,
#SignUp {
  display: flex;
  justify-content: center;
}

#SignIn {
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  cursor: pointer;
  transition: color 0.2s;
}

#SignIn:hover {
  color: white;
  text-decoration: underline;
}

#forms {
  flex-direction: column;
  align-items: center;
  margin-top: 5%;
}

#forms {
  flex-direction: column;
  align-items: center;
}

.credential {
  text-align: left;
  color: #ccc;
  font-size: 1rem;
  margin-bottom: 0.3rem;
}

.input {
  padding: 0.75rem 1rem;
  background-color: #2a2a40;
  border: none;
  border-radius: 0.5rem;
  color: white;
  margin-bottom: 1.2rem;
  font-size: 1rem;
  outline: none;
  transition: 0.2s;
}

.input:focus {
  background-color: #33334d;
  border: 1px solid #646cff;
}

#SignUp button {
  margin-top: 5%;
  background: #646cff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition:
    background 0.3s,
    transform 0.2s;
}

#SignUp button:hover {
  background: #4d52ff;
  transform: scale(1.02);
}
</style>
