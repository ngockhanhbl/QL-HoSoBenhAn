
<template>
  <div id="app" v-scroll="ScrollSticky">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <app-login /> -->
    <app-header/>
      <router-view></router-view>
    <app-footer />
  </div>
</template>
<script>



import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { mapGetters} from "vuex";

export default {
  
  name: "app",
  components: {
    // 'app-login':Login,
    "app-header": Header,
    "app-footer": Footer
  },
  data(){
    return{
      test:false,
      // isUserLoggedIn : JSON.parse(localStorage.getItem("isUserLoggedIn"))
    }
  },
  methods:{
    ScrollSticky(evt, el){
      this.$store.dispatch("EventScrollSticky",evt,el);
    }
  },
    computed:{
    ...mapGetters(["isScroll"]),
  },

};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900");

#app {
  font-family: "Roboto Condensed", sans-serif;
}

.modal-open .navbar-fixed-top {
    right: 15px;
}


</style>
