<template>
  <div v-if="!loading">
    <SidebarGlobal>
      <div class="my-8">
        <div class="flex justify-between">
          <div class="flex-1 m-4 p-2 shadow-xl border border-gray-300">
            <div class="flex justify-between mx-3 items-center my-2">
              <div class="font-semibold">Дата:</div>
              <div>
                <input
                  type="date"
                  class="border border-gray-300 rounded-md p-1"
                  v-model="dateOfFoyda"
                  @change="handleChangeDateOfFoyda"
                />
              </div>
            </div>
            <div
              class="flex justify-between mx-3 mt-8 items-center text-center"
            >
              <div class="font-semibold">Доход:</div>
              <div class="text-[#196CF4] text-xl font-bold">
                {{ daromad.toFixed(2) }} $
              </div>
            </div>
          </div>
          <div class="flex-1 m-4 p-2 shadow-xl border border-gray-300">
            <div class="flex justify-between mx-3 items-center my-2">
              <div class="font-semibold">Дата:</div>
              <div>
                <input
                  type="date"
                  class="border border-gray-300 rounded-md p-1"
                  v-model="dateOfXarajat"
                  @change="handleChangeDateOfXarajat"
                />
              </div>
            </div>
            <div
              class="flex justify-between mx-3 mt-8 items-center text-center"
            >
              <div class="font-semibold">Расходы:</div>
              <div class="text-[red] text-xl font-bold">
                {{ Xarajats.toString() }} $
              </div>
            </div>
          </div>
          <div class="flex-1 m-4 p-2 shadow-xl border border-gray-300">
            <div class="flex justify-between mx-3 items-center my-2">
              <div class="font-semibold">Дата:</div>
              <div>
                <input
                  type="date"
                  class="border border-gray-300 rounded-md p-1"
                  v-model="dateOfDollar"
                  @change="handleChangeDollar"
                />
              </div>
            </div>
            <div
              class="flex justify-between mx-1 mt-8 items-center text-center"
            >
              <div class="font-semibold">Курс Доллара:</div>
              <div class="text-[#196CF4] text-xl font-bold">
                {{ dollarRate.toFixed(2) }} сум
              </div>
            </div>
          </div>
          <div class="flex-1 m-4 p-2 shadow-xl border border-gray-300">
            <div class="flex justify-between mx-3 items-center my-2">
              <div class="font-semibold">Дата:</div>
              <div>
                <input
                  type="date"
                  class="border border-gray-300 rounded-md p-1"
                  v-model="dateOfRubl"
                  @change="handleChangeRubl"
                />
              </div>
            </div>
            <div
              class="flex justify-between mx-3 mt-8 items-center text-center"
            >
              <div class="font-semibold">Курс рубля:</div>
              <div class="text-[#196CF4] text-xl font-bold">
                {{ rublRate.toFixed(2) }} сум
              </div>
            </div>
          </div>
        </div>

        <div class="">
          <div class="font-semibold ml-10">Расходы За 1 Год ($)</div>
          <Line
            id="my-chart-id"
            :data="data"
            class="max-w-[100%] max-h-[477px]"
          />
          <div class="font-semibold ml-10">Прибыль За 1 Год ($)</div>
          <Line
            id="my-chart-id"
            :data="data2"
            class="max-w-[100%] max-h-[477px]"
          />
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
                Продажная Организация
              </th>
              <th class="px-5 py-3 text-left border border-black">
                Цена Продажи
              </th>
              <th class="px-5 py-3 text-left border border-black">
                Дата и Время Поступления
              </th>
              <th class="px-5 py-3 text-left border border-black">
                Дата и время выпуска
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
                <div>{{ item.status == 0 ? "Вход" : "Продажа" }}</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ item.quantity }}</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ item.product.price }}</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ item.product.company }}</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ item.product.saledCompany }}</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ item.product.saledPrice }}</div>
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
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
const datas = ref();
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const data = ref();
const data2 = ref();
const dateOfFoyda = ref();
const dateOfXarajat = ref();
const dateOfDollar = ref();
const dateOfRubl = ref();
const Xarajats = ref(0);
const daromad = ref(0);
let dates = reactive({
  day: "",
  month: "",
  year: "",
});
let dollarRate = ref(0);
let rublRate = ref(0);
let Products = ref();

const updateTimeAndDate = () => {
  const now = new Date();
  dates.day = now.getDate();
  dates.month = now.getMonth() + 1;
  dates.year = now.getFullYear();
};

onMounted(async () => {
  try {
    const prores = await $global.post("/productsAgg");
    Products.value = prores.data;
    datas.value = prores.data.priceSummary;
    const monthLabelss = Array.from({ length: 12 }, (_, i) =>
      (i + 1).toString()
    );
    const monthLabels = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];

    data2.value = {
      labels: monthLabels,
      datasets: [
        {
          label: "Прибыли",
          data: monthLabelss.map((month) => datas.value[month] || 0),
          fill: false,
          borderColor: "rgba(16, 185, 129, 1)",
          pointStyle: "star",
          pointBorderWidth: "5",
          tension: 0.1,
        },
      ],
    };
    const res = await $global.get("/history5", {
      params: {
        page: currentPage.value,
      },
    });
    history.value = res.data;
    dateOfFoyda.value = new Date().toISOString().slice(0, 10);
    dateOfXarajat.value = new Date().toISOString().slice(0, 10);
    const now = new Date();
    dates.day = now.getDate();
    dates.month = now.getMonth() + 1;
    dates.year = now.getFullYear();
    const xarajatres = await $global.post("/xarajats", {
      date: {
        year: dates.year,
        day: dates.day,
        month: dates.month,
      },
    });
    Xarajats.value = xarajatres.data;
    const foydares = await $global.post("/productsa", {
      date: {
        year: dates.year,
        day: dates.day,
        month: dates.month,
      },
    });
    daromad.value = foydares.data.priceSummary;
    const dollarres = await $global.post("/dollar", {
      date: `${dates.year}-${dates.month
        .toString()
        .padStart(2, "0")}-${dates.day.toString().padStart(2, "0")}`,
    });
    dollarRate.value = dollarres.data.data.crdhldBillAmt;
    dateOfDollar.value = `${dates.year}-${dates.month
      .toString()
      .padStart(2, "0")}-${dates.day.toString().padStart(2, "0")}`;
    const rublres = await $global.post("/rubl", {
      date: `${dates.year}-${dates.month
        .toString()
        .padStart(2, "0")}-${dates.day.toString().padStart(2, "0")}`,
    });
    rublRate.value = rublres.data.data.crdhldBillAmt;
    dateOfRubl.value = `${dates.year}-${dates.month
      .toString()
      .padStart(2, "0")}-${dates.day.toString().padStart(2, "0")}`;
  } catch (error) {
    console.log(error);
  }
  const res = await $global.post("/xarajatAgg");
  datas.value = res.data.monthlySummary;

  const monthLabelss = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const monthLabels = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  data.value = {
    labels: monthLabels,
    datasets: [
      {
        label: "Расходы",
        data: monthLabelss.map((month) => datas.value[month] || 0),
        fill: false,
        borderColor: "rgba(239, 68, 68, 1)",
        pointStyle: "star",
        pointBorderWidth: "5",
        tension: 0.1,
      },
    ],
  };
  loading.value = false;
  updateTimeAndDate();
  setInterval(updateTimeAndDate, 500);
});
const formattedDate = (date, time) => {
  return `${date.day}.${date.month}.${date.year} ${time.hour}:${time.minute}:${time.second}`;
};
const handleChangeDollar = async () => {
  try {
    const res = await $global.post("/dollar", {
      date: dateOfDollar.value,
    });
    dollarRate.value = res.data.data.crdhldBillAmt;
  } catch (error) {
    console.error(error);
  }
};
const handleChangeRubl = async () => {
  try {
    const res = await $global.post("/rubl", {
      date: dateOfRubl.value,
    });
    rublRate.value = res.data.data.crdhldBillAmt;
  } catch (error) {
    console.error(error);
  }
};
const handleChangeDateOfXarajat = async () => {
  try {
    const f = dateOfXarajat.value.split("-");
    const xarajatres = await $global.post("/xarajats", {
      date: {
        year: parseInt(f[0]),
        day: parseInt(f[2]),
        month: parseInt(f[1]),
      },
    });
    Xarajats.value = xarajatres.data;
  } catch (error) {
    console.log(error);
  }
};
const handleChangeDateOfFoyda = async () => {
  try {
    const f = dateOfFoyda.value.split("-");
    const foydares = await $global.post("/productsa", {
      date: {
        year: parseInt(f[0]),
        day: parseInt(f[2]),
        month: parseInt(f[1]),
      },
    });
    daromad.value = foydares.data.priceSummary;
  } catch (error) {
    console.log(error);
  }
};
</script>
