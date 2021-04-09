const pangdaGame = {
    name: 'Pangda',
    description: 'App for Canvas basic forms',
    author: 'Achraf Arazzouk & Yerai Pinedo',
    license: undefined,
    version: '1.0.0',
    canvasSize: { width: 0, height: 0 },
    ctx: undefined,
    panda: undefined,
    audio: undefined,
    audioIsPlaying: false,
    balls: [],
    interval: undefined,
    gameState: "not started",
    canvasDom: undefined,
    marker: undefined,
    points: 0,
    intervalTimer: 100,
    level: 1,


    init() {

        this.canvasDom = document.getElementById("canvas")
        this.ctx = this.canvasDom.getContext("2d")
        this.setListeners()
        this.setDimensions()
        this.createAudio()
        this.gameStarted()
    },
    createAudio() {
        this.audio = new GameAudio()
        console.log(this.audio);
    },
    renderMarker() {
        this.marker = new Marker(this.ctx, this.points, this.level)
    },
    createPanda() {
        this.panda = new Panda(this.ctx, this.canvasDom.width / 2 - 75, 380)
    },

    createVillain() {
        this.balls.push(new Villain(this.ctx, 100, 2, 170, 200, 100, 10, 20, this.canvasSize));

    },
    createMedVillain(ballPosition) {
        this.balls.push(new Villain(this.ctx, ballPosition.x, ballPosition.y, 170 * .5, 200 * .5, 150, 10 * 1.2, 20 * 1.2, this.canvasSize));
        this.balls.push(new Villain(this.ctx, ballPosition.x, ballPosition.y, 170 * .5, 200 * .5, 150, -10 * 1.2, 20 * 1.2, this.canvasSize));

    },
    createSmallVillain(ballPosition) {
        this.balls.push(new Villain(this.ctx, ballPosition.x, ballPosition.y, 170 * .25, 200 * .25, 200, 10 * 1.6, 20 * 1.3, this.canvasSize));
        this.balls.push(new Villain(this.ctx, ballPosition.x, ballPosition.y, 170 * .25, 200 * .25, 200, -10 * 1.6, 20 * 1.3, this.canvasSize));

    },
    createFinalBoss() {
        if (this.balls.length === 0) {
            this.balls.push(new FinalBoss(this.ctx, 100, 2, 170 * 1.3, 200 * 1.3, 300, 10 * .8, 20 * .85, this.canvasSize))
        }
    },


    setDimensions() {
        this.canvasSize = { w: 1000, h: 500 }
        this.canvasDom.width = this.canvasSize.w
        this.canvasDom.height = this.canvasSize.h
    },


    loop() {

        //Esto puede ir fuera
        this.createPanda()
        this.balls = []
        this.createVillain()
        this.gameState = "started"


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
        }, this.intervalTimer);
    },

    setListeners() {


        document.onkeyup = e => {

            if (this.gameState == "not started") {
                e.key === 'Shift' ? this.loop() : null
            }

            e.keyCode === 32 && !this.panda.harpoon ? this.panda.createHarpoon() : null
        }


        document.addEventListener('keypress', e => {

            e.key === 'a' ? this.panda.moveLeft() : null
            e.key === 'd' ? this.panda.moveRight() : null

        })

        let but = document.querySelector('.button')

        but.addEventListener('click', () => {
            !(this.audioIsPlaying) ? (this.audio.background.play(), this.audioIsPlaying = true, but.innerText = "Sound ON", but.style.background = "green") : (this.audio.background.pause(), this.audioIsPlaying = false, but.innerText = "Sound OFF", but.style.background = "red")
        })

        but.addEventListener('keyup', event => {
            if (event.which === 32 || event.which === 13) {
                event.preventDefault();
            }
        })

    },

    drawAll() {
        this.panda.draw()
        this.renderMarker()
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

        this.panda.harpoon.state = "finished"
        this.panda.harpoon = null


        if (!(this.balls[idx] instanceof FinalBoss)) {
            this.audio.tiger.play()
            const ballPosition = { x: this.balls[idx].ballVillainPos.x, y: this.balls[idx].ballVillainPos.y }
            const size = this.balls[idx].ballVillainSize.w
            this.points += parseInt(this.balls[idx].ballPoints)
            this.balls.splice(idx, 1)

            const sizeMap = { [170]: () => this.createMedVillain(ballPosition), [170 * .5]: () => this.createSmallVillain(ballPosition), [170 * .25]: () => this.createFinalBoss(ballPosition) }
            sizeMap[size]()

        } else {
            this.audio.panther.play()
            let finalBoss = this.balls[idx];
            !finalBoss.isHit ? finalBoss.loseLifes() : null

            if (!finalBoss.isAlive) {
                this.points += parseInt(this.balls[idx].ballPoints)
                this.balls.pop()
                this.gameFinished()
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
            this.audio.gameover.play()
            this.gameState = "not started"
            const img = new Image()
            img.src = 'images/gameover.png'
            img.onload = () => {
                this.ctx.drawImage(img, 250, 125, 400, 250)
            }
            this.ctx.font = "56px Arial";
            this.ctx.fillStyle = "#000000";
            this.points = this.points - (3 - this.panda.lifes) * 9.54
            this.ctx.fillText("Your score: " + parseInt(this.points), 290, 420);
        }
    },

    gameFinished() {
        clearInterval(this.interval)
        this.clearAll()
        this.gameState = "not started"
        this.audio.win.play()
        const gif = new Image()
        gif.src = 'images/win.png'
        gif.onload = () => {
            console.log(gif)
            this.ctx.drawImage(gif, 250, 125, 500, 250)
        }
        (this.intervalTimer == 100) ? (this.intervalTimer -= 50, this.level = 2) : (this.intervalTimer = 100, this.points = 0, this.level = 1)
        this.ctx.font = "56px Arial";
        this.ctx.fillStyle = "#000000";
        this.points = this.points - (3 - this.panda.lifes) * 9.54
        this.ctx.fillText("Your score: " + parseInt(this.points), 290, 420);

    },



    gameStarted() {
        //this.audio.background.play()
        const gif = new Image()
        gif.src = 'images/insert.png'
        gif.onload = () => {
            console.log(gif)
            this.ctx.drawImage(gif, 100, 200, 800, 150)
        }

    }
}