class Marker {
    constructor(ctx, mark) {
        this.ctx = ctx;
        this.canvasSize = {
            width: 150,
            height: 100
        }
        this.mark = mark

        this.init()
    }

    init() {
        this.draw()
    }

    draw() {
        this.ctx.font = "56px Georgia";
        this.ctx.fillStyle = "#000000";
        this.ctx.fillText(parseInt(this.mark), 50, 100);
    }
    // updateScore(){

    // }
}