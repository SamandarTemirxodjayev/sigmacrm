<template>
  <div>
    <div class="flex items-center h-screen justify-center text-3xl">
      <LazyNuxtLink to="/sigma" class="mx-10">
        <div
          class="group relative inline-block overflow-hidden rounded border border-gray-800 p-20 text-sm font-medium"
        >
          <div class="font-semibold text-3xl">SIGMA</div>
        </div>
      </LazyNuxtLink>
      <LazyNuxtLink to="/global" class="mx-10">
        <div
          class="group relative inline-block overflow-hidden rounded border border-gray-800 p-20 text-sm font-medium"
        >
          <div class="font-semibold text-3xl">ARALASH</div>
        </div>
      </LazyNuxtLink>
    </div>
  </div>
</template>
<script setup>
onMounted(() => {
  if (!localStorage.getItem("username")) {
    window.location.href = "/login";
  }
});
</script>