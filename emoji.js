// Script source: https://edwardize.blogspot.com/2018/03/emoji-picker.html
// Script credits: Edward Lance Lorilla, 2018.

Vue.component('emoji-picker', {
  data() {
    return {
      emojis: {
        'Frequently used': {
          'thumbs_up': '👍',
          '-1': '👎',
          'sob': '😭',
          'confused': '😕',
          'neutral_face': '😐',
          'blush': '😊',
          'heart_eyes': '😍',
        },
        'People': {
          'smile': '😄',
          'smiley': '😃',
          'grinning': '😀',
          'blush': '😊',
          
        },
        'Nature': {
          'dog': '🐶',
          'wolf': '🐺',
          'cat': '🐱',
          
        },
        'Objects': {
          'bamboo': '🎍',
          'gift_heart': '💝',
          'dolls': '🎎',
          'school_satchel': '🎒',
          'mortar_board': '🎓',
          
        },
        'Places': {
          'house': '🏠',
          'house_with_garden': '🏡',
          'school': '🏫',
          
        },
        'Symbols': {
          'keycap_ten': '🔟',
          '1234': '🔢',
          'symbols': '🔣',
          
        },
      },
      search: '',
      display: {
        x: 0,
        y: 0,
        visible: false,
      },
    }
  },
  template: '#emoji-picker',
  computed: {
    searchedEmojis() {
      if (this.search) {
        const obj = {}
        
        for (const category in this.emojis) {
          obj[category] = {}
          
          for (const emoji in this.emojis[category]) {
            if (new RegExp(`.*${this.search}.*`).test(emoji)) {
              obj[category][emoji] = this.emojis[category][emoji]
            }
          }
        }
        
        return obj
      }
      
      return this.emojis  
    },
  },
  methods: {
    insert(emoji) {
      this.$emit('emoji', emoji)
    },
    toggle(e) {
      this.display.visible = ! this.display.visible
      this.display.x = e.clientX
      this.display.y = e.clientY
      if (this.display.visible) this.$nextTick(() => this.$refs.search.focus())
    },
    hide() {
      this.display.visible = false
    },
  },
  directives: {
    'click-outside': {
      bind(el, binding, vNode) {
        if (typeof binding.value !== 'function') {
          return
        }
        
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
          if (bubble || (! el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler
        
        document.addEventListener('click', handler)
      },
      unbind(el, binding) {
        document.removeEventListener('click', el.__vueClickOutside__)
        
        el.__vueClickOutside__ = null
      },
    },
  },
})

new Vue({
  el: '#app',
  data() {
    return {
      input: '',
    }
  },
  methods: {
    append(emoji) {
      this.input += emoji
    },
  },
}) 