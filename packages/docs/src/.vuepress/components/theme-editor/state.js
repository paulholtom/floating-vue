import Vue from 'vue'
import VTooltipPlugin from 'v-tooltip'
import { formatObjectToSource } from './format-object'
import { generateCSS } from './style-output'
import { loadValue, storeValue } from './util'

const SETTINGS_KEY = 'v-tooltip.theme-editor.settings.v1'
const THEMES_KEY = 'v-tootip.theme-editor.themes'
const LAST_THEME_KEY = 'v-tooltip.theme-editor.last-theme-name'

export const state = new Vue({
  data () {
    return {
      error: '',
      settings: {
        darkClass: 'dark',
        darkBlackBg: false,
        ignoreAutoHide: false,
        darkMode: false,
        editablePopper: false,
        vertical: false,
      },
      themes: [
        createThemeObject(),
      ],
      theme: null,
    }
  },

  computed: {
    sourceOutput () {
      return '// Config\n' + formatObjectToSource({ themes: { [this.theme.name]: this.theme.config } })
    },

    styleOutput () {
      return '/* Style */\n' + generateCSS(this.theme)
    },
  },

  watch: {
    theme: {
      handler (value) {
        if (value) {
          VTooltipPlugin.options.themes[value.name] = value.config
          state.error = ''
        }
      },
      deep: true,
      immediate: true,
    },

    settings: {
      handler: storeValue.bind(null, SETTINGS_KEY),
      deep: true,
    },

    themes: {
      handler: storeValue.bind(null, THEMES_KEY),
      deep: true,
    },
  },
})

export function loadThemes () {
  loadValue(THEMES_KEY, value => {
    state.themes = value
  })
}

export function mapState (propNames) {
  return propNames.reduce((obj, n) => {
    obj[n] = () => state[n]
    return obj
  }, {})
}

export function loadSettings () {
  state.error = ''
  loadValue(SETTINGS_KEY, value => {
    Object.assign(state.settings, value)
  })
}

const emptyTheme = [
  '$extend',
  '$resetCss',
  'triggers',
  'delay',
  'autoHide',
  'eagerMount',
  'placement',
  'strategy',
  'offset',
  'instantMove',
  'handleResize',
  'container',
  'boundary',
  'html',
  'loadingContent',
].reduce((obj, key) => {
  obj[key] = undefined
  return obj
}, {})

export function loadTheme (themeName) {
  const theme = state.themes.find(t => t.name === themeName)
  state.error = ''
  if (theme) {
    theme.config = {
      ...emptyTheme,
      ...theme.config,
    }
    state.theme = theme
    storeValue(LAST_THEME_KEY, themeName)
  } else {
    state.error = `Theme ${themeName} not found`
  }
}

export function loadLastTheme () {
  loadValue(LAST_THEME_KEY, value => {
    loadTheme(value)
  })
}

function createThemeObject () {
  return {
    name: 'my-theme',
    config: {
      triggers: ['click'],
      placement: 'bottom',
      autoHide: true,
    },
    styles: {},
  }
}

export function createNewTheme (options) {
  const theme = createThemeObject()
  theme.name = options.name
  state.themes.push(theme)
  loadTheme(theme.name)
}

export function deleteTheme (theme) {
  if (state.theme === theme) {
    state.theme = null
  }
  const index = state.themes.indexOf(theme)
  if (index !== -1) {
    state.themes.splice(index, 1)
  }
}
