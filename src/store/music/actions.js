const supportedMusics = {
  WAR: "/sound/war.webm",
};

export default {
  playMusic({ state, commit }, { musicKey, isLoop }) {
    const path = supportedMusics[musicKey];
    if (!path) {
      console.error('The music requested was not found.');
      return;
    }
    commit("playMusic", { path, isLoop });
  },
  stopMusic({ commit }) {
    commit('stopMusic');
  }
};
