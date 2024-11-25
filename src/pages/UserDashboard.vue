<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';

const client = generateClient<Schema>();

// Form state
const visaForm = ref({
  name: '',
  passportNumber: '',
  visaType: '',
  additionalDetails: '',
});

// Applications state
const applications = ref<Array<Schema['VisaApplication']['type']>>([]);

// Fetch applications
const fetchApplications = async () => {
  const { data, errors } = await client.models.VisaApplication.list();
  if (!errors) {
    applications.value = data || [];
  }
};

// Submit the form
const handleSubmit = async () => {
  const newApplication = {
    ...visaForm.value,
    status: 'Waiting for Review',
    submittedAt: new Date().toISOString().split('T')[0],
  };

  const { data, errors } = await client.models.VisaApplication.create(newApplication);
  if (!errors) {
    applications.value.push(data);
    alert('Application submitted successfully!');
  }

  // Clear the form
  Object.keys(visaForm.value).forEach((key) => (visaForm.value[key] = ''));
};

onMounted(() => {
  fetchApplications();
});
</script>

<template>
  <div class="user-dashboard">
    <h1>User Dashboard</h1>

    <section>
      <h2>Submit Visa Application</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="name">Name:</label>
          <input v-model="visaForm.name" type="text" id="name" required />
        </div>
        <div>
          <label for="passportNumber">Passport Number:</label>
          <input v-model="visaForm.passportNumber" type="text" id="passportNumber" required />
        </div>
        <div>
          <label for="visaType">Visa Type:</label>
          <select v-model="visaForm.visaType" id="visaType" required>
            <option value="Tourism">Tourism</option>
            <option value="Business">Business</option>
          </select>
        </div>
        <button type="submit">Submit Application</button>
      </form>
    </section>

    <section>
      <h2>Your Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Application ID</th>
            <th>Name</th>
            <th>Visa Type</th>
            <th>Status</th>
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="app in applications" :key="app.id">
            <td>{{ app.id }}</td>
            <td>{{ app.name }}</td>
            <td>{{ app.visaType }}</td>
            <td>{{ app.status }}</td>
            <td>{{ app.submittedAt }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
/* Your existing styles */
</style>
