import ResizeObserver from 'resize-observer-polyfill'
import { connect, post, event } from './gtm.js'

let app = {}
app.projectName = "my_project";
app.version = "d";

const Analytics = class {
  constructor(config) {
    this.wpList = []
    this.app = app
    this.app.projectName = config.projectName
    this.root = config.root || document
    this.selector = config.selector || '.sip_analytics'
    this.waypoint = config.waypoint
    this.debug = config.debug || false 
  }
  init() {
    setTimeout(() => this.updateObservers(), 1000);
    
    this.initGTM()
  }
  updateObservers() {
    const resizeObserverSlide = new ResizeObserver( () => {
      this.debug? console.log('updateHeight', this.root) : null
      this.setObservers()
    })
    resizeObserverSlide.observe(this.root);
  }
  setObservers() {
    let list = Array.prototype.slice.call( this.root.querySelectorAll(this.selector) );
    if(this.wpList.length > 0) {
      this.wpList.map(m=>m.destroy())
      this.wpList = []
    }
    list.map((m,i)=>{
      // this.debug? console.log(m) : null
      this.setDebug(m)
      let name = m.getAttribute('name') || i
      this.wpList.push( this.setWaypoint (m, name) )
    })
  }
  initGTM() {
    this.debug? console.log('entrance') : null
    connect(app)
    event('entrance')
  }
  setWaypoint (el, name) {
    return new this.waypoint({
      element: el,
      offset: '90%',
      handler: (direction) => {
        if(direction === 'down') {
          this.debug? console.log('anchor', {anchor: `anchor-${name}`}) : null
          event('anchor', {anchor: `anchor-${name}`});
        }
      }
    })
  }
  event(name, data) {
    event(name, {anchor: `${name}-${data}`});
  }
  setDebug(el) {
    if(this.debug) {
      el.style.border = '1px solid red'
    }
  }

}

export default Analytics;
