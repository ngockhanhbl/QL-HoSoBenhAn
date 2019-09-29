<template>
  <div v-if="this.user.roles == 0 && this.isUserLoggedIn" class="pt-5">
  <b-card no-body>
    <b-tabs pills card vertical >
      <b-tab title="Quản lý bệnh viện " active><b-card-text> <app-AdminManager /></b-card-text></b-tab>
      <b-tab title="Quản lý đăng kí"><b-card-text> <app-AdminManagerRegister /></b-card-text></b-tab>
    </b-tabs>
  </b-card>
  </div>
</template>

<script>
import AdminManager from '@/components/content/admin_modules/AdminManager.vue'
import AdminManagerRegister from '@/components/content/admin_modules/AdminManagerRegister.vue'
import { mapGetters} from "vuex";
  export default {
      computed: {
        ...mapGetters(["user","isUserLoggedIn"])
      },
      components: {
        "app-AdminManager": AdminManager,
        "app-AdminManagerRegister": AdminManagerRegister
      },
 
  }
</script>

<style scoped>

</style>