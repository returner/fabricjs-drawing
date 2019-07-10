import * as $ from "jquery";
import { RectOption } from "./model/RectOption";
import { SketchBook } from "./util/SketchBook";
import { Shapes } from "./model/Shapes";

export class Main{
    private canvasElementId : string = "";
    private currentShapes : Shapes = Shapes.None;
    private sketchBook : SketchBook;
    constructor(canvasElementId : string)
    {
        this.canvasElementId = canvasElementId;
        this.sketchBook = new SketchBook(this.canvasElementId);

    }
    public drawShape : Function = (shapes : Shapes) => {
        this.currentShapes = Shapes.Rectangle;
        let rectOption = new RectOption();
        this.sketchBook.drawRect(rectOption);
    };
}



$(document).ready(()=>{
    let main = new Main("canvas");

    $("#btnRectangle").on("click", () => {
        main.drawShape(Shapes.Rectangle);
    });
    $("#btnCircle").on("click", () => {
        main.drawShape(Shapes.Circle);
    });
});

