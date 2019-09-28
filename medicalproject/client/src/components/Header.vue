<template>
  <header>
    <b-navbar toggleable="lg" type="light" variant="faded" class="fixed-top removePTPB navbarCus" v-bind:class="{ wapper_header: isScroll }" >
   <router-link to="/"><b-navbar-brand class="logo"><img src="@/assets/images/logo705.png"></b-navbar-brand></router-link>

      <b-navbar-toggle target="nav-collapse "></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto ">
          <router-link to="/aboutus"><b-nav-item href="/aboutus">Về Chúng Tôi</b-nav-item></router-link>
          <router-link to="/contact"><b-nav-item href="/contact">Liên Hệ</b-nav-item></router-link>
          <router-link to="/login"><b-nav-item  v-if="!isUserLoggedIn" href="login">Đăng Nhập</b-nav-item></router-link>
         <b-nav-item v-if="isUserLoggedIn" @click="logout" >
            Đăng Xuất
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import { mapGetters} from "vuex";
export default {  
  computed:{
    ...mapGetters(["isScroll","isUserLoggedIn","user"]),
  },
  methods: {
    navigationTo(route){
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      localStorage.clear();
      localStorage.removeItem('vuex');
      this.$router.push({
        name: 'homepage'
      })
    }
  }
}

</script>

<style scoped>
.wapper_header{
  color:red;
  background-color: rgba(248, 249, 250, 0.8);
}


.removePTPB{
    padding-bottom: 0;
    padding-top: 0;
}

div ul a li a {
  color:#0b385b;
}



</style>
