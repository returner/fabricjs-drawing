import {ShapeOption} from "../interface/ShapeOption";
import { Shapes } from "./Shapes";
import { ShapePosition } from "./ShapePosition";
import { ShapeSize } from "./ShapeSize";
import { ShapeStroke } from "./ShapeStroke";

export class RectOption implements ShapeOption {
    shapes = Shapes.Rectangle;
    left : number = 0;
    top : number = 0;
    width : number = 100;
    height : number = 100;
    fill = "transparent";
    angle = 0;
    strokeWidth : number = 1;
    stroke : string = "black";
    constructor() {
        this.shapes = Shapes.Rectangle;
    }
}