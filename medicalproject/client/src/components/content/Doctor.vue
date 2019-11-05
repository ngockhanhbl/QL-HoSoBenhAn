<template>
  <div>
      <div class="container pt-5 mb-5" v-if="isUserLoggedIn">
        <div class="search" v-bind:class="{ CenterCSS: !this.Istruycap }">
          <h3 class="text-center title">TÌM KIẾM BỆNH NHÂN  testing@gmail.com</h3>
          <div class="content m-auto">
            <div class="col-md-12 col-sm-12 row" v-if="isWriteRecord">
              <div class="p-2 col-sm-6 text-right">
                <!-- THEM HO SO MOI -->
                  <div class="btn btn-success" v-b-modal.modal-1>Thêm mới hồ sơ </div>
                  
                  <b-modal id="modal-1" size='lg' title="Thêm bệnh án bệnh nhân">
                    <div class="row col-sm-12">
                        <div class="col-sm-3 p-2">Triệu chứng, lý do</div>
                        <div class="col-sm-9 p-2">
                          <input type="text"  style="width:100%;"  v-model="titleRecord" class="pl-1">
                        </div>
                    </div>
                    <div class="row col-sm-12">
                        <div class="col-sm-3 p-2">Chẩn đoán</div>
                        <div class="col-sm-9 p-2">
                          <input type="text"  style="width:100%;"  v-model="diagnoseRecord" class="pl-1">
                        </div>
                    </div>
                    <div class="row col-sm-12 text-left">
                      <div class="col-sm-12 d-flex">
                          <div class="add pb-3" @click="addNewDrugRecord">
                            <img src="@/assets/images/plus.svg" />
                          </div>
                          <div class="add add2 pb-3 pl-4" @click="isHideNewAlternativeRecord = false " v-show='isHideNewAlternativeRecord'>
                            <img src="@/assets/images/add-image.svg" />
                          </div>
                      </div>
                <span style="width:100%"  v-if="!isHideNewAlternativeRecord">
                  <div class="form col-sm-12 col-md-12 mb-2">
                        <div class="row pb-2 mx-1 justify-content-between">
                          <strong class="colorFile">File Image </strong>
                          <div class="close" @click="isHideNewAlternativeRecord = true, messageError = '' ">x</div>
                        </div>
                          <div class="row pb-2">
                                <div class="col-sm-3">
                                  <label>Chọn File <input type="file" multiple ref="files" id="files" accept="image/*" @change="handleFilesUpload()" /></label>
                                </div> 
                                <div class="col-sm-9">
                                  <button v-on:click="addFiles()">Add Files</button>
                                </div>
                                <div class="alert-error p-2" v-if="messageError">{{messageError}}</div>
                          </div>
      <hr>                   
                          <div class="row">
                                <div class="col-sm-12">
                                  <textarea v-model="describe" placeholder="Mô tả"></textarea>
                                </div>
                          </div>
      <hr>                   
                          <div class="row mx-1" v-if="files">
                            <div v-for="(file, key) in files" class="file-listing d-flex justify-content-between py-1 d-block">          
                                <img class="preview" :src="file.image" />
                                <span class="d-flex align-items-center name-preview">{{ file.file }}</span>
                                <span class="d-flex align-items-center btn btn-sm btn-warning pointer " @click="removeImage( key )">
                                  Xóa
                                </span>
                            </div>
                          </div>
                        </div>
                  </span>

                      <div class="form col-sm-12 col-md-12 mb-2" v-for="(newDrug,index) in NewDrugs" :key="index +'-key'">
                        <!-- <div class="row justify-content-end mr-3 "></div> -->
                      <div class="row pb-2 mx-1 justify-content-between">
                        <strong class="colorDrug">STT Thuốc {{index+1}}</strong>
                        <div class="close" @click="removeNewDrugRecord(index)">x</div>
                      </div>
                        <div class="row pb-2">
                              <div class="col-sm-2">Tên thuốc</div>
                              <div class="col-sm-7">
                                <input type="text" list="LoadListDrug"  style="width:100%;"  v-model="newDrug.name" class="pl-1">
                                  <datalist id="LoadListDrug">
                                    <option v-for="(drug,index) in LoadListDrug" :key="index">{{drug}}</option>
                                  </datalist>
                              </div>        
                              <div class="col-sm-3 symbol">
                                <select v-model="selected">
                                  <option disabled value="">Tải DS Thuốc</option>
                                  <option value="LoadListHopital">Từ Bệnh Viện</option>
                                  <option value="LoadListSystem">Từ Hệ Thống</option>
                                  <option value="None">Không</option>
                                </select>
                              </div>           
                        </div>
                        <div class="row">
                              <div class="col-sm-2">Số lượng</div>
                              <div class="col-sm-7 ">
                                <input type="number" min="0"  style="width:100%;"   v-model="newDrug.total" class="pl-1">
                              </div>
                        </div> 
    <hr>
                        <div class="row">
                              <div class="col-sm-3">
                                <input type="text"  style="width:100%;"   v-model="newDrug.morning" placeholder="Sáng">
                              </div>
                              <div class="col-sm-3">
                                <input type="text"  style="width:100%;"   v-model="newDrug.midday" placeholder="Trưa">
                              </div>
                              <div class="col-sm-3">
                                <input type="text"  style="width:100%;"   v-model="newDrug.afternoon" placeholder="Chiều">
                              </div>
                              <div class="col-sm-3">
                                <input type="text"  style="width:100%;"   v-model="newDrug.night" placeholder="Tối">
                              </div>
                        </div> 
    <hr>                   
                        <div class="row">
                              <div class="col-sm-12">
                                <textarea v-model="newDrug.note" placeholder="Ghi chú"></textarea>
                              </div>
                        </div>
                      </div>
                    </div>
                        <template slot="modal-footer">
                          <b-button size="sm" variant="success" @click="checkForm()">
                            Lưu hồ sơ
                          </b-button>
                          <b-button size="sm" variant="danger" @click="close()">
                            Hủy{{this.NewDrugs.id_record}}
                          </b-button>
                        </template>
                    
                  </b-modal>
                  
              </div>
              <div class="p-2 col-sm-6">
                <b-button variant="secondary" @click="end">Kết thúc</b-button>
              </div>
            </div>
            <span v-else>
                <div class="col-md-12 col-sm-12 row" v-if="doctorInfo">
                  <div class="pb-3 col-sm-12 text-right">Xin chào bác sĩ {{doctorInfo.firstname}} {{doctorInfo.lastname}}

                    <b-dropdown size="sm" dropleft variant="link" toggle-class="text-decoration-none" no-caret>
                      <template v-slot:button-content>
                        &#9656;<span class="sr-only">Search</span>
                      </template>
                      <b-dropdown-item v-b-modal.modal-3>Đổi Mật Khẩu</b-dropdown-item>
                    </b-dropdown>

                      <b-modal id="modal-3" title="Đổi Mật Khẩu">
                        <b class="my-4 d-flex justify-content-start">Nhập Mật Khẩu Bạn Muốn Đổi:</b>
                        <p class="my-4"><input type="password" placeholder="nhập mật khẩu" class="inputStyle" v-model="passwordchangeValue"></p>
                        <p class="my-4"><input type="password" placeholder="nhập lại mật khẩu" class="inputStyle" v-model="passwordchangeValueAgain"></p>
                        <template v-slot:modal-footer>
                          <div class="w-100">
                            <b-button
                              variant="warning"
                              size="sm"
                              class="float-right ml-3"
                              @click="validationPasswordChange"
                            >
                              Gửi Yêu Cầu Đổi Mật Khẩu
                            </b-button>
                            
                            <b-button
                              variant="primary"
                              size="sm"
                              class="float-right"
                              @click="closeModal3"
                            >
                              Đóng
                            </b-button>
                          </div>
                        </template>
                      </b-modal>

                  </div>
                
                </div>
                <div class="col-md-12 col-sm-12 row">
                  <div class="p-2 col-sm-6 text-right">Nhập username bệnh nhân:</div>
                  <div class="p-2 col-sm-6"><input type="text" style="width:60%;" v-model="doctor_email_record" ></div>
                </div>
                <div class="col-md-12 col-sm-12 row pb-3">
                  <div class="p-2 col-sm-6 text-right">Nhập quyền truy cập (nếu có):</div>
                  <div class="p-2 col-sm-6"><input type="text"  style="width:60%;" v-model="doctor_right_record" ></div>
                </div>
                <div v-if="error_access_record" class="alert-error">{{error_access_record}}</div>
                <div class="d-flex justify-content-center btn-cus">
                  <div class="btn btn-success mr-2" @click="getUserRecords">Truy Cập</div>
                  <div class="btn cancel-btn ml-2" @click="refresh">Làm mới</div>
                </div>
            </span>
          </div>
        </div>

        <div class="search" v-if="this.Istruycap">
          <h3 class="text-center title">Hồ sơ bệnh nhân</h3>
            <div class="content">
              <div>
                  <b-tabs card >
                    <b-tab title="Hồ Sơ Bệnh Án" active><app-TimeLine /></b-tab>
                    <b-tab title="Dữ Liệu Bệnh Nhân"><app-PatientData /></b-tab>
                  </b-tabs>
            </div>
            </div>

        </div>
          
      </div>
      <div v-else>
        <app-PageNotFound />
      </div>
  </div>
</template>

<script>
import { mapGetters} from "vuex";
import DoctorService from '@/services/DoctorService'
import PageNotFound from '@/components/content/PageNotFound.vue'
import PatientView from '@/components/content/patient_modules/PatientView.vue'
import PatientData from '@/components/content/patient_modules/PatientData.vue'
import PatientService from '@/services/PatientService'
import HospitalService from '@/services/HospitalService'
import axios from 'axios'
export default {
  data(){
        return{
            messageError:'',
            selected:'',
            doctor_email_record:'',          
            doctor_right_record:'',
            isWriteRecord:false,
            error_access_record:null,
            titleRecord:'',
            diagnoseRecord:'',
            errors: null,
            Istruycap:false,
            idRecord:null,
            describe:'',
            listSystem:'',
            listDrug:'',
            passwordchangeValue:'',
            passwordchangeValueAgain:'',
            get isUserLoggedIn() {
                return localStorage.getItem('isUserLoggedIn' || false);
              },
            NewDrugs:[
              {
                name:'',
                id_record:'',
                total:'',
                morning:'',
                midday:'',
                afternoon:'',
                night:'',
                note:'',
              }
            ],
            
            files: [],
            isHideNewAlternativeRecord:true
        }
    },
      computed: {
        ...mapGetters(["patient_records","doctorInfo","hospitalInfo","patientInfo"]),
        LoadListDrug: function () {
          if(this.selected == 'LoadListHopital'){
            return this.listDrug;
          }else if(this.selected == 'LoadListSystem'){
            return this.listSystem;
          }else{
            return '';
          }
        }
      },
      components: {
        "app-TimeLine": PatientView,  
        "app-PatientData": PatientData,
        "app-PageNotFound":PageNotFound
      },
    async mounted() {
        const userCONST = JSON.parse(localStorage.getItem('user'));

        if(userCONST){
          this.user = userCONST
          const id_account = JSON.parse(localStorage.getItem('user')).id;

          const payload_doctor = (await DoctorService.getInfoDoctor(id_account)).data
          this.$store.dispatch("setDoctorInfo",payload_doctor)

          const payload_hospital = (await HospitalService.getInfoHospital(payload_doctor.id_hospital)).data
          this.$store.dispatch("setHospitalInfo",payload_hospital);

          const ListDrugHospital = (await HospitalService.getListDrugBank(userCONST.id)).data;
          this.listDrug = ListDrugHospital.map(x=>x.tenThuoc)
        }
        await axios
        .get('https://www.drugbank.vn/services/drugbank/api/public/thuoc?page=1&size=2000&fbclid=IwAR1vamwLTdSmIx8idqXMjg77a18AZ4nZYROoLE8dTTAR0sS4EUlvt7W3lMQ')
        .then(response => (this.listSystem = response.data.filter(x=>x.tenThuoc).map(x=>x.tenThuoc)));
      },
  methods: {
      validationPasswordChange(){
        if(!this.passwordchangeValue || !this.passwordchangeValueAgain){
            this.$toasted.show('Vui Lòng Nhập Đầy Đủ Thông Tin !!!', { 
            theme: "bubble",
            position: "bottom-right", 
            duration : 4000
        });
        }else if(this.passwordchangeValue !== this.passwordchangeValueAgain){
          this.$toasted.show(`Mật Khẩu Và Mật Khẩu Xác Nhận Không Giống Nhau !!!<br>Vui Lòng Kiểm Tra Lại !!!`, { 
            theme: "bubble", 
            position: "bottom-right", 
            duration : 5000
        });
        }else if(this.passwordchangeValue.length < 8){
          this.$toasted.show(`Mật khẩu được cung cấp phải khớp với các quy tắc sau:\n            <br><br>\n            1. Nó phải chứa chỉ các ký tự sau: chữ thường, chữ hoa, chữ số.\n            <br><br>\n            2. mật khẩu dài ít nhất 8 kí tự và không dài hơn 32 kí tự.\n            </div>\n        `, { 
            theme: "bubble", 
            position: "bottom-right", 
            duration : 4000
        });
        }else{
          this.changepassword();
          this.closeModal3();
        }
    },
    closeModal3(){
        this.passwordchangeValue = ''
        this.passwordchangeValueAgain = ''
        this.$root.$emit('bv::hide::modal', "modal-3", "button")
      },
    async changepassword(){
        try {
            await PatientService.changePassword({
              id_account:this.user.id,
              password:this.passwordchangeValue
          })
        } catch (error) {
          this.ErrorToasted(error)
        }

            this.$toasted.show(`Cập Nhập Thành công !!`, { 
              theme: "bubble",
              position: "bottom-right", 
              duration : 3000
          });
      },
    addFiles(){
      this.$refs.files.click()
    },
    checkForm: function (e) {
      if (this.titleRecord && this.diagnoseRecord) {
        this.save()
      }
      this.errors = '';

      if (!this.titleRecord) {
        this.errors += 'Vui lòng nhập triệu chứng, lý do. <br> ';
      }
      if (!this.diagnoseRecord) {
        this.errors += 'Vui lòng nhập chẩn đoán.';
      }
        this.$toasted.show(`${this.errors}`, {
          theme: "bubble", 
          position: "bottom-right", 
          duration : 2000
      });
      this.errors = ''

    },
    handleFilesUpload () {
      const allowedTypes = ['image/jpeg','image/svg+xml','image/png',"image/gif"];
        let isError = true
        this.messageError = "";
        
        let checkFilesUpload = this.$refs.files.files
        let vm = this
        // validate file
        for (var i = 0; i < checkFilesUpload.length; i++) {
          if(allowedTypes.includes(checkFilesUpload[i].type)){
            isError = false
          }else{
            this.messageError = `Định dạng không cho phép !!! 
            Định dạng hình ảnh bao gồm image/jpeg || image/png || image/gif || image/svg  `;
          }
        }
        
        
        if(!isError){
          let uploadedFiles = this.$refs.files.files
          for (var i = 0; i < uploadedFiles.length; i++) {
            let reader = new FileReader()
            reader.onload = function () {
              vm.files.push({image: reader.result, file: reader.fileName})
            }
            reader.fileName = uploadedFiles[i].name
            reader.readAsDataURL(uploadedFiles[i])
          }
       }

    },
    removeFile (key) {
      this.files.splice(key, 1)
    },
    removeImage (key) {
      this.files.splice(key, 1)
    },
    close(){
       this.messageError = "";
       this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow');
    },
    addNewDrugRecord(){
     this.NewDrugs.push({
        name:'',
        id_record:'',
        total:'',
        morning:'',
        midday:'',
        afternoon:'',
        night:'',
        note:'',
        user:null
     })
    },
    removeNewDrugRecord(index){
      this.NewDrugs.splice(index, 1);
    },
    refresh(){
       this.doctor_email_record = ''
       this.doctor_right_record = ''
    },
      async getUserRecords(){
        try {
            const response = (await DoctorService.getUserRecords({
                email: this.doctor_email_record,
                right: this.doctor_right_record
            })).data
            this.$store.dispatch("set_patientInfo",response)    
            const _patientrecords = (await PatientService.show(response.id_account)).data
            this.$store.dispatch("update_inforRecordsPatientDetail",_patientrecords)
            this.isWriteRecord = true;
            this.Istruycap = true;
        }catch (error) {
            this.error_access_record = error.response.data.error
            }
      },
      end(){
        this.Istruycap = false;
        this.messageError = "";
        this.isWriteRecord = false;
        this.$store.dispatch("resetPatient_records");
        localStorage.removeItem('patient_records');
      },
      resetForm(){
            this.doctor_email_record = '',
            this.doctor_right_record='',
            // this.isWriteRecord=false,
            this.error_access_record=null,
            this.titleRecord='',
            this.diagnoseRecord='',
            // this.Istruycap = false,
            this.errors = [],
            this.idRecord = null,
            this.NewDrugs=[
              {
                name:'',
                id_record:'',
                total:'',
                morning:'',
                midday:'',
                afternoon:'',
                night:'',
                note:'',            
              }
            ]
            this.describe = '',
            this.files = [],
            this.isHideNewAlternativeRecord = true
          this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')     
      },
      async save(){
                try {
                    const response = (await DoctorService.saveRecord({
                    id_patient: this.patientInfo.id_account,
                    id_doctor: this.user.id,
                    patient_title:this.titleRecord,
                    patient_location:this.hospitalInfo.name_hospital,
                    patient_time: new Date().toISOString().slice(0,10),
                    patient_content: this.diagnoseRecord
                    })).data
                    this.idRecord = response.id
      
                    this.NewDrugs.forEach(element => {
                      element.id_record = this.idRecord
                    });
                }catch (error) {
                  this.error = error.response.data.error
                }

              if(this.NewDrugs.name){
                try {
                    const length =  this.NewDrugs.length
                    const response = await DoctorService.saveDrugRecord({
                      objects_drug:this.NewDrugs,
                       length:length
                    })
                }catch (error) {
                    this.error = error.response.data.error
                    }
              }

                if(this.files){
                  try {
                    let length =  this.files.length
                    const response = await DoctorService.saveAlternativeRecords({
                      objects_files:this.files,
                      describe:this.describe,
                      id_record:this.idRecord,
                      length:length,
                    })
                }catch (error) {
                    this.error = error.response.data.error
                    }
                }
                  this.$toasted.show(`Thành công !!`, { 
                    theme: "bubble", 
                    position: "bottom-right", 
                    duration : 2000
                });
                // this.getUserRecords();
                this.resetForm()

                
      }
  },
}
</script>

<style scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}
.title{
  margin: 0;
  border-bottom: none !important;
  background: #40c4ff;
  color:white;
}
.search h3{
  padding:0.5rem;
  border: 2px solid #40c4ff;
}
.content{
  padding:0.5rem;
  border: 2px solid #40c4ff;
}
input{
  border:1px solid rgb(0, 0, 0,.3);
  border-radius: 2px;
}
.btn-cus{
  padding-left: 28vw;
}
.cancel-btn{
    border: 1px solid #ccd0d5;
    border-radius: 2px;
    background-color: #f5f6f7;
    cursor: pointer;
}   
.card-header-tabs{
  padding: 10rem;
  color: red;
}
.alert-error{
  text-align: center;
  color: red;
}
.add img{
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
}
.add2 img{
  border-radius: 0;
}
.add{
  cursor: pointer;
}
.add img:hover{
    -webkit-box-shadow: 2px 2px 15px 0px rgba(183,214,240,1);
    -moz-box-shadow: 2px 2px 15px 0px rgba(183,214,240,1);
    box-shadow: 2px 2px 15px 0px rgba(183,214,240,1);
}
.close{
  cursor: pointer;
}
.close:hover{
    -webkit-box-shadow: 2px 2px 5px 0px rgba(183,214,240,1);
    -moz-box-shadow: 2px 2px 5px 0px rgba(183,214,240,1);
    box-shadow: 2px 2px 5px 0px rgba(183,214,240,1);
}
textarea
{
  width:100%;
}
.form{
  padding:0.5rem;
  border: 1px solid rgb(0, 0, 0,.4)
}
.danger-alert{
  color:red
}
.Custominput img {
  max-width: 100%;
  max-height: 500px;
}
.colorDrug{
  color: #F44336;
}
.colorFile{
  color:#9C27B0;
}
input[type="file"]{
  position: absolute;
  top: -500px;
}
div.file-listing img{
  max-width: 40%;
}
.name-preview{
  border:1px solid rgb(170, 170, 170,.3);
  padding:0.5rem;
  overflow: overlay;
  max-width: 300px;
  word-wrap: break-word;
}
.pointer{
  cursor: pointer;
}
.CenterCSS{
  margin-bottom: 10vh;
  margin-top: 9vh;
}
.inputStyle{
  padding: 0.25rem;
  border:1px solid #aaa;
  border-radius:4px;
  width:100%;
}
.symbol span{
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
