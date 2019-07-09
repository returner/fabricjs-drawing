import {fabric} from "fabric";
import * as $ from "jquery";

export default class Main{
    public drawCircle() {
        console.log("circle");
    }
}

let main = new Main();

$(document).ready(()=>{
    $("#btnCircle").on("click", main.drawCircle);
    $("#btnRectangle").on("click", main.drawCircle);
    $("#btnTriangle").on("click", main.drawCircle);
    $("#btnLine").on("click", main.drawCircle);
    $("#btnDraw").on("click", main.drawCircle);
})


