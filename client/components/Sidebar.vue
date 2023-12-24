<template>
  <div>
    <div
      class="flex min-h-[100svh] bg-gray-100 h-full font-sans antialiased bg-white text-black"
    >
      <div class="w-64 bg-white border-r border-[#196CF4] fixed top-0 bottom-0">
        <div class="m-4">
          <a
            href="/sigma"
            class="text-2xl font-bold flex text-center items-center"
          >
            <div class="px-3 pt-1 pb-2 bg-[#196CF4] rounded-[8px] text-white">
              SIGMA
            </div>
            <div class="py-2 pl-1 text-[#196CF4]">CRM</div>
          </a>
        </div>
        <nav class="py-4">
          <ul class="space-y-2 text-gray-500 font-semibold text-xl pl-4">
            <NuxtLink to="/sigma">
              <li
                class="flex items-center px-2 rounded-l-[15px]"
                :class="
                  router.path == '/sigma'
                    ? 'bg-[#196CF4] text-white'
                    : 'hover:bg-[#196CF4] hover:text-white'
                "
              >
                <Icon name="bx:home-alt" width="25" height="25" class="mr-2" />
                <div class="block py-3">Главная Страница</div>
              </li>
            </NuxtLink>
            <NuxtLink to="/sigma/kirim">
              <li
                class="flex items-center px-2 rounded-l-[15px]"
                :class="
                  router.path == '/sigma/kirim'
                    ? 'bg-[#196CF4] text-white'
                    : 'hover:bg-[#196CF4] hover:text-white'
                "
              >
                <Icon name="mi:download" width="25" height="25" class="mr-2" />
                <div class="block py-3">Приход Товара</div>
              </li>
            </NuxtLink>
            <NuxtLink to="/sigma/chiqim">
              <li
                class="flex items-center px-2 rounded-l-[15px]"
                :class="
                  router.path == '/sigma/chiqim'
                    ? 'bg-[#196CF4] text-white'
                    : 'hover:bg-[#196CF4] hover:text-white'
                "
              >
                <Icon
                  name="heroicons-solid:upload"
                  width="25"
                  height="25"
                  class="mr-2"
                />
                <div class="block py-3">Продажа Товара</div>
              </li>
            </NuxtLink>
            <NuxtLink to="/sigma/sklad">
              <li
                class="flex items-center hover:bg-[#196CF4] hover:text-white px-2 rounded-l-[15px]"
                :class="
                  router.path == '/sigma/sklad'
                    ? 'bg-[#196CF4] text-white'
                    : 'hover:bg-[#196CF4] hover:text-white'
                "
              >
                <Icon
                  name="material-symbols:warehouse-rounded"
                  width="25"
                  height="25"
                  class="mr-2"
                />
                <div class="block py-3">Склад (Oстаток)</div>
              </li>
            </NuxtLink>
            <NuxtLink to="/sigma/history">
              <li
                class="flex items-center px-2 rounded-l-[15px]"
                :class="
                  router.path == '/sigma/history'
                    ? 'bg-[#196CF4] text-white'
                    : 'hover:bg-[#196CF4] hover:text-white'
                "
              >
                <Icon
                  name="material-symbols:history"
                  width="25"
                  height="25"
                  class="mr-2"
                />
                <div class="block py-3">История</div>
              </li>
            </NuxtLink>
            <NuxtLink to="/sigma/historyall">
              <li
                class="flex items-center px-2 rounded-l-[15px]"
                :class="
                  router.path == '/sigma/historyall'
                    ? 'bg-[#196CF4] text-white'
                    : 'hover:bg-[#196CF4] hover:text-white'
                "
              >
                <Icon
                  name="ic:sharp-manage-history"
                  width="25"
                  height="25"
                  class="mr-2"
                />
                <div class="block py-3">Общая История</div>
              </li>
            </NuxtLink>
            <NuxtLink to="/sigma/payments">
              <li
                class="flex items-center px-2 rounded-l-[15px]"
                :class="
                  router.path == '/sigma/payments'
                    ? 'bg-[#196CF4] text-white'
                    : 'hover:bg-[#196CF4] hover:text-white'
                "
              >
                <Icon
                  name="streamline:money-cash-dollar-coin-accounting-billing-payment-cash-coin-currency-money-finance"
                  width="25"
                  height="25"
                  class="mr-2"
                />
                <div class="block py-3">Расходы</div>
              </li>
            </NuxtLink>
            <NuxtLink to="/sigma/results">
              <li
                class="flex items-center px-2 rounded-l-[15px]"
                :class="
                  router.path == '/sigma/results'
                    ? 'bg-[#196CF4] text-white'
                    : 'hover:bg-[#196CF4] hover:text-white'
                "
              >
                <Icon
                  name="file-icons:microsoft-excel"
                  width="25"
                  height="25"
                  class="mr-2"
                />
                <div class="block py-3">Отчеть</div>
              </li>
            </NuxtLink>
          </ul>
        </nav>
        <div
          class="border-t border-gray-300 w-64 absolute bottom-[50px] space-y-2 text-[#196CF4] font-semibold text-xl pl-4"
        >
          <NuxtLink to="/logout">
            <div
              class="flex items-center hover:bg-[#196CF4] hover:text-white px-2 rounded-l-[15px] mt-5"
            >
              <Icon name="mdi:backburger" width="30" class="pr-2 mt-1" />
              <div class="block py-2">Выход</div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="flex-1">
        <div class="ml-64">
          <div class="mx-2">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const router = useRoute();
</script>
<style scoped>
.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: red;
  color: white;
  font-size: 12px;
  font-weight: bold;
  border-radius: 50%;
}
</style>