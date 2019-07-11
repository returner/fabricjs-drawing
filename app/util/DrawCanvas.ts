
import {fabric} from "fabric";
import { Shape } from "../interface/Shape";
import { Rectangle} from "../model/Rectangle";
import { RectOption } from "../model/RectOption";
import { Shapes } from "../model/Shapes";
import { DrawingState } from "../model/DrawingState";
import { DrawCanvasEvent } from "../model/DrawCanvasEvent";
import { DrawObject } from "../model/DrawObject";
import { ShapeOption } from "../interface/ShapeOption";
import { MousePoint } from "../model/MousePoint";


export class DrawCanvas {

    private currentDrawingFabricObject : DrawObject = new DrawObject();
    private currentShapes : Shapes = Shapes.None;
    private isDrawing : boolean = false;
    private drawCanvas : fabric.Canvas;
    private sketchBookCallback : Function;
    
    constructor(canvasElementId : string, sketchBookCallback : Function) {
        this.drawCanvas = new fabric.Canvas(canvasElementId);
        this.sketchBookCallback = sketchBookCallback;
    }

    private getFabricObject ( mousePoint : MousePoint)  : fabric.Object|null {
        if (this.currentShapes == Shapes.None)
            return null;

        let shapeOption : ShapeOption;

        switch(this.currentShapes) {
            case Shapes.Rectangle:
                shapeOption = new RectOption();
                shapeOption.width = 1;
                shapeOption.height = 1;
                shapeOption.left = mousePoint.x;
                shapeOption.top = mousePoint.y;
                break;
            default:
                return null;
        }

        return new fabric.Rect(shapeOption);
    }

    private getDrawCanvasPoint(e : Event) : MousePoint {
        let pointer = this.drawCanvas.getPointer(e);
        return new MousePoint(pointer.x, pointer.y);
    }

    private drawStart(event : fabric.IEvent) {
        if (this.currentShapes == Shapes.None || this.isDrawing)
            return;
        
        let fabricObject = this.getFabricObject(this.getDrawCanvasPoint(event.e));
        if (fabricObject == null)
            return;
        
        this.isDrawing = true;
        this.drawCanvas.add(fabricObject);

        let drawingState = new DrawCanvasEvent();
        drawingState.message = "state:drawStart";
        this.sketchBookCallback(drawingState);
    }

    private drawMove(event : fabric.IEvent) {
        if (this.currentShapes == Shapes.None || !this.isDrawing)
            return;
        console.log("drawMove")
        let drawingState = new DrawCanvasEvent();
        drawingState.message = "state:drawMove";
        this.sketchBookCallback(drawingState);
    }

    private drawEnd(event : fabric.IEvent){
        if (this.currentShapes == Shapes.None || !this.isDrawing)
            return;
        this.isDrawing = false;
        console.log("drawEnd")
        let drawingState = new DrawCanvasEvent();
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
}