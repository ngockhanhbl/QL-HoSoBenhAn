<template>
  <div v-if="userRole == 0 && isUserLoggedIn === 'true'" class="pt-5">
  <b-card no-body>
    <b-tabs pills card vertical >
      <b-tab title="Quản lý bệnh viện " active><b-card-text> <app-AdminManager /></b-card-text></b-tab>
      <b-tab title="Quản lý đăng kí"><b-card-text> <AdminManagerRegister /></b-card-text></b-tab>
      <b-tab title="Quản lý liên hệ"><b-card-text> <AdminSupport /></b-card-text></b-tab>
      <b-tab title="Quản lý tuyển dụng"><b-card-text> <AdminManagerJob /></b-card-text></b-tab>
    </b-tabs>
  </b-card>

  </div>
</template>

<script>
import AdminManager from '@/components/content/admin_modules/AdminManager.vue'
import { mapGetters} from "vuex";
  export default {
    data(){
      return{
        userRole :null,
        get isUserLoggedIn() {
          return localStorage.getItem('isUserLoggedIn' || false);
        }
      }
    },
    components: {
      "app-AdminManager": AdminManager,
      AdminManagerRegister: () =>import('@/components/content/admin_modules/AdminManagerRegister.vue'),
      AdminSupport: () =>import('@/components/content/admin_modules/AdminSupport.vue'),
      AdminManagerJob: () =>import('@/components/content/admin_modules/AdminManagerJob.vue')
    },
    async created() {
      const userJSON = JSON.parse(localStorage.getItem("user"))
      this.userRole = userJSON.roles
    }
 
  }
</script>

<style scoped>

</style>