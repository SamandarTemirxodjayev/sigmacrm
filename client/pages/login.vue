<template>
  <div>
    <section class="bg-gray-50 dark:bg-gray-900">
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
      >
        <div class="m-4">
          <a
            href="/sigma"
            class="text-2xl font-bold flex text-center items-center"
          >
            <div class="px-3 pt-1 pb-2 bg-[#196CF4] rounded-[8px] text-white">
              SIGMA
            </div>
            <div class="py-2 pl-1 text-[#196CF4]">CRM</div>
          </a>
        </div>
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form class="space-y-4 md:space-y-6" @submit="handleSubmit">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Login</label
                >
                <input
                  type="text"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  v-model="username"
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Parol</label
                >
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  v-model="password"
                />
              </div>
              <button
                type="submit"
                class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Kirish
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

let username = ref();
let password = ref();

onMounted(() => {
  if (localStorage.getItem("username") != null) {
    return (window.location.href = "/");
  }
});
const handleSubmit = async (e) => {
  e.preventDefault();
  if (username.value == "admin" && password.value == "admin") {
    await Swal.fire({
      position: "center",
      icon: "success",
      title: "Login va Parol togri",
      showConfirmButton: false,
      timer: 1500,
    });
    localStorage.setItem("username", username.value);
    window.location.href = "/";
  } else {
    await Swal.fire("Xatolik", "Login yoki Parol xato", "error");
  }
};
</script>