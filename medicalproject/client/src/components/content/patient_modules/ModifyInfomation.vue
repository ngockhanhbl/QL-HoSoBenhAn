<template>
  <div class="pt-5">
    <section class="center">
  <div class="table__wrapper">
   
    <table class="table" summary="This is a summary of your rad table contents.">
      <thead>
        <tr>
          <th scope="row"></th>
          <th scope="col" class="text-center">Cài đặt tài khoản chung</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody v-if="patientInfomation">
        <tr v-if="isModify_first_name">
          <th scope="row">Họ và tên lót</th>
          <td  scope="col"><p>{{patientInfomation.firstname}}</p></td>
          <td  scope="col" @click="reset('first_name')"><p>Chỉnh sữa</p></td>
        </tr>


        <tr class="append" v-else>
          <th colspan="3">
              <div class="wapper-append">
                <div>
                  Họ và tên lót
                </div>
                <div class="row justify-content-center">
                  <input type="text" placeholder="Họ và tên lót" style="width:30%;"  v-model="first_name">
                     <div class="cancel-btn btn ml-3" @click="cancel()">Hủy</div> 
                  <div class="agree_btn btn ml-3" @click="saveFirstName">Lưu thay đổi</div>
                </div>
              </div>
          </th>
        </tr>

        <tr v-if="isModify_last_name" >
          <th scope="row">Tên</th>
          <td scope="col"><p>{{patientInfomation.lastname}}</p></td>
          <td scope="col" @click="reset('last_name')"><p>Chỉnh sữa</p></td>
        </tr>

        <tr class="append" v-else>
          <th colspan="3">
              <div class="wapper-append">
                <div>
                  Tên
                </div>
                <div class="row justify-content-center">
                  <input type="text" placeholder="Tên.. " style="width:30%;"  v-model="last_name">
                     <div class="cancel-btn btn ml-3" @click="cancel()">Hủy</div>
                  <div class="agree_btn btn ml-3" @click="saveLastName">Lưu thay đổi</div>
                </div>
              </div>
          </th>
        </tr>


        <tr v-if="isModify_sex">
          <th scope="row">Giới tính</th>
          <td scope="col"><p>{{patientInfomation.sex}}</p></td>
          <td  scope="col" @click="reset('sex')"><p>Chỉnh sữa</p></td>
        </tr>

        <tr class="append" v-else>
          <th colspan="3">
              <div class="wapper-append">
                <div>
                  Giới tính
                </div>
                <div class="row justify-content-center  align-items-baseline">
                    <div class="pr-2">
                      <input type="radio" name="gender" value="nam" v-model="sex">
                      <span>&ensp;Nam</span>
                    </div>
                    <div>
                      <input type="radio" name="gender" value="nu" v-model="sex">
                      <span>&ensp;  Nữ</span>
                    </div>
                    <div class="cancel-btn btn ml-3" @click="cancel()">Hủy</div> 
                    <div class="agree_btn btn ml-3" @click="saveSex">Lưu thay đổi</div>
                </div>
              </div>
          </th>
        </tr>

        <tr v-if="isModify_phone">
          <th scope="row">Số điện thoại</th>
          <td scope="col"><p>{{patientInfomation.phone}}</p></td>
          <td  scope="col" @click="reset('phone')"><p>Chỉnh sữa</p></td>
        </tr>

        <tr class="append" v-else>
          <th colspan="3">
              <div class="wapper-append">
                <div>
                  Số điện thoại
                </div>
                <div class="row justify-content-center">
                  <input type="number" placeholder="Điện thoại" style="width:30%;"  v-model="phone">
                     <div class="cancel-btn btn ml-3" @click="cancel()">Hủy</div> 
                  <div class="agree_btn btn ml-3" @click="savePhone">Lưu thay đổi</div>
                </div>
              </div>
          </th>
        </tr>
        <tr v-if="isModify_address">
          <th scope="row">Địa chỉ</th>
          <td scope="col"><p>{{patientInfomation.address}}</p></td>
          <td  scope="col" @click="reset('address')"><p>Chỉnh sữa</p></td>
        </tr>

        <tr class="append" v-else>
          <th colspan="3">
              <div class="wapper-append">
                <div>
                  Địa chỉ
                </div>
                <div class="row justify-content-center">
                  <input type="text" placeholder="Địa chỉ" style="width:30%;"  v-model="address">
                     <div class="cancel-btn btn ml-3" @click="cancel()">Hủy</div> 
                  <div class="agree_btn btn ml-3" @click="saveAddress">Lưu thay đổi</div>
                </div>
              </div>
          </th>
        </tr>

        <tr v-if="isModify_right">
          <th scope="row">Quyền truy cập</th>
          <td scope="col"><p>{{patientInfomation.right}}</p></td>
          <td  scope="col" @click="reset('right')"><p>Chỉnh sữa</p></td>
        </tr>

        <tr class="append" v-else>
          <th colspan="3">
              <div class="wapper-append">
                <div>
                  Quyền truy cập
                </div>
                <div class="row justify-content-center">
                  <input type="text" placeholder="Thay đổi quyền sang công khai:bỏ trống => save" style="width:30%;"  v-model="right">
                     <div class="cancel-btn btn ml-3" @click="cancel()">Hủy</div> 
                  <div class="agree_btn btn ml-3" @click="saveRight">Lưu thay đổi</div>
                </div>
              </div>
          </th>
        </tr>

        <tr v-if="isModify_day">
          <th scope="row">Ngày sinh</th>
          <td scope="col"><p>{{patientInfomation.day}}</p></td>
          <td  scope="col" @click="reset('day')"><p>Chỉnh sữa</p></td>
        </tr>

        <tr class="append" v-else>
          <th colspan="3">
              <div class="wapper-append">
                <div>
                  Ngày sinh
                </div>
                <div class="row justify-content-center">
                  <input type="number" min="1" max="31" placeholder="Ngày sinh" style="width:30%;"  v-model="day">
                     <div class="cancel-btn btn ml-3" @click="cancel()">Hủy</div> 
                  <div class="agree_btn btn ml-3" @click="saveDay">Lưu thay đổi</div>
                </div>
              </div>
          </th>
        </tr>
        <tr v-if="isModify_month">
          <th scope="row">Tháng sinh</th>
          <td scope="col"><p>{{patientInfomation.month}}</p></td>
          <td  scope="col" @click="reset('month')"><p>Chỉnh sữa</p></td>
        </tr>

        <tr class="append" v-else>
          <th colspan="3">
              <div class="wapper-append">
                <div>
                  Tháng sinh
                </div>
                <div class="row justify-content-center">
                  <input type="number" min="1" max="12" placeholder="Tháng sinh" style="width:30%;"  v-model="month">
                     <div class="cancel-btn btn ml-3" @click="cancel()">Hủy</div> 
                  <div class="agree_btn btn ml-3" @click="saveMonth">Lưu thay đổi</div>
                </div>
              </div>
          </th>
        </tr>

        <tr v-if="isModify_year">
          <th scope="row">Năm sinh</th>
          <td scope="col"><p>{{patientInfomation.year}}</p></td>
          <td  scope="col" @click="reset('year')"><p>Chỉnh sữa</p></td>
        </tr>

        <tr class="append" v-else>
          <th colspan="3">
              <div class="wapper-append">
                <div>
                  Năm sinh
                </div>
                <div class="row justify-content-center">
                  <input type="number" max="2019" placeholder="Năm sinh" style="width:30%;"  v-model="year">
                     <div class="cancel-btn btn ml-3" @click="cancel()">Hủy</div> 
                  <div class="agree_btn btn ml-3" @click="saveYear">Lưu thay đổi</div>
                </div>
              </div>
          </th>
        </tr>

        <tr v-if="isModify_email">
          <th scope="row">Email</th>
          <td scope="col"><p>{{this.user.email}}</p></td>
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


        <tr v-if="isModify_password">
          <th scope="row">Mật khẩu</th>
          <td scope="col"><p></p></td>
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
import PatientService from '@/services/PatientService'
  export default {
    data() {
      return {
        first_name:'',
        last_name:'',
        phone:'',
        address:'',
        email:'',
        password:'',
        sex:'',
        right:'',
        day:null,
        month:null,
        year:null,
        patientInfomation:null,
        user:null,

        isModify_first_name:true,
        isModify_last_name:true,
        isModify_phone:true,
        isModify_address:true,
        isModify_email:true,
        isModify_password:true,
        isModify_sex:true,
        isModify_right:true,
        isModify_day:true,
        isModify_month:true,
        isModify_year:true,
      }
    },
    computed: {
        ...mapGetters(["isUserLoggedIn"])
    },
    async mounted() {
      const userCONST = JSON.parse(localStorage.getItem('user'));
      this.user = userCONST

      const userID = JSON.parse(localStorage.getItem('user')).id;

      if(this.user){
        this.patientInfomation = (await PatientService.getInfoPatient(userID)).data
      }
    },
    methods: {
      reset(payload){
              switch (payload) {
                case 'first_name':
                    this.isModify_first_name = false,
                    this.isModify_last_name = true,
                    this.isModify_phone = true,
                    this.isModify_address = true,
                    this.isModify_email = true,
                    this.isModify_password = true,
                    this.isModify_sex = true,
                    this.isModify_right = true,
                    this.isModify_day = true,
                    this.isModify_month = true,
                    this.isModify_year = true
                    break;
                case 'last_name':
                    this.isModify_first_name = true,
                    this.isModify_last_name = false,
                    this.isModify_phone = true,
                    this.isModify_address = true,
                    this.isModify_email = true,
                    this.isModify_password = true,
                    this.isModify_sex = true,
                    this.isModify_right = true,
                    this.isModify_day = true,
                    this.isModify_month = true,
                    this.isModify_year = true
                    break;
                case 'phone':
                    this.isModify_first_name = true,
                    this.isModify_last_name = true,
                    this.isModify_phone = false,
                    this.isModify_address = true,
                    this.isModify_email = true,
                    this.isModify_password = true,
                    this.isModify_sex = true,
                    this.isModify_right = true,
                    this.isModify_day = true,
                    this.isModify_month = true,
                    this.isModify_year = true
                case 'address':
                    this.isModify_first_name = true,
                    this.isModify_last_name = true,
                    this.isModify_phone = true,
                    this.isModify_address = false,
                    this.isModify_email = true,
                    this.isModify_password = true,
                    this.isModify_sex = true,
                    this.isModify_right = true,
                    this.isModify_day = true,
                    this.isModify_month = true,
                    this.isModify_year = true
                    break;  
                case 'email':
                    this.isModify_first_name = true,
                    this.isModify_last_name = true,
                    this.isModify_phone = true,
                    this.isModify_address = true,
                    this.isModify_email = false,
                    this.isModify_password = true,
                    this.isModify_sex = true,
                    this.isModify_right = true,
                    this.isModify_day = true,
                    this.isModify_month = true,
                    this.isModify_year = true
                    break;  
                case 'password':
                    this.isModify_first_name = true,
                    this.isModify_last_name = true,
                    this.isModify_phone = true,
                    this.isModify_address = true,
                    this.isModify_email = true,
                    this.isModify_password = false,
                    this.isModify_sex = true,
                    this.isModify_right = true,
                    this.isModify_day = true,
                    this.isModify_month = true,
                    this.isModify_year = true
                    break;
                case 'sex':
                    this.isModify_first_name = true,
                    this.isModify_last_name = true,
                    this.isModify_phone = true,
                    this.isModify_address = true,
                    this.isModify_email = true,
                    this.isModify_password = true,
                    this.isModify_sex = false,
                    this.isModify_right = true,
                    this.isModify_day = true,
                    this.isModify_month = true,
                    this.isModify_year = true
                    break; 
                case 'right':
                    this.isModify_first_name = true,
                    this.isModify_last_name = true,
                    this.isModify_phone = true,
                    this.isModify_address = true,
                    this.isModify_email = true,
                    this.isModify_password = true,
                    this.isModify_sex = true,
                    this.isModify_right = false,
                    this.isModify_day = true,
                    this.isModify_month = true,
                    this.isModify_year = true
                    break; 
                case 'day':
                    this.isModify_first_name = true,
                    this.isModify_last_name = true,
                    this.isModify_phone = true,
                    this.isModify_address = true,
                    this.isModify_email = true,
                    this.isModify_password = true,
                    this.isModify_sex = true,
                    this.isModify_right = true,
                    this.isModify_day = false,
                    this.isModify_month = true,
                    this.isModify_year = true
                    break; 
                case 'month':
                    this.isModify_first_name = true,
                    this.isModify_last_name = true,
                    this.isModify_phone = true,
                    this.isModify_address = true,
                    this.isModify_email = true,
                    this.isModify_password = true,
                    this.isModify_sex = true,
                    this.isModify_right = true,
                    this.isModify_day = true,
                    this.isModify_month = false,
                    this.isModify_year = true
                    break; 
                case 'year':
                    this.isModify_first_name = true,
                    this.isModify_last_name = true,
                    this.isModify_phone = true,
                    this.isModify_address = true,
                    this.isModify_email = true,
                    this.isModify_password = true,
                    this.isModify_sex = true,
                    this.isModify_right = true,
                    this.isModify_day = true,
                    this.isModify_month = true,
                    this.isModify_year = false
                    break;  
                default:
                    break;
            }
      },
      cancel(payload){
          this.isModify_first_name = true,
          this.isModify_last_name = true,
          this.isModify_phone = true,
          this.isModify_address = true,
          this.isModify_email = true,
          this.isModify_password = true,
          this.isModify_sex = true,
          this.isModify_right = true,
          this.isModify_day = true,
          this.isModify_month = true,
          this.isModify_year = true
      },
      async savePassword(){
        if(this.password){
            try {
                await PatientService.updatePasswordPatient({
                  id_account:this.user.id,
                  password:this.password
                })
                let toast = this.$toasted.show(`Update Thành công !!`, { 
                    theme: "bubble", 
                    position: "bottom-right", 
                    duration : 3000
                });
                this.isModify_password = false
                this.password = ''
            }catch (error) {
                this.$toasted.show(`${error.response.data.error}`, { 
                    theme: "toasted-primary", 
                    position: "bottom-center", 
                    duration : 5000
                });
                }  
        }else{
            this.$toasted.show(`Vui lòng nhập Password bạn muốn thay đổi !!`, { 
                theme: "toasted-primary", 
                position: "bottom-center", 
                duration : 3000
            });
        }
      },
      async saveEmail(){
        if(this.email){
            try {
                await PatientService.updateEmailPatient({
                  id_account:this.user.id,
                  email:this.email
                })
                this.$toasted.show(`Update Thành công !!`, { 
                    theme: "bubble", 
                    position: "bottom-right", 
                    duration : 3000
                });
                this.isModify_email = false
                this.patientInfomation.email = this.email
                this.email = ''
            }catch (error) {
                let toast = this.$toasted.show(`${error.response.data.error}`, { 
                    theme: "toasted-primary", 
                    position: "bottom-center", 
                    duration : 5000
                });
                }  
        }else{
            this.$toasted.show(`Vui lòng nhập email bạn muốn thay đổi !!`, { 
                theme: "toasted-primary", 
                position: "bottom-center", 
                duration : 3000
            });

        }
      },
      async saveFirstName(){
        if(this.first_name){
            try {
                await PatientService.updateFirstNamePatient({
                  id_account:this.user.id,
                  first_name:this.first_name
                })
                this.$toasted.show(`Update Thành công !!`, { 
                    theme: "bubble", 
                    position: "bottom-right", 
                    duration : 3000
                });
                this.isModify_first_name = false
                this.patientInfomation.firstname = this.first_name
                this.first_name = ''
            }catch (error) {
                this.$toasted.show(`${error.response.data.error}`, { 
                    theme: "toasted-primary", 
                    position: "bottom-center", 
                    duration : 5000
                });
                }  
        }else{
            this.$toasted.show(`Vui lòng nhập họ và tên lót bạn muốn thay đổi !!`, { 
                theme: "toasted-primary", 
                position: "bottom-center", 
                duration : 3000
            });

        }
      },
      async saveLastName(){
        if(this.last_name){
            try {
                await PatientService.updateLastNamePatient({
                  id_account:this.user.id,
                  last_name:this.last_name
                })
                let toast = this.$toasted.show(`Update Thành công !!`, { 
                    theme: "bubble", 
                    position: "bottom-right", 
                    duration : 3000
                });
                this.isModify_last_name = false
                this.patientInfomation.lastname = this.last_name
                this.last_name = ''
            }catch (error) {
                let toast = this.$toasted.show(`${error.response.data.error}`, { 
                    theme: "toasted-primary", 
                    position: "bottom-center", 
                    duration : 5000
                });
                }  
        }else{
            let toast = this.$toasted.show(`Vui lòng nhập tên bạn muốn thay đổi !!`, { 
                theme: "toasted-primary", 
                position: "bottom-center", 
                duration : 3000
            });

        }
      },
      async saveSex(){
        if(this.sex){
            try {
                await PatientService.updateSexPatient({
                  id_account:this.user.id,
                  sex:this.sex
                })
                let toast = this.$toasted.show(`Update Thành công !!`, { 
                    theme: "bubble", 
                    position: "bottom-right", 
                    duration : 3000
                });
                this.isModify_sex = false
                this.patientInfomation.sex = this.sex
                this.sex = ''
            }catch (error) {
                let toast = this.$toasted.show(`${error.response.data.error}`, { 
                    theme: "toasted-primary", 
                    position: "bottom-center", 
                    duration : 5000
                });
                }  
        }else{
            let toast = this.$toasted.show(`Vui lòng chọn giới tính bạn muốn thay đổi !!`, { 
                theme: "toasted-primary", 
                position: "bottom-center", 
                duration : 3000
            });
        }
      },
      async saveRight(){
            try {
                await PatientService.updateRightPatient({
                  id_account:this.user.id,
                  right:this.right
                })
                let toast = this.$toasted.show(`Update Thành công !!`, { 
                    theme: "bubble", 
                    position: "bottom-right", 
                    duration : 3000
                });
                this.isModify_right = false
                this.patientInfomation.right = this.right
                this.right = ''
            }catch (error) {
                let toast = this.$toasted.show(`${error.response.data.error}`, { 
                    theme: "toasted-primary", 
                    position: "bottom-center", 
                    duration : 5000
                });
                }  

      },
      async savePhone(){
        if(this.phone){
            try {
                await PatientService.updatePhonePatient({
                  id_account:this.user.id,
                  phone:this.phone
                })
                let toast = this.$toasted.show(`Update Thành công !!`, { 
                    theme: "bubble", 
                    position: "bottom-right", 
                    duration : 3000
                });
                this.isModify_phone = false
                this.patientInfomation.phone = this.phone
                this.phone = ''
            }catch (error) {
                this.$toasted.show(`${error.response.data.error}`, { 
                    theme: "toasted-primary", 
                    position: "bottom-center", 
                    duration : 5000
                });
                }  
        }else{
            this.$toasted.show(`Vui nhập SDT bạn muốn thay đổi !!`, { 
                theme: "toasted-primary", 
                position: "bottom-center", 
                duration : 3000
            });
        }
      },
      async saveAddress(){
        if(this.address){
            try {
                await PatientService.updateAddressPatient({
                  id_account:this.user.id,
                  address:this.address
                })
                this.$toasted.show(`Update Thành công !!`, { 
                    theme: "bubble", 
                    position: "bottom-right", 
                    duration : 3000
                });
                this.isModify_address = false
                this.patientInfomation.address = this.address
                this.address = ''
            }catch (error) {
                this.$toasted.show(`${error.response.data.error}`, { 
                    theme: "toasted-primary", 
                    position: "bottom-center", 
                    duration : 5000
                });
                }  
        }else{
            this.$toasted.show(`Vui nhập Địa chỉ bạn muốn thay đổi !!`, { 
                theme: "toasted-primary", 
                position: "bottom-center", 
                duration : 3000
            });
        }
      },
      async saveDay(){
        if(this.day){
            try {
                await PatientService.updateDayPatient({
                  id_account:this.user.id,
                  day:this.day
                })
                this.$toasted.show(`Update Thành công !!`, { 
                    theme: "bubble", 
                    position: "bottom-right", 
                    duration : 3000
                });
                this.isModify_day = false
                this.patientInfomation.day = this.day
                this.day = ''
            }catch (error) {
                this.$toasted.show(`${error.response.data.error}`, { 
                    theme: "toasted-primary", 
                    position: "bottom-center", 
                    duration : 5000
                });
                }  
        }else{
            this.$toasted.show(`Vui chọn ngày bạn muốn thay đổi !!`, { 
                theme: "toasted-primary", 
                position: "bottom-center", 
                duration : 3000
            });
        }
      },
      async saveMonth(){
        if(this.month){
            try {
                await PatientService.updateMonthPatient({
                  id_account:this.user.id,
                  month:this.month
                })
                this.$toasted.show(`Update Thành công !!`, { 
                    theme: "bubble", 
                    position: "bottom-right", 
                    duration : 3000
                });
                this.isModify_month = false
                this.patientInfomation.month = this.month
                this.month = ''
            }catch (error) {
                this.$toasted.show(`${error.response.data.error}`, { 
                    theme: "toasted-primary", 
                    position: "bottom-center", 
                    duration : 5000
                });
                }  
        }else{
            this.$toasted.show(`Vui chọn tháng bạn muốn thay đổi !!`, { 
                theme: "toasted-primary", 
                position: "bottom-center", 
                duration : 3000
            });
        }
      },
      async saveYear(){
        if(this.year){
            try {
                await PatientService.updateYearPatient({
                  id_account:this.user.id,
                  year:this.year
                })
                this.$toasted.show(`Update Thành công !!`, { 
                    theme: "bubble", 
                    position: "bottom-right", 
                    duration : 3000
                });
                this.isModify_year = false
                this.patientInfomation.year = this.year
                this.year = ''
            }catch (error) {
                this.$toasted.show(`${error.response.data.error}`, { 
                    theme: "toasted-primary", 
                    position: "bottom-center", 
                    duration : 5000
                });
                }  
        }else{
            this.$toasted.show(`Vui chọn năm bạn muốn thay đổi !!`, { 
                theme: "toasted-primary", 
                position: "bottom-center", 
                duration : 3000
            });
        }
      },
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
