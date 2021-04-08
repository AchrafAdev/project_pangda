class Heart {
    constructor(ctx, posX) {
        this.ctx = ctx;
        this.pos = posX
    }

    drawImage() {
        const imageInstance = new Image()
        imageInstance.src = 'images/heart.png'
        this.ctx.drawImage(imageInstance, this.pos, 50, 50, 50)
    }
}