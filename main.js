import p5 from "p5";

import "./style.css";

const sketch = p5 => {
  const grayscale = ["#000000", "#0A0A0A", "#141414", "#1F1F1F", "#292929", "#333333", "#3D3D3D", "#474747", "#525252", "#5C5C5C", "#666666", "#707070"];
  const p1 = ["#48639c", "#4c4c9d", "#712f79", "#976391", "#f7996e"];
  const full = { p: 40, w: window.innerWidth, h: window.innerHeight };
  const width = full.w;
  const height = full.h;

  const res = 100;
  let time = 0;

  p5.setup = () => {
    p5.createCanvas(width, height);
    p5.background("#fff");
  };

  p5.draw = () => {
    if (time <= 4000) {
      for (let n = 0; n < 8; n++) {
        drawStuff();
      }
    }
  };

  const drawStuff = () => {
    const amt = 200;
    const r = time;
    const offset = p5.random(-50, 50);

    for (let x = 0; x < width; x += res) {
      for (let y = 0; y < width; y += res) {
        const magicValue = (x + y) * 0.002 * Math.PI * 2;
        const magicValue2 = (Math.sin(x * 0.01) + Math.sin(y * 0.01)) * Math.PI * 2;
        const pos = p5.createVector(width / 2, height / 2);

        const xVec = p5.cos(p5.radians(x));
        const yVec = p5.sin(p5.radians(y));
        const vel = p5.createVector(xVec, yVec);
        const magicVec = p5.createVector(magicValue2 + Math.sin(x * 0.01 + time) * 1500, magicValue2 + Math.cos(y * 0.01 + time) * 1500);

        vel.add(magicVec);
        pos.add(vel);

        const xWeight = p5.map(x, 0, width, 0, 2);
        const yWeight = p5.map(y, 0, height, 0, 2);

        p5.strokeWeight(xWeight / yWeight);
        p5.stroke(p1[Math.floor(Math.random() * p1.length)]);
        p5.point(width / 2 + p5.sin(p5.radians(r)) * vel.x, height / 2 + p5.cos(p5.radians(r)) * vel.y);
      }
    }
    time += 1;
  };

  p5.keyPressed = () => {
    if (p5.keyCode === 80) {
      p5.saveCanvas(`20.06.2021-${Date.now()}`, "png");
    }
  };
};

new p5(sketch);
