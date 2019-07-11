import * as $ from "jquery";
import { RectOption } from "./model/RectOption";
import { SketchBook } from "./util/SketchBook";
import { Shapes } from "./model/Shapes";

export class Main{
    private canvasElementId : string = "";
    private sketchBook : SketchBook;
    constructor(canvasElementId : string)
    {
        this.canvasElementId = canvasElementId;
        this.sketchBook = new SketchBook(this.canvasElementId);
    }

    public drawShape : Function = (shapes : Shapes) => {
        let rectOption = new RectOption();
        this.sketchBook.drawRect(rectOption);
    };

    public configShape (shapes : Shapes) {
        this.sketchBook.configureDrawing(shapes);
    }
}

let main = new Main("canvas");

$(document).ready(()=>{

    $("#btnNone").on("click", () => {
        main.configShape(Shapes.None);
    });
    $("#btnRectangle").on("click", () => {
        main.configShape(Shapes.Rectangle);
    });
    $("#btnCircle").on("click", () => {
        main.configShape(Shapes.Circle);
    });
    $("#btnTriangle").on("click", () => {
        main.configShape(Shapes.Triangle);
    });
    $("#btnLine").on("click", () => {
        main.configShape(Shapes.Line);
    });
    $("#btnDraw").on("click", () => {
        main.configShape(Shapes.Draw);
    });
});
