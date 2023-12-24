<template>
  <div v-if="!loading">
    <SidebarGlobal>
      <div class="mt-8">
        <div class="flex justify-between mb-4 mr-10">
          <div>
            <VueDatePicker
              class="border border-gray-500 rounded-[5px] min-w-[350px]"
              v-model="date"
              range
              :max-date="new Date()"
              time-picker-inline
            />
          </div>
          <button
            @click="() => (isPopupOpen = true)"
            class="text-white bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-sm font-semibold"
          >
            Добавить Расход
          </button>
        </div>
        <table class="w-full">
          <thead>
            <tr>
              <th class="px-5 py-3 text-left border border-black">
                Имя Расхода
              </th>
              <th class="px-5 py-3 text-left border border-black">
                Количество
              </th>
              <th class="px-5 py-3 text-left border border-black">
                Дата и Время
              </th>
              <th class="px-5 py-3 text-left border border-black"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in xarajats"
              :key="item._id"
              class="hover:bg-gray-200 cursor-pointer"
            >
              <td class="px-5 py-3 border border-black">
                <div>{{ item.name }}</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>
                  {{ item.amount.toLocaleString("en-US").replace(/,/g, " ") }}$
                </div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>
                  {{ formatTime(item.date) }}
                </div>
              </td>
              <td
                class="px-5 py-3 border border-black text-center w-[10%] text-gray-400"
              >
                <div>
                  <Icon
                    name="clarity:pencil-line"
                    class="mr-4 hover:text-black"
                    size="1.5rem"
                    @click="handleEditHarajat(item)"
                  />
                  <Icon
                    name="ant-design:delete-outlined"
                    class="hover:text-black"
                    size="1.5rem"
                    @click="handleDeleteHarajat(item._id)"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-center mt-4">
        <button
          @click="previousPage"
          class="mr-2 px-3 py-1 bg-blue-500 text-white rounded-sm"
        >
          Предыдущий
        </button>
        <button
          @click="nextPage"
          class="ml-2 px-3 py-1 bg-blue-500 text-white rounded-sm"
        >
          Следующий
        </button>
      </div>
      <div
        v-if="isPopupOpen"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
      >
        <div class="bg-white p-10 rounded-md shadow-lg w-[400px]">
          <button
            @click="() => (isPopupOpen = false)"
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
                >
                  Имя Расхода</label
                >
                <input
                  v-model="name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div class="mb-4">
                <label
                  for="quantity"
                  class="block mb-2 text-sm font-medium text-gray-700"
                >
                  Сумма Расхода</label
                >
                <input
                  v-model="amount"
                  required
                  step="0.01"
                  type="number"
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
      <div
        v-if="isEditPopupOpen"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
      >
        <div class="bg-white p-10 rounded-md shadow-lg w-[400px]">
          <button
            @click="() => (isEditPopupOpen = false)"
            class="relative -top-8 -right-8 float-right text-gray-500 hover:text-gray-700"
          >
            <Icon name="material-symbols:close" width="25" height="25" />
          </button>

          <div>
            <form @submit="handleEditSubmit">
              <div class="mb-4">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-700"
                >
                  Имя Расхода</label
                >
                <input
                  v-model="editedItem.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div class="mb-4">
                <label
                  for="quantity"
                  class="block mb-2 text-sm font-medium text-gray-700"
                >
                  Сумма Расхода</label
                >
                <input
                  v-model="editedItem.amount"
                  required
                  step="0.01"
                  type="number"
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
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

let loading = ref(true);
let xarajats = ref([]);
let currentPage = ref(1);
let date = ref([]);
let isPopupOpen = ref(false);
let isEditPopupOpen = ref(false);
let editedItem = ref(false);
let name = ref("");
let amount = ref("");

onMounted(async () => {
  try {
    const res = await $global.get("/xarajat", {
      params: {
        page: currentPage.value,
      },
    });
    xarajats.value = res.data;
  } catch (error) {
    console.log(error);
  }
  const endDate = new Date();
  const startDate = new Date(new Date().setDate(endDate.getDate() - 7));
  date.value = [startDate, endDate];
  loading.value = false;
});

const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    await $global.put("/xarajat", {
      name: name.value,
      amount: amount.value,
    });
    await Swal.fire("Сохранено", "Успешно Сохранен", "success");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
const previousPage = async () => {
  loading.value = true;
  if (currentPage.value === 1) {
    currentPage.value = 1;
  } else {
    currentPage.value--;
  }
  try {
    const res = await $global.get("/xarajat", {
      params: {
        page: currentPage.value,
      },
    });
    xarajats.value = res.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
const nextPage = async () => {
  loading.value = true;
  try {
    currentPage.value++;
    let res = await $global.get("/xarajat", {
      params: {
        page: currentPage.value,
      },
    });
    if (res.data.length === 0) {
      currentPage.value--;
      res = await $global.get("/xarajat", {
        params: {
          page: currentPage.value,
        },
      });
    }
    xarajats.value = res.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
const handleDeleteHarajat = async (id) => {
  Swal.fire({
    title: "Действительно хотите удалить?",
    showCancelButton: true,
    confirmButtonText: "Удалить",
    confirmButtonColor: "#D11A2A",
    cancelButtonText: "Отмена",
  }).then(async (result) => {
    if (result.isConfirmed) {
      loading.value = true;
      await $global.delete(`/xarajat/${id}`).then(async () => {
        await Swal.fire("Удалено", "", "success");
        window.location.reload();
      });
    }
  });
};
const handleEditHarajat = (item) => {
  isEditPopupOpen.value = true;
  editedItem.value = item;
};
const handleEditSubmit = async (e) => {
  try {
    e.preventDefault();
    loading.value = true;
    const data = {
      name: editedItem.value.name,
      amount: editedItem.value.amount,
    };
    await $global.patch(`/xarajat/${editedItem.value._id}`, data);
    await Swal.fire("Сохранено", "Успешно Сохранен", "success");
    window.location.reload();
  } catch (error) {}
};
watch(date, async () => {
  loading.value = true;
  try {
    const res = await $global.post("/xarajat", {
      startDate: date.value && date.value[0] ? date.value[0] : null,
      endDate: date.value && date.value[1] ? date.value[1] : null,
    });
    xarajats.value = res.data;
  } catch (error) {
    return console.log(error);
  }
  loading.value = false;
});
</script>
