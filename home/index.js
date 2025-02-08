const declineBtn = document.getElementById("decline");
const acceptBtn = document.getElementById("accept");
const tl = gsap.timeline({ delay: 1.5 });

function supportsClasses() {
  try {
    new Function('"use strict"; class Test {}')();
    return true;
  } catch (error) {
    return false;
  }
}

tl.from(".valentine-container small", { opacity: 0, x: -100, duration: 1.5 });
tl.from(".valentine-container h2", {
  scale: 0,
  duration: 3,
  delay: 0.5,
  ease: "power1.out",
});
tl.from(".actions", {
  width: "40%",
  y: 100,
  opacity: 0,
  duration: 1.8,
  delay: 0.1,
  ease: "circ.out",
});

gsap.registerPlugin(Draggable);

Draggable.create("#accept", {
  type: "x",
  bounds: ".actions",
  inertia: true,
  // dragResistance: 0.75,
  onPress: function () {
    this.enable();
  },
  onDragEnd: function () {
    const right = this.maxX;
    const left = this.minX;
    const timeout = !supportsClasses() ? 1000 : 6000;

    if (this.endX >= right - 3) {
      acceptBtn.innerText = "Yes, I would!";
      alert("Woohoo! 💖");
      this.disable();
      window.setInterval(() => {
        window.location.href =
          "https://wa.me/+2349059620514?text=I%20said%20Yes";
      }, timeout);
      startAnimation();
    } else if (this.endX <= left + 3) {
      acceptBtn.innerText = "Nope, I won't!";
      alert("Aww, it's okay. Maybe next time! 💔");
      this.disable();
      window.location.href = "https://wa.me/+2349059620514?text=I%20said%20No";
    } else {
      console.log("DragEnd", this.maxX, this.endX);
    }
  },
});

if (declineBtn) {
  declineBtn.addEventListener("click", function () {
    alert("Aww, it's okay. Maybe next time! 💔");
  });
}
