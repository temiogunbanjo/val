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

    if (this.endX >= right - 3) {
      acceptBtn.innerText = "Yes, I would!";
      alert("Woohoo! 💖");
      this.disable();
      window.location.href = 'https://wa.me/+2349059620514?text=I%20said%20Yes';
    } else if (this.endX <= left + 3) {
      acceptBtn.innerText = "Nope, I won't!";
      alert("Aww, it's okay. Maybe next time! 💔");
      this.disable();
      window.location.href = 'https://wa.me/+2349059620514?text=I%20said%20No';
    } else {
      console.log("DragEnd", this.maxX, this.endX);
    }
  },
});

var tl = gsap.timeline({ delay: 1.5 });
tl.from(".valentine-container small", { opacity: 0, duration: 1.5, });
tl.from(".valentine-container h2", { scale: 0, duration: 3.2, delay: 0.5, ease: 'power1.out' });
tl.from(".actions", { width: "0%", opacity: 0, duration: 1.8, delay: 0.5, ease: 'circ.out' });

if (declineBtn) {
  declineBtn.addEventListener("click", function () {
    alert("Aww, it's okay. Maybe next time! 💔");
  });
}
