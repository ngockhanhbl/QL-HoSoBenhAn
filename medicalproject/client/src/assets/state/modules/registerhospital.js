export default {
    // namespaced: true,
    state: {     
        toggle: false,

    },
    getters: {
        toggle:state => state.toggle,
    },
    mutations: {
        TOGGLE(state, payload){
                state.toggle = payload;
        },
        RESET_FORM_REGISTER_HOSPITAL(state) {
            state.toggle = true
        },
    },
    actions: {
        toggle (context,payload) {
            context.commit("TOGGLE",payload);
          },
          resetRegiserHospital(context) {
            context.commit("RESET_FORM_REGISTER_HOSPITAL");
          }
    }
}
  