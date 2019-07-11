import { Shapes } from "../model/Shapes";
import { ShapeSize } from "../model/ShapeSize";
import { ShapePosition } from "../model/ShapePosition";
import { ShapeStroke } from "../model/ShapeStroke";

export interface ShapeOption extends fabric.IRectOptions {
    shapes : Shapes;
}