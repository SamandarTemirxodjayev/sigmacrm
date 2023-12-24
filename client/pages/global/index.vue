<template>
  <div v-if="!loading">
    <SidebarGlobal>
      <div class="my-8">
        <div class="flex justify-between">
          <div class="flex-1 m-4 p-2 shadow-xl border border-gray-300">
            <div class="flex justify-between mx-3 items-center my-2">
              <div class="font-semibold">Дата:</div>
              <div>
                <VueDatePicker
                  class="border border-gray-500 rounded-[5px] mx-auto max-w-[80%]"
                  v-model="dateOfFoyda"
                  :enable-time-picker="false"
                  disabled
                />
              </div>
            </div>
            <div
              class="flex justify-between mx-3 mt-8 items-center text-center"
            >
              <div class="font-semibold">Доход:</div>
              <div class="text-[#196CF4] text-xl font-bold">
                {{ foydaSummary.toFixed(2) }} $
              </div>
            </div>
          </div>
          <div class="flex-1 m-4 p-2 shadow-xl border border-gray-300">
            <div class="flex justify-between mx-3 items-center my-2">
              <div class="font-semibold">Дата:</div>
              <div>
                <VueDatePicker
                  class="border border-gray-500 rounded-[5px] mx-auto max-w-[80%]"
                  v-model="dateOfXarajat"
                  :enable-time-picker="false"
                  disabled
                />
              </div>
            </div>
            <div
              class="flex justify-between mx-3 mt-8 items-center text-center"
            >
              <div class="font-semibold">Расходы:</div>
              <div class="text-[red] text-xl font-bold">
                {{ xarajatSummary }} $
              </div>
            </div>
          </div>
          <div class="flex-1 m-4 p-2 shadow-xl border border-gray-300">
            <div class="flex justify-between mx-3 items-center my-2">
              <div class="font-semibold">Дата:</div>
              <div class="">
                <VueDatePicker
                  class="border border-gray-500 rounded-[5px] mx-auto max-w-[80%]"
                  v-model="dateOfDollar"
                  :max-date="new Date()"
                  time-picker-inline
                  :enable-time-picker="false"
                />
              </div>
            </div>
            <div
              class="flex justify-between mx-1 mt-8 items-center text-center"
            >
              <div class="font-semibold">Курс Доллара:</div>
              <div class="text-[#196CF4] text-xl font-bold">
                {{ dollarRate }} сум
              </div>
            </div>
          </div>
          <div class="flex-1 m-4 p-2 shadow-xl border border-gray-300">
            <div class="flex justify-between mx-3 items-center my-2">
              <div class="font-semibold">Дата:</div>
              <div>
                <VueDatePicker
                  class="border border-gray-500 rounded-[5px] mx-auto max-w-[80%]"
                  v-model="dateOfRubl"
                  :max-date="new Date()"
                  time-picker-inline
                  :enable-time-picker="false"
                />
              </div>
            </div>
            <div
              class="flex justify-between mx-3 mt-8 items-center text-center"
            >
              <div class="font-semibold">Курс рубля:</div>
              <div class="text-[#196CF4] text-xl font-bold">
                {{ rublRate }} сум
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
                  {{ formatTime(item.product.date) }}
                </div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>
                  {{
                    item.product.saledCompany
                      ? formatTime(item.product.saledDate)
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
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

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
let data2 = ref();
const datas2 = ref();
const dateOfFoyda = ref(new Date());
const dateOfXarajat = ref(new Date());
const dateOfDollar = ref(new Date());
const dateOfRubl = ref(new Date());
let dollarRate = ref(0);
let rublRate = ref(0);
let Products = ref();
let foydaSummary = ref(0);
let xarajatSummary = ref(0);

const labels = [
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

onMounted(async () => {
  try {
    const prores = await $global.post("/productsAgg");

    datas2.value = prores.data.result;
    const monthLabelss2 = Array.from({ length: 12 }, (_, i) => i + 1);
    data2.value = {
      labels: labels,
      datasets: [
        {
          label: "Прибыл",
          data: monthLabelss2.map(
            (month) =>
              datas2.value.find((item) => item._id.month === month)
                ?.totalAmount || 0
          ),
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

    const prores2 = await $global.post("/productsAgg");

    for (const key in prores2.data.result) {
      foydaSummary.value += prores.data.result[key].totalAmount;
    }

    const resx = await $global.post("/xarajatAgg");
    datas.value = res.data.result;

    for (const key in resx.data.result) {
      xarajatSummary.value += resx.data.result[key].totalAmount;
    }

    let date = new Date();
    const dollarres = await $.post("/dollar", {
      date: `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`,
    });
    dollarRate.value = dollarres.data.data.crdhldBillAmt;

    const rublres = await $.post("/rubl", {
      date: `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`,
    });
    rublRate.value = rublres.data.data.crdhldBillAmt;
  } catch (error) {
    console.log(error);
  }
  const res = await $global.post("/xarajatAgg");
  datas.value = res.data.result;

  const monthLabels = Array.from({ length: 12 }, (_, i) => i + 1);

  data.value = {
    labels: labels,
    datasets: [
      {
        label: "Расходы",
        data: monthLabels.map(
          (month) =>
            datas.value.find((item) => item._id.month === month)?.totalAmount ||
            0
        ),
        fill: false,
        borderColor: "rgba(239, 68, 68, 1)",
        pointStyle: "star",
        pointBorderWidth: "5",
        tension: 0.1,
      },
    ],
  };
  loading.value = false;
});
watch(dateOfDollar, async () => {
  try {
    let date = new Date(dateOfDollar.value);
    const dollarres = await $.post("/dollar", {
      date: `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`,
    });
    dollarRate.value = dollarres.data.data.crdhldBillAmt;
  } catch (error) {
    return console.log(error);
  }
});
watch(dateOfRubl, async () => {
  try {
    let date = new Date(dateOfRubl.value);
    const dollarres = await $.post("/rubl", {
      date: `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`,
    });
    rublRate.value = dollarres.data.data.crdhldBillAmt;
  } catch (error) {
    return console.log(error);
  }
});
</script>
