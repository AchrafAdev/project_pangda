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
    framesCounter: 0,
    canvasDom: undefined,


    init() {
        this.canvasDom = document.getElementById("canvas")
        this.ctx = this.canvasDom.getContext("2d")
        this.setListeners()
        this.start()
    },
    createPanda() {
        this.panda = new Panda(this.ctx, this.canvasDom.width / 2 - 75, 380)
    },

    createVillain() {
        this.balls.push(new Villain(this.ctx, 100, 2, 170, 200, 170, 10, 20, this.canvasSize));

    },



    setDimensions() {
        this.canvasSize = { w: 1000, h: 500 }
        this.canvasDom.width = this.canvasSize.w
        this.canvasDom.height = this.canvasSize.h
    },

    start() {
        this.setDimensions()
        this.createPanda()
        this.createVillain()
        //this.createHarpoon()

        setInterval(() => {
            this.clearAll()

            this.drawAll()
            if (this.panda.harpoon) this.panda.harpoon.drawImage()
            if (this.panda.harpoon) this.panda.deleteHarpoon()

            this.pandaCollision() // ? alert("DOLA PEPEPEPEPEPEP") : null



            if (this.panda.harpoon) {
                this.harpoonCollision()[0] ? this.updateBalls(this.harpoonCollision()[1]) : null

            }
        }, 100);
    },

    setListeners() {
        document.onkeyup = e => {
            e.key === 'Shift' ? alert('MONEDA INSERTADA') : null



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
        const ballPosition = { x: this.balls[idx].ballVillainPos.x, y: this.balls[idx].ballVillainPos.y }
        if (this.balls[idx].ballVillainSize.w === 170) {
            this.balls.splice(idx, 1)
            this.panda.harpoon.state = "finished"
            this.panda.harpoon = null
            this.balls.push(new Villain(this.ctx, ballPosition.x, ballPosition.y, 170 * .5, 200 * .5, 170, 10 * 1.2, 20 * 1.2, this.canvasSize));
            this.balls.push(new Villain(this.ctx, ballPosition.x, ballPosition.y, 170 * .5, 200 * .5, 170, -10 * 1.2, 20 * 1.2, this.canvasSize));

        }
        else if (this.balls[idx].ballVillainSize.w === 170 * .5) {
            this.balls.splice(idx, 1)
            this.panda.harpoon.state = "finished"
            this.panda.harpoon = null
            this.balls.push(new Villain(this.ctx, ballPosition.x, ballPosition.y, 170 * .25, 200 * .25, 170, 10 * 1.6, 20 * 1.3, this.canvasSize));
            this.balls.push(new Villain(this.ctx, ballPosition.x, ballPosition.y, 170 * .25, 200 * .25, 170, -10 * 1.6, 20 * 1.3, this.canvasSize));

        } else if (this.balls[idx].ballVillainSize.w === 170 * .25) {
            this.balls.splice(idx, 1)
            this.panda.harpoon.state = "finished"
            this.panda.harpoon = null
        }

    },


    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    }
}