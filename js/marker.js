class Marker {
    constructor(ctx, mark, lvl) {
        this.ctx = ctx;
        this.canvasSize = {
            width: 150,
            height: 100
        }
        this.lvl = lvl
        this.mark = mark

        this.init()
    }

    init() {
        this.draw()
    }

    draw() {
        this.ctx.font = "56px Georgia";
        this.ctx.fillStyle = "#000000";
        this.ctx.fillText("Level" + this.lvl + ": " + parseInt(this.mark), 50, 100);
    }
    // updateScore(){

    // }
}