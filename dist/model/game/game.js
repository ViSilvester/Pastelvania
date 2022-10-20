import { KeyboardController } from "../../controllers/keyboardController/keyboardController.js";
import { World } from "../world/world.js";
export class Game {
    constructor() {
        this.world = new World();
        this.keyboadController = new KeyboardController(this.world);
    }
    create() {
        document.getElementById("saveBtn").onclick = () => {
            this.world.map.saveMap();
        };
        document.getElementById("loadBtn").onchange = (e) => {
            this.world.map.loadMap(e);
        };
    }
    update() {
        this.world.map.update(this.world);
    }
    render() {
        this.world.drawController.fillBackgroudColor(100, 100, 255);
        this.world.map.currentRoom.render(this.world);
    }
    gameLoop() {
        window.requestAnimationFrame(() => {
            this.update();
            this.render();
            this.gameLoop();
        });
    }
    play() {
        this.create();
        this.gameLoop();
    }
}
