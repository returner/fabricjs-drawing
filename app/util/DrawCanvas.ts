
import {fabric} from "fabric";
import { Shape } from "../interface/Shape";
import { Rectangle} from "../model/Rectangle";
import { RectOption } from "../model/RectOption";


export class FabricRectOption implements fabric.IRectOptions {
    
}
export class DrawCanvas {

    private drawCanvas : fabric.Canvas;
    constructor(canvasElementId : string) {
        this.drawCanvas = new fabric.Canvas(canvasElementId);
    }

    private getFabricObject (shape : Shape)  : fabric.Object {
        if (shape instanceof Rectangle) {
            console.log("shape is Rectangle")
        }

        return new fabric.Rect(shape.option);
    }

    public createShape(shape : Shape) {
        let fabricObject = this.getFabricObject(shape);
        
        this.drawCanvas.add(fabricObject);
    }
}