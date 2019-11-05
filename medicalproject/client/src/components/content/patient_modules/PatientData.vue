<template>
    <div>
        <div class="d-flex">
            <div class="col-sm-9">
                <b-card img-src="http://placehold.jp/200x200.png" img-alt="Card image" img-left class="mb-3" bg-variant="dark" text-variant="white" >
                    <b-card-text class="d-flex">
                        <div class="col-sm-4">Họ và Tên</div>
                        <div class="col-sm-8">{{patientInfomation.firstname}} {{patientInfomation.lastname}}</div>
                    </b-card-text>
                    <b-card-text class="d-flex">
                        <div class="col-sm-4">Ngày Sinh</div>
                        <div class="col-sm-8">{{patientInfomation.day}} {{patientInfomation.month}} {{patientInfomation.year}}</div>
                    </b-card-text>
                    <b-card-text class="d-flex">
                        <div class="col-sm-4">Giới Tính</div>
                        <div class="col-sm-8">{{patientInfomation.sex}}</div>
                    </b-card-text>
                    <b-card-text class="d-flex">
                        <div class="col-sm-4">Địa Chỉ</div>
                        <div class="col-sm-8">{{patientInfomation.address}}</div>
                    </b-card-text>
                </b-card>
            </div>
        </div>
        <div class="d-flex ml-3 ">
            <b-card bg-variant="light" header="Tiền sử bản thân" class="medicalhistory">
                <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
                <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
                <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
                <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
                <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
            </b-card>
        </div>
    </div>
</template>

<script>
import { mapGetters} from "vuex";
import PatientService from '@/services/PatientService'
export default {
    data(){
        return {
            patientInfomation:'',
        }
    },
    computed: {
        ...mapGetters(["patientInfo"])
    },
    async mounted(){
        const userCONST = JSON.parse(localStorage.getItem('user'));
        this.user = userCONST
        const userID = JSON.parse(localStorage.getItem('user')).id;
        if(userCONST.roles == 1){
         this.patientInfomation = (await PatientService.getInfoGeneralPatient(userID)).data
        }
        else if(userCONST.roles == 3){
            const id_patient = this.patientInfo.id_account
            this.patientInfomation = (await PatientService.getInfoGeneralPatient(id_patient)).data
        }else{

        }
    }
}
</script>

<style>
.medicalhistory{
    width: 100%;
}
.card-header div{
    color:darkblue;
    font-size: 1.1rem;
}
</style>
