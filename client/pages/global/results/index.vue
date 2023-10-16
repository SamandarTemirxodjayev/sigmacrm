<template>
  <div v-if="!loading">
    <SidebarGlobal>
      <div class="mx-16 mt-8 max-w-sm">
        <label
          for="large"
          class="block mb-2 text-base font-medium text-gray-900"
          >Выберите Дату</label
        >
        <select
          v-model="selectedYear"
          @change="changeYear"
          id="large"
          class="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        >
          <option v-for="item in 10" :key="item" :value="item + 2021">
            {{ item + 2021 }}
          </option>
        </select>
      </div>
      <div class="mx-10 my-8">
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
        <div class="flex mx-5">
          <table class="w-full">
            <thead>
              <tr>
                <th
                  colspan="2"
                  class="px-5 py-3 text-left border border-black text-center bg-red-500"
                >
                  Расходы
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="hover:bg-gray-200 cursor-pointer"
                v-for="(item, i) in labels"
                :key="i"
              >
                <td class="px-5 py-3 border border-black">{{ item }}</td>
                <td class="px-5 py-3 border border-black">
                  <div>{{ datas[i + 1].toFixed(2) }}$</div>
                </td>
              </tr>
              <tr class="hover:bg-gray-200 cursor-pointer font-bold">
                <td class="px-5 py-3 border border-black bg-yellow-300">
                  Итого:
                </td>
                <td class="px-5 py-3 border border-black bg-yellow-300">
                  <div>{{ xarajatSummary.toFixed(2) }}$</div>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="w-full mx-10">
            <thead>
              <tr>
                <th
                  colspan="2"
                  class="px-5 py-3 text-left border border-black text-center bg-green-500"
                >
                  Прибыл
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="hover:bg-gray-200 cursor-pointer"
                v-for="(item, i) in labels"
                :key="i"
              >
                <td class="px-5 py-3 border border-black">{{ item }}</td>
                <td class="px-5 py-3 border border-black">
                  <div>{{ datas2[i + 1].toFixed(2) }}$</div>
                </td>
              </tr>
              <tr class="hover:bg-gray-200 cursor-pointer font-bold">
                <td class="px-5 py-3 border border-black bg-yellow-300">
                  Итого:
                </td>
                <td class="px-5 py-3 border border-black bg-yellow-300">
                  <div>{{ foydaSummary.toFixed(2) }}$</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="justify-center flex">
          <table class="w-[50%] my-5 mx-5">
            <thead>
              <tr>
                <th
                  colspan="2"
                  class="px-5 py-3 text-left border border-black text-center bg-blue-500"
                >
                  Отчет
                </th>
              </tr>
            </thead>
            <tbody class="font-semibold">
              <tr class="hover:bg-gray-200 cursor-pointer">
                <td class="px-5 py-3 border border-black bg-green-500">
                  Прибыл:
                </td>
                <td class="px-5 py-3 border border-black bg-green-500">
                  <div>{{ foydaSummary.toFixed(2) }}$</div>
                </td>
              </tr>
              <tr class="hover:bg-gray-200 cursor-pointer">
                <td class="px-5 py-3 border border-black bg-red-500">
                  Расходы:
                </td>
                <td class="px-5 py-3 border border-black bg-red-500">
                  <div>{{ xarajatSummary.toFixed(2) }}$</div>
                </td>
              </tr>
              <tr class="hover:bg-gray-200 cursor-pointer font-bold">
                <td
                  colspan="2"
                  class="px-5 py-3 border border-black bg-yellow-300"
                >
                  <div class="text-center">
                    Итого: {{ (foydaSummary - xarajatSummary).toFixed(2) }}$
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </SidebarGlobal>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
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
const datas2 = ref();
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
let year = new Date().getFullYear();
let selectedYear = ref(year);
let xarajatSummary = ref(0);
let foydaSummary = ref(0);
const labels = ref([
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
]);
let loading = ref(true);
onMounted(async () => {
  const prores = await $global.post("/productsAgg");
  for (const key in prores.data.priceSummary) {
    foydaSummary.value += prores.data.priceSummary[key];
  }
  datas2.value = prores.data.priceSummary;
  const monthLabelss2 = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString()
  );
  data2.value = {
    labels: labels.value,
    datasets: [
      {
        label: "Прибыл",
        data: monthLabelss2.map((month) => datas2.value[month] || 0),
        fill: false,
        borderColor: "rgba(16, 185, 129, 1)",
        pointStyle: "star",
        pointBorderWidth: "5",
        tension: 0.1,
      },
    ],
  };

  const res = await $global.post("/xarajatAgg");
  datas.value = res.data.monthlySummary;
  for (const key in res.data.monthlySummary) {
    xarajatSummary.value += res.data.monthlySummary[key];
  }
  const monthLabelss = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  data.value = {
    labels: labels.value,
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
});
const changeYear = async () => {
  loading.value = true;
  const prores = await $global.patch("/productsAgg", {
    year: selectedYear.value,
  });
  foydaSummary.value = 0;
  for (const key in prores.data.priceSummary) {
    foydaSummary.value += prores.data.priceSummary[key];
  }
  datas2.value = prores.data.priceSummary;
  const monthLabelss2 = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString()
  );
  data2.value = {
    labels: labels.value,
    datasets: [
      {
        label: "Прибыл",
        data: monthLabelss2.map((month) => datas2.value[month] || 0),
        fill: false,
        borderColor: "rgba(16, 185, 129, 1)",
        pointStyle: "star",
        pointBorderWidth: "5",
        tension: 0.1,
      },
    ],
  };

  const res = await $global.patch("/xarajatAgg", { year: selectedYear.value });
  datas.value = res.data.monthlySummary;
  xarajatSummary.value = 0;
  for (const key in res.data.monthlySummary) {
    xarajatSummary.value += res.data.monthlySummary[key];
  }
  const monthLabelss = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  data.value = {
    labels: labels.value,
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
};
</script>