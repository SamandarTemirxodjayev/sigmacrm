<template>
  <div v-if="!loading">
    <SidebarGlobal>
      <div class="max-w-md mx-auto mt-8">
        <form @submit="handleSubmit">
          <div class="mb-4 relative">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Выберите продукт</label
            >
            <input
              v-model="ProductName"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              @focus="showSearchList = true"
            />
            <div
              v-if="showSearchList && filteredProducts.length > 0"
              class="absolute z-10 mt-2 py-2 w-full bg-white border border-gray-300 rounded-md shadow-lg"
            >
              <ul>
                <li
                  v-for="product in filteredProducts"
                  :key="product.id"
                  @click="selectProduct(product.name)"
                  class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {{ product.name }}
                </li>
              </ul>
            </div>
          </div>
          <div class="mb-4">
            <label
              for="quantity"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Цена продукта</label
            >
            <input
              v-model="amount"
              required
              step="0.01"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="quantity"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Количество Продуктов</label
            >
            <input
              v-model="quantity"
              required
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="country"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Страна Прихода</label
            >
            <input
              v-model="country"
              required
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700"
              >Дата</label
            >
            <input
              disabled="disabled"
              :value="`${date.day}.${date.month}.${date.year}`"
              class="bg-gray-300 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700"
              >Время</label
            >
            <input
              disabled="disabled"
              :value="`${time.hour}:${time.minute}:${time.second}`"
              class="bg-gray-300 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
            ></button>
          </div>
        </form>
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
let ProductName = ref();
let amount = ref();
let quantity = ref();
let date = reactive({
  day: "",
  month: "",
  year: "",
});
let time = reactive({
  hour: "",
  minute: "",
  second: "",
});
let success = ref(false);
let products = ref();
let country = ref();

onMounted(async () => {
  try {
    const res = await $global.get("/global");
    products.value = res.data;
  } catch (error) {
    console.error(error);
  }
  loading.value = false;
  updateTimeAndDate();
  setInterval(updateTimeAndDate, 500);
});

const updateTimeAndDate = () => {
  const now = new Date();
  time.hour = now.getHours();
  time.minute = now.getMinutes();
  time.second = now.getSeconds();
  date.day = now.getDate();
  date.month = now.getMonth() + 1;
  date.year = now.getFullYear();
};
const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    const data = {
      name: ProductName.value,
      date,
      time,
      price: amount.value,
      quantity: quantity.value,
      companyName: country.value,
    };
    await $global.put("/products", data);
    await Swal.fire("Сохранено", "Успешно Сохранен", "success");
    ProductName.value = "";
    amount.value = "";
    quantity.value = "";
    country.value = "";
  } catch (error) {
    console.error(error);
    Swal.fire("Oops...", "Something went wrong!", "error");
  }
  loading.value = false;
};

let showSearchList = ref(false);

const filteredProducts = computed(() => {
  if (!ProductName.value) return [];
  const searchTerm = ProductName.value.toLowerCase();
  return products.value.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );
});

const selectProduct = (product) => {
  ProductName.value = product;
  showSearchList.value = false;
};
</script>
