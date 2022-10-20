var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Vec2 } from "../geometry/geometry.js";
export class Room {
    constructor(width, height, background, tileSet, tileMap) {
        this.tiles = [];
        this.width = width;
        this.height = height;
        this.background = background;
        this.tileSet = tileSet;
        this.tileMap = tileMap;
        this.loadTiles();
    }
    loadTiles() {
        return __awaiter(this, void 0, void 0, function* () {
            var request = new XMLHttpRequest();
            request.open("GET", "../../../assets/images/tileset/platforms2.png", true);
            request.responseType = "arraybuffer";
            request.onload = (e) => __awaiter(this, void 0, void 0, function* () {
                const byteArray = new Uint8Array(request.response);
                var blob = new Blob([byteArray], { type: "image/png" });
                const img = yield createImageBitmap(blob);
                this.tiles.push(img);
            });
            request.send(null);
        });
    }
    render(world) {
        for (var i = 0; i < this.height; i++) {
            for (var j = 0; j < this.width; j++) {
                if (this.tileMap[i][j] == 1) {
                    var tile = [
                        new Vec2(world.tileSize * (j - world.camera.x + 0), world.tileSize * (i - world.camera.y + 0)),
                        new Vec2(world.tileSize * (j - world.camera.x + 1), world.tileSize * (i - world.camera.y + 0)),
                        new Vec2(world.tileSize * (j - world.camera.x + 1), world.tileSize * (i - world.camera.y + 1)),
                        new Vec2(world.tileSize * (j - world.camera.x + 0), world.tileSize * (i - world.camera.y + 1)),
                    ];
                    world.drawController.fillShape(tile, 100, 0, 100);
                    if (this.tiles.length > 0) {
                        world.drawController.drawImage(this.tiles[0], new Vec2(world.tileSize * (j - world.camera.x + 0), world.tileSize * (i - world.camera.y + 0)), new Vec2(world.tileSize, world.tileSize), new Vec2(0, 0), new Vec2(16, 16));
                    }
                }
            }
        }
    }
    update() { }
}
