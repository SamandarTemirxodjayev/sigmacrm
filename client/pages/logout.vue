<template>
  <div>
    <Loader />
  </div>
</template>
<script setup>
onMounted(async () => {
  await localStorage.clear();
  window.location.href = "/login";
});
</script>