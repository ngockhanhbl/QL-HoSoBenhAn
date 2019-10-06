<template>
  <b-container fluid v-if="patient_records.length && this.isUserLoggedIn && condition ">
    <!-- User Interface controls -->
    <div class="pt-5 pb-4">
      <b-row class="my-1 justify-content-between">
          <div class="pl-4">
              Bảng hồ sơ bệnh án
          </div>
            <div class="subcriber">
                <span><input type="text" v-model="patient_filter"  placeholder="Chụp X-quang..."/></span>
                <span class="btn-sub" :disabled="!patient_filter" @click="patient_filter = ''"><img src="@/assets/images/search.svg" /><span class="pl-2 pr-1" >Xóa Tìm Kiếm</span></span>
            </div>
            <div class="pr-3 options">
                <span>Hiển Thị</span>
                <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>    
            </div>
      </b-row>
    </div>

    <!-- Main table element -->
    <b-table
      bordered
      show-empty
      stacked="md"
      :items="patient_records"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="patient_filter"
      @filtered="onFiltered"
    >

      <template slot="patient_records_details" slot-scope="row" >
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1 details btn-success">
          <img src="@/assets/images/notepad.svg" />
        </b-button>
      </template>

      <template slot="patient_name_doctor" >
            <li>{{ this.arrayNameDoctor[0] }}</li>
      </template> 

      <template slot="patient_name_doctor" slot-scope="data" >
          <ul v-if="condition">
            {{ arrayNameDoctor[data.index] }}
          </ul>
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
      <pre>{{ infoModal.alternativeContent }}</pre>
      <div class="row">
        <span v-for="(item,index) in filesDisplay" :key="index" class="row pl-5"> 
          <img :src="filesDisplay[index].url" alt="err" class="imageDisplay" @click.prevent="filesDisplay[index].isClick = !filesDisplay[index].isClick" :class="{full : filesDisplay[index].isClick}" >
        </span>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import { mapGetters} from "vuex";
import PatientService from '@/services/PatientService'
import DrugService from '@/services/DrugService'
  export default {
     data(){
      return{
        showModal: false,
        infoModal: {
            id: 'info-modal',
            title: '',
            content: '',
          },
          user:null,
          get isUserLoggedIn() {
            return localStorage.getItem('isUserLoggedIn' || false);
          },
          arrayNameDoctor:[],
          condition:false,
          filesDisplay: [],
          filesDisplay2:[]
      }
    },
    computed: {
        ...mapGetters(
      ["patient_records",
      "patient_records_details",
      "fields",
      "pageOptions",
      "nameDoctorWrite_records",
      "AlternativeRecord",
      "patientInfo"]
    ),
    totalRows: {
           get(){ 
               return this.$store.getters.totalRows
            },
           set(payload){  
               this.$store.dispatch("update_inforListPatient",{
                    payloadValue: payload,
                    payloadRouter:'totalRows'
                })
           }
        },
    patient_filter: {
           get(){ 
               return this.$store.getters.patient_filter
            },
           set(payload){  
               this.$store.dispatch("update_inforListPatient",{
                    payloadValue: payload,
                    payloadRouter:'patient_filter'
                })
           }
        },
    currentPage: {
           get(){ 
               return this.$store.getters.currentPage
            },
           set(payload){
               this.$store.dispatch("update_inforListPatient",{
                    payloadValue: payload,
                    payloadRouter:'currentPage'
                })
           }
        },
    perPage: {
           get(){ 
               return this.$store.getters.perPage
            },
           set(payload){
               this.$store.dispatch("update_inforListPatient",{
                    payloadValue: payload,
                    payloadRouter:'perPage'
                })
           }
        }
    },
    async mounted() {
      const userCONST = JSON.parse(localStorage.getItem('user'));
      this.user = userCONST

      if(this.user.roles == 1){
        this.condition = true
        if(this.patient_records.length){
          for(let index = 0 ;index<this.patient_records.length;index++){
          for(let i = 0;i<this.nameDoctorWrite_records.length;i++){
            if(this.nameDoctorWrite_records[i].id_account == this.patient_records[index].id_doctor){   
              let name = this.nameDoctorWrite_records[i].firstname +' '+this.nameDoctorWrite_records[i].lastname
                this.arrayNameDoctor[index] = name
            }
          }
        }

        
          this.totalRows = this.patient_records.length


          let lengthOfAlternativeRecord = this.AlternativeRecord.length

          for(let i = 0;i<lengthOfAlternativeRecord;i++ ){
            for(let index = 0;index <this.AlternativeRecord[i].length;index++ ){
              if(this.AlternativeRecord[i][index].image ){
                try{
                  let base64String = btoa(
                  new Uint8Array(this.AlternativeRecord[i][index].image.data)
                      .reduce((data, byte) => data + String.fromCharCode(byte), '')
                  );
                    var files_temp = {
                      url:null,
                      id_record:null,
                      isClick:false
                    };
                  files_temp.url = new Buffer(base64String, 'base64')
                  files_temp.id_record = this.AlternativeRecord[i][index].id_record
                  this.filesDisplay2.push(files_temp)
                }catch(error){
                      this.$toasted.show(`${error.response.data.error}`, { 
                        theme: "toasted-primary", 
                        position: "bottom-center", 
                        duration : 5000
                    });
                }
              }
            }
          }
        }

      }else if(this.user.roles == 3){
          const id_patient = this.patientInfo.id_account
          const payload = (await PatientService.show(id_patient)).data
          const lengthRecord = payload.length
          if(lengthRecord){
            const idDoctorWriteRecord = []
            for(let i = 0 ;i<lengthRecord;i++){
              idDoctorWriteRecord[i]= payload[i].id_doctor
            }
            const ArrayNameDoctor = (await PatientService.get_nameDoctorRecordPatient({id_doctor:idDoctorWriteRecord})).data
            this.$store.dispatch("set_nameDoctorWrite_records",ArrayNameDoctor)
            const _DrugRecord = (await DrugService.get_DrugRecordPatient({
              id_account: 0
            })).data
          this.$store.dispatch("set_patient_records_details",_DrugRecord)
        
          let lengthOfAlternativeRecord = this.AlternativeRecord.length
          
          for(let i = 0;i<lengthOfAlternativeRecord;i++ ){
            for(let index = 0;index <this.AlternativeRecord[i].length;index++ ){
              if(this.AlternativeRecord[i][index].image ){
                try{
                  let base64String = btoa(
                  new Uint8Array(this.AlternativeRecord[i][index].image.data)
                      .reduce((data, byte) => data + String.fromCharCode(byte), '')
                  );
                    var files_temp = {
                      url:null,
                      id_record:null,
                      isClick:false
                    };
                  files_temp.url = new Buffer(base64String, 'base64')
                  files_temp.id_record = this.AlternativeRecord[i][index].id_record
                  this.filesDisplay2.push(files_temp)
              }catch (error) {
                    this.$toasted.show(`${error.response.data.error}`, { 
                      theme: "toasted-primary", 
                      position: "bottom-center", 
                      duration : 5000
                  });
                  } 
              }
            }
          }
          }  
          this.condition = true
      }
      
        if(this.patient_records.length){
          for(let index = 0 ;index<this.patient_records.length;index++){
            for(let i = 0;i<this.nameDoctorWrite_records.length;i++){
              if(this.nameDoctorWrite_records[i].id_account == this.patient_records[index].id_doctor){   
                let name = this.nameDoctorWrite_records[i].firstname +' '+this.nameDoctorWrite_records[i].lastname
                  this.arrayNameDoctor[index] = name
              }
            }
          }
        }
    },
    methods: {
      info(item, index, button) {
        this.infoModal.title = `${this.patient_records[index].patient_title}`
        let temp2 = this.patient_records_details.filter(f => f.id_record == item.id);
        this.filesDisplay = this.filesDisplay2.filter(f => f.id_record === item.id);
        
        if(temp2.length > 0 || this.filesDisplay.length > 0) {
          if(temp2.length >0){
            temp2.forEach(element => {
              let temp =              
              `        
              Tên thuốc: ${element.name }
              Tổng: ${element.total}
              Sáng: ${element.morning}
              Trưa: ${element.midday}
              Chiều:${element.afternoon}
              Tối:${element.night}
              Ghi chú:${element.note}
              ` 
              this.infoModal.content += temp;
            });
          }else{
            this.infoModal.content = `Không có đơn thuốc nào được tìm thấy`
          }


    if(this.filesDisplay.length >0){
      this.infoModal.alternativeContent = ''
    }else{
        this.infoModal.alternativeContent = `Không có hình ảnh nào được tìm thấy`
    }
        
        }
        else {
          this.infoModal.content = `Không có bản ghi nào được tìm thấy`
          this.infoModal.alternativeContent = `Không có hình ảnh nào được tìm thấy`
        }


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
      }
    }
  }
</script>

<style scoped>
.btn-sub {
   border: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  padding: 6px;
  font-size: 14px;
  margin-left: 5px;
  cursor: pointer;
    }
.btn-sub img {
    height: 1.2em;
    width: 1.2em;
}
.subcriber input {
  border: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  padding: 4px;
  font-size: 14px;
  width: 20vw;
}
.details{
    cursor: pointer;
}
.details img{
  height: 1.3rem;
  width:1.3rem;
}
select{
    width: 50%;
}
.options select{
    width: 80px;
    margin-left: 1.5rem;
}
li{
  list-style: none;
}
.imageDisplay {
  height: 5rem;
  width: 5rem;
   cursor: pointer;
}

.imageDisplay img {
  width: 150px;
  border-radius: 2px;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
}
.full{
    position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width:40%;
  height:auto;
}

</style>