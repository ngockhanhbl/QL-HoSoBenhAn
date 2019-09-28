export default {
    state: {
        right: false, //public => false == public(right)
        valueRight:''
    },
    getters: {
        right: state => state.right,
        valueRight:state => state.valueRight
    },
    mutations: {
        resetRight(state) {
            state.right= false
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
                case 'valueRight':
                    state.valueRight = payload.payloadValue
                    break;                                  
                default:
                    break;
            }
        },

    },
    actions: {
          updateInformation (context,payload) {
            context.commit("UPDATE_INFORMATION",payload);
          },
          resetRight(context) {
            context.commit("resetRight");
          }
    }
}
  