import Vuetify from '../../plugins/vuetify'

export default {
  setGlobalTheme: (state, theme) => {
    Vuetify.framework.theme.dark = theme === 'dark'
    state.globalTheme = theme
  },
  
  setRTL: (state, isRTL) => {
    Vuetify.framework.rtl = isRTL
    state.isRTL = isRTL
  },

  setMenuDisplay: (state, display) => {
    state.isMenuDisplaying = display
  }
}
