import HospitalService from '@/services/HospitalService'
import AccountService from '@/services/AccountService'
export default {
    state: {
        hospitals:[],
        account_hospital_:[],
    },
    getters: {
        hospitals:state => state.hospitals,
        account_hospital_:state => state.account_hospital_,
    },
    mutations: {
        update_HospitalList(state, payload){
            state.hospitals = payload
        },
        update_account_hospital(state, payload){
            state.account_hospital_ = payload
        },
},
    actions: {       
        async fetch_HospitalList(context){
            const payload = (await HospitalService.getAllHospitals()).data
            context.commit("update_HospitalList",payload);
        },
        async fetch_AccountHospitalList(context){
            const payload = (await AccountService.getAllAcountHospitals()).data
            context.commit("update_account_hospital",payload);
        },
    }

}