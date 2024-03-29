import { useAuthStore } from "~/store/authStore";
// import { toastMsg } from "@/composables/ToastMsg";
// const  toast = toastMsg();

const isAuthintcated = useAuthStore().isAuthenticated;
export default defineNuxtRouteMiddleware((to, from) => {
    if(process.server) return ;
if(to.path === '/commision' && !isAuthintcated){
    return navigateTo('/')
    // return abortNavigation("You must logged in ");
}

if(to.path === '/notification' && !isAuthintcated){
    return navigateTo('/')
    // return abortNavigation("You must logged in ");
}
if(to.path === '/profile' && !isAuthintcated){
    return navigateTo('/')
    // return abortNavigation("You must logged in ");
}
if(to.path === '/profile/chat' && !isAuthintcated){
    return navigateTo('/')
    // return abortNavigation("You must logged in ");
}
if(to.path === '/profile/rate' && !isAuthintcated){
    return navigateTo('/')
    // return abortNavigation("You must logged in ");
}
if(to.path === '/profile/settings' && !isAuthintcated){
    return navigateTo('/')
    // return abortNavigation("You must logged in ");
}
if(to.path === '/profile/settings/email' && !isAuthintcated){
    return navigateTo('/')
    // return abortNavigation("You must logged in ");
}
if(to.path === '/profile/email/otp' && !isAuthintcated){
    return navigateTo('/')
    // return abortNavigation("You must logged in ");
}
if(to.path === '/profile/phoneNumber' && !isAuthintcated){
    return navigateTo('/')
    // return abortNavigation("You must logged in ");
}
if(to.path === '/profile/phoneNumber/otpPhone' && !isAuthintcated){
    return navigateTo('/')
    // return abortNavigation("You must logged in ");
}
if(to.path === '/profile/phoneNumber/otpPhone' && !isAuthintcated){
    return navigateTo('/')
    // return abortNavigation("You must logged in ");
}

if(to.path === '/profile/editProfile' && !isAuthintcated){
    return navigateTo('/')
    // return abortNavigation("You must logged in ");
}

if(to.path === '/profile/notification' && !isAuthintcated){
    return navigateTo('/')
    // return abortNavigation("You must logged in ");
}
if(to.path === '/profile/password' && !isAuthintcated){
    return navigateTo('/')
    // return abortNavigation("You must logged in ");
}
if(to.path === '/profile/skills/edit' && !isAuthintcated){
    return navigateTo('/')
    // return abortNavigation("You must logged in ");
}

if(/^\/profile\/skills\/edit\/\d+$/.test(to.path) && !isAuthintcated){
    return navigateTo('/')
    // return abortNavigation("You must logged in ");
}
if(to.path === '/profile/skills/add' && !isAuthintcated){
    return navigateTo('/')
    // return abortNavigation("You must logged in ");
}
if(/^\/profile\/skills\/\d+$/.test(to.path)  && !isAuthintcated){
    return navigateTo('/')
    // return abortNavigation("You must logged in ");
}
if(to.path === '/profile/specialOrders' && !isAuthintcated){
    return navigateTo('/')
    // return abortNavigation("You must logged in ");
}
if(/^\/profile\/specialOrders\/\d+$/.test(to.path)  && !isAuthintcated){
    return navigateTo('/')
    // return abortNavigation("You must logged in ");
}
});
