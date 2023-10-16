<template>
  <div v-if="!loading">
    <SidebarGlobal>
      <div class="mt-8">
        <div class="flex justify-between mb-4 mr-10">
          <div>
            <label for="kirim" class="font-semibold mr-3"
              >Дата Поступления:
            </label>
            <input
              id="kirim"
              type="date"
              @change="handleChangeKirim"
              v-model="date"
              class="p-2 border border-gray-500 rounded-md"
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
                Входная Организация
              </th>
              <th class="px-5 py-3 text-left border border-black">
                Организация Выхода
              </th>
              <th class="px-5 py-3 text-left border border-black">
                Цена Продажи
              </th>
              <th class="px-5 py-3 text-left border border-black">
                Дата и Время Поступления
              </th>
              <th class="px-5 py-3 text-left border border-black">
                Дата и Время выпуска
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
                {{ item.product.name.name }}
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ item.status == 0 ? "Kirim" : "Chiqim" }}</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ item.quantity }}</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ item.product.price }}$</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ item.product.company }}</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ item.product.saledCompany }}</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ item.product.saledPrice }}$</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>
                  {{ formattedDate(item.product.date, item.product.time) }}
                </div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>
                  {{
                    item.product.saledCompany
                      ? formattedDate(
                          item.product.saledDate,
                          item.product.saledTime
                        )
                      : ""
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
    </SidebarGlobal>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
let loading = ref(true);
let history = ref([]);
let currentPage = ref(1);
let date = ref();
let date2 = ref();

onMounted(async () => {
  try {
    const res = await $global.get("/history", {
      params: {
        page: currentPage.value,
      },
    });
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
    const res = await $global.get("/history", {
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
    let res = await $global.get("/history", {
      params: {
        page: currentPage.value,
      },
    });
    if (res.data.length === 0) {
      currentPage.value--;
      res = await $global.get("/history", {
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
const handleChangeKirim = async () => {
  const parts = date.value.split("-");

  const formattedDate = {
    year: parseInt(parts[0]),
    month: parseInt(parts[1]),
    day: parseInt(parts[2]),
  };
  const res = await $global.post("/history", {
    date: formattedDate,
  });
  history.value = res.data;
};
const handleChangeChiqim = async () => {
  const parts = date2.value.split("-");

  const formattedDate = {
    year: parseInt(parts[0]),
    month: parseInt(parts[1]),
    day: parseInt(parts[2]),
  };
  const res = await $global.post("/historyr", {
    date: formattedDate,
  });
  console.log(res);
  history.value = res.data;
};

const formattedDate = (date, time) => {
  return `${date.day}.${date.month}.${date.year} ${time.hour}:${time.minute}:${time.second}`;
};
</script>
