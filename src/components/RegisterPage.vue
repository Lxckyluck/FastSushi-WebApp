<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')

const router = useRouter()

const SignUp = () => {
  const formData = new URLSearchParams()
  formData.append('name', name.value)
  formData.append('email', email.value)
  formData.append('password', password.value)

  fetch('http://localhost:3000/users/signup', {
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
      console.log(data)
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
    <div id="left"><img alt="FastSushi logo" class="logo" src="../assets/logo_blanc.png" /></div>
    <h1 class="title">Register</h1>
  </header>
  <body>
    <div class="container">
      <p id="SignIn">Already have an account ? Signin</p>
      <div id="forms">
        <p class="credential">Your name :</p>
        <input type="text" placeholder="name" v-model="name" class="input" />
        <p class="credential">Your email :</p>
        <input type="text" placeholder="email" v-model="email" class="input" />
        <br />
        <p class="credential">Your password :</p>
        <input type="password" placeholder="password" v-model="password" class="input" />
      </div>
      <div id="SignUp">
        <button @click="SignUp">Create Account</button>
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
  margin-top: 1vh;
}

.logo {
  height: clamp(3rem, 5vh, 6rem);
}

.title {
  font-size: clamp(1.2rem, 2.5vw, 3rem);
  color: white;
  margin: 0 auto;
}

.container {
  height: 87vh;
  border: 1px solid white;
  margin-top: 5vh;
  width: 100vw;
}

#SignIn,
#forms,
#SignUp {
  display: flex;
  justify-content: center;
}

#SignIn {
  color: white;
  font-size: clamp(1.2rem, 2.5vw, 3rem);
}
#forms {
  flex-direction: column;
  align-items: center;
}

.credential {
  margin-top: 2vh;
  color: white;
  font-size: clamp(1.2rem, 2.5vw, 3rem);
}

.input {
  margin-top: 1vh;
  border: 0.2rem solid #000000;
  border-radius: 0.5rem;
  background-color: #1e1e2f;
  font-weight: bold;
  font-style: italic;
  outline: none;
  text-align: center;
  line-height: 1.5rem;
  color: #e0e0e0;
}

#SignUp button {
  margin-top: 10vh;
  border: 0.2rem solid #000000;
  border-radius: 0.5rem;
  background-color: #1e1e2f;
  font-style: italic;
  outline: none;
  color: gray;
  font-size: medium;
  cursor: pointer;
  width: 13vw;
}

#SignUp button:hover {
  color: white;
  background-color: #000;
  border: 0.15rem solid white;
}
</style>
