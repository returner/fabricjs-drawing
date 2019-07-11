import { Shape } from "../interface/Shape";
import { ShapeOption } from "../interface/ShapeOption";

export class Rectangle implements Shape {
    shapeId: string = "";    
    orderNo: number = 0;
    option : ShapeOption;
    constructor(option : ShapeOption) {
        this.option = option;
    }

}