<template>
  <div class="select-none">
    <div
      class="flex min-h-screen bg-gray-100 h-full font-sans antialiased bg-white text-black"
    >
      <div class="w-64 bg-white border-r border-[#196CF4]">
        <div class="m-4">
          <a
            href="/global"
            class="text-2xl font-bold flex text-center items-center"
          >
            <div class="px-3 pt-1 pb-2 bg-[#196CF4] rounded-[8px] text-white">
              ARALASH
            </div>
            <div class="py-2 pl-1 text-[#196CF4]">CRM</div>
          </a>
        </div>
        <nav class="py-4">
          <ul class="space-y-2 text-gray-500 font-semibold text-xl pl-4">
            <a href="/global">
              <li
                class="flex items-center hover:bg-[#196CF4] hover:text-white px-2 rounded-l-[15px]"
              >
                <Icon name="bx:home-alt" width="25" height="25" class="mr-2" />
                <div class="block py-3">Главная Страница</div>
              </li>
            </a>
            <a href="/global/kirim">
              <li
                class="flex items-center hover:bg-[#196CF4] hover:text-white px-2 rounded-l-[15px]"
              >
                <Icon name="mi:download" width="25" height="25" class="mr-2" />
                <div class="block py-3">Приход Товара</div>
              </li>
            </a>
            <a href="/global/chiqim">
              <li
                class="flex items-center hover:bg-[#196CF4] hover:text-white px-2 rounded-l-[15px]"
              >
                <Icon
                  name="heroicons-solid:upload"
                  width="25"
                  height="25"
                  class="mr-2"
                />
                <div class="block py-3">Продажа Товара</div>
              </li>
            </a>
            <a href="/global/sklad">
              <li
                class="flex items-center hover:bg-[#196CF4] hover:text-white px-2 rounded-l-[15px]"
              >
                <Icon
                  name="material-symbols:warehouse-rounded"
                  width="25"
                  height="25"
                  class="mr-2"
                />
                <div class="block py-3">Склад (Oстаток)</div>
              </li>
            </a>
            <a href="/global/history">
              <li
                class="flex items-center hover:bg-[#196CF4] hover:text-white px-2 rounded-l-[15px]"
              >
                <Icon
                  name="material-symbols:history"
                  width="25"
                  height="25"
                  class="mr-2"
                />
                <div class="block py-3">История</div>
              </li>
            </a>
            <a href="/global/historyall">
              <li
                class="flex items-center hover:bg-[#196CF4] hover:text-white px-2 rounded-l-[15px]"
              >
                <Icon
                  name="ic:sharp-manage-history"
                  width="25"
                  height="25"
                  class="mr-2"
                />
                <div class="block py-3">Общая История</div>
              </li>
            </a>
            <a href="/global/payments">
              <li
                class="flex items-center hover:bg-[#196CF4] hover:text-white px-2 rounded-l-[15px]"
              >
                <Icon
                  name="streamline:money-cash-dollar-coin-accounting-billing-payment-cash-coin-currency-money-finance"
                  width="25"
                  height="25"
                  class="mr-2"
                />
                <div class="block py-3">Расходы</div>
              </li>
            </a>
            <a href="/global/results">
              <li
                class="flex items-center hover:bg-[#196CF4] hover:text-white px-2 rounded-l-[15px]"
              >
                <Icon
                  name="file-icons:microsoft-excel"
                  width="25"
                  height="25"
                  class="mr-2"
                />
                <div class="block py-3">Отчеть</div>
              </li>
            </a>
          </ul>
        </nav>
        <div
          class="border-t border-gray-300 w-64 absolute bottom-[50px] space-y-2 text-[#196CF4] font-semibold text-xl pl-4"
        >
          <a href="/logout">
            <div
              class="flex items-center hover:bg-[#196CF4] hover:text-white px-2 rounded-l-[15px] mt-5"
            >
              <Icon name="mdi:backburger" width="30" class="pr-2 mt-1" />
              <div class="block py-2">Выход</div>
            </div>
          </a>
        </div>
      </div>
      <div class="flex-1">
        <div class="mx-2">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
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