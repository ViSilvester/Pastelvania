import { DrawController } from "../../controllers/drawController/drawController.js";
import { Vec2 } from "../geometry/geometry.js";
import { GameMap } from "../map/map.js";
export class World {
    constructor() {
        this.gameState = "game";
        this.drawController = new DrawController();
        this.tileSize = this.drawController.height / 10;
        this.camera = new Vec2(0, 0);
        this.map = new GameMap();
    }
}
