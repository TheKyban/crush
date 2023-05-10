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


        this.offsetX = 0
        this.offsetY = 0
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

            this.prevMouseX = this.isTouchDevice() ? e.touches[0].clientX : e.clientX
            this.prevMouseY = this.isTouchDevice() ? e.touches[0].clientY : e.clientY

        })

        document.addEventListener(this.events[this.deviceType].move, (e) => {

            // this.mouseX = this.isTouchDevice() ? e.touches[0].clientX : e.clientX

            // this.mouseY = this.isTouchDevice() ? e.touches[0].clientY : e.clientY


            // this.velocityX = this.mouseX - this.prevMouseX
            // this.velocityY = this.mouseY - this.prevMouseY

            if (this.holdingPaper) {


                this.mouseX = this.isTouchDevice() ? e.touches[0].clientX : e.clientX

                this.mouseY = this.isTouchDevice() ? e.touches[0].clientY : e.clientY

                this.currentPaperX += this.velocityX
                this.currentPaperY += this.velocityY

                paper.style.top = paper.offsetTop - (this.prevMouseY - this.mouseY) + "px"

                paper.style.left = paper.offsetLeft - (this.prevMouseX - this.mouseX) + "px"

                this.prevMouseX = this.mouseX
                this.prevMouseY = this.mouseY

                // paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`
            }
        })

        window.addEventListener(this.events[this.deviceType].up, (e) => {
            this.holdingPaper = false
        })
    }

    both(paper) {
        const move = (e) => {
            paper.style.left = this.isTouchDevice() ?
                `${e.touches[0].clientX - this.offsetX}px` : `${e.clientX - this.offsetX}px`

            paper.style.top = this.isTouchDevice() ?
                `${e.touches[0].clientY - this.offsetY}px` : `${e.clientY - this.offsetY}px`
        }

        paper.addEventListener(this.events[this.deviceType].down, (e) => {

            this.offsetX = this.isTouchDevice() ? e.touches[0].clientX - paper.offsetLeft : e.clientX - paper.offsetLeft

            this.offsetY = this.isTouchDevice() ? e.touches[0].clientY - paper.offsetTop : e.clientY - paper.offsetTop

            highestZ += 1

            paper.style.zIndex = highestZ

            document.addEventListener(this.events[this.deviceType].move, move)
        })


        paper.addEventListener(this.events[this.deviceType].up, () => {
            document.removeEventListener(this.events[this.deviceType].move, move)
        })
    }

}

const papers = Array.from(document.querySelectorAll(".paper"))

papers.forEach(paper => {
    const p = new Paper()
    p.init(paper)
    // p.both(paper)
})