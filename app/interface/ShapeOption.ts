import { ShapeType } from "../model/ShapeType";
import { ShapeSize } from "../model/ShapeSize";
import { ShapePosition } from "../model/ShapePosition";
import { ShapeStroke } from "../model/ShapeStroke";

export interface ShapeOption extends fabric.IRectOptions {
    shapeType : ShapeType;
}