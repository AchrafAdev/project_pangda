class Panda {
    constructor(ctx, posX, posY) {
        this.ctx = ctx;
        this.harpoon = undefined;
        this.pandaPos = { x: posX, y: posY };
        this.pandaSize = { w: 110, h: 110 };
        this.hearts = []
        this.lifes = 3
        this.lifePosX = 800
        this.isAlive = true
        this.isHit = false
        this.init()

    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = "./images/panda.png"
        this.draw()
    }

    draw() {
        this.drawLifes()
        this.ctx.drawImage(this.imageInstance, this.pandaPos.x, this.pandaPos.y, this.pandaSize.w, this.pandaSize.h);
    }

    moveLeft() {

        if (this.pandaPos.x >= 10) {
            this.pandaPos.x -= 30
        }
    }

    moveRight() {
        if (this.pandaPos.x <= 830) {
            this.pandaPos.x += 30
        }
    }
    createHarpoon() {
        this.harpoon = new Harpoon(this.ctx, this.pandaPos.x, this.pandaPos.y, this.pandaSize.w, this.pandaSize.h)
        this.harpoon.state = "shooting"
    }

    deleteHarpoon() {

        if (this.harpoon.bambooSize === 460 && this.harpoon.state !== "finished") {
            this.harpoon.state = "finished"
            setTimeout(() => {
                this.harpoon = null
            }, 1000)

        }
    }

    drawLifes() {
        if (this.hearts.length < this.lifes) {
            for (let i = 0; i < this.lifes; i++) {
                this.hearts.push(new Heart(this.ctx, this.lifePosX))
                this.lifePosX += 50
            }
        }

        this.hearts.forEach(elm => {
            elm.drawImage()
        })
    }


    loseLifes() {

        this.lifes--;
        this.hearts.pop()
        this.makeInvicible()

        if (this.lifes === 0) {

            this.isAlive = false
        }


    }

    makeInvicible() {
        this.isHit = true

        setTimeout(() => {
            this.isHit = false
        }, 1500);
    }
}