const supportedMusics = {
  WAR: "/sound/war.webm",
};

export default {
  startMusic({ commit, dispatch }, { musicKey, isLoop }) {
    const path = supportedMusics[musicKey];
    if (!path) {
      console.error('The music requested was not found.');
      return;
    }
    commit("startMusic", { path, isLoop });
    dispatch("setVolume", 0.1);
    dispatch("playMusic");
  },
  playMusic({ commit }) {
    commit("playMusic");
  },
  stopMusic({ commit }) {
    commit('stopMusic');
  },
  setVolume({state, commit, dispatch}, value) {
    if (!value) {
      dispatch('stopMusic');
    } else if (!state.isPlaying) {
      dispatch('playMusic');
    }
    commit('setVolume', value);
  }
};
