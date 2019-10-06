<template>
  <div>
      <div class="timeline" v-if="patient_records.length && this.isUserLoggedIn && this.condition2">
        <ul>
          <li v-for="(record, index ) in patient_records" :key="record.patient_id">
            <div class="content">
              <h3>{{record.patient_title}}</h3>
              <div class="location pt-2 pb-3">
                <img src="@/assets/images/placeholder.svg" /><span class="pl-2">{{record.patient_location}}</span>
              </div>
              <p class="record_patient_content"> <span class="diagnose">Chẩn đoán:</span>&ensp;{{record.patient_content}}</p>
              <p class="record_patient_detail" @click="info(record, index, $event.target)"> Xem chi tiết thuốc và lời dặn của bác sĩ</p>
              <p class="doctor"><img src="@/assets/images/doctor1.svg" /><span class="pl-2 doctor_content">{{arrayNameDoctor[index]}}</span></p>
            </div>
            <div class="time">
              <h4>{{record.patient_time}}</h4>             
            </div>
          </li>
          <div style="clear:both;"></div>
        </ul>
        <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
          <pre>{{ infoModal.content }}</pre>
          <pre>{{ infoModal.alternativeContent }}</pre>
      
          <div class="row">
              <span v-for="(item,index) in filesDisplay" :key="index" class="row pl-5"> 
                <img :src="filesDisplay[index].url" alt="err" class="imageDisplay" @click.prevent="filesDisplay[index].isClick = !filesDisplay[index].isClick" :class="{full : filesDisplay[index].isClick}" >
              </span>
          </div>
        </b-modal>
      </div>
      <div class="text-center pb-5 pt-5 mt-3 mb-3" v-else>Chưa có hồ sơ bệnh án nào được tìm thấy</div>
  </div>
</template>

<script>
import { mapGetters} from "vuex";
import PatientService from '@/services/PatientService'
import DrugService from '@/services/DrugService'
export default {
  data(){
      return{
        showModal: false,
        fullWidthImage: false,
        infoModal: {
            id: 'info-modal',
            title: '',
            content: ''
          },
        arrayNameDoctor:[],
        condition2:false,
        filesDisplay: [],
        filesDisplay2:[],
        user:null,
        get isUserLoggedIn() {
          return localStorage.getItem('isUserLoggedIn' || false);
        }
      }
    },
computed: {
        ...mapGetters(["patient_records","patient_records_details","nameDoctorWrite_records","patientInfo","AlternativeRecord"])
    },
    async mounted() {
      const userCONST = JSON.parse(localStorage.getItem('user'));
      this.user = userCONST
      const userID = JSON.parse(localStorage.getItem('user')).id;

      this.user = userCONST;
      if(this.user.roles == 1){
        const id_patient = this.user.id
        const payload = (await PatientService.show(id_patient)).data
        if(payload.length > 0){
            this.$store.dispatch("update_inforRecordsPatientDetail",payload)
            const lengthRecord = payload.length
            const idDoctorWriteRecord = []
            for(let i = 0 ;i<lengthRecord;i++){
              idDoctorWriteRecord[i]= payload[i].id_doctor
            }
            const ArrayNameDoctor = (await PatientService.get_nameDoctorRecordPatient(
              {id_doctor:idDoctorWriteRecord})).data
              this.$store.dispatch("set_nameDoctorWrite_records",ArrayNameDoctor)


              const _DrugRecord = (await DrugService.get_DrugRecordPatient({
                id_account: 0
              })).data
              
          this.$store.dispatch("set_patient_records_details",_DrugRecord);


          const _AlternativeRecord = (await PatientService.get_AlternativeRecord(payload[0].id_patient)).data
          this.$store.dispatch("set_AlternativeRecord",_AlternativeRecord);
          let lengthOfAlternativeRecord = _AlternativeRecord.length

          for(let i = 0;i<lengthOfAlternativeRecord;i++ ){
            for(let index = 0;index <_AlternativeRecord[i].length;index++ ){
              if(_AlternativeRecord[i][index].image ){
                try{
                  let base64String = btoa(
                  new Uint8Array(_AlternativeRecord[i][index].image.data)
                      .reduce((data, byte) => data + String.fromCharCode(byte), '')
                  );
                    var files_temp = {
                      url:null,
                      id_record:null,
                      isClick:false
                    };
                  files_temp.url = new Buffer(base64String, 'base64')
                  files_temp.id_record = _AlternativeRecord[i][index].id_record
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
     }
     else if(this.user.roles == 3){
       const id_patient = this.patientInfo.id_account
        const payload = (await PatientService.show(id_patient)).data
        if(payload.length){
          this.$store.dispatch("update_inforRecordsPatientDetail",payload)  //lay ra record patient
          const lengthRecord = payload.length
          const idDoctorWriteRecord = []
          for(let i = 0 ;i<lengthRecord;i++){
            idDoctorWriteRecord[i]= payload[i].id_doctor
          }
          const ArrayNameDoctor = (await PatientService.get_nameDoctorRecordPatient(
            {id_doctor:idDoctorWriteRecord})).data
          this.$store.dispatch("set_nameDoctorWrite_records",ArrayNameDoctor)

          const _DrugRecord = (await DrugService.get_DrugRecordPatient({
            id_account: 0
          })).data

          
        this.$store.dispatch("set_patient_records_details",_DrugRecord)
        const _AlternativeRecord = (await PatientService.get_AlternativeRecord(id_patient)).data
        this.$store.dispatch("set_AlternativeRecord",_AlternativeRecord);
        let lengthOfAlternativeRecord = _AlternativeRecord.length
        
        for(let i = 0;i<lengthOfAlternativeRecord;i++ ){
          for(let index = 0;index <_AlternativeRecord[i].length;index++ ){
            if(_AlternativeRecord[i][index].image ){
              try{
                let base64String = btoa(
                new Uint8Array(_AlternativeRecord[i][index].image.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                  var files_temp = {
                    url:null,
                    id_record:null,
                    isClick:false
                  };
                files_temp.url = new Buffer(base64String, 'base64')
                files_temp.id_record = _AlternativeRecord[i][index].id_record
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




        }

        if(this.patient_records && this.nameDoctorWrite_records){   
          for(let index = 0 ;index<this.patient_records.length;index++){
            for(let i = 0;i<this.nameDoctorWrite_records.length;i++){
              if(this.nameDoctorWrite_records[i].id_account == this.patient_records[index].id_doctor){        
                let name = this.nameDoctorWrite_records[i].firstname +' '+this.nameDoctorWrite_records[i].lastname
                  this.arrayNameDoctor[index] = name
              }
            }
          }
          this.condition2 = true

      }
    },
    methods:{
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
    }
}
</script>

<style scoped>
  body{
     margin: 0;
     padding: 0;
  }
  .timeline{
    position: relative;
    margin: 50px auto;
    padding: 40px 0;
    width: 1000px;
    box-sizing: border-box;
  }
  .timeline::before{
    content: '';
    position: absolute;
    left: 50%;
    width: 2px;
    height: 100%;
    background: #c5c5c5;

  }
  .timeline ul {
     margin: 0;
     padding: 0;
  }
  .timeline ul li{
     list-style: none;
     position: relative;
     width: 50%;
     padding:20px 40px;
     box-sizing: border-box;
  }
  .timeline ul li:nth-child(odd) {
     float: left;
     text-align: right;
     clear: both;
  }
  .timeline ul li:nth-child(even) {
     float: right;
     text-align: left;
     clear: both;
  }
  .content{
    padding-bottom: 20px;
  }
  .timeline ul li:nth-child(odd)::before {
    content: '';
    position: absolute;
    top: 24px;
    right: -6px;
    width: 10px;
    height:  10px;
    background:rgb(64, 196, 255);
   
    border-radius: 50%;
    box-shadow: 0 0 0 3px rgb(64, 196, 255, .2);
      
  }
  .timeline ul li:nth-child(even)::before {
    content: '';
    position: absolute;
    top: 24px;
    left: -4px;
    width: 10px;
    height:  10px;
    background:rgb(64, 196, 255);
     
    border-radius: 50%;
    box-shadow: 0 0 0 3px rgb(64, 196, 255,.2);
   
  }
.timeline ul li h3{
    margin: 0;
    padding: 0;
    /* font-weight: 600;
    color:rgb(64, 196, 255); */
    color:#e92163;
    /* color: #162138;    */
}
.timeline ul li p{
    margin: 10px 0 0;
    padding: 0;
}
.timeline ul li .time h4 {
    margin: 0;
    padding: 0;
    font-size: 14px;
}

.timeline ul li:nth-child(odd) .time{
  position: absolute;
  top: 12px;
  right: -140px;
  margin: 0;
  padding:  8px 16px;
  background: rgb(64, 196, 255);
  color: #fff;
  border-radius: 18px;
  box-shadow: 0 0 0 3px rgb(64, 196, 255,.3);

}

.timeline ul li:nth-child(even) .time{
  position: absolute;
  top: 12px;
  left: -140px;
  margin: 0;
  padding:  8px 16px;
  background: rgb(64, 196, 255);
  color: #fff;
  border-radius: 18px;
  box-shadow: 0 0 0 3px rgb(64, 196, 255,.3);
}
.location img{
  height: 1rem;
  width:  1rem;
}
.location{
  color:#A9A9A9
}

.doctor_content{
  color: rgb(9, 11, 12, .8)
}

.diagnose{
  font-weight: 600;
}
.record_patient_detail{
  /* border-bottom: 2px solid rgb(64, 196, 255); */
  text-decoration: underline;
  cursor: pointer;
  color: #0070c9;
}
.doctor img{
  height: 1.2rem;
  width: 1.2rem;
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



@media(max-width: 1000px){
    .timeline{
      width: 100%;     
    }
}


@media(max-width: 767px)
{
    .timeline {
      width: 100%;
      padding-bottom: 0;     
    }
    .timeline::before{
      left: 20px;
    }
    .timeline ul li:nth-child(odd),
    .timeline ul li:nth-child(even)
    {
      width: 100%;      
      text-align: left;
      padding-left:50px;
      padding-bottom: 50px; 

    }

    .timeline ul li:nth-child(odd)::before,
    .timeline ul li:nth-child(even)::before
     {
      top: -18px;
      left: 16px;    
    }
  
        
    .timeline ul li:nth-child(odd) .time,
    .timeline ul li:nth-child(even) .time
    {
      top: -30px;
      left: 50px;
      right:inherit;
    }

    .timeline ul li:nth-child(odd) .location,
    .timeline ul li:nth-child(even) .location
    {
      top:0;
      left: 30px;
      right:inherit;
    }
    .timeline ul li h3{
        padding-top: 1rem;
    }

}


</style>
