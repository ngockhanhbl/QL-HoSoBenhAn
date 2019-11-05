<template>
    <div class="pt-5 bg pb-5 bg" 
    :style="{
        'background-image':
          'url(' + require('@/assets/images/homeregister.jpg') + ') '
      }">
        <form action="" id="registerform">
            <div class="main_register m-auto ">
                <div class="col-sm-12 goback">
                    <button class="mt-1 mb-1" @click="goback"><img src="@/assets/images/left-arrow.svg">&ensp;Go back</button>
                </div>
                <div class="logo auto m-auto d-flex justify-content-center p_1r">
                    <img src="@/assets/images/logo705.png">
                </div>
                <div class="title auto m-auto d-flex justify-content-center p_1r "><strong>Mẫu Đăng Kí Bác Sĩ</strong></div>
                <div class="register">
                        <div class="formCus p_1r mlr_1-5r">
                            <div class="block">Tên</div>
                            <div class=" Custominput pr2"    >
                                <input type="text" placeholder="Họ và Tên Lót" style="width:100%;"  v-model="firstname">
                            </div>
                            <div class=" Custominput pl2"   >
                                <input type="text" placeholder="Tên" style="width:100%;" v-model="lastname">
                            </div>

                            <div class="block">Phòng ban</div>
                            <div class=" Custominput3 pr2"    >
                                <input type="text"  style="width:100%;"  v-model="department">
                            </div>
                            <div class="block">Chuyên môn</div>
                            <div class=" Custominput3 pr2"   >
                                <input type="text" style="width:100%;" v-model="specialize">
                            </div>

                            <div class="block">Ngày Sinh</div>
                            <div class=" Custominput2 pr2"    >
                                <input type="text" placeholder="Ngày" style="width:100%;" v-model="day" >
                            </div>
                            <div class=" Custominput2 pl2"   >
                                <input type="text" placeholder="Tháng" style="width:100%;" v-model="month">
                            </div>
                            <div class=" Custominput2 pl2"   >
                                <input type="text" placeholder="Năm" style="width:100%;" v-model="year">
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
                            <div class=" Custominput3 pr2"   >
                                <input type="text"  style="width:100%;"  v-model="cmnd">
                            </div>
                            <div class="block">Địa Chỉ Email</div>
                            <div class=" Custominput3 pr2"    >
                                <input type="text"  style="width:100%;"  v-model="email">
                            </div>
                            <div class="block">Mật Khẩu</div>
                            <div class=" Custominput3 pr2"   >
                                <input type="password"  style="width:100%;"  v-model="password" >
                            </div>
                            <br>
                            <div class="danger-alert" v-html="error" />
                            <br>    
                            <div class="agree_btn btn" @click="register"> ĐỒNG Ý</div> 
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
            roles:3,
            error:'',
            cmnd:'',
            firstname:'',
            lastname:'',
            day:'',
            month:'',
            year:'',
            phone:'',
            sex:'',
            address:'',
            email:'',
            password:'',
            department:'',
            specialize:'',
        }
    },
    computed: {
        ...mapGetters(["user"]),
    },
    methods: {
        async register () {
            if(!this.id_account){
                try {
                    const response = await AuthenticationService.register({
                    email: this.email,
                    password: this.password,
                    roles:this.roles
                    })
                    this.id_account = response.data.user.id
                    this.updatedInforUser();
                }catch (error) {
                        this.error = error.response.data.error
                    }
            }else{
                this.updatedInforUser();
            }
        },
        async updatedInforUser(){
            try {
                const response = await AuthenticationService.doctor({
                    id_account:this.id_account,
                    id_hospital:this.user.id,
                    department:this.department,
                    specialize:this.specialize,
                    firstname:this.firstname,
                    lastname:this.lastname,
                    day:this.day,
                    month:this.month,
                    year:this.year,
                    address:this.address,
                    sex:this.sex,
                    cmnd:this.cmnd,
                    phone:this.phone,
                })
                this.resetForm()        
                  this.$toasted.show("Thêm Thành công !!", { 
                    theme: "bubble", 
                    position: "bottom-right", 
                    duration : 5000
                });
                this.$forceUpdate();
             
            }catch (error) {
                this.error = error.response.data.error
                }            
        },
        resetForm(){
            this.id_account = '',
            this.roles = 3,
            this.error = '',
            this.cmnd = '',
            this.firstname = '',
            this.lastname = '',
            this.day = '',
            this.month = '',
            this.year = '',
            this.phone = '',
            this.sex = '',
            this.address = '',
            this.email = '',
            this.password = '',
            this.department = '',
            this.specialize = ''
        },
        async goback(){
            this.$router.go(-1);
        }
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
.goback{
    background: #ccccd6;
}
.goback img{
    height: 1rem;
    width: 1rem;
}
</style>
