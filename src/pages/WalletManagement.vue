<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';

const client = generateClient<Schema>();

// Reactive wallet state
const wallet = ref<Schema['Wallet']['type'] | null>(null);

// Fetch wallet data
const fetchWallet = async () => {
  const { data, errors } = await client.models.Wallet.list();
  if (!errors && data.length > 0) {
    wallet.value = data[0]; // Assuming a single wallet per user
  }
};

// Add funds
const addFunds = async (amount: number) => {
  if (wallet.value) {
    wallet.value.balance += amount;
    await client.models.Wallet.update(wallet.value);
    alert(`$${amount} added to wallet!`);
  }
};

onMounted(() => {
  fetchWallet();
});
</script>

<template>
  <div class="wallet-management">
    <h1>Wallet Management</h1>
    <section>
      <h2>Balance: ${{ wallet?.balance || 0 }}</h2>
      <button @click="addFunds(50)">Add $50</button>
    </section>
  </div>
</template>

<style scoped>
/* Your existing styles */
</style>
