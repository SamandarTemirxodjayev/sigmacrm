<template>
  <div v-if="!loading">
    <Sidebar>
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
              >Введите Количество Продукта: (MAX: {{ maxQuantity }})</label
            >
            <input
              v-model="quantity"
              required
              :max="maxQuantity"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="quantity"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Цена Продажи Товара</label
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
              >Наименование Организации-Покупателя</label
            >
            <input
              v-model="companyName"
              required
              type="text"
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
let ProductName = ref();
let companyName = ref();
let amount = ref();
let quantity = ref();
let products = ref();
let maxQuantity = ref(0);

onMounted(async () => {
  try {
    const res = await $.get("/global");
    products.value = res.data;
  } catch (error) {
    console.error(error);
  }
  loading.value = false;
});

const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    const data = {
      name: ProductName.value,
      companyName: companyName.value,
      price: amount.value,
      quantity: quantity.value,
    };
    console.log(data);
    await $.put("/sellProducts", data);
    await Swal.fire("Сохранено", "Успешно Выпущен", "success");
    ProductName.value = "";
    companyName.value = "";
    quantity.value = "";
    amount.value = "";
  } catch (error) {
    console.log(error);
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

const selectProduct = async (product) => {
  loading.value = true;
  try {
    ProductName.value = product;
    showSearchList.value = false;
    const res = await $.get(`/global/${product}`);
    maxQuantity.value = res.data.quantity;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
</script>
