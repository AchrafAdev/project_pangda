class Harpoon {
    constructor(ctx, pandaPosX, pandaPosY, pandaWidth, pandaHeight) {

        this.ctx = ctx;
        this.posX = pandaPosX + pandaWidth / 2.4;
        //this.posY = pandaPosY - pandaHeight;

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