export default {
    state: {
        isScroll:false
    },
    getters: {
        isScroll: state => state.isScroll
    },
    mutations: {
        EVETN_SCROLL_STICKY(state,evt,el){     
            if(window.scrollY != 0){
                state.isScroll = true;
            }else{state.isScroll = false;}

        }
    },
    actions: {
        EventScrollSticky(context,evt,el) {
            context.commit("EVETN_SCROLL_STICKY",evt,el);
        }
    }
}
  