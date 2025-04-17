<script setup>
import { ref, onMounted } from 'vue'

const showModal = ref(false)
const Logged = ref(false)

const CheckIfLogged = () => {
  if (localStorage.getItem('authId')) {
    Logged.value = true
  }
}

function formatDate(dateString) {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

let UserId = localStorage.getItem('authId')
let UserName = localStorage.getItem('authName')
const UserEmail = ref('')
const UserRegisterDate = ref('')

const InfosUser = () => {
  fetch(`https://fast-sushi-api.vercel.app/users/read/${UserId}`)
    .then((response) => response.json())
    .then((result) => {
      UserEmail.value = result.email
      UserRegisterDate.value = formatDate(result.created_at)
    })
    .catch((error) => console.log('error', error))
}

const user = ref({
  name: UserName,
  email: UserEmail,
  role: 'Client Classique',
  joined: UserRegisterDate,
  // orders: 12,
  favoriteSushi: 'Ramen au Porc',
  avatar: 'https://i.imgur.com/hepj9ZS.png',
})

const name = ref('')
const email = ref('')
const favoriteArticle = ref(user.value.favoriteSushi)

const EditInfosUser = () => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

  var urlencoded = new URLSearchParams()
  urlencoded.append('name', name.value)
  urlencoded.append('email', email.value)
  urlencoded.append('password', '')

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  }

  fetch(`https://fast-sushi-api.vercel.app/users/update/${UserId}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      showModal.value = false
      localStorage.setItem('authName', name.value)
      location.reload()
    })
    .catch((error) => console.log('error', error))
}

onMounted(() => {
  InfosUser()
  CheckIfLogged()
})
</script>

<template>
  <div class="profile-page">
    <h1>Mon Profil</h1>
    <div class="profile-card" v-if="Logged">
      <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
        <div class="modal">
          <button class="close-btn" @click="showModal = false">x</button>
          <h2>Modifier mes informations</h2>

          <label>Nom :</label>
          <input v-model="name" type="text" />

          <label>Email :</label>
          <input v-model="email" type="email" />

          <label>Article préféré :</label>
          <input v-model="favoriteArticle" type="text" />

          <div class="modal-actions">
            <button @click="showModal = false">Annuler</button>
            <button @click="EditInfosUser">Sauvegarder</button>
          </div>
        </div>
      </div>
      <img :src="user.avatar" alt="avatar" class="avatar" />
      <div class="info">
        <h2>{{ user.name }}</h2>
        <p class="role">{{ user.role }}</p>
        <p><strong>Email :</strong> {{ user.email }}</p>
        <p><strong>Inscrit depuis :</strong> {{ user.joined }}</p>
        <!-- <p><strong>Commandes :</strong> {{ user.orders }}</p> -->
        <p><strong>Article préféré :</strong> {{ user.favoriteSushi }}</p>
        <button class="edit-btn" @click="showModal = true">Modifier mes infos</button>
      </div>
    </div>
    <div v-else>
      <p class="empty">Veuillez vous connecter pour voir votre profil.</p>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  min-height: 100vh;
  background-color: #0e0e1a;
  padding: 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.profile-card {
  background-color: #1e1e2f;
  border-radius: 1.5rem;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  display: flex;
  gap: 2rem;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  flex-wrap: wrap;
  justify-content: center;
}

.avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #646cff;
  margin-top: 3rem;
  margin-right: 3rem;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
}

h2 {
  margin: 0;
  font-size: 1.8rem;
}

.role {
  font-style: italic;
  color: #a0a0ff;
}

.edit-btn {
  margin-top: 1rem;
  background: #646cff;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;
  align-self: start;
}

.edit-btn:hover {
  background-color: #4d52ff;
  transform: scale(1.05);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
}

.modal {
  position: relative;
  background-color: #1e1e2f;
  padding: 2.5rem 2rem 2rem;
  border-radius: 1.2rem;
  width: 90%;
  max-width: 450px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.6);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  color: white;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
  transition: 0.2s;
}

.close-btn:hover {
  color: #ff6b6b;
}

.modal input {
  background-color: #0e0e1a;
  border: 1px solid #646cff;
  border-radius: 0.5rem;
  padding: 0.6rem;
  color: white;
  outline: none;
  font-size: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.modal-actions button {
  padding: 0.5rem 1rem;
  border-radius: 0.4rem;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.modal-actions button:first-child {
  background-color: #444;
  color: white;
}

.modal-actions button:last-child {
  background-color: #646cff;
  color: white;
}

.modal-actions button:last-child:hover {
  background-color: #4d52ff;
}

.empty {
  text-align: center;
  color: gray;
  font-style: italic;
}
</style>
