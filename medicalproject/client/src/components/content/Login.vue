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
        <b-row class="d-flex justify-content-center">
        <p class="text-request" v-b-modal.modal-1>
            Gửi Yêu Cầu Tạo Tài Khoản</p>
          <b-modal id="modal-1" title="ĐĂNG KÍ" class="text-center"  ok-only>
              <router-link to="/registerpatient"><p class="my-4">Đăng Kí Dành Cho Bệnh Nhân</p></router-link>
              <router-link to="/registerhospital"><p class="my-4">Đăng Kí Dành Cho Bệnh Viện</p></router-link>
          </b-modal>
        </b-row>
      </b-col>
      <b-col cols="12">
        <b-row class="d-flex justify-content-center">
        <p class="text-request" v-b-modal.modal-2>
            Quên Mật Khẩu</p>
          <b-modal id="modal-2" title="Quên mật khẩu" class="d-flex">
            <span class="title"> Nhập Email </span>
            <input  type="text" class="w-100 p-1" v-model="email">
              <template v-slot:modal-footer>
                  <div class="w-100">
                  <b-button
                      variant="secondary"
                      size="sm"
                      class="float-right text-white"
                      @click="resetModal_2"
                  >
                      Đóng
                  </b-button>
                  <b-button
                      @click="checkForm"
                      variant="warning"
                      size="sm"
                      class="float-right mr-3 SendReqCreateJob text-white"
                  >
                      Gửi Yêu Cầu Đổi Mật Khẩu
                  </b-button>
                  </div>
              </template>
          </b-modal>
          <b-modal id="modal-3" title="Xác Thực" class="d-flex">
            <span class="title"> Nhập Mã Xác Thực Nhận Được  </span>
            <input  type="text" class="w-100 p-1" v-model="API_CHECK">
              <template v-slot:modal-footer>
                  <div class="w-100">
                  <b-button
                      variant="secondary"
                      size="sm"
                      class="float-right text-white"
                      @click="resetModal_3"
                  >
                      Đóng
                  </b-button>
                  <b-button
                      @click="checkAPIKEY"
                      variant="warning"
                      size="sm"
                      class="float-right mr-3 SendReqCreateJob text-white"
                  >
                      Gửi Xác Thực
                  </b-button>
                  </div>
              </template>
          </b-modal>
          <b-modal id="modal-4" title="Đổi Mật Khẩu" class="d-flex">
            <div class="py-2">
              <span class="title"> Nhập Mật khẩu Mới  </span>
              <input  type="password" class="w-100 p-1" v-model="password">
            </div>
            <div class="py-2">
                <span class="title"> Nhập Lại Mật khẩu Mới  </span>
                <input type="password" class="w-100 p-1" v-model="password_again">
            </div>
              <template v-slot:modal-footer>
                  <div class="w-100">
                  <b-button
                      variant="secondary"
                      size="sm"
                      class="float-right text-white"
                      @click="resetModal_4"
                  >
                      Đóng
                  </b-button>
                  <b-button
                      @click="checkPassword"
                      variant="success"
                      size="sm"
                      class="float-right mr-3 SendReqCreateJob text-white"
                  >
                      Gửi Xác Thực
                  </b-button>
                  </div>
              </template>
          </b-modal>
        </b-row>
      </b-col>
    </b-row>
</form>
</div>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationService';
import AccountService from '@/services/AccountService';
import { mapGetters} from "vuex";
export default {
  data(){
    return{
          API_KEYS:null,
          API_CHECK:null,
          email:'',
          password:'',
          password_again:''
    }
  },
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
        async checkAPIKEY(){
            console.log(this.API_KEYS+' API_KEYS')
            console.log(this.API_CHECK+ 'API_CHECK')
            if(this.API_KEYS != this.API_CHECK){
                this.$toasted.show(`Mã Xác Thực Không Đúng Vui lòng kiểm tra lại !`, { 
                    theme: "bubble", 
                    position: "bottom-right", 
                    duration : 5000
                });
            }else{
                this.$root.$emit('bv::show::modal', 'modal-4', '#btnShow')
            }
        },
        async changePassword(){
            try {
              const response = await AccountService.forgotPassword({
                  api_key:'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',
                  email:this.email,
                  password:this.password
              })
              this.$toasted.show(`Đỗi Mật Khẩu Thành công !`, { 
                  theme: "bubble", 
                  position: "bottom-center", 
                  duration : 5000
              });
              this.$root.$emit('bv::hide::modal', 'modal-4', '#btnShow')
              this.$root.$emit('bv::hide::modal', 'modal-3', '#btnShow')
              this.$root.$emit('bv::hide::modal', 'modal-2', '#btnShow')

          }catch (error) {
              this.$toasted.show(`${error.response.data.error}`, { 
                  theme: "outline", 
                  position: "bottom-center", 
                  duration : 5000
              });
          }
        },
        checkForm:async function (e) {
            if(!this.validEmail(this.email)) {
                    this.$toasted.show(`Vui lòng nhập đúng định dạng email !`, { 
                    theme: "outline", 
                    position: "bottom-center", 
                    duration : 5000
                });
            }
            else{
                this.sendAuthentication();
                this.$root.$emit('bv::show::modal', 'modal-3', '#btnShow')
            }
        },
    validEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
    },
    validPassword: function (email) {
        var re = /^[a-zA-Z0-9]{8,32}$/;
        return re.test(email)
    },
    resetModal_2(){
          this.API_KEYS = null,
          this.API_CHECK = null,
          this.email= '',
          this.password='',
          this.password_again='',
          this.$root.$emit('bv::hide::modal', 'modal-2', '#btnShow')
    },
    resetModal_3(){
          this.API_KEYS = null,
          this.API_CHECK = null,
          this.email= '',
          this.password= '',
          this.password_again=''.
          this.$root.$emit('bv::hide::modal', 'modal-3', '#btnShow')
    },
    resetModal_4(){
          this.API_KEYS = null,
          this.API_CHECK = null,
          this.email= '',
          this.password= '',
          this.password_again='',
          this.$root.$emit('bv::hide::modal', 'modal-4', '#btnShow')
    },
    IntegerGenerator(){
        return Math.floor(Math.random() * 10001);
    },
    async sendAuthentication(){
        this.API_KEYS = this.IntegerGenerator();
        console.log('this.API_KEYS '+this.API_KEYS)
        try {
            const response = await AuthenticationService.AuthenticationEmail({
                API_KEYS:this.API_KEYS,
                email:this.email
            })
        }catch (error) {
            this.$toasted.show(`${error.response.data.error}`, { 
                theme: "outline", 
                position: "bottom-center", 
                duration : 5000
            });
        }
    },
    checkPassword(){
      if(this.password !== this.password_again){
          this.$toasted.show(`Password và Password xác nhận không giống nhau, Vui lòng kiểm tra lại !`, { 
              theme: "outline", 
              position: "bottom-center", 
              duration : 5000
          });
          this.password = '';
          this.password_again = '';
      }else if(!this.validPassword(this.password)){
          this.$toasted.show(`Mật khẩu được cung cấp phải khớp với các quy tắc sau:
              <br>
              1. Nó phải chứa chỉ các ký tự sau: chữ thường, chữ hoa, chữ số.
              <br>
              2. mật khẩu dài ít nhất 8 kí tự và không dài hơn 32 kí tự.
              `, {
              theme: "outline", 
              position: "bottom-center", 
              duration : 5000
          });
      }
      else{
          this.changePassword();
      }
    },
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
              console.log(response)
              if(response.data.user.isUpdateInformation == 0 ){
                this.$router.push({
                  name:'UpdateInformationRegister',
                  // params: {id:this.user.id}
                })
               }
               else if(response.data.user.roles == 1){
                this.$router.push({
                  name:'patient',
                  params: {id:this.user.id}
                })
               }
              else if(response.data.user.roles == 2){
                this.$router.push({
                  name:'hospital',
                  params: {id:this.user.id}
                })
               }
              else if(response.data.user.roles == 3){
                this.$router.push({
                  name:'doctor',
                  params: {id:this.user.id}
                })
               }

              else if(response.data.user.roles == 0){
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
.title{
  font-size: 1.2rem;
  color:#2c3e50;
}
</style>
