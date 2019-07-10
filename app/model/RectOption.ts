import {ShapeOption} from "../interface/ShapeOption";
import { Shapes } from "./Shapes";

export class RectOption implements ShapeOption {
    shapes = Shapes.None;
    width = 100;
    height = 100;
    left = 2;
    top = 3;
    fill = "transparent";
    angle = 0;
    strokeWidth = 1;
    stroke = "black";
}