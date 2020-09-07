# vue-sip-analytics

## Project setup
```
yarn add https://github.com/voffkin/vue-sip-analytics.git
```

main.js
```
import Analytics from './plugins/Analytics';

Vue.prototype.$analytics = Analytics

```

App.vue
```vue
<div class="sip_analytics" />
<!-- or -->
<div class="sip_analytics" name="header" />
```

```js
  data () {
    return {
      analytics: null
    }
  },
  mounted() {
    this.analytics = new this.$analytics({
      projectName: 'my_project',
      root: this.$refs.root,
      selector: '.sip_analytics',
      waypoint: Waypoint,
      debug: true,
    })
    this.analytics.init()
  },
  methods: {
    show() {
      this.analytics.event('inner_link', 'slide1')
    }
  }

```
