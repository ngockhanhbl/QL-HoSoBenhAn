export default {
    state: {
        patient_records:[],
        nameDoctorWrite_records:null,
        AlternativeRecord:null,
        fields_DrugSynthetic: [
            { key: 'stt', label: 'Số Thứ Tự', sortable: true },
            { key: 'name', label: 'Tên Thuốc', sortable: true, sortDirection: 'desc' },
            { key: 'total', label: 'Số Lượng', sortable: true },
            { key: 'real_drank', label: 'Số Lượng Thực Đã Uống' , sortable: true, sortDirection: 'desc' },
            { key: 'modify_real_drank', label: 'Chỉnh Sửa Số Lượng Thực Đã Uống' },
        ],
        fields: [
            { key: 'patient_title', label: 'Tiêu đề', sortable: true, sortDirection: 'desc' },
            { key: 'patient_location', label: 'Bệnh viện', sortable: true },
            { key: 'patient_time', label: 'Thời gian' , sortable: true, sortDirection: 'desc' },
            { key: 'patient_content', label: 'Chẩn đoán' },
            { key: 'patient_records_details', label: 'Xem chi tiết' },
            { key: 'patient_name_doctor', label: 'Bác sĩ khám bệnh' },
        ],
        patient_records_details:null,
            // {id:'1',id_record:1,name:'ZidocinDHG 0.75MUI +125mg',total:20,morning:2,midday:0,afternoon:2,night:0,note:'',real_drank:''},
            // {id:'2',id_record:1,name:' Bacillus Clausii',total:20,morning:2,midday:0,afternoon:2,night:0,note:'Uong luc no',real_drank:''},
            // {id:'3',id_record:1,name:'Acetylcystein 200mg',total:20,morning:2,midday:0,afternoon:2,night:0,note:'',real_drank:''},  
            // {id:'4',id_record:2,name:'Broncho-Vaxom Children',total:20,morning:2,midday:0,afternoon:2,night:0,note:'',real_drank:''},
            // {id:'5',id_record:2,name:'Promethazin 2%',total:20,morning:2,midday:0,afternoon:2,night:0,note:'',real_drank:''},
            // {id:'6',id_record:3,name:'Eumovate cream 5g',total:20,morning:2,midday:0,afternoon:2,night:0,note:'uong luc no',real_drank:''},            
        
        notes:'',
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15],
        patient_filter: null,
        drug_filter:null
    },
    getters: {
        patient_records:state => state.patient_records,
        nameDoctorWrite_records:state => state.nameDoctorWrite_records,
        patient_records_details:state => state.patient_records_details,
        fields:state =>state.fields,
        totalRows:state =>state.totalRows,
        currentPage:state =>state.currentPage,
        perPage:state =>state.perPage,
        pageOptions:state =>state.pageOptions,
        patient_filter:state =>state.patient_filter,
        drug_filter:state =>state.drug_filter,
        fields_DrugSynthetic:state =>state.fields_DrugSynthetic,
        AlternativeRecord: state => state.AlternativeRecord,
    },
    mutations: {
        update_inforListPatient(state, payload){
            switch (payload.payloadRouter) {
                case 'patient_filter':
                    state.patient_filter = payload.payloadValue
                    break;
                case 'drug_filter':
                    state.drug_filter = payload.payloadValue
                    break;
                case 'totalRows':
                    state.totalRows = payload.payloadValue
                    break;
                case 'currentPage':
                    state.currentPage = payload.payloadValue
                    break;                            
                case 'perPage':
                    state.perPage = payload.payloadValue
                    break;                        
                default:
                    break;
            }
        },
        update_inforRecordsPatientDetail(state, payload){
            state.patient_records = payload
        },
        resetPatient_records(state){
            state.patient_records = []
        },
        set_nameDoctorWrite_records(state, payload){
            state.nameDoctorWrite_records = payload
        },
        set_patient_records_details(state, payload){
            state.patient_records_details = payload
        },
        set_AlternativeRecord(state, user) {
            state.AlternativeRecord = user
          },
},
    actions: {       
        update_inforListPatient(context,payload){
            context.commit("update_inforListPatient",payload);
        },
        update_inforRecordsPatientDetail(context,payload){
            context.commit("update_inforRecordsPatientDetail",payload);
        },
        resetPatient_records(context){
            context.commit("resetPatient_records");
        },
        set_nameDoctorWrite_records(context,payload){
            context.commit("set_nameDoctorWrite_records",payload);
        },
        set_patient_records_details(context,payload){
            context.commit("set_patient_records_details",payload);
        },
        set_AlternativeRecord ({commit}, user) {
            commit('set_AlternativeRecord', user)
          },
    }
    
    

}