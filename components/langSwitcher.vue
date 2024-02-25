
<template>
  <ul v-for="locale in availableLocales" :key="locale.code">
    <li>
      <NuxtLink :to="switchLocalePath(locale.code)">
        {{ locale.name }}
      </NuxtLink>
    </li>
  </ul>
</template>
<script setup >
const {
  locale,
  locales
} = useI18n()
const switchLocalePath = useSwitchLocalePath()
const availableLocales = computed(() => {
  return (locales.value).filter(i => i.code !== locale.value)
})
</script>



<style scoped></style>
