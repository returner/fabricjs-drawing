
import {Shape} from "../interface/Shape";
import { ShapeOption } from "../interface/ShapeOption";
import { RectOption } from "../model/RectOption";
import { Rectangle } from "../model/Rectangle";
import { DrawCanvas } from "./DrawCanvas";
import { Shapes } from "../model/Shapes";
import { DrawingState } from "../model/DrawingState";
import { DrawCanvasEvent } from "../model/DrawCanvasEvent";

export class SketchBook {
    private shapes : Array<Shape> = [];
    private drawCanvas : DrawCanvas;

    constructor(canvasElementId : string) {
        this.drawCanvas = new DrawCanvas(canvasElementId, this.drawingShpesState);
    }

    private drawingShpesState (drawCanvasEvent : DrawCanvasEvent) {
        console.log(drawCanvasEvent.message);

        // let shape : Shape = new Rectangle();
        // this.shapes.push(shape);
    }

    // public drawRect(option : ShapeOption) {
    //     this.drawCanvas.createShape(shape);
    // }

    public configureDrawing (shapes : Shapes){
        this.drawCanvas.configureMouseEvent(shapes);
    }
}