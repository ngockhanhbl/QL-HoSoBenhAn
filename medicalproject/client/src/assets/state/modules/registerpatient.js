export default {
    state: {
        checked : false,
        right: false, //public => false == public(right)
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
        email:'',
        password:'',
        valueRight:''
    },
    getters: {
        checked: state => state.checked,
        right: state => state.right,
        url: state => state.url,
        error: state => state.error,
        firstname:state => state.firstname,
        lastname:state => state.lastname,
        day:state => state.day,
        month:state => state.month,
        year:state => state.year,
        phone:state => state.phone,
        sex:state => state.sex,
        address:state => state.address,
        cmnd:state => state.cmnd,
        email:state => state.email,
        password:state => state.password,
        valueRight:state => state.valueRight
    },
    mutations: {
        checked(state, payload){
            state.checked = payload
            if(payload == true){
                state.cmnd = ''
            }                 
        },
        ERROR(state, payload){
            state.error = payload
        },
        RESET_FORM_REGISTER_PATIENT(state) {
            state.checked = false,
            state.right= false, 
            state.url= null,
            state.error='',
            state.firstname='',
            state.lastname='',
            state.day='',
            state.month='',
            state.year='',
            state.phone='',
            state.sex='',
            state.address='',
            state.cmnd='',
            state.email='',
            state.password='',
            state.valueRight=''
        },
        UPDATE_INFORMATION(state,payload){
            switch (payload.payloadRouter) {
                case 'right':
                    if(payload.payloadValue == "public"){
                        state.valueRight = ''
                        state.right = false
                    }else{                     
                        state.right = true                                              
                    }
                    break;
                case 'cmnd':
                    if(state.checked == true){
                        state.cmnd = ''
                    }else{
                        state.cmnd = payload.payloadValue                       
                    }
                    break;
                case 'firstname':
                    state.firstname = payload.payloadValue
                    break;
                case 'lastname':
                    state.lastname = payload.payloadValue
                    break;     
                case 'day':
                    state.day = payload.payloadValue
                    break;     
                case 'month':
                    state.month = payload.payloadValue
                    break;     
                case 'year':
                    state.year = payload.payloadValue
                    break;   
                case 'phone':
                    state.phone = payload.payloadValue
                    break;
                case 'address':
                    state.address = payload.payloadValue
                    break;
                case 'email':
                    state.email = payload.payloadValue
                    break;
                case 'password':
                    state.password = payload.payloadValue
                    break;  
                case 'sex':
                    state.sex = payload.payloadValue    
                    break;
                case 'valueRight':
                    state.valueRight = payload.payloadValue
                    break;                                  
                default:
                    break;
            }
        },
        ON_FILE_CHANGE(state, e){
            const file = e.target.files[0];
            state.url = URL.createObjectURL(file);
        },
    },
    actions: {
        checked (context,payload) {
            context.commit("checked",payload);
          },
          error (context,payload) {
            context.commit("ERROR",payload);
          },
          updateInformation (context,payload) {
            context.commit("UPDATE_INFORMATION",payload);
          },
          onFileChange (context,e) {
            context.commit("ON_FILE_CHANGE",e);
          },
          resetRegiserPatient(context) {
            context.commit("RESET_FORM_REGISTER_PATIENT");
          }
    }
}
  