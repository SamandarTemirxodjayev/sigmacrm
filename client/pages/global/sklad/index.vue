<template>
  <div v-if="!loading">
    <SidebarGlobal>
      <div class="my-8">
        <div class="flex float-right mb-4 mr-10">
          <div
            @click="handlePopUp"
            class="text-white bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-sm font-semibold"
          >
            Добавить Продукта
          </div>
        </div>
        <table class="w-full">
          <thead>
            <tr>
              <th class="px-5 py-3 text-left border border-black">#</th>
              <th class="px-5 py-3 text-left border border-black">
                Название продукта
              </th>
              <th class="px-5 py-3 text-left border border-black">
                Количество продуктов
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in products"
              :key="item._id"
              class="hover:bg-gray-200 cursor-pointer"
            >
              <td class="px-5 py-3 border border-black w-[2%]">
                {{ index+1 }}
              </td>
              <td class="px-5 py-3 border border-black">
                {{ item.name }}
              </td>
              <td class="px-5 py-3 border border-black">
                {{ item.quantity }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="isPopupOpen"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
      >
        <div class="bg-white p-10 rounded-md shadow-lg w-[400px]">
          <button
            @click="handleClosePopUp"
            class="relative -top-8 -right-8 float-right text-gray-500 hover:text-gray-700"
          >
            <Icon name="material-symbols:close" width="25" height="25" />
          </button>

          <div>
            <form @submit="handleSubmit">
              <div class="mb-4">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-700"
                  >Название Продукта</label
                >
                <input
                  v-model="name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <button
                  type="submit"
                  class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Подтвердить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SidebarGlobal>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

let loading = ref(true);
let products = ref();
let name = ref();

let isPopupOpen = ref(false);

const handlePopUp = () => {
  isPopupOpen.value = true;
};

const handleClosePopUp = () => {
  isPopupOpen.value = false;
};

onMounted(async () => {
  const res = await $global.get("/global");
  products.value = res.data;
  loading.value = false;
});

const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    await $global.put("/global", {
      name: name.value,
    });
    await Swal.fire("Сохранено", "Успешно Сохранен", "success");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
</script>
