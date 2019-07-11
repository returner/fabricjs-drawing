import { Shape } from "../interface/Shape";
import { ShapeOption } from "../interface/ShapeOption";
import { RectOption } from "./RectOption";

export class Rectangle implements Shape {
    shapeId: string = "";    
    orderNo: number = 0;
    option : ShapeOption;
    constructor() {
        this.option = new RectOption();
    }

}