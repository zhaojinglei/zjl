class Captcha {
    [x: string]: any;
    canvas: any;
    paint: any;
    callback: any;
    constructor(params: any) {
        let middleParams = Object.assign(
            {
                lineWidth: 0.5,
                lineNum: 2,
                dotR: 1,
                dotNum: 15,
                preGroundColor: [10, 80],
                backGroundColor: [150, 250],
                fontSize: 20,
                fontFamily: ["Georgia", "微软雅黑", "Helvetica", "Arial"],
                fontStyle: "fill",
                content: "acdefhijkmnpwxyABCDEFGHJKMNPQWXY12345789",
                length: 4
            },
            params
        );
        Object.keys(middleParams).forEach(item => {
            this[item] = middleParams[item];
        });
        this.canvas = null;
        this.paint = null;
    }

    getRandom(...arr: number[]) {
        arr.sort((a, b) => a - b);
        return Math.floor(Math.random() * (arr[1] - arr[0]) + arr[0]);
    }

    getColor(arr: any) {
        let colors = new Array(3).fill("");
        colors = colors.map(item => this.getRandom(...arr));
        return colors;
    }
    getText() {
        let length = this.content.length;
        let str = "";
        for (let i = 0; i < this.length; i++) {
            str += this.content[this.getRandom(0, length)];
        }
        return str;
    }

    line() {
        for (let i = 0; i < this.lineNum; i++) {
            let x = this.getRandom(0, this.canvas.width);
            let y = this.getRandom(0, this.canvas.height);
            let endX = this.getRandom(0, this.canvas.width);
            let endY = this.getRandom(0, this.canvas.height);
            this.paint.beginPath();
            this.paint.lineWidth = this.lineWidth;
            let colors = this.getColor(this.preGroundColor);
            this.paint.strokeStyle = "rgba(" + colors[0] + "," + colors[1] + "," + colors[2] + "," + "0.8)";
            this.paint.moveTo(x, y);
            this.paint.lineTo(endX, endY);
            this.paint.closePath();
            this.paint.stroke();
        }
    }
    circle() {
        for (let i = 0; i < this.dotNum; i++) {
            let x = this.getRandom(0, this.canvas.width);
            let y = this.getRandom(0, this.canvas.height);
            this.paint.beginPath();
            this.paint.arc(x, y, this.dotR, 0, Math.PI * 2, false);
            this.paint.closePath();
            let colors = this.getColor(this.preGroundColor);
            this.paint.fillStyle = "rgba(" + colors[0] + "," + colors[1] + "," + colors[2] + "," + "0.8)";
            this.paint.fill();
        }
    }

    font() {
        let str = this.getText();
        this.callback(str);
        this.paint.font = this.fontSize + "px " + this.fontFamily[this.getRandom(0, this.fontFamily.length)];
        this.paint.textBaseline = "middle";
        let fontStyle = this.fontStyle + "Text";
        let colorStyle = this.fontStyle + "Style";
        for (let i = 0; i < this.length; i++) {
            let fontWidth = this.paint.measureText(str[i]).width;
            let x = this.getRandom((this.canvas.width / this.length) * i + 0.2 * fontWidth, (this.canvas.width / this.length) * i + 0.5 * fontWidth);
            let deg = this.getRandom(-6, 6);
            let colors = this.getColor(this.preGroundColor);
            this.paint[colorStyle] = "rgba(" + colors[0] + "," + colors[1] + "," + colors[2] + "," + "0.8)";
            this.paint.save();
            this.paint.rotate((deg * Math.PI) / 180);
            this.paint[fontStyle](str[i], x, this.canvas.height / 2);
            this.paint.restore();
        }
    }
    draw(dom: any, callback: Function = function() {}) {
        if (!this.paint) {
            this.canvas = dom;
            if (!this.canvas) return;
            else this.paint = this.canvas.getContext("2d");
            this.callback = callback;
            this.canvas.onclick = () => {
                this.drawAgain();
            };
        }
        let colors = this.getColor(this.backGroundColor);
        this.paint.fillStyle = "rgba(" + colors[0] + "," + colors[1] + "," + colors[2] + "," + "0.8)";
        this.paint.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.circle();
        this.line();
        this.font();
    }
    clear() {
        this.paint.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawAgain() {
        this.clear();
        this.draw(this.callbak);
    }
}

export default Captcha;
