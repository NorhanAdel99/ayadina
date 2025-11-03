import { useAuthStore } from "~/store/authStore";
// import { toastMsg } from "@/composables/ToastMsg";
// const  toast = toastMsg();


export default defineNuxtRouteMiddleware((to, from) => {

  if (process.server) return;
  if (to.path.startsWith("/user") && !to.path.includes("2024_backend_admin")) {
    return navigateTo("/");
  }
  if (!useAuthStore().isAuth) {
    if (to.path.includes("/commision") || to.path.includes("/profile") || to.path.includes("notification") 
    || to.path.includes("/specialOrdersDetails")) {
      return navigateTo("/");
    }
    // return;
  }
  if (useAuthStore().searchData  == null ){
    if (to.path.includes("/search")) {
      return navigateTo("/");
    }
    return;
  }

})