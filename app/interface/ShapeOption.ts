import { Shapes } from "../model/Shapes";

export interface ShapeOption {
    shapes : Shapes;
    width : number;
    height : number;
    left : number;
    top : number;
    fill : string;
    angle : number;
    strokeWidth : number;
    stroke : string;
}