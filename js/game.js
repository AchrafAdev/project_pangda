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
        this.panda = new Panda(this.ctx, this.canvasDom.width / 2 - 75, 320)
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

            this.pandaCollision() //? //alert("DOLA PEPEPEPEPEPEP") : null



            if (this.panda.harpoon) {
                this.harpoonCollision()[0] ? this.balls.splice(this.harpoonCollision()[1], 1) : null
                console.log(this.balls)
            }
        }, 100);
    },

    setListeners() {
        document.onkeyup = e => {
            e.key === 'Shift' ? alert('MONEDA INSERTADA') : null
            e.key === 'ArrowLeft' ? this.panda.moveLeft() : null
            e.key === 'ArrowRight' ? this.panda.moveRight() : null

            e.keyCode === 32 && !this.panda.harpoon ? this.panda.createHarpoon() : null


        }
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
                this.panda.harpoon.posX < elm.ballVillainPos.x + elm.ballVillainSize.w - 20 &&
                this.panda.harpoon.posYBullet > elm.ballVillainPos.y &&
                this.panda.harpoon.posYBullet + 120 < elm.ballVillainPos.y + elm.ballVillainSize.h;

            if (bool) {
                index = idx
            }

            return bool;
        }),
            index]
    },
    clearBalls() {

    }

    ,

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    }
}