let highestZ = 1;

class Paper {
    constructor() {
       this.holdingPaper = false;
    
       this.prevMouseX = 0;
       this.prevMouseY = 0;
    
       this.mouseX = 0;
       this.mouseY = 0;
    
       this.velocityX = 0;
       this.velocityY = 0;
    
       this.currentPaperX = 0;
       this.currentPaperY = 0;
    
       this.events = {
            mouse: {
                down: "mousedown",
                up: "mouseup",
                move: "mousemove"
            },
            touch: {
                down: "touchstart",
                up: "touchend",
                move: "touchmove"
    
            }
        }
    
        this.deviceType = "";
        this.isTouchDevice()
    }

    isTouchDevice() {
        try {
            document.createEvent('TouchEvent')
            this.deviceType = "touch"
            return true;
        } catch (error) {
            this.deviceType = "mouse"
            return false;
        }
    }

    init(paper) {
        paper.addEventListener(this.events[this.deviceType].down, (e) => {


            this.holdingPaper = true;
            paper.style.zIndex = highestZ;
            highestZ += 1;

            if (e.button === 0) {
                this.prevMouseX = this.isTouchDevice() ? e.touches[0].clientX : e.clientX
                this.prevMouseY = this.isTouchDevice() ? e.touches[0].clientX : e.clientY


            }
        })



        document.addEventListener(this.events[this.deviceType].move, (e) => {


            // this.mouseX = e.clientX
            // this.mouseY = e.clientY


            this.mouseX = this.isTouchDevice() ? e.touches[0].clientX : e.clientX

            this.mouseY = this.isTouchDevice() ? e.touches[0].clientY : e.clientY

            this.velocityX = this.mouseX - this.prevMouseX
            this.velocityY = this.mouseY - this.prevMouseY

            if (this.holdingPaper) {
                this.currentPaperX += this.velocityX
                this.currentPaperY += this.velocityY

                this.prevMouseX = this.mouseX
                this.prevMouseY = this.mouseY

                paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`
            }
        })

        window.addEventListener(this.events[this.deviceType].up, (e) => {


            // console.log("mouse btn is released")

            this.holdingPaper = false
        })
    }
}

const papers = Array.from(document.querySelectorAll(".paper"))

papers.forEach(paper => {
    const p = new Paper()
    p.init(paper)
})