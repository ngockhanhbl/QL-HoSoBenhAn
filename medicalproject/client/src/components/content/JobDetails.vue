<template>
<div class="pt-5" v-if="jobs">
    <div class="bg-light">
        <div class="section-jobs">
            <div class="title d-flex">
                <strong>{{jobs.name}}</strong>         
            </div>
            <div> 
                <div class="careers">
                  <div class="d-flex">
                    <p class="icon mr-3"><img src="@/assets/images/gear.svg" /> <span class="pl-1">{{jobs.type}}</span></p>
                    <p class="icon mx-3"><img src="@/assets/images/placeholder.svg" /> <span class="pl-1">{{jobs.location}}</span></p>
                    <p class="icon mx-3"><img src="@/assets/images/calendar.svg" /> <span class="pl-1">{{jobs.createdAt.slice(8, 10)}} - {{jobs.createdAt.slice(5, 7)}} - {{jobs.createdAt.slice(0, 4)}}</span></p>
                  </div>
                    <div class="details">
                        <div>
                            <h3>Mô Tả Công Việc</h3>
                            <div v-html="jobdetails.description"></div>
                        </div>
                        <div>
                            <h3>Lợi Ích</h3>
                            <div v-html="jobdetails.benefit"></div>
                        </div>
                        <div>
                            <h3>Yêu Cầu</h3>
                            <div v-html="jobdetails.requirement"></div>
                        </div>
                    </div> 
                </div>
            </div>

        </div>
        <div class="apply d-flex" >
            <div v-b-modal.modal-apply class="applynow"> Apply now </div>
        </div>
        <b-modal id="modal-apply" ref="modal-apply" title="Mẫu Ứng Tuyển">
            <div>
                <div class="my-2 d-flex">
                    <p class="col-sm-3 title_editor">Họ Và Tên:</p>
                    <span class="col-sm-9">
                        <input type="text"  v-model="name_user_apply" class="width-100 style_input">
                    </span>
                </div>
                <div class="my-2 d-flex">
                    <p class="col-sm-3 title_editor">Email:</p>
                    <span class="col-sm-9">
                        <input type="text" placeholder="Nhập email của bạn"  v-model="email_user_apply" class="width-100 style_input">
                    </span>
                </div>
                <div class="my-2 d-flex">
                    <p class="col-sm-3 title_editor">SĐT:</p>
                    <span class="col-sm-9">
                        <input type="number"  v-model="phone_user_apply" class="width-100 style_input">
                    </span>
                </div>
                <div class="my-2 d-flex">
                    <p class="col-sm-3 title_editor">Ý Kiến</p>
                    <span class="col-sm-9">
                        <textarea style_input  rows="5" placeholder="Nêu nhiều ví dụ cụ thể để làm hồ sơ ứng tuyển của bạn thuyết phục hơn..." v-model="comments_user_apply" class="width-100 style_input"></textarea>
                    </span>
                </div>
                <div class="my-2 d-flex">
                    <p class="col-sm-3 title_editor">CV</p>
                    <span class="col-sm-9">
                        <b-form-file
                            v-model="file"
                            accept="image/*,application/pdf"
                            @change="onFileChange"
                            :state="Boolean(file)"
                            placeholder="Chọn File Hoặc Kéo Thả Ở Đây..."
                            drop-placeholder="Kéo Thả Ở Đây..."
                        >
                            <div class="mt-3">File Đã Chọn: {{file ? file.name : ''}}</div>
                        </b-form-file>
                    </span>
                </div>

            </div>
            <template v-slot:modal-footer>
                <div class="w-100">
                <b-button
                    variant="secondary"
                    size="sm"
                    class="float-left text-white"
                    @click="CloseModalApply"
                >
                    Đóng
                </b-button>
                <b-button
                    variant="warning"
                    size="sm"
                    class="float-right icon text-white"
                    @click="checkform('modify')"
                >
                    <img src="@/assets/images/send.svg" /> Ứng Tuyển
                </b-button>
                </div>
            </template>
        </b-modal>
    </div>
</div>
</template>

<script>
import { mapGetters} from "vuex";
import AdminService from '@/services/AdminService'
import GeneralService from '@/services/GeneralService'
import {db, storage} from '../firebaseInit'
import firebase from 'firebase/app'
export default {
    data(){
        return {
            jobs:null,
            jobdetails:null,
            route:'',
            name_user_apply:'',
            comments_user_apply:'',
            email_user_apply:'',
            phone_user_apply:'',
            file:'',
            url:''
        }
    },
    methods:{
        validEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        onFileChange(e) {
            this.file = e.target.files[0];
        },
        resetApply(){
            this.name_user_apply='';
            this.comments_user_apply='';
            this.email_user_apply='';
            this.phone_user_apply='';
            this.file='';        
            this.$refs['modal-apply'].hide()

        },
        async addCV(){
            const idjob = this.jobs.id || to.params.id;
            try {
                const response = await GeneralService.applyjob({
                    IdJob: idjob,
                    email: this.email_user_apply,
                    name: this.name_user_apply,
                    phone:this.phone_user_apply,
                    comments:this.comments_user_apply,
                })

                var storageRef = firebase.storage().ref(`JOBCV/${idjob}/${response.data.jobcv.id}/`).put(this.file);
					storageRef.on('state_changed', (snapshot) => {
						}, (error) => {
						}, () => {
						storageRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
                  });
				});	
                this.resetApply();
                this.$toasted.show('Bạn đã ứng tuyển thành công !<br> chúng tôi sẽ liên hệ bn trong thời gian ngắn nhất.', { 
                    theme: "toasted-primary",
                    position: "bottom-right",
                    duration : 5000
                });
                
            }catch (error) {
                this.$toasted.show(`${error.response.data.error}`, { 
                    theme: "toasted-primary", 
                    position: "bottom-right", 
                    duration : 5000
                });
            }
        },
        checkform(){
            if(!this.name_user_apply){
                this.$toasted.show('Vui Lòng Nhập Họ Và Tên !!!', { 
                    theme: "toasted-primary",
                    position: "bottom-center", 
                    duration : 4000
                });
            }
            else if(!this.email_user_apply ){
                this.$toasted.show('Vui Lòng Nhập Địa Chỉ Email !!!', { 
                    theme: "toasted-primary",
                    position: "bottom-center", 
                    duration : 4000
                });
            }else if(!this.validEmail(this.email_user_apply)) {
                this.$toasted.show('Vui Lòng Nhập Đúng Định Dạng Địa Chỉ Email !!!', { 
                    theme: "toasted-primary",
                    position: "bottom-center", 
                    duration : 4000
                });
            }            
            else if(!this.phone_user_apply ){
                this.$toasted.show('Vui Lòng Nhập Số Điện Thoại !!!', { 
                    theme: "toasted-primary",
                    position: "bottom-center", 
                    duration : 4000
                });
            }
            else if(!this.file){
                this.$toasted.show('Vui Lòng Bổ Sung File CV !!!', { 
                    theme: "toasted-primary",
                    position: "bottom-center", 
                    duration : 4000
                });
            }else{
                this.addCV();
            }
        },
        CloseModalApply(){
            this.$refs['modal-apply'].hide();
            
        }
    },
    watch: {
        $route(to, from) {
            const response = AdminService.getJobById({id:to.params.id})
            this.jobs = response.data.job
            this.jobdetails = response.data.jobdetails

            // console.log(this.jobs.job)
            // console.log(this.jobs.jobdetails)
      }
    },
    async mounted(){
        this.route = this.$route.params.id;
        const response = await AdminService.getJobById({id:this.route})
        this.jobs = response.data.job
        this.jobdetails = response.data.jobdetails
    },

}
</script>

<style scoped>
*{
    color: #393d44;
    font-size: 14px;
    line-height: 20px;
}
.bg-light{
    background-image: linear-gradient(180deg,#fafafe,#fafafe);
}
.section-jobs{
    margin: 0 2rem;
    padding: 6rem 0 1rem;
}
.icon img{
    height: 15px;
    width: 15px;
    font-family: 'Neue Haas Text Roman',sans-serif;
    font-size: 1rem;
    line-height: 1.5rem;
    color:#393d44;
}

.title strong{
    margin-left: auto;
    margin-right:auto;
    font-size: 2.5rem;
}
h2,h3{
    color:#162138;    
}

.careers{
    width: 100%;
    max-width: 750px;
    display: block;
    margin-top:6.8rem;
    margin-left: auto;
    margin-right: auto;
}
.apply{
    width: 100%;
    max-width: 750px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 2rem;
}
.namejob{
    margin: 0;
    font-size: 1.2rem;  
}
.positionjob{
     color:#a49dc0;
}
.item{
    background-image: linear-gradient(180deg,#fff,#fff);
    margin-bottom: 0.8rem;
    padding: 1.8rem;
    border-radius: 4px;
    box-shadow: 0 4px 10px 0 rgba(169,165,182,.12), 0 12px 30px 0 rgba(169,168,186,.12);
}
.applynow{
    border:2px solid #40c4ff;
    border-radius: 2px;
    color: #40c4ff;
    transition: all 150ms cubic-bezier(.55,.085,.68,.53);
    padding: 0.4rem 2rem 0.55rem;
}
.applynow:hover{
    color:white;
    text-decoration: none;
    background: #40c4ff;
    cursor: pointer;
}

a{
    text-decoration: none;
}
.details h3{
    font-size: 1.3rem;
    color:darkblue;
}
.style_input{
  border: 1px solid rgba(0,0,0,.54);
  border-radius: 5px;
  padding:0.25rem;
}
.width-100{
  width: 100%;
}
.icon img{
    height:1rem;
    width:1rem;
}
</style>