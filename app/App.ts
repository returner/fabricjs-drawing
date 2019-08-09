import * as $ from "jquery";
import { SketchBook } from "./util/SketchBook";
import { ShapeType } from "./model/ShapeType";

export class Main{
    private canvasElementId : string = "";
    private sketchBook : SketchBook;
    constructor(canvasElementId : string)
    {
        this.canvasElementId = canvasElementId;
        this.sketchBook = new SketchBook(this.canvasElementId);
    }

    public configShape (shapeType : ShapeType) {
        this.sketchBook.configureDrawing(shapeType);
    }

    public exportJson() {
        let json = this.sketchBook.exportJson();
    }
     
}

let main = new Main("canvas");

$(document).ready(()=>{

    $("#btnNone").on("click", () => {
        main.configShape(ShapeType.None);
    });
    $("#btnRectangle").on("click", () => {
        main.configShape(ShapeType.Rectangle);
    });
    $("#btnCircle").on("click", () => {
        main.configShape(ShapeType.Circle);
    });
    $("#btnEllipse").on("click", () => {
        main.configShape(ShapeType.Ellipse);
    });
    $("#btnTriangle").on("click", () => {
        main.configShape(ShapeType.Triangle);
    });
    $("#btnLine").on("click", () => {
        main.configShape(ShapeType.Line);
    });
    $("#btnDraw").on("click", () => {
        main.configShape(ShapeType.Draw);
    });

    $("#btnExportJson").on("click", () => {
        main.exportJson();
    })
});
