
import {Shape} from "../interface/Shape";
import { ShapeOption } from "../interface/ShapeOption";
import { RectOption } from "../model/RectOption";
import { Rectangle } from "../model/Rectangle";
import { DrawCanvas } from "./DrawCanvas";

export class SketchBook {
    private shapes : Array<Shape> = [];
    private drawCanvas : DrawCanvas;

    constructor(canvasElementId : string) {
        this.drawCanvas = new DrawCanvas(canvasElementId);
        console.log(`create canvase : ${canvasElementId}`);
    }
    public add(shape : Shape) {
        let rect = this.drawCanvas.createShape(shape);
        this.shapes.push(shape);
        console.log(shape)
    }

    public drawRect(option : ShapeOption) {
        let rectOption = new RectOption();
        let rect = new Rectangle(rectOption);
        this.add(rect);
    }
}