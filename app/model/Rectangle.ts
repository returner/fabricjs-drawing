import { Shape } from "../interface/Shape";
import { ShapeOption } from "../interface/ShapeOption";
import { RectOptions } from "./ShapeOptions/RectOptions";

export class Rectangle implements Shape {
    shapeId: string = "";    
    orderNo: number = 0;
    option : ShapeOption;
    constructor() {
        this.option = new RectOptions();
    }

}