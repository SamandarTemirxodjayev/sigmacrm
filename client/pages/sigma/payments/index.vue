<template>
  <div v-if="!loading">
    <Sidebar>
      <div class="mt-8">
        <div class="flex justify-between mb-4 mr-10">
          <div>
            <input
              type="date"
              @change="handleChange"
              v-model="date"
              class="border border-gray-400 rounded-md p-2"
            />
          </div>
          <button
            @click="handlePopUp"
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
              <th class="px-5 py-3 text-left border border-black">Дата</th>
              <th class="px-5 py-3 text-left border border-black">Время</th>
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
                  {{ `${item.date.day}.${item.date.month}.${item.date.year}` }}
                </div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>
                  {{
                    `${item.time.hour}:${item.time.minute}:${item.time.second}`
                  }}
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
    </Sidebar>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

let loading = ref(true);
let xarajats = ref([]);
let currentPage = ref(1);
let date = ref();
let isPopupOpen = ref(false);
let name = ref("");
let amount = ref("");
let dates = reactive({
  day: "",
  month: "",
  year: "",
});
let time = reactive({
  hour: "",
  minute: "",
  second: "",
});

const handlePopUp = () => {
  isPopupOpen.value = true;
};

const handleClosePopUp = () => {
  isPopupOpen.value = false;
};

onMounted(async () => {
  try {
    const res = await $.get("/xarajat", {
      params: {
        page: currentPage.value,
      },
    });
    xarajats.value = res.data;
  } catch (error) {
    console.log(error);
  }
  updateTimeAndDate();
  setInterval(updateTimeAndDate, 500);
  loading.value = false;
});

const updateTimeAndDate = () => {
  const now = new Date();
  time.hour = now.getHours();
  time.minute = now.getMinutes();
  time.second = now.getSeconds();
  dates.day = now.getDate();
  dates.month = now.getMonth() + 1;
  dates.year = now.getFullYear();
};
const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    const data = {
      name: name.value,
      date: dates,
      time,
      amount: amount.value,
    };
    await $.put("/xarajat", data);
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
    const res = await $.get("/xarajat", {
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
    let res = await $.get("/xarajat", {
      params: {
        page: currentPage.value,
      },
    });
    if (res.data.length === 0) {
      currentPage.value--;
      res = await $.get("/xarajat", {
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
const handleChange = async () => {
  const parts = date.value.split("-");

  const formattedDate = {
    year: parseInt(parts[0]),
    month: parseInt(parts[1]),
    day: parseInt(parts[2]),
  };
  const res = await $.post("/xarajat", {
    date: formattedDate,
  });
  xarajats.value = res.data;
};
</script>
