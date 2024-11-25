<script lang="ts" setup>
import { ref } from 'vue';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';

const client = generateClient<Schema>();

// Reactive state for applications
const applications = ref<Array<Schema['VisaApplication']['type']>>([]);

// Fetch applications on mount
const fetchApplications = async () => {
  const { data, errors } = await client.models.VisaApplication.list();
  if (!errors) {
    applications.value = data || [];
  }
};

// Update application status
const updateStatus = async (id: string, newStatus: string) => {
  const app = applications.value.find((app) => app.id === id);
  if (app) {
    app.status = newStatus;
    await client.models.VisaApplication.update({ ...app, status: newStatus });
    alert(`Application ID ${id} status updated to ${newStatus}`);
  }
};

// Fetch applications when the component is mounted
fetchApplications();
</script>

<template>
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>
    <section>
      <h2>Manage Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Application ID</th>
            <th>Name</th>
            <th>Visa Type</th>
            <th>Status</th>
            <th>Submitted At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="app in applications" :key="app.id">
            <td>{{ app.id }}</td>
            <td>{{ app.name }}</td>
            <td>{{ app.visaType }}</td>
            <td>{{ app.status }}</td>
            <td>{{ app.submittedAt }}</td>
            <td>
              <button @click="updateStatus(app.id, 'Accepted')">Accept</button>
              <button @click="updateStatus(app.id, 'Rejected')">Reject</button>
              <button @click="updateStatus(app.id, 'Submitted')">Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
/* Your existing styles */
</style>
