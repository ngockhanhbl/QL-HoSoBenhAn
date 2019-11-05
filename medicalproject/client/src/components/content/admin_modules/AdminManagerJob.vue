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
                        hover
                        outlined
                        :items="jobs"
                        :fields="fields"
                        :current-page="currentPage"
                        :per-page="perPage"
                        :filter="filter"
                        @filtered="onFiltered"
                      >
                        <template slot="status" slot-scope="row" >
                          <b-button size='sm' variant="success text-white" v-if="row.item.status == 0">
                            Đang tuyển
                          </b-button>
                          <b-button size='sm' v-else>
                            Tạm Dừng
                          </b-button> 
                        </template>

                        <template slot="updatedAt" slot-scope="row" >
                         {{row.item.updatedAt| moment }}
                        </template>
                        <template slot="action_details" slot-scope="row" >
                          <b-button class="ml-3 mr-2" size="sm" @click="JobDetails(row.item, row.index, $event.target)" >
                            <img src="@/assets/images/contract.svg" />
                          </b-button> 
                          <b-button size="sm" @click="JobCV(row.item, row.index, $event.target)">
                            <img src="@/assets/images/browser.svg" /> 
                          </b-button> 
                        </template>
                        
                        <template slot="actions" slot-scope="row" >
                          <b-button size="sm" class="ml-3 mr-2" @click="PauseJob(row.item, row.index, $event.target)" >
                            <img src="@/assets/images/pause.svg" /> 
                          </b-button> 
                          <b-button size="sm" @click="DeleteJob(row.item, row.index, $event.target)">
                            <img src="@/assets/images/delete.svg" /> 
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



      <!-- DETAILS -->
      <b-modal id="modal-jobdetails" size='lg' title="Thông Tin Tuyển Dụng Chi Tiết">
          <div class="my-2 d-flex">

            <p class="col-sm-3 title_editor">Loại Công Việc</p>
            <span class="col-sm-9 d-flex" >
              <select v-model="infoModal.type">
                <option value="" hidden disabled>{{infoModal.type}}</option>
                <option value="Product">Product</option>
                <option value="Engneering">Engneering</option>
                <option value="Finance">Finance</option>
                <option value="Other">Other</option>
              </select>
            </span>
          </div>

          <div class="my-2 d-flex">
            <p class="col-sm-3 title_editor">Tên Công Việc</p>

            <span class="col-sm-9">
              <input type="text" v-model="infoModal.name" class="width-100 style_input">
              <!-- <span class="align-self-center modify_symbol ml-3" @click="showModifyName = true">&#x270D;</span> -->
            </span>
          </div> 


          <div class="my-2 d-flex">
            <p class="col-sm-3 title_editor">Vị Trí</p>
            <span class="col-sm-9"><input type="text" v-model="infoModal.location" class="width-100 style_input"></span>
          </div>


          <div class="my-2 d-flex">
            <p class="col-sm-3 title_editor">Mô Tả</p>
            <span class="col-sm-9">
                  <vue-editor v-model="infoModal.description"></vue-editor>
              </span>
          </div>


          <div class="my-2 d-flex">
            <p class="col-sm-3 title_editor">Yêu Cầu</p>
            <span class="col-sm-9">
              <vue-editor v-model="infoModal.requirement"></vue-editor>
            </span>
          </div>

          <div class="my-2 d-flex">
            <p class="col-sm-3 title_editor">Lợi Ích</p>
            <span class="col-sm-9">
              <vue-editor v-model="infoModal.benefit"></vue-editor>
            </span>
          </div>


        <template v-slot:modal-footer>
            <div class="w-100">
            <b-button
                variant="secondary"
                size="sm"
                class="float-left text-white"
                @click="resetModal"
            >
                Đóng
            </b-button>
            <b-button
                variant="warning"
                size="sm"
                class="float-right SendReqCreateJob text-white"
                @click="SendRequestUpdateJob"
            >
                <img src="@/assets/images/send.svg" /> Gửi Yêu Cầu Tạo Tin
            </b-button>
            </div>
        </template>
      </b-modal>
      <!-- CV -->
      <b-modal id="modal-jobcv" size='xl' :title="modalCV.name">
        <template>
          <div>
            <b-table striped hover :fields='fields_cv' :items="cv">
              <template slot="stt" slot-scope="row">
                 {{row.index+1}}
              </template>
              <template slot="updatedAt" slot-scope="row">
                  <a target="_blank" class="ellipsis" rel="error" :href="row.item.updatedAt">{{row.item.updatedAt}}</a>
              </template>
            </b-table>
          </div>
        </template>  
      </b-modal>
    </div>
</template>

<script>
import AdminService from '@/services/AdminService';
import { VueEditor } from "vue2-editor";
import moment from 'moment';
import firebase from 'firebase';
import {db, storage} from '../../firebaseInit'

  export default {
    data() {
      return {
        fields: [
          { key: 'id', label: 'ID', sortable: true, sortDirection: 'desc' },
          { key: 'type', label: 'Loại Công Việc'},
          { key: 'name', label: 'Tên Công Việc', sortable: true, class: 'text-center'},
          { key: 'status', label: 'Trạng Thái',class:'text-center'},
          { key: 'updatedAt', label: 'Thời Gian'},//,formatter: value => value.moment().format('MMMM Do YYYY, h:mm:ss a')
          { key: 'action_details', label: 'Chi Tiết', class: 'action d-flex ' },
          { key: 'actions', label: 'Hành động', class: 'action ' },
        ],
        fields_cv: [
          { key: 'stt', label: 'STT', sortable: true, sortDirection: 'desc' },
          { key: 'name', label: 'Họ Và Tên', sortable: true, class: 'text-center'},
          { key: 'phone', label: 'Điện Thoại'},
          { key: 'comments', label: 'Lời Nhắn'},
          { key: 'email', label: 'Email'},
          { key: 'updatedAt', label: 'File CV'},
          { key: 'createdAt', label: 'Thời Gian',formatter: value => moment(value).format('L')},
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15],
        filter: null,
        jobs:null,
        jobdetails:null,
        cv:null,
        infoModal: {
          description: '',
          benefit: '',
          requirement:'',
          name:'',
          type:'',
          location:''
        },
        modalCV:{
          name:''
        },
        selected:'',
        name:'',
        location:'',
        description:'',
        benefit:'',
        requirement:'',
        selected_modify:'',
        name_modify:'',
        location_modify:'',
        description_modify:'',
        benefit_modify:'',
        requirement_modify:'',
        currentIndex:''
      }
    },
    async mounted() {
      this.jobs = (await AdminService.getAllJobs()).data
      this.totalRows = this.jobs.length
      this.jobdetails = (await AdminService.getAllJobDetails()).data

    },
    methods: {
      async SendRequestUpdateJob(){
        if(!this.infoModal.type){
          this.$toasted.show(`Vui lòng chọn loại công việc !!`, { 
              theme: "toasted-primary", 
              position: "bottom-right", 
              duration : 2000
          });
        }else if(!this.infoModal.name){
          this.$toasted.show(`Vui lòng không bỏ trống tên công việc !!`, { 
              theme: "toasted-primary", 
              position: "bottom-right", 
              duration : 2000
          });
        }else if(!this.infoModal.location){
          this.$toasted.show(`Vui lòng không bỏ trống vị trí làm việc !!`, { 
              theme: "toasted-primary", 
              position: "bottom-right", 
              duration : 2000
          });
        }else if(!this.infoModal.description){
          this.$toasted.show(`Vui lòng không bỏ trống mô tả công việc !!`, { 
              theme: "toasted-primary", 
              position: "bottom-right", 
              duration : 2000
          });
        }else if(!this.infoModal.benefit){
          this.$toasted.show(`Vui lòng không bỏ trống quyền lợi!!`, { 
              theme: "toasted-primary", 
              position: "bottom-right", 
              duration : 2000
          });
        }
        else if(!this.infoModal.requirement){
          this.$toasted.show(`Vui lòng không bỏ trống yêu cầu!!`, { 
              theme: "toasted-primary", 
              position: "bottom-right", 
              duration : 2000
          });
        }else{
          await AdminService.SendRequestUpdateJob({
            id:this.infoModal.id,
            type:this.infoModal.type,
            name:this.infoModal.name,
            location:this.infoModal.location,
            description:this.infoModal.description,
            benefit:this.infoModal.benefit,
            requirement:this.infoModal.requirement
          })
            this.$toasted.show(`Đã cập nhật tin tuyển dụng thành công !!`, { 
              theme: "bubble", 
              position: "bottom-right", 
              duration : 3500
          });
          this.jobs[this.currentIndex].name = this.infoModal.name;
          this.jobs[this.currentIndex].type = this.infoModal.type;
          this.jobs[this.currentIndex].location = this.infoModal.location;
          this.jobs[this.currentIndex].updateddAt = Date.now();

          // this.jobdetails.filter(x=>x.IdJob == this.infoModal.id).then(function(record){
          //   record.description = this.infoModal.description;
          //   record.benefit = this.infoModal.benefit;
          //   record.requirement = this.infoModal.requirement;
          // })
        

          this.resetModal()
        }
      },
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
          const response = await AdminService.SendRequestCreateJob({
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
          this.jobs = (await AdminService.getAllJobs()).data
          this.jobdetails = (await AdminService.getAllJobDetails()).data
          this.resetForm()
        }
      },
      async DeleteJob(item,index,button){
        console.log(item.id)
        try{
          const response = await AdminService.DeleteJob({
            id:item.id
          })
          if(response.status === 200){
            this.$toasted.show(`đã xóa tin tuyển dụng thành công !!`, { 
                theme: "bubble", 
                position: "bottom-right", 
                duration : 2500
            });
            if (~index)
              this.jobs.splice(index, 1)
          }
        }catch(err){
          this.$toasted.show(`${err}`, { 
              theme: "toasted-primary", 
              position: "bottom-right", 
              duration : 2500
          });
        }
      },
      async PauseJob(item,index,button){
        try{
          const response = await AdminService.SwitchJobStatus({
            id:item.id
          })
        if(response.status === 200){
          this.$toasted.show(`cập nhật trạng thái thành công !!`, { 
              theme: "bubble", 
              position: "bottom-right", 
              duration : 2000
          });
          item.status = !item.status
        }
        }catch(err){
          this.$toasted.show(`${err}`, { 
              theme: "toasted-primary", 
              position: "bottom-right", 
              duration : 2500
          });
        }
      },
      async RetrieveFile(element){
        const temp = `JOBCV/${element.IdJob}/${element.id}/`
        const file_temp = firebase.storage().ref(temp);
        let url = await file_temp.getDownloadURL();
        return url;
      },
      async JobCV(item,index,button){
        this.modalCV.name = item.name;
        try{
          var response = await AdminService.getJobCVbyID({
            id:item.id
          })
          response = response.data.jobcv
          if(response.length){
            response.forEach(async (element,index) => {
              var url = await this.RetrieveFile(element);
              response[0].updatedAt = url;
            });
            this.cv = response;
            this.$root.$emit('bv::show::modal', 'modal-jobcv', '#btnShow')
          }else{
            this.cv = null;
            this.$root.$emit('bv::show::modal', 'modal-jobcv', '#btnShow')
          }
        }catch(err){
          this.$toasted.show(`${err.response.data.error}`, { 
              theme: "toasted-primary", 
              position: "bottom-right", 
              duration : 2500
          });
        }
      },
      JobDetails(item,index,button){
        const temp = this.jobdetails.filter(x=> x.IdJob == item.id);
        this.currentIndex = index
        this.infoModal.id =  item.id;
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
      moment: function () {
        return moment();
      },
      resetForm(){
        this.selected = '';
        this.name = '';
        this.location = '';
        this.description = '';
        this.benefit = '';
        this.requirement = '';
        this.$root.$emit('bv::hide::modal', 'modal-job', '#btnShow')
      },
      resetModal(){
        this.$root.$emit('bv::hide::modal', 'modal-jobdetails', '#btnShow')
      }
    },
    components: {
        VueEditor
    },
    filters: {
      moment: function (date) {
        return moment(date).format('L');
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
  border: 1px solid rgba(0,0,0,.54);
  border-radius: 2px;
  padding:0.25rem;
}
.width-100{
  width: 100%;
}
.title_editor{
  font-weight: bold;
  color:tomato;
}
.SendReqCreateJob img{
  height:1rem;
  width:1rem;
}
.action img{
  height:1.5rem;
  width:1.5rem;

}
.action button{
  background: none;
  border: none;
}
.modify_symbol{
  padding:.3rem .5rem;
  border: 1px solid aliceblue;
  border-radius: 3px;
  background: aliceblue;
  cursor: pointer;
}
    .ellipsis{
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 150px;
    }
</style>
 