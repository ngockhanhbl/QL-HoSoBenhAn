<template>
  <div class="pt-5">
    <section class="center">
  <div class="table__wrapper">
   
    <table class="table" summary="This is a summary of your rad table contents.">
      <thead>
        <tr>
          <th scope="row"></th>
          <th scope="col" class="text-center">Cài đặt tài khoản chung{{isUserLoggedIn}}</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isModifyName">
          <th scope="row">Tên bệnh viện</th>
          <td  scope="col"><p>{{namehospital}}</p></td>
          <td  scope="col" @click="reset('name')"><p>Chỉnh sữa</p></td>
        </tr>


        <tr class="append" v-else>
          <th colspan="3">
              <div class="wapper-append">
                <div>
                  Tên bệnh viện
                </div>
                <div class="row justify-content-center">
                  <input type="text" placeholder="Tên bệnh viện" style="width:30%;"  v-model="name_hospital">
                     <div class="cancel-btn btn ml-3" @click="cancel()">Hủy</div> 
                  <div class="agree_btn btn ml-3" @click="saveName">Lưu thay đổi</div>
                </div>
              </div>
          </th>
        </tr>

        <tr v-if="isModifyAddress" >
          <th scope="row">Địa chỉ</th>
          <td scope="col"><p>6.9 mm</p></td>
          <td scope="col" @click="reset('address')"><p>Chỉnh sữa</p></td>
        </tr>

        <tr class="append" v-else>
          <th colspan="3">
              <div class="wapper-append">
                <div>
                  Địa chỉ
                </div>
                <div class="row justify-content-center">
                  <input type="text" placeholder="Địa chỉ.. " style="width:30%;"  v-model="address_hospital">
                     <div class="cancel-btn btn ml-3" @click="cancel()">Hủy</div> 
                  <div class="agree_btn btn ml-3" @click="saveAddress">Lưu thay đổi</div>
                </div>
              </div>
          </th>
        </tr>


        <tr v-if="isModifyPhone">
          <th scope="row">Điện thoại</th>
          <td scope="col"><p>1</p></td>
          <td  scope="col" @click="reset('phone')"><p>Chỉnh sữa</p></td>
        </tr>

        <tr class="append" v-else>
          <th colspan="3">
              <div class="wapper-append">
                <div>
                  
                </div>
                <div class="row justify-content-center">
                  <input type="text" placeholder="Điện thoại" style="width:30%;"  v-model="phone_hospital">
                     <div class="cancel-btn btn ml-3" @click="cancel()">Hủy</div> 
                  <div class="agree_btn btn ml-3" @click="savePhone">Lưu thay đổi</div>
                </div>
              </div>
          </th>
        </tr>


        <tr v-if="isModifyEmail">
          <th scope="row">Email</th>
          <td scope="col"><p>1</p></td>
          <td  scope="col"  @click="reset('email')"><p>Chỉnh sữa</p></td>
        </tr>

        <tr class="append" v-else>
          <th colspan="3">
              <div class="wapper-append">
                <div>
                  Email
                </div>
                <div class="row justify-content-center">
                  <input type="text" placeholder="Email" style="width:30%;"  v-model="email">
                     <div class="cancel-btn btn ml-3" @click="cancel()">Hủy</div> 
                  <div class="agree_btn btn ml-3" @click="saveEmail">Lưu thay đổi</div>
                </div>
              </div>
          </th>
        </tr>


        <tr v-if="isModifyPassword">
          <th scope="row">Mật khẩu</th>
          <td scope="col"><p>1</p></td>
          <td  scope="col"  @click="reset('password')"><p>Chỉnh sữa</p></td>
        </tr>


        <tr class="append" v-else>
          <th colspan="3">
              <div class="wapper-append">
                <div>
                  Password
                </div>
                <div class="row justify-content-center">
                  <input type="password" placeholder="password" style="width:30%;"  v-model="password">
                     <div class="cancel-btn btn ml-3" @click="cancel()">Hủy</div> 
                  <div class="agree_btn btn ml-3" @click="savePassword">Lưu thay đổi</div>
                </div>
              </div>
          </th>
        </tr>

      </tbody>
    </table>
  </div>
</section>
  </div>
</template>

<script>
import { mapGetters} from "vuex";
import HospitalService from '@/services/HospitalService'
  export default {
    data() {
      return {
        name_hospital:'',
        phone_hospital:'',
        address_hospital:'',
        email:'',
        password:'',

        isModifyName:true,
        isModifyPhone:true,
        isModifyAddress:true,
        isModifyEmail:true,
        isModifyPassword:true,
        namehospital:''
      }
    },
    computed: {
        ...mapGetters(["isUserLoggedIn","user"])
    },
    async mounted() {
        const id = this.user.id    
        this.namehospital = (await HospitalService.getname(id)).data.name_hospital
      },


    methods: {
      reset(payload){
              switch (payload) {
                case 'name':
                    this.isModifyName = false,
                    this.isModifyPhone = true,
                    this.isModifyAddress = true,
                    this.isModifyEmail = true,
                    this.isModifyPassword = true
                    break;
                case 'phone':
                    this.isModifyPhone = false,
                    this.isModifyName = true,                  
                    this.isModifyAddress = true,
                    this.isModifyEmail = true,
                    this.isModifyPassword = true
                    break;  
                case 'address':
                    this.isModifyAddress = false,
                    this.isModifyName = true,
                    this.isModifyPhone = true,                 
                    this.isModifyEmail = true,
                    this.isModifyPassword = true
                    break;  
                case 'email':
                  this.isModifyEmail = false,
                    this.isModifyName = true,
                    this.isModifyPhone = true,
                    this.isModifyAddress = true,                 
                    this.isModifyPassword = true
                    break;  
                case 'password':
                    this.isModifyPassword = false,
                    this.isModifyName = true,
                    this.isModifyPhone = true,
                    this.isModifyAddress = true,
                    this.isModifyEmail = true         
                    break;              
                default:
                    break;
            }
      },
      cancel(payload){
        this.isModifyName = true,
        this.isModifyPhone = true,
        this.isModifyAddress = true,
        this.isModifyEmail = true,
        this.isModifyPassword = true
      },
      async saveEmail(){},
      savePassword(){},
      saveName(){},
      savePhone(){},
      saveAddress(){},
    },
  }
</script>
<style scoped>

* {
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  font-size: 14px;
}
 
.table__wrapper {
  width: 100%;
}

.table__wrapper .table {
  width: 100%;
  max-width: 100%;
  
}

h1 {
  text-align: center;
}

.center {
  margin: 0 auto;
  width: 80%;
}


.table {
  border: 1px solid #f0f0f0;
  border-collapse: collapse;
}

.table tr {
  border-bottom: 1px solid #f0f0f0;
}

.table thead tr {
  border-bottom: 2px solid #f0f0f0;
}

.table th {
  text-align: left;
}
.table tr td:last-child{
  color:#365899;
  cursor: pointer;
}
.table tr td:last-child:hover{
  text-decoration: underline
}
.append{
    background-color: #f2f2f2;
}
.agree_btn{
    border-radius: 2px;
    background-color:#597ec5;
    border-color: #29487d;
    border: 1px solid #ccd0d5;
    color: #fff;
    cursor: pointer;
}
.cancel-btn{
    border: 1px solid #ccd0d5;
    border-radius: 2px;
    background-color: #f5f6f7;
    cursor: pointer;
}

input{
  padding-left: 0.5rem;
}

</style>
