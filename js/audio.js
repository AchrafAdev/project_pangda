class GameAudio {
    constructor() {
        this.background = new Audio('./audio/background_sound.mp3')
        this.tiger = new Audio('./audio/tigre.wav')
        this.panther = new Audio('./audio/panther.wav')
        this.win = new Audio('./audio/win.wav')
        this.gameover = new Audio('./audio/gameover.wav')


        this.background.volume = 0.1
        this.tiger.volume = 1
    }
}