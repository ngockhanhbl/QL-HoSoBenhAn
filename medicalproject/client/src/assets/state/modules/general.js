export default {
    state: {
        isUserLoggedIn: false,
        token: null,
        user: null,
        doctorInfo:null,
        hospitalInfo:null,
        patientInfo:null,
        
    },
    getters: {
      user: state => state.user,
      isUserLoggedIn: state => state.isUserLoggedIn,
      patientInfo:state => state.patientInfo,
      doctorInfo: state => state.doctorInfo,
      hospitalInfo: state => state.hospitalInfo,
    },
    mutations: {
        setToken (state, token) {
          localStorage.setItem("isUserLoggedIn", !!(token));
            state.token = token
            state.isUserLoggedIn = !!(token)
            localStorage.setItem("token", (token));
          },
          setUser (state, user) {
            localStorage.setItem("user", JSON.stringify(user));
            state.user = user
          },
          setDoctorInfo(state, user) {
            state.doctorInfo = user
          },
          setHospitalInfo(state, user) {
            state.hospitalInfo = user
          },
          set_patientInfo(state, user) {
            state.patientInfo = user
          },

    },
    actions: {
        setToken ({commit}, token) {
          commit('setToken', token)
        },
        setUser ({commit}, user) {
          commit('setUser', user)
        },
        setDoctorInfo ({commit}, user) {
          commit('setDoctorInfo', user)
        },
        setHospitalInfo ({commit}, user) {
          commit('setHospitalInfo', user)
        },
        set_patientInfo ({commit}, user) {
          commit('set_patientInfo', user)
        },

      }
}