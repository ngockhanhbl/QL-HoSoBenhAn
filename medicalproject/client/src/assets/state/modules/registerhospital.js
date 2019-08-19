export default {
    // namespaced: true,
    state: {     
        toggle: false,
        name_hospital:'',
        phone_hospital:'',
        address_hospital:'',
        email_hospital:'',
        password_hospital:'',
    },
    getters: {
        toggle:state => state.toggle,
        name_hospital:state => state.name_hospital,
        phone_hospital:state => state.phone_hospital,
        address_hospital:state => state.address_hospital,
        email_hospital:state => state.email_hospital,
        password_hospital:state => state.password_hospital,
    },
    mutations: {
        TOGGLE(state, payload){
                state.toggle = payload;
        },
        RESET_FORM_REGISTER_HOSPITAL(state) {
            state.name_hospital = '',
            state.phone_hospital = '',
            state.address_hospital='',
            state.email_hospital = '',
            state.password_hospital ='',
            state.toggle = true
        },
        UPDATE_INFORMATION_HOSPITAL(state,payload){
            switch (payload.payloadRouter) {
                case 'name_hospital':
                    state.name_hospital = payload.payloadValue
                    break;
                case 'phone_hospital':
                    state.phone_hospital = payload.payloadValue
                    break;
                case 'address_hospital':
                    state.address_hospital = payload.payloadValue
                    break;
                case 'email_hospital':
                    state.email_hospital = payload.payloadValue
                    break;
                case 'password_hospital':
                    state.password_hospital = payload.payloadValue
                    break;                               
                default:
                    break;
            }
        },
    },
    actions: {
        toggle (context,payload) {
            context.commit("TOGGLE",payload);
          },
          updateInformationHospital (context,payload) {
            context.commit("UPDATE_INFORMATION_HOSPITAL",payload);
          },
          resetRegiserHospital(context) {
            context.commit("RESET_FORM_REGISTER_HOSPITAL");
          }
    }
}
  