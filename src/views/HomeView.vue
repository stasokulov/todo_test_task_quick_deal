<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <h1>Home page</h1>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <TheWelcome />
      </v-col>
    </v-row>
  </v-container>
</template>
