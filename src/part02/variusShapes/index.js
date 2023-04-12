import CanvasOption from "./js/CanvasOption.js"
import Particle from "./js/Particle.js"
import { randomNumBetween } from "./js/utils.js"

class Canvas extends CanvasOption {
  constructor() {
    super()

    this.particels = []
  }

  init() {
    this.canvasWidth = innerWidth
    this.canvasHeight = innerHeight
    this.canvas.width = this.canvasWidth * this.dpr
    this.canvas.height = this.canvasHeight * this.dpr
    this.ctx.scale(this.dpr, this.dpr)
  
    this.canvas.style.width = this.canvasWidth + "px"
    this.canvas.style.height = this.canvasHeight + "px"

    this.createParticles()
  }

  createParticles() {
    const PARTICLE_NUM = 2000;
    const x = this.canvasWidth / 2
    const y = this.canvasHeight / 2
    const shape = Math.random() < 0.33 ? "rose" : Math.random() < 0.5 ? "heart" : "clover"
    for (let i = 0; i < PARTICLE_NUM; i++) {
      const r = randomNumBetween(1, 5)
      const theta = Math.PI / 180 * randomNumBetween(0, 360)

      let vx = 5, vy = 5

      if (shape === "rose") {
        // polar rose
        vx = 8 * Math.sin(theta) * Math.pow(Math.cos(theta), 4) - 8 * Math.pow(Math.sin(theta), 3) * Math.pow(Math.cos(theta), 2);
        vy = 8 * Math.pow(Math.sin(theta), 4) * Math.cos(theta) - 8 * Math.pow(Math.sin(theta), 2) * Math.pow(Math.cos(theta), 3);
      } else if (shape === "heart") {
        // heart
        vx = 16 * Math.pow(Math.sin(theta), 3);
        vy = -(13 * Math.cos(theta) - 5 * Math.cos(2*theta) - 2 * Math.cos(3*theta) - Math.cos(4*theta));
      } else {
        vx = 5 * Math.pow(Math.cos(theta), 2) * Math.sin(theta);
        vy = 5 * Math.cos(theta) * Math.pow(Math.sin(theta), 2);
      }
      

      this.particels.push(new Particle(x, y, vx, vy))
    }
  }

  render() {
    let now, delta
    let then = Date.now()

    const frame = () => {
      requestAnimationFrame(frame)
      now = Date.now()
      delta = now - then
      if (delta < this.interval) return

      this.ctx.fillStyle = this.bgColor
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
    
      this.particels.forEach((particle, index) => {
        particle.update()
        particle.draw(this.ctx)

        if (particle.opacity < 0) this.particels.splice(index, 1)
      })
    
      then = now - (delta % this.interval)
    }
    requestAnimationFrame(frame)
  }
}

const canvas = new Canvas()

window.addEventListener("load", () => {
  canvas.init()
  canvas.render()
})

window.addEventListener("resize", () => {
  canvas.init()
})