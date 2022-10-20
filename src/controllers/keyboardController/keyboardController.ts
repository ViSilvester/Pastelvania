import { Vec2 } from "../../model/geometry/geometry.js";
import { World } from "../../model/world/world.js";

export class KeyboardController {
  world: World;
  mousePos = new Vec2(0, 0);

  constructor(world: World) {
    this.world = world;
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      this.onKeydown(e.key);
    });

    document.addEventListener("mousemove", (e: MouseEvent) => {
      this.mousePos.x = e.clientX;
      this.mousePos.y = e.clientY;
    });

    document.addEventListener("mousedown", (e: MouseEvent) => {
      this.onMouseDown(e);
    });
  }

  onKeydown(key: string) {
    switch (key) {
      case "d":
        this.world.camera.x += 1;
        break;
      case "a":
        this.world.camera.x -= 1;
        break;
      case "w":
        this.world.camera.y -= 1;
        break;
      case "s":
        this.world.camera.y += 1;
        break;
      case "1":
        this.world.gameState = "game";
        break;
      case "2":
        this.world.gameState = "editor";
        break;
    }
  }

  onMouseDown(e: MouseEvent) {
    if (this.world.gameState == "editor") {
      this.world.map.putTile(this.mousePos, this.world);
    }
  }
}
