
import {fabric} from "fabric";
import { Shape } from "../interface/Shape";

export class DrawCanvas {

    private drawCanvas : fabric.Canvas;
    constructor(canvasElementId : string) {
        this.drawCanvas = new fabric.Canvas(canvasElementId);
    }

    public createShape(shape : Shape) {
        
    }
}