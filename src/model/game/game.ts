import { KeyboardController } from "../../controllers/keyboardController/keyboardController.js";
import { Room } from "../map/room.js";
import { World } from "../world/world.js";

export class Game {
  world: World = new World();
  keyboadController = new KeyboardController(this.world);

  private create() {
    document.getElementById("saveBtn")!.onclick = () => {
      this.world.map.saveMap();
    };
    document.getElementById("loadBtn")!.onchange = (e) => {
      this.world.map.loadMap(e);
    };
  }

  private update() {
    this.world.map.update(this.world);
  }

  private render() {
    this.world.drawController.fillBackgroudColor(100, 100, 255);
    this.world.map.currentRoom.render(this.world);
  }

  private gameLoop() {
    window.requestAnimationFrame(() => {
      this.update();
      this.render();
      this.gameLoop();
    });
  }

  public play() {
    this.create();
    this.gameLoop();
  }
}
