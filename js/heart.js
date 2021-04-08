class Heart {
    constructor(ctx, posX) {
        this.ctx = ctx;
        this.pos = posX
    }

    drawHeartPanda() {
        const imageInstance = new Image()
        imageInstance.src = 'images/heart.png'
        this.ctx.drawImage(imageInstance, this.pos, 50, 50, 50)
    }

    drawHeartPanter() {
        const imageInstance = new Image()
        imageInstance.src = 'images/blackheart.png'
        this.ctx.drawImage(imageInstance, this.pos, 100, 50, 50)
    }
}