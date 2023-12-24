<template>
  <div v-if="!loading">
    <Sidebar>
      <div class="mt-8">
        <div class="flex justify-between mb-4 mr-10">
          <div>
            <label for="kirim" class="font-semibold mr-3"
              >Дата Поступления:
            </label>
            <VueDatePicker
              class="border border-gray-500 rounded-[5px] min-w-[350px]"
              v-model="date"
              range
              :max-date="new Date()"
              time-picker-inline
            />
          </div>
        </div>
        <table class="w-full">
          <thead>
            <tr>
              <th class="px-5 py-3 text-left border border-black">
                Название Продукта
              </th>
              <th class="px-5 py-3 text-left border border-black">
                Статус Продукта
              </th>
              <th class="px-5 py-3 text-left border border-black">
                Количество Продуктов
              </th>
              <th class="px-5 py-3 text-left border border-black">
                Себестоимость
              </th>
              <th class="px-5 py-3 text-left border border-black">
                Общая Стоимость
              </th>
              <th class="px-5 py-3 text-left border border-black">
                Дата и Время Поступления
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in history"
              :key="item._id"
              class="hover:bg-gray-200 cursor-pointer"
            >
              <td class="px-5 py-3 border border-black">
                {{ item.product.name }}
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ item.status == 0 ? "Kirim" : "Chiqim" }}</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ item.quantity }}</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ item.price }}$</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ (item.price * item.quantity).toFixed(2) }}$</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ formatTime(item.date) }}</div>
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
    </Sidebar>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

let loading = ref(true);
let history = ref([]);
let currentPage = ref(1);
let date = ref();

onMounted(async () => {
  try {
    const res = await $.get("/historyall");
    history.value = res.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
const previousPage = async () => {
  loading.value = true;
  if (currentPage.value === 1) {
    currentPage.value = 1;
  } else {
    currentPage.value--;
  }
  try {
    const res = await $.get("/historyall", {
      params: {
        page: currentPage.value,
      },
    });
    history.value = res.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
const nextPage = async () => {
  loading.value = true;
  try {
    currentPage.value++;
    let res = await $.get("/historyall", {
      params: {
        page: currentPage.value,
      },
    });
    if (res.data.length === 0) {
      currentPage.value--;
      res = await $.get("/historyall", {
        params: {
          page: currentPage.value,
        },
      });
    }
    history.value = res.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
watch(date, async () => {
  loading.value = true;
  try {
    const res = await $.post("/historyall", {
      startDate: date.value && date.value[0] ? date.value[0] : null,
      endDate: date.value && date.value[1] ? date.value[1] : null,
    });
    history.value = res.data;
  } catch (error) {
    return console.log(error);
  }
  loading.value = false;
});
</script>
