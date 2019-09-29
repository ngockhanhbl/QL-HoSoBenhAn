<template>
<div class="bg">
<form>
     <b-row class="login shadow p-3 mb-5 bg-white rounded ">
      <b-col
        cols="12"
        class="label-login d-flex justify-content-center text-red"
      >
        <h2>Đăng Nhập</h2>
      </b-col>

      <b-col cols="12">
        <b-row class="lg-control">
          <b-col class="d-flex inputCus"
            ><input type="text" placeholder="Nhập Tài Khoản" v-model="login_username" />
          </b-col>
          <span class="d-flex align-items-center"><img src="@/assets/images/man-user.svg" /></span>
        </b-row>
      </b-col>

      <div class="spacer-5"></div>

      <b-col cols="12">
        <b-row class="lg-control">
          <b-col class="d-flex inputCus"
            ><input type="password" placeholder="Nhập Mật Khẩu" v-model="login_password"
          /></b-col>
           <span class="d-flex align-items-center"><img src="@/assets/images/locked.svg" /></span>
        </b-row>
      </b-col>
      <div class="spacer-5"></div>
      <b-col cols="12">
        <b-row class="justify-content-around">
          <b-button variant="outline-primary" @click="submitLogin">Đăng Nhập</b-button>
        </b-row>
      </b-col>

      <b-col cols="12">
        <div class="d-flex">
          <b-col class="border-top-custom align-self-center"></b-col>
          <div class="text-center seperate">Hoặc</div>
          <b-col class="border-top-custom align-self-center"></b-col>
        </div>
      </b-col>

      <b-col cols="12">
        <b-row class="justify-content-center">
        <p class="text-request" v-b-modal.modal-1>
            Gửi Yêu Cầu Tạo Tài Khoản</p>
          <b-modal id="modal-1" title="ĐĂNG KÍ" class="text-center"  ok-only>
              <router-link to="/registerpatient"><p class="my-4">Đăng Kí Dành Cho Bệnh Nhân</p></router-link>
              <router-link to="/registerhospital"><p class="my-4">Đăng Kí Dành Cho Bệnh Viện</p></router-link>
          </b-modal>
        </b-row>
      </b-col>
    </b-row>
</form>
</div>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationService';
import { mapGetters} from "vuex";
export default {
  computed: {
        ...mapGetters(["user"]),
        login_username: {
           get(){ 
               return this.$store.getters.login_username
            },
           set(payload){  
               this.$store.dispatch("updateUsername",payload)
           }
        },
        login_password: {
           get(){ 
               return this.$store.getters.login_password
            },
           set(payload){  
               this.$store.dispatch("updatePassword",payload)
           }
        },
  },
  mounted() {
    localStorage.removeItem('vuex');
  },
  methods:{
    async submitLogin(){
            try {
                const response = await AuthenticationService.login({
                  email: this.login_username,
                  password: this.login_password
                })
                  this.$store.dispatch('setToken', response.data.token)
                  this.$store.dispatch('setUser', response.data.user)
                  this.$store.dispatch('resetlogin')
                  window.scrollTo(0,100)   //trick fix slow react
               if(response.data.user.roles == 1){
                this.$router.push({
                  name:'patient',
                  params: {id:this.user.id}
                })
               }
              if(response.data.user.roles == 2){
                this.$router.push({
                  name:'hospital',
                  params: {id:this.user.id}
                })
               }
              if(response.data.user.roles == 3){
                this.$router.push({
                  name:'doctor',
                  params: {id:this.user.id}
                })
               }

              if(response.data.user.roles == 0){
                this.$router.push({
                  name:'admin',
                  params: {id:this.user.id}
                })
               }

            }         
            catch (error) {
                this.$toasted.show(`${error.response.data.error}`, { 
                theme: "bubble", 
                position: "bottom-right", 
                duration : 2000
              });
              
              }
        },
  },
};
</script>

<style scoped>
/* dùng emit gửi cho app.vue để set-backgouround */
.bg {
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 15vh;
  margin-bottom: 10vh;
  font-size: 14px;

}
.login {
  border: 1px solid #bdc3c7;
  border-radius: 15px;
  width: 50vh;
  height: 75vh;
  background: #000;
  margin: auto;
}
.label-login {
  padding: 1rem 0;
}

.spacer-10 {
  width: 100%;
  height: 10px;
}

.label-login {
  margin-top: 5vh;
}

.lg-control input{
  border: 1px solid #bdc3c7;
  padding: 1ex;
  position: relative;
  padding-left: 30px;
  border-radius: 5px;
  width: 80vmin;
}

.lg-control img {
  height: 1.2em;
  width: 1.2em;
  position: absolute;
  left: 25px;
}
.inputCus {
  position: relative;
}
.border-top-custom {
  border-top: 1px solid #cdc9c9;
}

.seperate {
  padding: 0 15px;
  color: #cdc9c9;
}
.text-request {
  color: #2c3e50;
}

.text-red {
  color: red;
}

.text-request:hover {
  text-decoration: underline;
  cursor: pointer;
} 
</style>
