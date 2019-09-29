<template>
    <div class="pt-5 bg pb-3 bg" 
    :style="{
        'background-image':
          'url(' + require('@/assets/images/wood.jpg') + ') '
      }">
            <div class="main_register m-auto ">
              <div class="d-flex pr-5 pt-4 ">
                <div class="mr-auto pl-5 pt-3">Xin Chào</div>
                <!-- <div class="p-2">
                   <button type="button" class="btn btn-warning text-white mr-3" @click="changeInfo">Thay đổi thông tin</button>
                </div> -->
                <div class="p-2">
                   <button type="button" class="btn btn-success text-white" @click="addDoctor">Thêm Bác Sĩ</button>
                </div>
              </div>
                  <b-row class="px-5">
                    <b-col md="6" class="my-3">
                      <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
                        <b-input-group>
                          <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
                          <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </b-form-group>
                    </b-col>

                    <b-col md="6" class="my-3">
                      <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
                        <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                      </b-form-group>
                    </b-col>
                  </b-row>
                <div class="register">
                    <div class="p_1r mlr_1-5r" >
                      <b-table
                        show-empty
                        bordered
                        striped
                        stacked="md"
                        :items="doctors"
                        :fields="fields"
                        :current-page="currentPage"
                        :per-page="perPage"
                        :filter="filter"
                      
                        @filtered="onFiltered"
                      >
                        <template slot="name" slot-scope="row">
                          {{ row.item.firstname }} {{ row.item.lastname }}
                        </template>

                        <template slot="age" slot-scope="row">
                          {{new Date().getFullYear() - row.item.year }}
                        </template>

                        <template slot="actions" slot-scope="row" class="d-flex justify-content-start">
                          <b-button size="sm" @click="row.toggleDetails" class="text-white">
                            {{ row.detailsShowing ? 'Ẩn' : 'Xem' }} Chi Tiết
                          </b-button>
                          <b-button size="sm" @click="changeInfo(row.item, row.index, $event.target)" class="ml-4 mr-4 btn-info text-white">
                            Sửa Thông tin
                          </b-button>                       
                          <b-button size="sm" @click="deleteDoctor(row.item, row.index, $event.target)" class="btn-danger text-white ">
                            Xóa Thông tin
                          </b-button>
                        </template>


                        <template slot="row-details" slot-scope="row">
                          <b-card>
                            <b-row class="mb-2">
                              <b-col sm="3" class="text-sm-right"><b>Họ và Tên:</b></b-col>
                              <b-col>{{ row.item.firstname }} {{ row.item.lastname }}</b-col>
                            </b-row>

                            <b-row class="mb-2">
                              <b-col sm="3" class="text-sm-right"><b>Ngày sinh(mm/dd/yyyy):</b></b-col>
                              <b-col>{{ row.item.month }} / {{ row.item.day }} / {{ row.item.year }}</b-col>
                            </b-row>
                            <b-row class="mb-2">
                              <b-col sm="3" class="text-sm-right"><b>Giới tính:</b></b-col>
                              <b-col>{{ row.item.sex }}</b-col>
                            </b-row>
                            <b-row class="mb-2">
                              <b-col sm="3" class="text-sm-right"><b>Phòng ban:</b></b-col>
                              <b-col>{{ row.item.department }}</b-col>
                            </b-row>
                            <b-row class="mb-2">
                              <b-col sm="3" class="text-sm-right"><b>Chuyên môn:</b></b-col>
                              <b-col>{{ row.item.specialize }}</b-col>
                            </b-row>
                            <b-row class="mb-2">
                              <b-col sm="3" class="text-sm-right"><b>Số điện thoại:</b></b-col>
                              <b-col>{{ row.item.phone }}</b-col>
                            </b-row>

                            <b-row class="mb-2">
                              <b-col sm="3" class="text-sm-right"><b>Địa chỉ:</b></b-col>
                              <b-col>{{ row.item.address }}</b-col>
                            </b-row>
                            

                            <b-row class="mb-2">
                              <b-col sm="3" class="text-sm-right"><b>CMND:</b></b-col>
                              <b-col>{{ row.item.cmnd }}</b-col>
                            </b-row>

                            <b-button size="sm" @click="row.toggleDetails" class="btn-warning">Ẩn Chi Tiết</b-button>
                          </b-card>
                        </template>
                      </b-table>

                      <b-row>
                        <b-col md="6" class="my-1">
                          <b-pagination
                            v-model="currentPage"
                            :total-rows="totalRows"
                            :per-page="perPage"
                            class="my-0"
                          ></b-pagination>
                        </b-col>
                      </b-row>

                      <!-- Info modal -->
                      <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
                        <pre>{{ infoModal.content }}</pre>
                        <div class="row model_wrapper" v-if="!isModifyFirstName " @click="isModifyFirstName = true ">
                            <div class="col-sm-3 p-2 model_title"><strong>Họ và tên lót</strong></div>
                            <div class="col-sm-6 p-2">
                              {{infoModal.firstname_doctor}}
                            </div>
                            <div class="col-sm-3 p-2 modify-btn">Chỉnh sửa</div>
                        </div>
                        
                        <div class="row model_wrapper" v-else >
                            <div class="col-sm-3 p-2 model_title"><strong>Họ và tên lót </strong></div>
                            <div class="col-sm-9 p-2">
                              <input type="text" placeholder="Họ và tên lót" style="width:90%;"  v-model="firstname_modify">
                            </div>
                            <div class="col-sm-12 d-flex justify-content-end text-center mb-3">
                              <button type="button" class="btn orange-btn btn-sm mr-3" @click="SendRequestModifyInfomation(infoModal.id_account,'firstname')">Thay đổi</button>
                              <button type="button" class="btn btn-outline-secondary mr-4 btn-sm " @click="cancelModify('firstname')">Hủy</button>
                            </div>
                        </div>


                        <div class="row model_wrapper" v-if="!isModifyLastName " @click="isModifyLastName = true ">
                            <div class="col-sm-3 p-2 model_title"><strong>Tên</strong></div>
                            <div class="col-sm-6 p-2" >
                              {{infoModal.lastname_doctor}}
                            </div>
                            <div class="col-sm-3 p-2 modify-btn">Chỉnh sửa</div>
                        </div>
                        
                        <div class="row model_wrapper" v-else >
                            <div class="col-sm-3 p-2 model_title"><strong>Tên bác sĩ</strong></div>
                            <div class="col-sm-9 p-2">
                              <input type="text" placeholder="Tên bác sĩ" style="width:90%;"  v-model="lastname_modify">
                            </div>
                            <div class="col-sm-12 d-flex justify-content-end text-center mb-3">
                              <button type="button" class="btn orange-btn btn-sm mr-3" @click="SendRequestModifyInfomation(infoModal.id_account,'lastname')">Thay đổi</button>
                              <button type="button" class="btn btn-outline-secondary mr-4 btn-sm " @click="cancelModify('lastname')">Hủy</button>
                            </div>
                        </div>


                        <div class="row model_wrapper" v-if="!isModifyAddress " @click="isModifyAddress = true ">
                            <div class="col-sm-3 p-2 model_title"><strong>Địa chỉ</strong></div>
                            <div class="col-sm-6 p-2">
                              {{infoModal.address_doctor}}
                            </div>
                            <div class="col-sm-3 p-2 modify-btn">Chỉnh sửa</div>
                        </div>
                        
                        <div class="row model_wrapper" v-else >
                            <div class="col-sm-3 p-2 model_title"><strong>Địa chỉ</strong></div>
                            <div class="col-sm-9 p-2">
                              <input type="text" placeholder="12 Tân hưng, etc.." style="width:90%;"  v-model="address_modify">
                            </div>
                            <div class="col-sm-12 d-flex justify-content-end text-center mb-3">
                              <button type="button" class="btn orange-btn btn-sm mr-3" @click="SendRequestModifyInfomation(infoModal.id_account,'address')">Thay đổi</button>
                              <button type="button" class="btn btn-outline-secondary mr-4 btn-sm " @click="cancelModify('address')">Hủy</button>
                            </div>
                        </div>

                        <div class="row model_wrapper" v-if="!isModifyEmail" @click="isModifyEmail = true ">
                            <div class="col-sm-3 p-2 model_title"><strong>Email</strong></div>
                            <div class="col-sm-6 p-2">
                              {{infoModal.email_doctor}}
                            </div>
                            <div class="col-sm-3 p-2 modify-btn">Chỉnh sửa</div>
                        </div>
                        
                        <div class="row model_wrapper" v-else >
                            <div class="col-sm-3 p-2 model_title"><strong>Email</strong></div>
                            <div class="col-sm-9 p-2">
                              <input type="text" placeholder="nguyenvana@gmail.com" style="width:90%;"  v-model="email_modify">
                            </div>
                            <div class="col-sm-12 d-flex justify-content-end text-center mb-3">
                              <button type="button" class="btn orange-btn btn-sm mr-3" @click="SendRequestModifyInfomation(infoModal.id_account,'email')">Thay đổi</button>
                              <button type="button" class="btn btn-outline-secondary mr-4 btn-sm " @click="cancelModify('email')">Hủy</button>
                            </div>
                        </div>

                        <div class="row model_wrapper" v-if="!isModifyPassword" @click="isModifyPassword = true ">
                            <div class="col-sm-3 p-2 model_title"><strong>Password</strong></div>
                            <div class="col-sm-6 p-2">
                              {{infoModal.password_doctor}}
                            </div>
                            <div class="col-sm-3 p-2 modify-btn">Chỉnh sửa</div>
                        </div>
                        
                        <div class="row model_wrapper" v-else >
                            <div class="col-sm-3 p-2 model_title"><strong>Password</strong></div>
                            <div class="col-sm-9 p-2">
                              <input type="text" style="width:90%;"  v-model="password_modify">
                            </div>
                            <div class="col-sm-12 d-flex justify-content-end text-center mb-3">
                              <button type="button" class="btn orange-btn btn-sm mr-3" @click="SendRequestModifyInfomation(infoModal.id_account,'password')">Thay đổi</button>
                              <button type="button" class="btn btn-outline-secondary mr-4 btn-sm " @click="cancelModify('password')">Hủy</button>
                            </div>
                        </div>

                        <div class="row model_wrapper" v-if="!isModifyDepartment" @click="isModifyDepartment = true ">
                            <div class="col-sm-3 p-2 model_title"><strong>Phòng ban</strong></div>
                            <div class="col-sm-6 p-2">
                              {{infoModal.department}}
                            </div>
                            <div class="col-sm-3 p-2 modify-btn">Chỉnh sửa</div>
                        </div>
                        
                        <div class="row model_wrapper" v-else >
                            <div class="col-sm-3 p-2 model_title"><strong>Phòng ban</strong></div>
                            <div class="col-sm-9 p-2">
                              <input type="text" style="width:90%;" v-model="department_modify">
                            </div>
                            <div class="col-sm-12 d-flex justify-content-end text-center mb-3">
                              <button type="button" class="btn orange-btn btn-sm mr-3" @click="SendRequestModifyInfomation(infoModal.id_account,'department')">Thay đổi</button>
                              <button type="button" class="btn btn-outline-secondary mr-4 btn-sm " @click="cancelModify('department')">Hủy</button>
                            </div>
                        </div>


                        <div class="row model_wrapper" v-if="!isModifySpecialize" @click="isModifySpecialize = true ">
                            <div class="col-sm-3 p-2 model_title"><strong>Chuyên Môn</strong></div>
                            <div class="col-sm-6 p-2">
                              {{infoModal.specialize}}
                            </div>
                            <div class="col-sm-3 p-2 modify-btn">Chỉnh sửa</div>
                        </div>
                        
                        <div class="row model_wrapper" v-else >
                            <div class="col-sm-3 p-2 model_title"><strong>Chuyên môn</strong></div>
                            <div class="col-sm-9 p-2">
                              <input type="text" style="width:90%;"  v-model="specialize_modify">
                            </div>
                            <div class="col-sm-12 d-flex justify-content-end text-center mb-3">
                              <button type="button" class="btn orange-btn btn-sm mr-3" @click="SendRequestModifyInfomation(infoModal.id_account,'specialize')">Thay đổi</button>
                              <button type="button" class="btn btn-outline-secondary mr-4 btn-sm " @click="cancelModify('specialize')">Hủy</button>
                            </div>
                        </div>

                        <div class="row model_wrapper" v-if="!isModifyCmnd" @click="isModifyCmnd = true ">
                            <div class="col-sm-3 p-2 model_title"><strong>Chứng minh nhân dân</strong></div>
                            <div class="col-sm-6 p-2">
                              {{infoModal.cmnd_doctor}}
                            </div>
                            <div class="col-sm-3 p-2 modify-btn">Chỉnh sửa</div>
                        </div>
                        
                        <div class="row model_wrapper" v-else >
                            <div class="col-sm-3 p-2 model_title"><strong>Chứng minh nhân dân</strong></div>
                            <div class="col-sm-9 p-2">
                              <input type="text" style="width:90%;"  v-model="cmnd_modify">
                            </div>
                            <div class="col-sm-12 d-flex justify-content-end text-center mb-3">
                              <button type="button" class="btn orange-btn btn-sm mr-3" @click="SendRequestModifyInfomation(infoModal.id_account,'cmnd')">Thay đổi</button>
                              <button type="button" class="btn btn-outline-secondary mr-4 btn-sm " @click="cancelModify('cmnd')">Hủy</button>
                            </div>
                        </div>

                        <div class="row model_wrapper" v-if="!isModifyPhone" @click="isModifyPhone = true ">
                            <div class="col-sm-3 p-2 model_title"><strong>SDT</strong></div>
                            <div class="col-sm-6 p-2">
                              {{infoModal.phone_doctor}}
                            </div>
                            <div class="col-sm-3 p-2 modify-btn">Chỉnh sửa</div>
                        </div>
                        
                        <div class="row model_wrapper" v-else >
                            <div class="col-sm-3 p-2 model_title"><strong>SDT</strong></div>
                            <div class="col-sm-9 p-2">
                              <input type="text" style="width:90%;"  v-model="phone_modify">
                            </div>
                            <div class="col-sm-12 d-flex justify-content-end text-center mb-3">
                              <button type="button" class="btn orange-btn btn-sm mr-3" @click="SendRequestModifyInfomation(infoModal.id_account,'phone')">Thay đổi</button>
                              <button type="button" class="btn btn-outline-secondary mr-4 btn-sm " @click="cancelModify('phone')">Hủy</button>
                            </div>
                        </div>


                        <div class="row model_wrapper" v-if="!isModifySex" @click="isModifySex = true ">
                            <div class="col-sm-3 p-2 model_title"><strong>Giới tính</strong></div>
                            <div class="col-sm-6 p-2">
                              {{infoModal.sex_doctor}} 
                            </div>
                            <div class="col-sm-3 p-2 modify-btn">Chỉnh sửa</div>
                        </div>
                        
                        <div class="row model_wrapper" v-else >
                            <div class="col-sm-3 p-2 model_title"><strong>Giới tính</strong></div>
                            <div class="col-sm-9 p-2">
                              <input type="radio" name="gender" value="nam" v-model="sex_modify"> Nam&ensp; 
                              <input type="radio" name="gender" value="nu" v-model="sex_modify"> Nữ
                            </div>
                            <div class="col-sm-12 d-flex justify-content-end text-center mb-3">
                              <button type="button" class="btn orange-btn btn-sm mr-3" @click="SendRequestModifyInfomation(infoModal.id_account,'sex')">Thay đổi</button>
                              <button type="button" class="btn btn-outline-secondary mr-4 btn-sm " @click="cancelModify('sex')">Hủy</button>
                            </div>
                        </div>


                        <div class="row model_wrapper" v-if="!isModifyBirthday" @click="isModifyBirthday = true ">
                            <div class="col-sm-3 p-2 model_title"><strong>Sinh Nhật</strong></div>
                            <div class="col-sm-6 p-2">
                              {{infoModal.birthday}}
                            </div>
                            <div class="col-sm-3 p-2 modify-btn">Chỉnh sửa</div>
                        </div>
                        
                        <div class="row model_wrapper" v-else >
                            <div class="col-sm-3 p-2 model_title"><strong>Sinh nhật</strong></div>
                            <div class="col-sm-9 p-2">
                              <b-form-input :id="`type-date`" type="date" v-model="birthday_modify"></b-form-input>
                            </div>
                            <div class="col-sm-12 d-flex justify-content-end text-center mb-3">
                              <button type="button" class="btn orange-btn btn-sm mr-3" @click="SendRequestModifyInfomation(infoModal.id_account,'birthday')">Thay đổi</button>
                              <button type="button" class="btn btn-outline-secondary mr-4 btn-sm " @click="cancelModify('birthday')">Hủy</button>
                            </div>
                        </div>
                        


                      </b-modal>
                </div>
            </div>  
    </div>
    </div>
</template>
<script>
import { mapGetters} from "vuex";
import HospitalService from '@/services/HospitalService'
import AccountService from '@/services/AccountService'
  export default {
    data() {
      return {
        get isUserLoggedIn() {
          return localStorage.getItem('isUserLoggedIn' || false);
        },
        doctors:[],
        fields: [
          { key: 'name', label: 'Họ và Tên', sortable: true, sortDirection: 'desc' },
          {key: 'age', label: 'Tuổi', sortable: true, class: 'text-center'},
          { key: 'id_account', label: 'ID', sortable: true, sortDirection: 'desc', class: 'text-center' },
          { key: 'department', label: 'Phòng ban', sortable: true },
          { key: 'specialize', label: 'Chuyên môn', sortable: true },
          { key: 'email', label: 'Email', formatter: 'GetFieldsemail',sortable: true  },
          { key: 'actions', label: 'Actions', class: 'd-flex justify-content-center ' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        id_hospital:'',
        pageOptions: [5, 10, 15],
        filter: null,
        infoModal: {
          id: 'info-modal',
          title: '',
          content: '',
          firstname_doctor:null
        },
        account_doctor_:[],

        isModifyFirstName:false,
        isModifyLastName:false,
        isModifyPhone:false,
        isModifyAddress:false,
        isModifyEmail:false,
        isModifyPassword:false,
        isModifyDepartment:false,
        isModifySpecialize:false,
        isModifyCmnd:false,
        isModifySex:false,
        isModifyBirthday:false,

        department_modify:'',
        specialize_modify:'',
        cmnd_modify:'',
        sex_modify:'',
        birthday_modify:'',
        email_modify:'',
        password_modify:'',
        phone_modify:'',
        address_modify:'',
        firstname_modify:'',
        lastname_modify:'',
        user:null
      }
    },
    async mounted() {
      this.user =JSON.parse(localStorage.getItem('user'))
      const id_hospital = this.user.id
      this.doctors = (await HospitalService.show(id_hospital)).data
      const id_account_doctor = this.doctors.map(x=> x.id_account)
      const payload = JSON.stringify({
        id_hospital:id_hospital,
        roles:this.user.roles,
        id_account:id_account_doctor
        
      })

      this.account_doctor_ = (await AccountService.getAllAcountDoctors({
        payload:payload
      })).data
      this.totalRows = this.doctors.length
    },
    methods: {
      async addDoctor(){
          this.$router.push({
            path: `/Hospital/${this.user.id}/addDoctor`
          })
      },
      async deleteDoctor(item, index, button){
        const delete_result = (await HospitalService.delete(item.id_account)).data      
          this.$toasted.show(`Đã xóa bác sĩ ${delete_result.lastname} Thành công !!`, { 
            theme: "bubble", 
            position: "bottom-right", 
            duration : 2000
        });
        
        this.forceRerender();
      },
      GetFieldsemail(row,key,item){
        for(var account_doctor__ of this.account_doctor_) {
            if(account_doctor__.id == item.id_account){
              return account_doctor__.email
            }
        }
      },
      changeInfo(item, index, button) {
          // this.$router.push({
          //   path: `/Hospital/${this.user.id}/changeInfo`
          // })
        this.infoModal.title = `Thay đổi thông tin`
        this.infoModal.lastname_doctor = item.lastname
        this.infoModal.firstname_doctor = item.firstname
        this.infoModal.cmnd_doctor = item.cmnd
        this.infoModal.sex_doctor = item.sex
        this.infoModal.phone_doctor = item.phone
        this.infoModal.address_doctor = item.address
        this.infoModal.id_account = item.id_account
        this.infoModal.department = item.department
        this.infoModal.specialize = item.specialize
        this.infoModal.birthday = item.month + ' / ' + item.day + ' / ' + item.year 
        this.infoModal.email_doctor = this.GetFieldsemail('row','key',item)

        this.infoModal.password = ''
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)

      },
      cancelModify(payload){
        if(payload == 'firstname'){
          this.isModifyFirstName = false
        }
        else if(payload == 'lastname'){
          this.isModifyLastName = false
        }
        else if(payload == 'phone'){
          this.isModifyPhone = false
        }
        else if(payload == 'address'){
          this.isModifyAddress = false
        }
        else if(payload == 'email'){
          this.isModifyEmail = false
        }
        else if(payload == 'password'){
          this.isModifyPassword = false
        }
        else if(payload == 'department'){
          this.isModifyDepartment = false
        }
        else if(payload == 'specialize'){
          this.isModifySpecialize = false
        }
        else if(payload == 'birthday'){
          this.isModifyBirthday = false
        }
        else if(payload == 'sex'){
          this.isModifySex = false
        }
        else if(payload == 'phone'){
          this.isModifyPhone = false
        }
        else if(payload == 'cmnd'){
          this.isModifyCmnd = false
        }
        else{
          this.$toasted.show(`Có lỗi xãy ra!!`, { 
            theme: "bubble", 
            position: "bottom-right", 
            duration : 2000
        });

        }
      },
      async SussessToasted(){
        console.log('ok ne')
        this.$toasted.show(`Update Thành công !!`, { 
            theme: "bubble",
            position: "bottom-right", 
            duration : 3000
        });
      },
      async ErrorToasted(error){
        this.$toasted.show(`${error.response.data.error}`, { 
            theme: "toasted-primary", 
            position: "bottom-center",
            duration : 5000
        });
      },
      async ValidationToasted(name){
        this.$toasted.show(`Vui lòng nhập ${name} bạn muốn thay đổi !!`, { 
              theme: "toasted-primary", 
              position: "bottom-center", 
              duration : 3000
          });
      },
      async ModifyView(nameModifyView ,id_account){
        if(nameModifyView == 'firstname'){
          this.infoModal.firstname_doctor = this.firstname_modify
          this.doctors.filter(x=>x.id_account == id_account)[0].firstname = this.firstname_modify
        }
        else if(nameModifyView == 'lastname'){
          this.infoModal.lastname_doctor = this.lastname_modify
          this.doctors.filter(x=>x.id_account == id_account)[0].lastname = this.lastname_modify
        }
        else if(nameModifyView == 'address'){
          this.infoModal.address_doctor = this.address_modify
          this.doctors.filter(x=>x.id_account == id_account)[0].address = this.address_modify
        }
        else if(nameModifyView == 'email'){
          this.infoModal.email_doctor = this.email_modify
          this.account_doctor_.filter(x=>x.id_account == id_account)[0].email = this.email_modify
        }
        else if(nameModifyView == 'department'){
          this.infoModal.department_doctor = this.department_modify
          this.doctors.filter(x=>x.id_account == id_account)[0].department = this.department_modify
        }
        else if(nameModifyView == 'specialize'){
          this.infoModal.specialize_doctor = this.specialize_modify
          this.doctors.filter(x=>x.id_account == id_account)[0].specialize = this.specialize_modify
        }
        else if(nameModifyView == 'cmnd'){
          this.infoModal.cmnd_doctor = this.cmnd_modify
          this.doctors.filter(x=>x.id_account == id_account)[0].cmnd = this.cmnd_modify
        }
        else if(nameModifyView == 'phone'){
          this.infoModal.phone_doctor = this.phone_modify
          this.doctors.filter(x=>x.id_account == id_account)[0].phone = this.phone_modify
        }
        else if(nameModifyView == 'sex'){
          this.infoModal.sex_doctor = this.sex_modify
          this.doctors.filter(x=>x.id_account == id_account)[0].sex = this.sex_modify

        }
        else if(nameModifyView == 'birthday'){
          const date = this.birthday_modify;
          const yearVariable = date.slice(0, 4)
          const monthVariable = date.slice(5, 7)
          const dayVariable = date.slice(8, 10)
          this.infoModal.birthday = monthVariable +' / '+ dayVariable +' / '+yearVariable

          this.doctors.filter(x=>x.id_account == id_account)[0].day = dayVariable
          this.doctors.filter(x=>x.id_account == id_account)[0].month = monthVariable
          this.doctors.filter(x=>x.id_account == id_account)[0].year = yearVariable
        }
        
      },


      async SendRequestModifyInfomation(id_account, nameModify){
        switch (nameModify) {
          case 'firstname':
            if(this.firstname_modify){
              try {
                  await HospitalService.updateFirstNameDoctor({
                    id_account:id_account,
                    firstname:this.firstname_modify
                  })
                  this.SussessToasted();
                  this.ModifyView('firstname',id_account)
                  this.isModifyFirstName = false
                  this.firstname_modify = ''
              }catch (error) {
                this.ErrorToasted(error)
              }
            }else{
              this.ValidationToasted('Họ và tên lót')
            } 
            break;

          case 'lastname':
            if(this.lastname_modify){
              try {
                  await HospitalService.updateLastNameDoctor({
                    id_account:id_account,
                    lastname:this.lastname_modify
                  })
                  this.SussessToasted();
                  this.ModifyView('lastname',id_account)
                  this.isModifyLastName = false
                  this.lastname_modify = ''
              }catch (error) {
                this.ErrorToasted(error)
              }
            }else{
              this.ValidationToasted('Tên')
            } 
            break;


          case 'address':
            if(this.address_modify){
              try {
                  await HospitalService.updateAddressDoctor({
                    id_account:id_account,
                    address:this.address_modify
                  })
                  this.SussessToasted();
                  this.ModifyView('address',id_account)
                  this.isModifyAddress = false
                  this.address_modify = ''
              }catch (error) {
                this.ErrorToasted(error)
              }
            }else{
              this.ValidationToasted('Địa Chỉ')
            } 
            break;


          case 'email':
            if(this.email_modify){
              try {
                  await HospitalService.updateEmailDoctor({
                    id_account:id_account,
                    email:this.email_modify
                  })
                  this.SussessToasted();
                  this.ModifyView('email',id_account)
                  this.isModifyEmail = false
                  this.email_modify = ''
              }catch (error) {
                this.ErrorToasted(error)
              }
            }else{
              this.ValidationToasted('Email')
            } 
            break;

          case 'password':
            if(this.password_modify){
              try {
                  await HospitalService.updatePasswordDoctor({
                    id_account:id_account,
                    password:this.password_modify
                  })
                  this.SussessToasted();
                  this.isModifyPassword = false
                  this.password_modify = ''
              }catch (error) {
                this.ErrorToasted(error)
              }
            }else{
              this.ValidationToasted('Password')
            } 
            break;

          case 'department':
            if(this.department_modify){
              try {
                  await HospitalService.updateDepartmentDoctor({
                    id_account:id_account,
                    department:this.department_modify
                  })
                  this.SussessToasted();
                  this.ModifyView('department',id_account)
                  this.isModifyDepartment = false
                  this.department_modify = ''
              }catch (error) {
                this.ErrorToasted(error)
              }
            }else{
              this.ValidationToasted('Phòng Ban')
            } 
            break;

          case 'specialize':
            if(this.specialize_modify){
              try {
                  await HospitalService.updateSpecializeDoctor({
                    id_account:id_account,
                    specialize:this.specialize_modify
                  })
                  this.SussessToasted();
                  this.ModifyView('specialize',id_account)
                  this.isModifySpecialize = false
                  this.specialize_modify = ''
              }catch (error) {
                this.ErrorToasted(error)
              }
            }else{
              this.ValidationToasted('Chuyên môn')
            } 
            break;

          case 'cmnd':
            if(this.cmnd_modify){
              try {
                  await HospitalService.updateCmndDoctor({
                    id_account:id_account,
                    cmnd:this.cmnd_modify
                  })
                  this.SussessToasted();
                  this.ModifyView('cmnd',id_account)
                  this.isModifyCmnd = false
                  this.cmnd_modify = ''
              }catch (error) {
                this.ErrorToasted(error)
              }
            }else{
              this.ValidationToasted('CMND')
            } 
            break;

          case 'phone':
            if(this.phone_modify){
              try {
                  await HospitalService.updatePhoneDoctor({
                    id_account:id_account,
                    phone:this.phone_modify
                  })
                  this.SussessToasted();
                  this.ModifyView('phone',id_account)
                  this.isModifyPhone = false
                  this.phone_modify = ''
              }catch (error) {
                this.ErrorToasted(error)
              }
            }else{
              this.ValidationToasted('Số Điện Thoại')
            } 
            break;

          case 'sex':
            if(this.sex_modify){
              try {
                  await HospitalService.updateSexDoctor({
                    id_account:id_account,
                    sex:this.sex_modify
                  })
                  this.SussessToasted();
                  this.ModifyView('sex',id_account)
                  this.isModifySex = false
                  this.sex_modify = ''
              }catch (error) {
                this.ErrorToasted(error)
              }
            }else{
              this.ValidationToasted('Giới Tính')
            } 
            break;

          case 'birthday':
            
            if(this.birthday_modify){
              try {
                  await HospitalService.updateBirthdayDoctor({
                    id_account:id_account,
                    birthday:this.birthday_modify
                  })
                  this.SussessToasted();
                  this.ModifyView('birthday',id_account)
                  this.isModifyBirthday = false
                  this.birthday_modify = ''
              }catch (error) {
                this.ErrorToasted(error)
              }
            }else{
              this.ValidationToasted('Sinh nhật')
            } 
            break;
          default:
            break;
        }

      },



      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      forceRerender(){
        this.componentKey += 1;
      }
    },
  }
</script>

<style scoped>

*{
    font-size: 14px;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    color: rgba(0,0,0,.54);
}
.bg{
    background-repeat: no-repeat;
    background-size:cover
}
.model_wrapper{
  align-items: center;
  border-bottom: 1px solid rgba(190,195,201);
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
}
.model_wrapper:first-child{
  border-top: 1px solid #aaa;
}
.model_wrapper:last-child{
  border-bottom: 1px solid #aaa;
}
.model_wrapper:hover{
  background: #f5f6f7;
}
.orange-btn{
  background:#FF6F00;
  color:white;
}
.orange-btn:hover{
  background:#ff4400;
  color:#ccc;
}

.model_title{
  color: #333;
}
.main_register{
    max-width: 95vw;
    width: 100%;
    background:white;
    border-radius: 2px;
    background: white;
}
.p_1r{
    padding: 1rem;
}
.mlr_1-5r{
    margin: 0 1.5rem;
}
.hello{
  padding-left: 2rem;

}
</style>
