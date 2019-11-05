<template>
    <div class="pt-5 bg pb-5 bg" 
    :style="{
        'background-image':
          'url(' + require('@/assets/images/homeregister.jpg') + ') '
      }">
        <form action="" id="registerform">
            <div class="main_register m-auto ">
                <div class="logo auto m-auto d-flex justify-content-center p_1r"><img src="@/assets/images/logo705.png"></div>
                <div class="title auto m-auto d-flex justify-content-center p_1r "><strong>Mẫu Cập Nhật Thông Tin Bệnh Nhân</strong></div>
                <div class="register">
                    <div class="infor p_1r mlr_1-5r">
                        <h5>Vui Lòng Cập Nhật Thông Tin</h5>
                    </div>
                        <div class="formCus p_1r mlr_1-5r">
                            <div class="block">Tên</div>
                            <div class=" Custominput pr2"    >
                                <input type="text" placeholder="Họ và Tên Lót" style="width:100%;"  v-model="firstname">
                            </div>
                            <div class=" Custominput pl2"   >
                                <input type="text" placeholder="Tên" style="width:100%;" v-model="lastname">
                            </div>

                            <div class="block">Ngày Sinh</div>
                            <div class=" Custominput2 pr2"    >
                                <input type="number" min="1" max="31" placeholder="Ngày" style="width:100%;" v-model="day" >
                            </div>
                            <div class=" Custominput2 pl2" >
                                <input type="number" min="1" max="12" placeholder="Tháng" style="width:100%;" v-model="month">
                            </div>
                            <div class=" Custominput2 pl2"   >
                                <input type="number" max="2019" placeholder="Năm" style="width:100%;" v-model="year">
                            </div>
                            <div class="block">Số Điện Thoại</div>
                            <div class=" Custominput3 pr2"    >
                                <input type="text"  style="width:100%;"  v-model="phone">
                            </div>
                            <div class="Custominput ">
                                Giới Tính:&emsp;
                                <input type="radio" name="gender" value="nam" v-model="sex"> Nam&ensp; 
                                <input type="radio" name="gender" value="nu" v-model="sex"> Nữ
                            </div>
 
                            <div class="block">Địa Chỉ</div>
                            <div class=" Custominput3 pr2"    >
                                <input type="text"  style="width:100%;" v-model="address" >
                            </div>
                            <div class="block">CMND</div>
                            <div class=" Custominput pr2"   >
                                <input type="text"  style="width:100%;" :disabled="checked" v-model="cmnd">
                            </div>
                            <div class=" Custominput pl-2 float-right">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="checked">
                                <label class="form-check-label" for="exampleCheck1">tôi dưới 14 tuổi</label>
                            </div>
                        <div class="block mt-5">Tôi muốn chế độ hồ sơ bệnh án của mình ở chế độ:</div>
                            <div class=" Custominput3 pr2"    >
                                <div class="block"><input type="radio" name="right" value="public" v-model="right">&ensp; Công khai</div>                         
                                <div class="block pt-1">
                                    <input type="radio" name="right" value="private" v-model="right">&ensp; Riêng tư
                                    <transition name="fade">
                                        <span class="pl-3" v-if="right">Mã cấp quyền: </span>
                                    </transition>
                                    <transition name="fade">
                                        <input type="text"  style="width:60%;"   v-model="valueRight" v-if="right">
                                    </transition>
                                </div>
                                
                            </div>
                            <div class="agree_label">
                                <div class="block">Chọn hình ảnh CMND / sổ hộ khẩu</div>
                                <div class=" Custominput pr2"    >
                                    <input type="file" @change="onFileChange" />
                                </div>
                                <div class=" Custominput pl2" >
                                    <img v-if="url" :src="url" />
                                </div>
                            </div>
                            <br>
                            <div class="danger-alert" v-html="error" />
                            <br>    
                            <div class="agree_btn btn" @click="updatedInforUser"> ĐỒNG Ý</div>                              
                        </div>
                        
                </div>
            </div>
        </form>        
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import { mapGetters} from "vuex";
export default {
    data(){
        return{
            id_account:'',
            roles:1,
            checked : false,
            url: null,
            error:'',
            firstname:'',
            lastname:'',
            day:'',
            month:'',
            year:'',
            phone:'',
            sex:'',
            address:'',
            cmnd:'',
            user:null
        }
    },
    // async beforeMount() {
    //     console.log('mouted ');
    //     const user = await localStorage.getItem('user');
    //     this.user = user;
    //     console.log(this.user)
    // },
    computed: {
        right: {
           get(){
               return this.$store.getters.right
            },
           set(payload){
                this.$store.dispatch("updateInformation",{
                    payloadValue: payload,
                    payloadRouter:'right'
                } );
           }
        },
        valueRight: {
           get(){
               return this.$store.getters.valueRight
            },
           set(payload){  
                this.$store.dispatch("updateInformation",{
                    payloadValue: payload,
                    payloadRouter:'valueRight'
                } );
           }
       },
    },
    methods: {
        onFileChange(e) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
        },
        async updatedInforUser(){
            const userCONST = JSON.parse(localStorage.getItem('user'));
            this.user = userCONST

            const userID = JSON.parse(localStorage.getItem('user')).id;
            
            try {
                if(userID){  //coi lai cho nay, vi sao khong vo ? // theem console.log cho modifiinformation
                    const response = await AuthenticationService.patient({
                        id_account:userID,
                        firstname:this.firstname,
                        lastname:this.lastname,
                        day:this.day,
                        month:this.month,
                        year:this.year,
                        address:this.address,
                        sex:this.sex,
                        cmnd:this.cmnd,
                        right:this.valueRight,
                        phone:this.phone,
                        image:this.url,
                    })
                    console.log(response.data)
                    //update field isUpdateInformation
                }else{
                    //do some thing
                }

                this.resetRegiserPatient();
                this.$router.push({
                    name:'patient',
                    params:{id: userID}
                })
                this.$store.dispatch("resetRight")             
            }catch (error) {             
                this.$toasted.show(`${error.response.data.error}`, { 
                    theme: "toasted-primary", 
                    position: "bottom-right", 
                    duration : 5000
                });
            }
        },
        resetRegiserPatient() {
            this.checked = false,
            this.right= false, 
            this.url= null,
            this.error='',
            this.firstname='',
            this.lastname='',
            this.day='',
            this.month='',
            this.year='',
            this.phone='',
            this.sex='',
            this.address='',
            this.cmnd='',
            this.valueRight=''
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
    background-size: cover;
}
.block{
    display:block;
}
.main_register{
    max-width: 800px;
    width: 100%;
    background:white;
    position: relative;
    z-index: 1;
    border-radius: 2px;
    background: white;
}
.p_1r{
    padding: 1rem;
}
.mlr_1-5r{
    margin: 0 1.5rem;
}
.infor h5{
    margin: 1.5rem 0 1rem;
}
.pl2{
    padding-left: 2px;
}
.pr2{
    padding-right:2px;
}
.formCus{
    width:90%;
}
.Custominput{
    display: inline-block;
    width: 49%;
    padding-top:1.2rem;
    padding-bottom:1.2rem;
}
.Custominput img {
  max-width: 100%;
  max-height: 500px;
}
.Custominput2{
    display: inline-block;
    width: 24.5%;
    padding-top:1.2rem;
    padding-bottom:1.2rem;
}
.Custominput2:last-child{
    width: 49%;
}
.Custominput3{
    width: 100%;
    padding-top:1.2rem;
    padding-bottom:1.2rem;
    display: block;
}
input{
    border: none;
    border-bottom: 1px solid rgba(0,0,0,.12);
    padding: 5px 0;
}
.title strong{
    font-size: 1.3rem;
}
.agree_label{
    border-bottom: 1px solid rgba(0,0,0,.12);
    padding: 1.2rem 0;
}
.agree_btn{
    border: 1px solid #53c9ff;
    border-radius: 2px;
    background: #53c9ff;
    margin: 1.2rem 0 0;
    display: block;
    width: 6rem;
    color:#3b3b3b;
}
.agree_btn:hover{
    cursor: pointer;
}
input:focus::-webkit-input-placeholder {
    color: gray;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.danger-alert{
    color:red;
}
p{
    line-height: 24px;
}
</style>

