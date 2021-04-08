class Panda {
    constructor(ctx, posX, posY) {
        this.ctx = ctx;
        this.harpoon = undefined;
        //console.log(this.ctx);
        this.pandaPos = { x: posX, y: posY };
        this.pandaSize = { w: 150, h: 150 };

        this.init()

    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = "./images/panda.png"
        this.draw()
    }

    draw() {

        this.ctx.drawImage(this.imageInstance, this.pandaPos.x, this.pandaPos.y, this.pandaSize.w, this.pandaSize.h);
    }

    moveLeft() {

        if (this.pandaPos.x >= 10) {
            this.pandaPos.x -= 25
        }
    }

    moveRight() {
        if (this.pandaPos.x <= 830) {
            this.pandaPos.x += 25
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
            console.log(this.harpoon.bambooSize);
        }
    }
}