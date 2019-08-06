
import {fabric} from "fabric";
import { Shape } from "../interface/Shape";
import { Rectangle} from "../model/Rectangle";
import { RectOption } from "../model/RectOption";
import { ShapeType } from "../model/ShapeType";
import { DrawingState } from "../model/DrawingState";
import { DrawCanvasEvent } from "../model/DrawCanvasEvent";
import { DrawObject } from "../model/DrawObject";
import { ShapeOption } from "../interface/ShapeOption";
import { MousePoint } from "../model/MousePoint";


export class DrawCanvas {
    private currentDrawingFabricObject : DrawObject = new DrawObject();
    private currentShapes : ShapeType = ShapeType.None;
    private isDrawing : boolean = false;
    private drawCanvas : fabric.Canvas;
    private sketchBookCallback : Function;
    
    constructor(canvasElementId : string, sketchBookCallback : Function) {
        this.drawCanvas = new fabric.Canvas(canvasElementId);
        this.sketchBookCallback = sketchBookCallback;
    }

    private getFabricObject ( mousePoint : MousePoint)  : fabric.Object|null {
        if (this.currentShapes == ShapeType.None)
            return null;

        let shapeOption : ShapeOption;

        switch(this.currentShapes) {
            case ShapeType.Rectangle:
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
        console.log(event);
        if (this.currentShapes == ShapeType.None)
        {
            let fabricObject = this.getFabricObject(this.getDrawCanvasPoint(event.e));
            console.log(fabricObject);
        }
        let activeObject = this.drawCanvas.getActiveObject();
        if (activeObject != null)
        {
            //ignore when selected object.
            return;
        }
        console.log(`this.isDrawing:${this.isDrawing}`)
        if (this.currentShapes == ShapeType.None || this.isDrawing)
        {
            //ignore when undrawing mode or currently drawing
            return;
        }
        
        let fabricObject = this.getFabricObject(this.getDrawCanvasPoint(event.e));
        console.log(`fabricObject:${fabricObject}`)
        console.log(`fabricObject type:${typeof fabricObject}`)
        
        if (fabricObject == null)
            return;
        this.currentDrawingFabricObject.FabricObject = fabricObject;
        this.isDrawing = true;
        this.drawCanvas.add(this.currentDrawingFabricObject.FabricObject);
        this.drawCanvas.setActiveObject(this.currentDrawingFabricObject.FabricObject);

        let drawingState = new DrawCanvasEvent();
        drawingState.message = "state:drawStart";
        this.sketchBookCallback(drawingState);
    }

    private drawMove(event : fabric.IEvent) {
        if (this.currentShapes == ShapeType.None || !this.isDrawing)
            return;
        console.log("drawMove")
        let currentPoint = this.getDrawCanvasPoint(event.e);
        console.log(`currentPoint (${currentPoint.x} , ${currentPoint.y}) / fabricObjectPoint ( ${this.currentDrawingFabricObject.FabricObject.left},${this.currentDrawingFabricObject.FabricObject.top})`)
        let drawingWidth = currentPoint.x - (this.currentDrawingFabricObject.FabricObject.left as number);
        let drawingHeight = currentPoint.y - (this.currentDrawingFabricObject.FabricObject.top as number);
        console.log(`drawingWidth:${drawingWidth} / drawingHeight:${drawingHeight}`);
        this.currentDrawingFabricObject.FabricObject.set("width", drawingWidth).set("height", drawingHeight);
        
        this.drawCanvas.renderAll();
        let drawingState = new DrawCanvasEvent();
        drawingState.message = "state:drawMove";
        this.sketchBookCallback(drawingState);
    }

    private drawEnd(event : fabric.IEvent){
        if (this.currentShapes == ShapeType.None || !this.isDrawing)
            return;
        this.isDrawing = false;
        
        this.currentDrawingFabricObject.FabricObject.setCoords();
        let drawingState = new DrawCanvasEvent();
        drawingState.message = "state:drawEnd";
        this.sketchBookCallback(drawingState);
    }

    public configureMouseEvent(shapeType : ShapeType) {
        this.currentShapes = shapeType;
        if (this.currentShapes == ShapeType.None) {
            this.drawCanvas.off("mouse:down", (e) => {this.drawStart(e)});
            this.drawCanvas.off("mouse:move", (e) => {this.drawMove(e)});
            this.drawCanvas.off("mouse:up", (e) => {this.drawEnd(e)});
        } else {
            this.drawCanvas.on("mouse:down", (e) => {this.drawStart(e)})
            this.drawCanvas.on("mouse:move", (e) => {this.drawMove(e)})
            this.drawCanvas.on("mouse:up", (e) => {this.drawEnd(e)})
        }
    }
}