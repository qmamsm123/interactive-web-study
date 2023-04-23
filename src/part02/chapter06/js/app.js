import Mouse from "./mouse.js";
import Rope from "./rope.js";
import { randomNumberBetween } from "./utils.js";

export default class App {
  static width = innerWidth;
  static height = innerHeight;
  static dpr = devicePixelRatio > 1 ? 2 : 1; // dpr이 너무 높으면 성능이 떨어지므로 2로 제한
  static interval = 1000 / 60;

  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));

    this.mouse = new Mouse(this.canvas);
  }

  resize() {
    App.width = innerWidth;
    App.height = innerHeight;

    this.canvas.style.width = App.width + "px";
    this.canvas.style.height = App.height + "px";

    this.canvas.width = App.width * App.dpr;
    this.canvas.height = App.height * App.dpr;
    this.ctx.scale(App.dpr, App.dpr);

    this.initRopes();
  }

  initRopes() {
    this.ropes = [];
    const TOTAL = App.width * 0.06;

    for (let i = 0; i < TOTAL; i++) {
      const rope = new Rope({
        x: randomNumberBetween(App.width * 0.3, App.width * 0.7),
        y: 0,
        gap: randomNumberBetween(App.height * 0.05, App.height * 0.08),
      });
      rope.pin(0);
      this.ropes.push(rope);
    }
  }

  render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);

      now = Date.now();
      delta = now - then;

      if (delta > App.interval) {
        then = now - (delta % App.interval);

        this.ctx.clearRect(0, 0, App.width, App.height);

        this.ropes.forEach((rope) => {
          rope.update(this.mouse);
          rope.draw(this.ctx);
        });
      }
    };
    requestAnimationFrame(frame);
  }
}
