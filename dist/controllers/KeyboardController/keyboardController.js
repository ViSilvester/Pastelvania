import { Vec2 } from "../../model/geometry/geometry.js";
export class KeyboardController {
    constructor(world) {
        this.mousePos = new Vec2(0, 0);
        this.world = world;
        document.addEventListener("keydown", (e) => {
            this.onKeydown(e.key);
        });
        document.addEventListener("mousemove", (e) => {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
        });
        document.addEventListener("mousedown", (e) => {
            this.onMouseDown(e);
        });
    }
    onKeydown(key) {
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
    onMouseDown(e) {
        if (this.world.gameState == "editor") {
            this.world.map.putTile(this.mousePos, this.world);
        }
    }
}
