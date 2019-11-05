<template>
    <div>
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
                      small 
                        show-empty
                        bordered
                        striped
                        hover
                        stacked="md"
                        :items="hospitals_register"
                        :fields="fields"
                        :current-page="currentPage"
                        :per-page="perPage"
                        :filter="filter"
                        @filtered="onFiltered"
                      >
                        <template slot="actions" slot-scope="row" class="d-flex justify-content-start">
                          <b-button size="sm" @click="acceptRegisterHospital(row.item, row.index, $event.target)" class="ml-4 mr-4 btn-info text-white">
                            Đồng ý
                          </b-button>  

                          <b-button size="sm" @click="refuseRegiterHospital(row.item, row.index, $event.target)" class="btn-danger text-white ">
                            Từ chối
                          </b-button>
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
import AuthenticationService from '@/services/AuthenticationService'

  export default {
    data() {
      return {
        hospitals_register:[],
        account_hospital_register:[],
        fields: [
          {key: 'name_hospital', label: 'Tên bệnh viện', sortable: true, class: 'text-center'},
          { key: 'phone_hospital', label: 'Số điện thoại', sortable: true, sortDirection: 'desc', class: 'text-center' },
          { key: 'address_hospital', label: 'Địa chỉ' },
          { key: 'email', label: 'Email'},
          { key: 'actions', label: 'Actions', class: 'd-flex justify-content-center ' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15],
        filter: null,
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        },
        error:'',
        id_account:'',
      }
    },
    computed: {
      ...mapGetters(["isUserLoggedIn","hospital_account","hospitalInfomation"])
    },
    async mounted() {
      const user = localStorage.getItem("user")
      const userJSON = JSON.parse(user)
      const roles = userJSON.roles
      this.hospitals_register = (await HospitalService.getAllRegisterHospitals(roles)).data
      this.account_hospital_register = (await AccountService.getAllRegisterAcountHospitals(roles)).data
      this.totalRows = this.hospitals_register.length
    },
    methods: {
      emitUpdateHospitalRegister(){
        this.$root.$emit('UpdateHospitalRegister')
      },
      async refuseRegiterHospital(item, index, button){
        const delete_result = (await AdminService.refuseRegiterHospital({
          email: item.email
        })).data

          this.$toasted.show(`Đã xóa ${item.name_hospital} Thành công !!`, { 
            theme: "bubble", 
            position: "bottom-right", 
            duration : 2000
        });
        if (~index) // if the hospitals_register exists in array(Bitwise NOT operator.)
          this.hospitals_register.splice(index, 1)
      },

      async acceptRegisterHospital(item, index, button){
            if(!this.id_account){
                try {
                    const response = await AuthenticationService.register({
                      email: item.email,
                      password: item.password,
                      roles: 2
                    })
                    this.id_account = response.data.user.id
                }catch (error) {
                        this.$toasted.show(`Có Lỗi Xảy ra ${error.response.data.error}  !!`, { 
                            theme: "bubble", 
                            position: "bottom-right", 
                            duration : 2000
                        });
                      }
                  }
          try {
            const response2 = await AuthenticationService.hospital({
                id_account:this.id_account,
                name_hospital:item.name_hospital,         
                phone_hospital:item.phone_hospital,
                address_hospital:item.address_hospital
            })
            this.$toasted.show(`Đã Thêm ${item.name_hospital} Thành công !!`, { 
              theme: "bubble", 
              position: "bottom-right", 
              duration : 2000
          });
          try {
            await AdminService.refuseRegiterHospital({email: item.email})            
          } catch (error) {
            this.$toasted.show(`Có Lỗi Xảy ra ${error.response.data.error}  !!`, { 
              theme: "bubble", 
              position: "bottom-right", 
              duration : 2000
          });
          }

          if (~index) // if the hospitals_register exists in array(Bitwise NOT operator.)
            this.hospitals_register.splice(index, 1)
          this.$store.dispatch("fetch_HospitalList")
          this.$store.dispatch("fetch_AccountHospitalList")
          }catch (error) {
              this.error = error.response.data.error
            }
        },
      onFiltered(filteredItems) {
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
.alert-error{
  color:red;
}

</style>
 