const pangdaGame = {
    name: 'Pangda',
    description: 'App for Canvas basic forms',
    author: 'Achraf Arazzouk & Yerai Pinedo',
    license: undefined,
    version: '1.0.0',
    canvasSize: { width: 0, height: 0 },
    ctx: undefined,
    panda: undefined,
    balls: [],
    interval: undefined,
    gameState: "not started",
    canvasDom: undefined,


    init() {
        this.canvasDom = document.getElementById("canvas")
        this.ctx = this.canvasDom.getContext("2d")
        this.setListeners()
        this.gameStart()

    },
    createPanda() {
        this.panda = new Panda(this.ctx, this.canvasDom.width / 2 - 75, 380)
    },

    createVillain() {
        this.balls.push(new Villain(this.ctx, 100, 2, 170 * .25, 200, 170, 10, 20, this.canvasSize));
        //this.balls.push(new FinalBoss(this.ctx, 100, 2, 170 * 1.3, 200 * 1.3, 170, 10 * 1.15, 20 * 1.15, this.canvasSize))

        console.log(this.balls[0] instanceof FinalBoss)


    },
    createMedVillain(ballPosition) {
        this.balls.push(new Villain(this.ctx, ballPosition.x, ballPosition.y, 170 * .5, 200 * .5, 170, 10 * 1.2, 20 * 1.2, this.canvasSize));
        this.balls.push(new Villain(this.ctx, ballPosition.x, ballPosition.y, 170 * .5, 200 * .5, 170, -10 * 1.2, 20 * 1.2, this.canvasSize));

    },
    createSmallVillain(ballPosition) {
        this.balls.push(new Villain(this.ctx, ballPosition.x, ballPosition.y, 170 * .25, 200 * .25, 170, 10 * 1.6, 20 * 1.3, this.canvasSize));
        this.balls.push(new Villain(this.ctx, ballPosition.x, ballPosition.y, 170 * .25, 200 * .25, 170, -10 * 1.6, 20 * 1.3, this.canvasSize));

    },
    createFinalBoss() {
        if (this.balls.length === 0) {
            this.balls.push(new FinalBoss(this.ctx, 100, 2, 170 * 1.3, 200 * 1.3, 170, 10 * 1.15, 20 * 1.15, this.canvasSize))
        }
    },


    setDimensions() {
        this.canvasSize = { w: 1000, h: 500 }
        this.canvasDom.width = this.canvasSize.w
        this.canvasDom.height = this.canvasSize.h
    },

    start() {
        this.setDimensions()
        this.createPanda()
        this.balls = []
        this.createVillain()
        this.gameState = "started"
        alert('Hola, bienvenidos a mi juego')

        this.interval = setInterval(() => {
            this.clearAll()

            this.drawAll()
            if (this.panda.harpoon) this.panda.harpoon.drawImage()
            if (this.panda.harpoon) this.panda.deleteHarpoon()

            this.pandaCollision() ? this.pandaDamage() : null



            if (this.panda.harpoon) {
                this.harpoonCollision()[0] ? this.updateBalls(this.harpoonCollision()[1]) : null
            }

            this.gameOver()
        }, 100);
    },

    setListeners() {
        document.onkeyup = e => {
            if (this.gameState == "not started") {
                e.key === 'Shift' ? this.start() : null
            }
            e.keyCode === 32 && !this.panda.harpoon ? this.panda.createHarpoon() : null


        }
        document.addEventListener('keypress', e => {
            console.log(e.key)
            e.key === 'a' ? this.panda.moveLeft() : null
            e.key === 'd' ? this.panda.moveRight() : null

        })


    },

    drawAll() {
        this.panda.draw()
        this.balls.forEach(elm => elm.drawBall())

    },

    pandaCollision() {
        return this.balls.some(elm => {


            return (
                this.panda.pandaPos.x + this.panda.pandaSize.w - 60 > elm.ballVillainPos.x &&
                this.panda.pandaPos.x + 40 < elm.ballVillainPos.x + elm.ballVillainSize.w &&
                this.panda.pandaPos.y + this.panda.pandaSize.h - 70 > elm.ballVillainPos.y &&
                this.panda.pandaPos.y + 40 < elm.ballVillainPos.y + elm.ballVillainSize.h)
        })
    },

    harpoonCollision() {

        let index = undefined;

        return [this.balls.some((elm, idx) => {

            let bool =
                this.panda.harpoon.posX > elm.ballVillainPos.x &&
                this.panda.harpoon.posX + 20 < elm.ballVillainPos.x + elm.ballVillainSize.w &&
                this.panda.harpoon.posYBullet + this.panda.harpoon.bambooSize > elm.ballVillainPos.y &&
                this.panda.harpoon.posYBullet + 120 < elm.ballVillainPos.y + elm.ballVillainSize.h;

            if (bool) {
                index = idx
            }

            return bool;
        }),
            index]
    },
    updateBalls(idx) {
        //alert(this.balls[idx] instanceof FinalBoss)
        this.panda.harpoon.state = "finished"
        this.panda.harpoon = null

        if (!(this.balls[idx] instanceof FinalBoss)) {

            const ballPosition = { x: this.balls[idx].ballVillainPos.x, y: this.balls[idx].ballVillainPos.y }
            const size = this.balls[idx].ballVillainSize.w
            this.balls.splice(idx, 1)

            const sizeMap = { [170]: () => this.createMedVillain(ballPosition), [170 * .5]: () => this.createSmallVillain(ballPosition), [170 * .25]: () => this.createFinalBoss(ballPosition) }
            sizeMap[size]()

        } else {
            let finalBoss = this.balls[idx];
            !finalBoss.isHit ? finalBoss.loseLifes() : null
            console.log(this.balls[idx].lifes)
            if (!finalBoss.isAlive) {
                this.balls.pop()
                this.gameStart()
            }
        }





    },
    pandaDamage() {
        !this.panda.isHit ? this.panda.loseLifes() : null
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    gameOver() {
        if (!this.panda.isAlive) {
            clearInterval(this.interval)
            this.clearAll()
            this.gameState = "not started"
            const img = new Image()
            img.src = 'images/gameover.png'
            //onload de imageInstance
            img.onload = () => {
                this.ctx.drawImage(img, 250, 125, 500, 250)
            }
        }
    },

    gameStart() {
        clearInterval(this.interval)
        this.clearAll()
        const gif = new Image()
        gif.src = 'images/win.png'
        gif.onload = () => {
            this.ctx.drawImage(gif, 250, 125, 500, 250)
        }

    }
}