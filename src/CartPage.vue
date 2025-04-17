<script setup>
import { ref, onMounted } from 'vue'

const cartItems = ref([])

onMounted(() => {
  const cartData = JSON.parse(localStorage.getItem('Cart')) || []
  cartItems.value = cartData.map((item) => ({
    ...item,
    quantity: item.quantity || 1,
  }))
})

const updateLocalStorage = () => {
  localStorage.setItem('Cart', JSON.stringify(cartItems.value))
}

const QuantityProductIncrease = (item) => {
  if (item.quantity < item.stock) {
    item.quantity++
  } else {
    alert("You can't order more than the available stock")
  }
  updateLocalStorage()
}

const QuantityProductDecrease = (item) => {
  if (item.quantity > 1) {
    item.quantity--
  } else {
    alert("You can't order less than 1 product")
  }
  updateLocalStorage()
}

const removeFromCart = (productId) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== productId)
  localStorage.setItem('Cart', JSON.stringify(cartItems.value))
}
</script>

<template>
  <div class="cart-page">
    <h1>Votre Panier</h1>
    <div v-if="cartItems.length === 0" class="empty">Votre Panier est vide.</div>
    <div v-else class="cart-list">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image_url" :alt="item.name" class="cart-img" />
        <div class="item-info">
          <h2>{{ item.name }}</h2>
          <p>Prix: {{ item.price }} €</p>
          <p>Stock restant: {{ item.stock }}</p>
          <p>Quantité : {{ item.quantity }}</p>
        </div>
        <button class="amount-decrease" @click="QuantityProductDecrease(item)">-</button>
        <button class="ammount increase" @click="QuantityProductIncrease(item)">+</button>
        <button class="order">Commander</button>
        <button class="remove" @click="removeFromCart(item.id)">🗑 Supprimer</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  padding: 2rem;
  background-color: #0e0e1a;
  min-height: 100vh;
  color: white;
}
h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
}
.empty {
  text-align: center;
  color: gray;
  font-style: italic;
}
.cart-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.cart-item {
  background-color: #1e1e2f;
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 1rem;
  gap: 1rem;
}
.cart-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 0.5rem;
}
.item-info {
  flex: 1;
}

.amount-decrease,
.ammount.increase {
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  font-weight: bold;
  border: 1px solid #444;
  background-color: #1e1e2f;
  color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin: 0 0.5rem;
}

.amount-decrease:hover,
.ammount.increase:hover {
  background-color: #333;
  border-color: white;
  transform: scale(1.05);
}

.order {
  background: none;
  border: 1px solid black;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.order:hover {
  background-color: black;
  color: white;
}

.remove {
  background: none;
  border: 1px solid red;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: red;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.remove:hover {
  background-color: red;
  color: white;
}
</style>
