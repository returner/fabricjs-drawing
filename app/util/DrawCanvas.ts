
import {fabric} from "fabric";
import { Shape } from "../interface/Shape";
import { Rectangle} from "../model/Rectangle";
import { RectOption } from "../model/RectOption";
import { Shapes } from "../model/Shapes";
import { DrawingState } from "../model/DrawingState";


export class FabricRectOption implements fabric.IRectOptions {
    
}
export class DrawCanvas {

    private currentShapes : Shapes = Shapes.None;
    private isDrawing : boolean = false;
    private drawCanvas : fabric.Canvas;
    private sketchBookCallback : Function;
    public executeSketchBookCallback = (drawingState : DrawingState) => {
        this.sketchBookCallback(drawingState);
    }
    constructor(canvasElementId : string, sketchBookCallback : Function) {
        this.drawCanvas = new fabric.Canvas(canvasElementId);
        this.sketchBookCallback = sketchBookCallback;
    }

    private getFabricObject (shape : Shape)  : fabric.Object {
        if (shape instanceof Rectangle) {
            console.log("shape is Rectangle")
        }

        return new fabric.Rect(shape.option);
    }

    private drawStart(event : fabric.IEvent) {
        if (this.currentShapes == Shapes.None || this.isDrawing)
            return;
        this.isDrawing = true;
        console.log("drawStart")
        let drawingState = new DrawingState();
        drawingState.message = "state:drawStart";
        this.sketchBookCallback(drawingState);
    }

    private drawMove(event : fabric.IEvent) {
        if (this.currentShapes == Shapes.None || !this.isDrawing)
            return;
        console.log("drawMove")
        let drawingState = new DrawingState();
        drawingState.message = "state:drawMove";
        this.sketchBookCallback(drawingState);
    }

    private drawEnd(event : fabric.IEvent){
        if (this.currentShapes == Shapes.None || !this.isDrawing)
            return;
        this.isDrawing = false;
        console.log("drawEnd")
        let drawingState = new DrawingState();
        drawingState.message = "state:drawEnd";
        this.sketchBookCallback(drawingState);
    }

    public configureMouseEvent(shapes : Shapes) {
        this.currentShapes = shapes;
        if (this.currentShapes == Shapes.None) {
            this.drawCanvas.off("mouse:down", (e) => {this.drawStart(e)});
            this.drawCanvas.on("mouse:move", (e) => {this.drawMove(e)});
            this.drawCanvas.off("mouse:up", (e) => {this.drawEnd(e)});
        } else {
            this.drawCanvas.on("mouse:down", (e) => {this.drawStart(e)})
            this.drawCanvas.on("mouse:move", (e) => {this.drawMove(e)})
            this.drawCanvas.on("mouse:up", (e) => {this.drawEnd(e)})
        }
    }

    public createShape(shape : Shape) {
        let fabricObject = this.getFabricObject(shape);
        
        this.drawCanvas.add(fabricObject);
    }
}