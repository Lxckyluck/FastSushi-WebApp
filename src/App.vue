<script setup>
import AppHeader from './components/Header.vue'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const products = ref([])
const error = ref(null)
const Logged = ref(false)

const fetchProducts = async () => {
  try {
    const response = await fetch('https://fast-sushi-api.vercel.app/product/read')
    const data = await response.json()
    products.value = data
  } catch (err) {
    error.value = 'Une erreur est survenue lors du chargement des produits.'
    console.error(err)
  }
}

const CheckIfLogged = () => {
  if (localStorage.getItem('authId')) {
    Logged.value = true
  }
}

const AddToCart = (product) => {
  if (!Logged.value) {
    alert('Vous devez être connecté pour ajouter cet article au panier')
    return
  }

  const existingCart = JSON.parse(localStorage.getItem('Cart')) || []

  const existingProduct = existingCart.find((p) => p.id === product.id)

  if (existingProduct) {
    alert('Cet article est déjà dans votre panier')
    return
  }

  existingCart.push({
    id: product.id,
    name: product.name,
    price: product.price,
    stock: product.stock,
    image_url: product.image_url,
  })

  localStorage.setItem('Cart', JSON.stringify(existingCart))
  alert('Article ajouté au panier')
}

onMounted(() => {
  fetchProducts()
  CheckIfLogged()
})

const route = useRoute()
const hideHeaderOnRoutes = ['/Login', '/Register']
</script>

<template>
  <AppHeader v-if="!hideHeaderOnRoutes.includes(route.path)" />
  <router-view />
  <div class="product-page">
    <h1 class="title">Accueil</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div v-if="products.length === 0" class="loading">Chargement des produits...</div>

      <div v-else class="product-list">
        <div v-for="product in products" :key="product.id" class="product-card">
          <img :src="product.image_url" :alt="product.name" class="product-img" />

          <div class="card-body">
            <div class="product-info">
              <h2 class="product-name">{{ product.name }}</h2>
              <p class="product-price">{{ product.price }} €</p>
              <p class="product-description">{{ product.description }}</p>
            </div>
            <button class="order" @click="AddToCart(product)">Ajouter au panier</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-page {
  padding: 2rem;
  background-color: #0e0e1a;
  min-height: 100vh;
  color: white;
}

.title {
  text-align: center;
  font-size: clamp(1.5rem, 3vw, 3rem);
  margin-bottom: 2rem;
  color: white;
}

.loading,
.error {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2rem;
  color: gray;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
}

.product-card {
  background-color: #1e1e2f;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
}

.product-card:hover {
  transform: scale(1.03);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

.product-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.product-info {
  text-align: center;
}

.product-name {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.product-price,
.product-description {
  font-style: italic;
  color: #b0b0b0;
  margin-bottom: 0.5rem;
}

.order {
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #0e0e1a;
  color: white;
  border: 0.15rem solid transparent;
  border-radius: 0.5rem;
  font-style: italic;
  transition: 0.2s ease-in-out;
  cursor: pointer;
}

.order:hover {
  color: white;
  background-color: #000;
  border-color: white;
}
</style>
