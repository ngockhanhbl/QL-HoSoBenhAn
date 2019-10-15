<template>
    <div>
            <div class="main_register m-auto ">
              <div class="d-flex justify-content-between pr-5 pt-4 ">
                <div class="pl-5 pt-3">Xin Chào Admin</div>
                <div class="pl-5 pt-3">
                    <b-button variant="success" v-b-modal.modal-job class="text-white">
                      Tạo Tin Tuyển Dụng Mới
                    </b-button>  
                </div>
              </div>
                  <b-row class="px-5">
                    <b-col md="6" class="my-3">
                      <b-form-group label-cols-sm="3" label="Lọc" class="mb-0">
                        <b-input-group>
                          <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
                          <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </b-form-group>
                    </b-col>

                    <b-col md="6" class="my-3">
                      <b-form-group label-cols-sm="3" label="Mỗi Trang" class="mb-0">
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
                        outlined
                        :items="jobs"
                        :fields="fields"
                        :current-page="currentPage"
                        :per-page="perPage"
                        :filter="filter"
                        @filtered="onFiltered"
                      >
                        <template slot="actions" slot-scope="row" class="d-flex justify-content-start">
                          <b-button size="sm" @click="JobDetails(row.item, row.index, $event.target)" class="btn-info text-white">
                            Xem
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

      <b-modal id="modal-job" size='lg' title="Tạo Đăng Thông Tin Tuyển Dụng">
          <div class="my-2 d-flex">
            <p class="col-sm-3 title_editor">Loại Công Việc</p>
            <div class="d-flex">
              <input type="text" >
              <span>&#x270D;</span>
            </div>
            
            <span class="col-sm-9">
              <select v-model="selected">
                <option disabled value="">Chọn loại công việc</option>
                <option>Product</option>
                <option>Engneering</option>
                <option>Finance</option>
                <option>Other</option>
              </select>
            </span>
          </div>

          <div class="my-2 d-flex">
            <p class="col-sm-3 title_editor">Tên Công Việc</p>
            <span class="col-sm-9"><input type="text" v-model="name" class="width-100 style_input"></span>
          </div>


          <div class="my-2 d-flex">
            <p class="col-sm-3 title_editor">Vị Trí</p>
            <span class="col-sm-9"><input type="text" v-model="location" class="width-100 style_input"></span>
          </div>


          <div class="my-2 d-flex">
            <p class="col-sm-3 title_editor">Mô Tả</p>
            <span class="col-sm-9">
                  <vue-editor v-model="description"></vue-editor>
              </span>
          </div>


          <div class="my-2 d-flex">
            <p class="col-sm-3 title_editor">Yêu Cầu</p>
            <span class="col-sm-9">
              <vue-editor v-model="requirement"></vue-editor>
            </span>
          </div>

          <div class="my-2 d-flex">
            <p class="col-sm-3 title_editor">Lợi Ích</p>
            <span class="col-sm-9">
              <vue-editor v-model="benefit"></vue-editor>
            </span>
          </div>


        <template v-slot:modal-footer>
            <div class="w-100">
            <b-button
                variant="secondary"
                size="sm"
                class="float-left text-white"
                @click="resetForm"
            >
                Đóng
            </b-button>
            <b-button
                variant="warning"
                size="sm"
                class="float-right SendReqCreateJob text-white"
                @click="SendRequestCreateJob"
            >
                <img src="@/assets/images/send.svg" /> Gửi Yêu Cầu Tạo Tin
            </b-button>
            </div>
        </template>
      </b-modal>

      <b-modal id="modal-jobdetails" size='lg' title="Thông Tin Tuyển Dụng Chi Tiết">
          <div class="my-2 d-flex">
            <p class="col-sm-3 title_editor">Loại Công Việc</p>
            <span class="col-sm-9">
              <select v-model="selected">
                <option disabled value="">Chọn loại công việc</option>
                <option>Product</option>
                <option>Engneering</option>
                <option>Finance</option>
                <option>Other</option>
              </select>
            </span>
          </div>

          <div class="my-2 d-flex">
            <p class="col-sm-3 title_editor">Tên Công Việc</p>
            <span class="col-sm-9"><input type="text" v-model="name" class="width-100 style_input"></span>
          </div>


          <div class="my-2 d-flex">
            <p class="col-sm-3 title_editor">Vị Trí</p>
            <span class="col-sm-9"><input type="text" v-model="location" class="width-100 style_input"></span>
          </div>


          <div class="my-2 d-flex">
            <p class="col-sm-3 title_editor">Mô Tả</p>
            <span class="col-sm-9">
                  <vue-editor v-model="description"></vue-editor>
              </span>
          </div>


          <div class="my-2 d-flex">
            <p class="col-sm-3 title_editor">Yêu Cầu</p>
            <span class="col-sm-9">
              <vue-editor v-model="requirement"></vue-editor>
            </span>
          </div>

          <div class="my-2 d-flex">
            <p class="col-sm-3 title_editor">Lợi Ích</p>
            <span class="col-sm-9">
              <vue-editor v-model="benefit"></vue-editor>
            </span>
          </div>


        <template v-slot:modal-footer>
            <div class="w-100">
            <b-button
                variant="secondary"
                size="sm"
                class="float-left text-white"
                @click="resetForm"
            >
                Đóng
            </b-button>
            <b-button
                variant="warning"
                size="sm"
                class="float-right SendReqCreateJob text-white"
                @click="SendRequestCreateJob"
            >
                <img src="@/assets/images/send.svg" /> Gửi Yêu Cầu Tạo Tin
            </b-button>
            </div>
        </template>
      </b-modal>
    </div>
</template>

<script>
import AdminService from '@/services/AdminService'
import { VueEditor } from "vue2-editor";

  export default {
    data() {
      return {
        fields: [
          { key: 'id', label: 'ID', sortable: true, sortDirection: 'desc' },
          {key: 'type', label: 'Loại Công Việc'},
          {key: 'name', label: 'Tên Công Việc', sortable: true, class: 'text-center'},
          { key: 'location', label: 'Nơi Làm Việc'},
          { key: 'createdAt', label: 'Thời Gian',formatter: value => {
              return value.slice(0, 10)
            }},
          { key: 'actions', label: 'Hành động', class: 'd-flex justify-content-center ' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15],
        filter: null,
        jobs:null,
        jobdetails:null,
        infoModal: {
          description: '',
          benefit: '',
          requirement:'',
          name:'',
          selected:'',
          location:''
        },
        selected:'',
        name:'',
        location:'',
        description:'',
        benefit:'',
        requirement:''
      }
    },
    async mounted() {
      this.jobs = (await AdminService.getAllJobs()).data
      this.totalRows = this.jobs.length
      this.jobdetails = (await AdminService.getAllJobDetails()).data
    },
    methods: {
      async SendRequestCreateJob(){
        if(!this.selected){
          this.$toasted.show(`Vui lòng chọn loại công việc !!`, { 
              theme: "toasted-primary", 
              position: "bottom-right", 
              duration : 2000
          });
        }else if(!this.name){
          this.$toasted.show(`Vui lòng không bỏ trống tên công việc !!`, { 
              theme: "toasted-primary", 
              position: "bottom-right", 
              duration : 2000
          });
        }else if(!this.location){
          this.$toasted.show(`Vui lòng không bỏ trống vị trí làm việc !!`, { 
              theme: "toasted-primary", 
              position: "bottom-right", 
              duration : 2000
          });
        }else if(!this.description){
          this.$toasted.show(`Vui lòng không bỏ trống mô tả công việc !!`, { 
              theme: "toasted-primary", 
              position: "bottom-right", 
              duration : 2000
          });
        }else if(!this.benefit){
          this.$toasted.show(`Vui lòng không bỏ trống quyền lợi!!`, { 
              theme: "toasted-primary", 
              position: "bottom-right", 
              duration : 2000
          });
        }
        else if(!this.requirement){
          this.$toasted.show(`Vui lòng không bỏ trống yêu cầu!!`, { 
              theme: "toasted-primary", 
              position: "bottom-right", 
              duration : 2000
          });
        }else{
          await AdminService.SendRequestCreateJob({
            type:this.selected,
            name:this.name,
            location:this.location,
            description:this.description,
            benefit:this.benefit,
            requirement:this.requirement
          })

            this.$toasted.show(`Đã thêm tin tuyển dụng thành công !!`, { 
              theme: "bubble", 
              position: "bottom-right", 
              duration : 3500
          });
          this.resetForm()
        }
      },
      JobDetails(item,index,button){
        const temp = this.jobdetails.filter(x=> x.IdJob == item.id);
        this.infoModal.description = temp[0].description;
        this.infoModal.benefit = temp[0].benefit;
        this.infoModal.requirement = temp[0].requirement;
        this.infoModal.name = item.name;
        this.infoModal.type = item.type;
        this.infoModal.location = item.location;
        this.$root.$emit('bv::show::modal', 'modal-jobdetails', '#btnShow')
      },
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      resetForm(){
        this.selected = '';
        this.name = '';
        this.location = '';
        this.description = '';
        this.benefit = '';
        this.requirement = '';
        this.$root.$emit('bv::hide::modal', 'modal-job', '#btnShow')
      }
    },
    components: {
        VueEditor
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
.style_input{
  width: 100%;
  border: 1px solid rgba(0,0,0,.54);
  border-radius: 2px;
  padding:0.25rem;
}
.title_editor{
  font-weight: bold;
  color:tomato;
}
.SendReqCreateJob img{
  height:1rem;
  width:1rem;
}
</style>
 