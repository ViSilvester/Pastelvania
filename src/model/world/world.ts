import { DrawController } from "../../controllers/drawController/drawController.js";
import { Vec2 } from "../geometry/geometry.js";
import { GameMap } from "../map/map.js";

export class World {
  gameState = "game";
  drawController: DrawController = new DrawController();
  tileSize: number = this.drawController.height / 10;
  camera: Vec2 = new Vec2(0, 0);
  map: GameMap = new GameMap();
}
