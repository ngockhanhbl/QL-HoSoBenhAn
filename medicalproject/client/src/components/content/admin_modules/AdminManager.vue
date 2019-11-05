<template>
    <div class="bg" >
            <div class="main_register m-auto ">
              <div class="d-flex pr-5 pt-4 ">
                <div class="mr-auto pl-5 pt-3">Xin Chào Admin</div>
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
                        hover
                        striped
                        stacked="md"
                        :items="hospitals"
                        :fields="fields"
                        :current-page="currentPage"
                        :per-page="perPage"
                        :filter="filter"
                        ref="table"
                        @filtered="onFiltered"
                      >
                        <template slot="actions" slot-scope="row" class="d-flex justify-content-start">
                          <b-button size="sm" @click="row.toggleDetails" class="text-white">
                            {{ row.detailsShowing ? 'Ẩn' : 'Xem' }}
                          </b-button>
                          <b-button size="sm" @click="changeInfo(row.item, row.index, $event.target)" class="ml-4 mr-4 btn-info text-white">
                            Sửa
                          </b-button>  

                          <b-button size="sm" @click="deleteHospital(row.item, row.index, $event.target)" class="btn-danger text-white ">
                            Xóa
                          </b-button>
                        </template>


                        <template slot="row-details" slot-scope="row">
                          <b-card>
                            <b-row class="mb-2">
                              <b-col sm="3" class="text-sm-right"><b>ID:</b></b-col>
                              <b-col>{{ row.item.id }} </b-col>
                            </b-row>

                            <b-row class="mb-2">
                              <b-col sm="3" class="text-sm-right"><b>ID account:</b></b-col>
                              <b-col>{{ row.item.id_account }}</b-col>
                            </b-row>
                            
                            <b-row class="mb-2">
                              <b-col sm="3" class="text-sm-right"><b>Tên bệnh viện:</b></b-col>
                              <b-col>{{ row.item.name_hospital }}</b-col>
                            </b-row>
                            
                            <b-row class="mb-2">
                              <b-col sm="3" class="text-sm-right"><b>Số điện thoại:</b></b-col>
                              <b-col>{{ row.item.phone_hospital }}</b-col>
                            </b-row>

                            <b-row class="mb-2">
                              <b-col sm="3" class="text-sm-right"><b>Email:</b></b-col>
                              <b-col>{{ GetFieldsemail('row','key',row.item) }}</b-col>
                            </b-row>

                            <b-row class="mb-2">
                              <b-col sm="3" class="text-sm-right"><b>Địa chỉ:</b></b-col>
                              <b-col>{{ row.item.address_hospital }}</b-col>
                            </b-row>

                            <b-row class="mb-2">
                              <b-col sm="3" class="text-sm-right"><b>Ngày tạo:</b></b-col>
                              <b-col>{{ formatDate(row.item.createdAt) }}</b-col>
                              
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

                      <!-- modify -->
                    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal" >
                      <div class="row model_wrapper" v-if="!isModifyName " @click="isModifyName = true ">
                          <div class="col-sm-3 p-2 model_title"><strong>Tên bệnh viện</strong></div>
                          <div class="col-sm-6 p-2">
                            {{infoModal.name_hospital}}
                          </div>
                          <div class="col-sm-3 p-2 modify-btn">Chỉnh sửa</div>
                      </div>
                      
                      <div class="row model_wrapper" v-else >
                                <div class="col-sm-3 p-2 model_title"><strong>Tên bệnh viện</strong></div>
                                <div class="col-sm-9 p-2">
                                  <input type="text" placeholder="Tên bệnh viện" style="width:90%;"  v-model="name_modify">
                                </div>
                                <div class="col-sm-12 d-flex justify-content-end text-center mb-3">
                                  <button type="button" class="btn orange-btn btn-sm mr-3" @click="SendRequestModifyName(infoModal.id_account)">Thay đổi</button>
                                  <button type="button" class="btn btn-outline-secondary mr-4 btn-sm " @click="cancelModify('name')">Hủy</button>
                                </div>
                      </div>
                    
                      <div class="row model_wrapper" v-if="!isModifyPhone " @click="isModifyPhone = true">
                          <div class="col-sm-3 p-2 model_title"><strong>Số điện thoại</strong></div>
                          <div class="col-sm-6 p-2">
                            {{infoModal.phone_hospital}}
                          </div>
                          <div class="col-sm-3 p-2 modify-btn">Chỉnh sửa</div>
                      </div>
                      <div class="row model_wrapper" v-else >
                          <div class="col-sm-3 p-2 model_title"><strong>Số điện thoại</strong></div>
                          <div class="col-sm-9 p-2">
                            <input type="text" placeholder="Số điện thoại" style="width:90%;"  v-model="phone_modify">
                          </div>
                          <div class="col-sm-12 d-flex justify-content-end text-center mb-3">
                            <button type="button" class="btn orange-btn btn-sm mr-3" @click="SendRequestModifyPhone(infoModal.id_account)">Thay đổi</button>
                            <button type="button" class="btn btn-outline-secondary mr-4 btn-sm " @click="cancelModify('phone') ">Hủy</button>
                          </div>
                      </div>

                      <div class="row model_wrapper" v-if="!isModifyAddress" @click="isModifyAddress = true">
                          <div class="col-sm-3 p-2 model_title"><strong>Địa chỉ</strong></div>
                          <div class="col-sm-6 p-2">
                            {{infoModal.address_hospital}}
                          </div>
                          <div class="col-sm-3 p-2 modify-btn">Chỉnh sửa</div>
                      </div>
                      <div class="row model_wrapper" v-else >
                          <div class="col-sm-3 p-2 model_title"><strong>Địa chỉ</strong></div>
                          <div class="col-sm-9 p-2">
                            <input type="text" placeholder="Địa chỉ" style="width:90%;"  v-model="address_modify">
                          </div>
                          <div class="col-sm-12 d-flex justify-content-end text-center mb-3">
                            <button type="button" class="btn orange-btn btn-sm mr-3" @click="SendRequestModifyAddress(infoModal.id_account)">Thay đổi</button>
                            <button type="button" class="btn btn-outline-secondary mr-4 btn-sm " @click="cancelModify('address') ">Hủy</button>
                          </div>
                      </div>

                      <!-- <div class="row model_wrapper"  v-if="!isModifyEmail" @click="isModifyEmail = true">
                          <div class="col-sm-3 p-2 model_title"><strong>Email</strong></div>
                          <div class="col-sm-6 p-2">
                            {{infoModal.username}}
                          </div>
                          <div class="col-sm-3 p-2 modify-btn">Chỉnh sửa</div>
                      </div>
                      <div class="row model_wrapper" v-else >
                          <div class="col-sm-3 p-2 model_title"><strong>Username</strong></div>
                          <div class="col-sm-9 p-2">
                            <input type="text" placeholder="Email.." style="width:90%;"  v-model="email_modify">
                          </div>
                          <div class="col-sm-12 d-flex justify-content-end text-center mb-3">
                            <button type="button" class="btn orange-btn btn-sm mr-3" @click="SendRequestModifyEmail(infoModal.id_account)">Thay đổi</button>
                            <button type="button" class="btn btn-outline-secondary mr-4 btn-sm " @click="cancelModify('email') ">Hủy</button>
                          </div>
                      </div> -->
                      
                      <div class="row model_wrapper" v-if="!isModifyPassword" @click="isModifyPassword = true">
                          <div class="col-sm-3 p-2 model_title"><strong>Password</strong></div>
                          <div class="col-sm-6 p-2">
                          
                          </div>
                          <div class="col-sm-3 p-2 modify-btn">Chỉnh sửa</div>
                      </div>
                      <div class="row model_wrapper" v-else >
                          <div class="col-sm-3 p-2 model_title"><strong>Password</strong></div>
                          <div class="col-sm-9 p-2">
                            <input type="text" placeholder="Password" style="width:90%;"  v-model="password_modify">
                          </div>
                          <div class="col-sm-12 d-flex justify-content-end text-center mb-3">
                            <button type="button" class="btn orange-btn btn-sm mr-3" @click="SendRequestModifyPassword(infoModal.id_account)">Thay đổi</button>
                            <button type="button" class="btn btn-outline-secondary mr-4 btn-sm " @click="cancelModify('password') ">Hủy</button>
                          </div>
                          <div v-if="error">
                            <strong class="alert-error">{{error}}</strong>
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
import AdminService from '@/services/AdminService'

  export default {
    data() {
      return {
        fields: [
          { key: 'id', label: 'ID', sortable: true, sortDirection: 'desc' },
          { key: 'id_account', label: 'ID Account', sortable: true, sortDirection: 'desc' },
          {key: 'name_hospital', label: 'Tên bệnh viện', sortable: true, class: 'text-center'},
          // {key: 'address_hospital', label: 'Địa chỉ'},
          { key: 'phone_hospital', label: 'Số điện thoại', sortable: true, sortDirection: 'desc', class: 'text-center' },
          { key: 'email', label: 'Email', formatter: 'GetFieldsemail' },
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
          content: ''
        },
        error:'',
        isModifyName:false,
        isModifyPhone:false,
        isModifyAddress:false,
        isModifyEmail:false,
        isModifyPassword:false,
        email_modify:'',
        password_modify:'',
        phone_modify:'',
        address_modify:'',
        name_modify:'',

      }
    },
    computed: {
      ...mapGetters(["user","isUserLoggedIn","hospitals"]),
      account_hospital_ :{
            get(){
               return this.$store.getters.account_hospital_
            },
           set(){  
               this.$store.dispatch("fetch_AccountHospitalList")
           }
      }
    },
    async mounted() {
      const user = localStorage.getItem("user")
      const userJSON = JSON.parse(user)
      const roles = userJSON.roles
      this.$store.dispatch("fetch_HospitalList")
      this.account_hospital_ = (await AccountService.getAllAcountHospitals()).data  //coi lai cho nay
      this.totalRows = this.hospitals.length
    },
    methods: {
      async SendRequestModifyName(id_account){
        if(this.name_modify){
            try {
                await AdminService.updateNameHospital({
                  id_account:id_account,
                  name_hospital:this.name_modify
                })
                  this.$toasted.show(`Update Thành công !!`, { 
                    theme: "bubble", 
                    position: "bottom-right", 
                    duration : 3000
                });
                this.isModifyName = false
                this.infoModal.name_hospital = this.name_modify
                this.hospitals.filter(x => x.id_account == id_account)[0].name_hospital = this.name_modify //cho nay ti lam cho may phan kia
                this.name_modify = ''
            }catch (error) {
                  this.$toasted.show(`${error.response.data.error}`, { 
                    theme: "toasted-primary", 
                    position: "bottom-center", 
                    duration : 5000
                });
                }  
        }else{
              this.$toasted.show(`Vui lòng nhập tên bệnh viện bạn muốn thay đổi !!`, { 
                theme: "toasted-primary", 
                position: "bottom-center", 
                duration : 3000
            });

        }
      },
      async SendRequestModifyPhone(id_account){
        if(this.phone_modify){
            try {
                await AdminService.updatePhoneHospital({
                  id_account:id_account,
                  phone_hospital:this.phone_modify
                })
                  this.$toasted.show(`Update Thành công !!`, { 
                    theme: "bubble", 
                    position: "bottom-right", 
                    duration : 3000
                });
                this.isModifyPhone = false
                this.infoModal.phone_hospital = this.phone_modify
                this.hospitals.filter(x => x.id_account == id_account)[0].phone_hospital = this.phone_modify 
                this.phone_modify = ''
            }catch (error) {
                  this.$toasted.show(`${error.response.data.error}`, { 
                    theme: "toasted-primary", 
                    position: "bottom-center", 
                    duration : 3000
                });
                }  
        }else{
              this.$toasted.show(`Vui lòng nhập Số điện thoại bệnh viện bạn muốn thay đổi !!`, { 
                theme: "toasted-primary", 
                position: "bottom-center", 
                duration : 3000
            });

        }
      },
      async SendRequestModifyAddress(id_account){
        if(this.address_modify){
            try {
                await AdminService.updateAddressHospital({
                  id_account:id_account,
                  address_hospital:this.address_modify
                })
                  this.$toasted.show(`Update Thành công !!`, { 
                    theme: "bubble", 
                    position: "bottom-right", 
                    duration : 3000
                });
                this.isModifyAddress = false
                this.infoModal.address_hospital = this.address_modify
                this.hospitals.filter(x => x.id_account == id_account)[0].address_hospital = this.address_modify 
                this.address_modify = ''
            }catch (error) {
                  this.$toasted.show(`${error.response.data.error}`, { 
                    theme: "toasted-primary", 
                    position: "bottom-center", 
                    duration : 3000
                });
                }  
        }else{
              this.$toasted.show(`Vui lòng nhập Địa chỉ bệnh viện bạn muốn thay đổi !!`, { 
                theme: "toasted-primary", 
                position: "bottom-center", 
                duration : 3000
            });

        }
      },
      async SendRequestModifyEmail(id_account){
          if(this.email_modify){
            try {
                await AdminService.updateEmailHospital({
                  id_account:id_account,
                  email_hospital:this.email_modify
                })
                  this.$toasted.show(`Update Thành công !!`, { 
                    theme: "bubble", 
                    position: "bottom-right", 
                    duration : 3000
                });
                this.isModifyEmail = false
                this.email_modify = ''
            }catch (error) {
                  this.$toasted.show(`${error.response.data.error}`, { 
                    theme: "toasted-primary", 
                    position: "bottom-center", 
                    duration : 3000
                });
                }  
        }else{
              this.$toasted.show(`Vui lòng nhập Username bệnh viện bạn muốn thay đổi !!`, { 
                theme: "toasted-primary", 
                position: "bottom-center", 
                duration : 3000
            });

        }
      },
      async SendRequestModifyPassword(id_account){
          if(this.password_modify){
            try {
                await AdminService.updatePasswordHospital({
                  id_account:id_account,
                  password_hospital:this.password_modify
                })
                  this.$toasted.show(`Update Thành công !!`, { 
                    theme: "bubble",
                    position: "bottom-right", 
                    duration : 3000
                });
                this.isModifyPassword = false
                this.password_modify = ''
            }catch (error) {
                  this.$toasted.show(`${error.response.data.error}`, { 
                    theme: "toasted-primary", 
                    position: "bottom-center",
                    duration : 4000
                });
                }  
        }else{
              this.$toasted.show(`Vui lòng nhập Password bệnh viện bạn muốn thay đổi !!`, {
                theme: "toasted-primary", 
                position: "bottom-center", 
                duration : 3000
            });

        }
      },
      cancelModify(payload){
        if(payload == 'name'){
          this.isModifyName = false
        }
        if(payload == 'phone'){
          this.isModifyPhone = false
        }
        if(payload == 'address'){
          this.isModifyAddress = false
        }
        if(payload == 'email'){
          this.isModifyEmail = false
        }
        if(payload == 'password'){
          this.isModifyPassword = false
        }
      },
      GetFieldsemail(row,key,item){
        for(var account_hospital__ of this.account_hospital_) {
            if(account_hospital__.id == item.id_account){
              return account_hospital__.email           
            }
        }
      },
      formatDate(stringVar){
        return stringVar.slice(0,10)
      },
      async addDoctor(){
          this.$router.push({
            path: `/Hospital/${this.user.id}/addDoctor`
          })
      },
      async deleteHospital(item, index, button){
        const delete_result = (await AdminService.deleteHospital({
          id_account: item.id_account
        })).data

          this.$toasted.show(`Đã xóa bác sĩ ${delete_result.lastname} Thành công !!`, { 
            theme: "bubble",
            position: "bottom-right", 
            duration : 2000
        });
        
        if (~index) // if the hospitals_register exists in array(Bitwise NOT operator.)
          this.hospitals.splice(index, 1)
      },
      changeInfo(item, index, button) {
        this.infoModal.title = `Thay đổi thông tin`
        this.infoModal.name_hospital = item.name_hospital
        this.infoModal.phone_hospital = item.phone_hospital
        this.infoModal.address_hospital = item.address_hospital
        this.infoModal.id_account = item.id_account

        this.infoModal.username = this.GetFieldsemail('row','key',item)

        this.infoModal.password = ''
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)

      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
    }
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
.modify-btn{
  color:#365899;
}
.modify-btn:hover{
  text-decoration: underline;
  color: #273f6e;
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
.model_title{
  color: #333;
}
.orange-btn{
  background:#FF6F00;
  color:white;
}
.orange-btn:hover{
  background:#ff4400;
  color:#ccc;
}
.alert-error{
  color:red;
}

</style>
 