const declineBtn = document.getElementById("decline");
const acceptBtn = document.getElementById("accept");

gsap.registerPlugin(Draggable);

Draggable.create("#accept", {
  type: "x",
  bounds: ".actions",
  inertia: true,
  // dragResistance: 0.75,
  // liveSnap: {
  //   //snaps to the closest point in the array, but only when it's within 15px (new in GSAP 1.20.0 release):
  //   x: [-500, 0, 500],
  //   radius: 10,
  // },
  onPress: function () {
    this.enable();
  },
  onDragEnd: function () {
    const right = this.maxX;
    const left = this.minX;

    if (this.endX >= right) {
      acceptBtn.innerText = "Yes, I will!";
      alert("Woohoo! 💖");
      this.disable();
    } else if (this.endX <= left) {
      acceptBtn.innerText = "Nope, I won't!";
      alert("Aww, it's okay. Maybe next time! 💔");
      this.disable();
    } else {
      console.log("DragEnd", this.maxX, this.endX);
    }
  },
});

var tl = gsap.timeline({ repeat: 2, repeatDelay: 1 });
tl.from(".valentine-container small", { opacity: 0, duration: 1 });
tl.from(".valentine-container h2", { scale: 0, duration: 1 });
tl.from("#id", { width: "10%", duration: 1 });

if (declineBtn) {
  declineBtn.addEventListener("click", function () {
    alert("Aww, it's okay. Maybe next time! 💔");
  });
}
