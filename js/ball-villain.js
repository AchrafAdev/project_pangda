class Villain {
    constructor(ctx, posX, posY, sizeW, sizeH, pts, velX, velY, canvasSize) {
        this.ctx = ctx;
        this.ballVillainPos = { x: posX, y: posY }
        this.ballVillainSize = { h: sizeH, w: sizeW }
        this.canvasSize = canvasSize

        this.ballPoints = pts;

        this.ballVel = { x: velX, y: velY }
        this.ballPhysics = { gravity: .4 }
        this.imageInstance = undefined
        
        this.init()
    }
    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = ("./images/tiger.png")
    }

    drawBall() {
        this.move()
        this.ctx.drawImage(this.imageInstance, this.ballVillainPos.x, this.ballVillainPos.y, this.ballVillainSize.w, this.ballVillainSize.h)

    }

    move() {
        this.ballVillainPos.x += this.ballVel.x
        this.ballVel.y += this.ballPhysics.gravity
        this.ballVillainPos.y += this.ballVel.y

        if (this.ballVillainPos.y + this.ballVillainSize.h > this.canvasSize.h) {
            this.ballVillainPos.y = (this.canvasSize.h - this.ballVillainSize.h) - 5
            this.ballVel.y *= -1
        }


        this.ballVillainPos.y < 0 ? this.ballVel.y *= -1 : null
        this.ballVillainPos.x > this.canvasSize.w - this.ballVillainSize.w ? this.ballVel.x *= -1 : null
        this.ballVillainPos.x < 0 ? this.ballVel.x *= -1 : null

    }

    // Condición a cumplir 
    // death(){
    //Cuando sea disparado evoluciona a dos bolas mas pequeñas
    // }

}

