// State management
let currentStep = 'question1'; // 'question1', 'question2', or 'complete'
let draggableInstance = null;

// Question constants
const QUESTIONS = {
  question1: {
    greeting: 'Hi Sugar Baby,',
    text: 'You Know I\'m Your Sugar Daddy right?'
  },
  question2: {
    greeting: 'Okay, so...',
    text: 'Will you be my Val?🌹'
  }
};

const ERROR_MESSAGE = "I know you have two head, pick yes";

// DOM elements
const acceptBtn = document.getElementById("accept");
const questionText = document.getElementById("questionText");
const greetingText = document.getElementById("greetingText");

// GSAP timeline for initial animations
const tl = gsap.timeline({ delay: 1.5 });

function supportsClasses() {
  try {
    new Function('"use strict"; class Test {}')();
    return true;
  } catch (error) {
    return false;
  }
}

// Function to add text animations to timeline
function addTextAnimations(timeline, includeActions = false) {
  timeline.from(".valentine-container small", { opacity: 0, x: -100, duration: 1.5 });
  timeline.from(".valentine-container h2", {
    opacity: 0,
    scale: 0.05,
    duration: 3.2,
    delay: 1.5,
    ease: "power2.out",
  });
  
  if (includeActions) {
    timeline.from(
      ".actions",
      {
        width: "20%",
        y: 150,
        opacity: 0,
        duration: 1.5,
        delay: 0,
        ease: "power1.out",
      },
      "-=0.2"
    );
  }
}

// Initialize animations with actions
addTextAnimations(tl, true);

// Update question text dynamically
function updateQuestionText(step, resetTimeline = false) {
  const question = QUESTIONS[step];
  if (question) {
    // Update text content first
    greetingText.textContent = question.greeting;
    questionText.textContent = question.text;
    
    // If resetTimeline is true, reset and replay the timeline (without actions)
    if (resetTimeline) {
      tl.clear();
      tl.delay(0); // Remove initial delay for updates
      addTextAnimations(tl, false);
      tl.restart();
    }
  }
}

// Reset slider to center position
function resetSlider() {
  if (draggableInstance) {
    // Reset button position and text
    gsap.set(acceptBtn, { x: 0 });
    acceptBtn.innerText = "Slide to Choose";
    
    // Re-enable dragging
    draggableInstance.enable();
  } else {
    // If no instance exists, create one
    createDraggable();
  }
}

// Transition to next question
function transitionToNextQuestion() {
  if (currentStep === 'question1') {
    currentStep = 'question2';
    updateQuestionText('question2', true); // Reset and replay timeline
    // Recreate draggable for the new question
    setTimeout(() => {
      resetSlider();
    }, 100);
  }
}

// Initialize question 1 (without resetting timeline - let it play naturally)
updateQuestionText('question1', false);

// Register GSAP plugins
gsap.registerPlugin(Draggable);

// Create draggable instance
function createDraggable() {
  if (draggableInstance) {
    draggableInstance.kill();
  }
  
  draggableInstance = Draggable.create("#accept", {
    type: "x",
    bounds: ".actions",
    inertia: true,
    onPress: function () {
      this.enable();
    },
    onDragEnd: function () {
      const right = this.maxX;
      const left = this.minX;
      const timeout = !supportsClasses() ? 1000 : 6000;

      if (this.endX >= right - 3) {
        // User selected "Yes"
        handleYesSelection.call(this);
      } else if (this.endX <= left + 3) {
        // User selected "No"
        handleNoSelection.call(this);
      } else {
        console.log("DragEnd", this.maxX, this.endX);
      }
    },
    onDrag: function () {
      const left = this.minX;
      if (this.endX < 0) {
        const percentBrightness = Number((1 - this.endX / left) * 100).toFixed(1);
        // document.body.style.clipPath = `circle(${percentBrightness}% at 50% 50%)`;
      } else {
        // document.body.style.filter = `unset`;
      }
    },
  })[0];
}

// Handle "Yes" selection
function handleYesSelection() {
  const instance = this || draggableInstance;
  
  if (currentStep === 'question1') {
    // Question 1: Yes - proceed to question 2
    acceptBtn.innerText = "Yes Sure";
    if (instance) instance.disable();
    
    setTimeout(() => {
      transitionToNextQuestion();
    }, 600);
  } else if (currentStep === 'question2') {
    // Question 2: Yes - final acceptance
    acceptBtn.innerText = "Yes, I would!";
    alert("Woohoo 💖! Come on now!!");
    if (instance) instance.disable();
    
    const timeout = !supportsClasses() ? 1000 : 6000;
    window.setInterval(() => {
      window.location.href =
        "https://wa.me/+2349059620514?text=I%20said%20Yes%20that%20you%20are%20too%20hot%20and%20creative!!";
    }, timeout);
    
    // Start fireworks only after question 2 Yes
    startAnimation();
    currentStep = 'complete';
  }
}

// Handle "No" selection
function handleNoSelection() {
  const instance = this || draggableInstance;
  
  if (currentStep === 'question1') {
    // Question 1: No - show error and reset
    acceptBtn.innerText = "No";
    alert(ERROR_MESSAGE);
    
    setTimeout(() => {
      resetSlider();
    }, 500);
  } else if (currentStep === 'question2') {
    // Question 2: No - decline message
    acceptBtn.innerText = "Nope, I won't!";
    alert("No ke! We die here!! Swipe yes jare...");
    setTimeout(() => {
      resetSlider();
    }, 500);
    // if (instance) instance.disable();
    // window.location.href = "https://wa.me/+2349059620514?text=I%20said%20No";
  }
}

// Initialize draggable
createDraggable();
