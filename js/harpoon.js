class Harpoon {
    constructor(ctx, pandaPosX) {

        this.ctx = ctx;
        this.posX = pandaPosX + 50;
        this.velY = 50;
        this.posYBullet = 450;
        this.state = 'finished';
        this.bambooSize = 10

    }


    drawImage() {
        const imageInstance = new Image()
        imageInstance.src = 'images/bamboo-bullet.png'
        this.ctx.drawImage(imageInstance, this.posX, this.posYBullet, 20, this.bambooSize)

        this.lineMove()
    }

    lineMove() {
        if (this.posYBullet > 4) {
            this.posYBullet -= this.velY
            this.bambooSize += 50

        }
    }


}