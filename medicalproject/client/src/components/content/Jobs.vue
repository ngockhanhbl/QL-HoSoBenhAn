<template>
<div class="pt-5">
    <div class="bg-light">
        <div class="section-jobs">
            <div class="title d-flex">
                <strong>Tuyển Dụng</strong>         
            </div>
            <div> 
                <div class="careers" v-if="isExistEngineeringType">
                    <p class="icon"><img src="@/assets/images/gear.svg" /> <span class="pl-1">Engneering</span></p>
                    <div v-for="(job,index) in jobs " :key="index"  class="lists">
                        <div class="item d-flex justify-content-between" v-if="job.type === 'Engneering' ">
                            <div>
                                <h5 class="namejob">{{job.name}}</h5>
                                <h6 class="positionjob">{{job.location}}</h6>
                            </div>
                        <div @click="SeeDetailsJob(job)" class="applynow"> Apply now </div>
                        </div>
                    </div>  
                </div>


                <div class="careers" v-if="isExistProductType">
                        <p class="icon"><img src="@/assets/images/diamond.svg" /> <span class="pl-1"> Product</span></p>
                        <div v-for="(job,index) in jobs " :key="index"  class="lists">
                            <div class="item d-flex justify-content-between" v-if="job.type === 'Product' ">
                                <div>
                                    <h5 class="namejob">{{job.name}}</h5>
                                    <h6 class="positionjob">{{job.location}}</h6>
                                </div>
                            <div @click="SeeDetailsJob(job)" class="applynow"> Apply now </div>
                            </div>
                        </div>  
                </div>



                <div class="careers" v-if="isExistFinanceType">
                        <p class="icon"><img src="@/assets/images/coin.svg" /> <span class="pl-1">Finance</span></p>
                        <div v-for="(job,index) in jobs " :key="index"  class="lists">
                            <div class="item d-flex justify-content-between" v-if="job.type === 'Finance' ">
                                <div>
                                    <h5 class="namejob">{{job.name}}</h5>
                                    <h6 class="positionjob">{{job.location}}</h6>
                                </div>
                            <div @click="SeeDetailsJob(job)" class="applynow"> Apply now </div>
                            </div>
                        </div>  
                </div>

                <div class="careers" v-if="isExistOtherType">
                        <p class="icon"><img src="@/assets/images/other.svg" /> <span class="pl-1"> Other</span></p>
                        <div v-for="(job,index) in jobs " :key="index" class="lists">
                            <div class="item d-flex justify-content-between" v-if="job.type === 'Other'">
                                <div>
                                    <h5 class="namejob">{{job.name}}</h5>
                                    <h6 class="positionjob">{{job.location}}</h6>
                                </div>
                           <div @click="SeeDetailsJob(job)" class="applynow"> Apply now </div>
                            </div>
                        </div>  
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters} from "vuex";
import AdminService from '@/services/AdminService'
export default {
    data(){
        return {
            jobs:[]
        }
    },
    methods:{
        SeeDetailsJob(item){
            this.$router.push({
                path: `/JobDetails/${item.id}`
            })
        },
    },
    computed: {
        isExistOtherType(){
            return this.jobs.some(function(t){
                return t.type === 'Other'
            })
        },
        isExistFinanceType(){
            return this.jobs.some(function(t){
                return t.type === 'Finance'
            })
        },
        isExistProductType(){
            return this.jobs.some(function(t){
                return t.type === 'Product'
            })
        },
        isExistEngineeringType(){
            return this.jobs.some(function(t){
                return t.type === 'Engneering'
            })
        },
    },
    async mounted(){
      this.jobs = (await AdminService.getAllJobs()
        .then(response => (this.jobs = response.data)))
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
    padding: 6rem 0;
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
    font-size: 3rem;
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
    border-radius: 300px;
    color: #40c4ff;
    transition: all 150ms cubic-bezier(.55,.085,.68,.53);
    padding: 0.7rem 2rem 0.55rem;
}
.applynow:hover{
    color:white;
    text-decoration: none;
    background: #40c4ff;
}

a{
    text-decoration: none;
}
</style>