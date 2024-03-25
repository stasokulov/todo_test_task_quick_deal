<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Выполненное тестовое задание</template>

    Тестовое задание по вакансии от компании "Quick Deal"
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Описание ТЗ</template>

    <a
      href="https://docs.google.com/document/d/1JXR9ys5wK1kDc_8jFwKSd1PkiElCyF1rTwQbuoc7Y2E/edit"
      target="_blank"
      rel="noopener"
      >Ссылка на текст задания</a
    >
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Использованные технологии</template>

    <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>,
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
    <a href="https://vuetifyjs.com/" target="_blank" rel="noopener">Vuetify</a>.
  </WelcomeItem>
</template>
