
import {Shape} from "../interface/Shape";
import { DrawCanvas } from "./DrawCanvas";
import { ShapeType } from "../model/ShapeType";
import { DrawCanvasEvent } from "../model/DrawCanvasEvent";

export class SketchBook {
    private shapes : Array<Shape> = [];
    private drawCanvas : DrawCanvas;

    constructor(canvasElementId : string) {
        this.drawCanvas = new DrawCanvas(canvasElementId, this.drawingShpesState);
    }

    private drawingShpesState (drawCanvasEvent : DrawCanvasEvent) {
        console.log(drawCanvasEvent.message);
    }

    public configureDrawing (shapeType : ShapeType){
        console.log(shapeType);
        this.drawCanvas.configureMouseEvent(shapeType);
    }
}