export default {
  state: {
    show_down_up: [
      { image: "/img/down-arrow.25471282.svg", isShow: false },
      { image: "/img/down-arrow.25471282.svg", isShow: false },
      { image: "/img/down-arrow.25471282.svg", isShow: false },
      { image: "/img/down-arrow.25471282.svg", isShow: false },
      { image: "/img/down-arrow.25471282.svg", isShow: false },
      { image: "/img/down-arrow.25471282.svg", isShow: false },
      { image: "/img/down-arrow.25471282.svg", isShow: false },
      { image: "/img/down-arrow.25471282.svg", isShow: false }
    ]
  },
  getters: {
    ShowDownUp_1: state => state.show_down_up[0],
    ShowDownUp_2: state => state.show_down_up[1],
    ShowDownUp_3: state => state.show_down_up[2],
    ShowDownUp_4: state => state.show_down_up[3],
    ShowDownUp_5: state => state.show_down_up[4],
    ShowDownUp_6: state => state.show_down_up[5],
    ShowDownUp_7: state => state.show_down_up[6],
    ShowDownUp_8: state => state.show_down_up[7]
  },
  mutations: {
    EiS_SHOW_ANSWER(state, idQuestion) {
      switch (idQuestion) {
        case 1:
          state.show_down_up[0].isShow = !state.show_down_up[0].isShow;

          if (state.show_down_up[0].isShow == true) {
            state.show_down_up[0].image = "/img/up-arrow.22c6ec62.svg";
          } else {
            state.show_down_up[0].image = "/img/down-arrow.25471282.svg";
          }
          break;

        case 2:
          state.show_down_up[1].isShow = !state.show_down_up[1].isShow;

          if (state.show_down_up[1].isShow == true) {
            state.show_down_up[1].image = "/img/up-arrow.22c6ec62.svg";
          } else {
            state.show_down_up[1].image = "/img/down-arrow.25471282.svg";
          }
          break;

        case 3:
          state.show_down_up[2].isShow = !state.show_down_up[2].isShow;

          if (state.show_down_up[2].isShow == true) {
            state.show_down_up[2].image = "/img/up-arrow.22c6ec62.svg";
          } else {
            state.show_down_up[2].image = "/img/down-arrow.25471282.svg";
          }
          break;

        case 4:
          state.show_down_up[3].isShow = !state.show_down_up[3].isShow;

          if (state.show_down_up[3].isShow == true) {
            state.show_down_up[3].image = "/img/up-arrow.22c6ec62.svg";
          } else {
            state.show_down_up[3].image = "/img/down-arrow.25471282.svg";
          }
          break;

        case 5:
          state.show_down_up[4].isShow = !state.show_down_up[4].isShow;

          if (state.show_down_up[4].isShow == true) {
            state.show_down_up[4].image = "/img/up-arrow.22c6ec62.svg";
          } else {
            state.show_down_up[4].image = "/img/down-arrow.25471282.svg";
          }
          break;

        case 6:
          state.show_down_up[5].isShow = !state.show_down_up[5].isShow;

          if (state.show_down_up[5].isShow == true) {
            state.show_down_up[5].image = "/img/up-arrow.22c6ec62.svg";
          } else {
            state.show_down_up[5].image = "/img/down-arrow.25471282.svg";
          }
          break;

        case 7:
          state.show_down_up[6].isShow = !state.show_down_up[6].isShow;

          if (state.show_down_up[6].isShow == true) {
            state.show_down_up[6].image = "/img/up-arrow.22c6ec62.svg";
          } else {
            state.show_down_up[6].image = "/img/down-arrow.25471282.svg";
          }
          break;

        case 8:
          state.show_down_up[7].isShow = !state.show_down_up[7].isShow;

          if (state.show_down_up[7].isShow == true) {
            state.show_down_up[7].image = "/img/up-arrow.22c6ec62.svg";
          } else {
            state.show_down_up[7].image = "/img/down-arrow.25471282.svg";
          }
          break;
        default:
          break;
      }
    }
  },
  actions: {
    EisShowAnswer(context, idQuestion) {
      context.commit("EiS_SHOW_ANSWER", idQuestion);
    }
  }
}
