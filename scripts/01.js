import p5 from "p5";

import "../style.css";

const sketch = p5 => {
  const palette = ["#48639c", "#4c4c9d", "#712f79", "#976391", "#f7996e"];
  const width = window.innerWidth;
  const height = window.innerHeight;

  const res = 100;
  let time = 0;

  p5.setup = () => {
    p5.createCanvas(width, height);
    p5.background("#fff");
  };

  p5.draw = () => {
    if (time <= 6000) {
      for (let n = 0; n < 8; n++) {
        drawStuff();
      }
    }
  };

  const drawStuff = () => {
    const r = time;

    for (let x = 0; x < width; x += res) {
      for (let y = 0; y < width; y += res) {
        const magicValue = (Math.sin(x * 0.01) + Math.sin(y * 0.01)) * Math.PI * 2;
        const pos = p5.createVector(width / 2, height / 2);

        const xVec = p5.cos(p5.radians(x));
        const yVec = p5.sin(p5.radians(y));
        const vel = p5.createVector(xVec, yVec);
        const magicVec = p5.createVector(magicValue + Math.sin(x * 0.01 + time) * 1500, magicValue + Math.cos(y * 0.01 + time) * 1500);

        vel.add(magicVec);
        pos.add(vel);

        const xWeight = p5.map(x, 0, width, 0, 2);
        const yWeight = p5.map(y, 0, height, 0, 2);

        p5.strokeWeight(xWeight / yWeight);
        p5.stroke(palette[Math.floor(Math.random() * palette.length)]);
        p5.point(width / 2 + p5.sin(p5.radians(r)) * vel.x, height / 2 + p5.cos(p5.radians(r)) * vel.y);
      }
    }
    time += 1;
  };

  p5.keyPressed = () => {
    if (p5.keyCode === 83) {
      p5.saveCanvas(`20.06.2021-${Date.now()}`, "png");
    }
  };
};

new p5(sketch);
