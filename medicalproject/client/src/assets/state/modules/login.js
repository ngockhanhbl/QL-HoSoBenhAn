export default {
    state: {
        login_username: '',
        login_password:'',
        login_error:null      
    },
    getters: {
        login_username:state => state.login_username,
        login_password:state => state.login_password,
        login_error:state => state.login_error
    },
    mutations: {
        UPDATE_PASSWORD(state, payload){
            state.login_password = payload;
        },
        UPDATE_USERNAME(state, payload){
            state.login_username = payload;
        },
        resetlogin(state) {
            state.login_username = ''
            state.login_password = ''
            state.login_error= null 
          }
    },
    actions: {
        updatePassword(context,payload){
            context.commit("UPDATE_PASSWORD",payload);
        },
        updateUsername(context,payload){
            context.commit("UPDATE_USERNAME",payload);
        },
        resetlogin(context) {
            context.commit("resetlogin");
          }
    }
}
  