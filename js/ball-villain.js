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
}

class FinalBoss extends Villain {
    constructor(ctx, posX, posY, sizeW, sizeH, pts, velX, velY, canvasSize) {
        super(ctx, posX, posY, sizeW, sizeH, pts, velX, velY, canvasSize)

        this.lifes = 5
        this.isAlive = true
        this.isHit = false
        this.blackHearts = []
        this.lifePosX = 700
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = ("./images/panther.png")
    }

    drawBall() {
        this.move()
        this.drawLifes()
        this.ctx.drawImage(this.imageInstance, this.ballVillainPos.x, this.ballVillainPos.y, this.ballVillainSize.w, this.ballVillainSize.h)

    }

    loseLifes() {

        this.lifes--;
        this.blackHearts.pop()
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

    drawLifes() {
        if (this.blackHearts.length < this.lifes) {
            for (let i = 0; i < this.lifes; i++) {
                this.blackHearts.push(new Heart(this.ctx, this.lifePosX))
                this.lifePosX += 50
            }
        }

        this.blackHearts.forEach(elm => {
            elm.drawHeartPanter()
        })
    }
}

