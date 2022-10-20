import { Room } from "./room.js";
import { roomGenerator } from "../../rooms/room_1.js";
export class GameMap {
    constructor() {
        this.roomGenerator = new roomGenerator();
        this.tiles = [];
        this.currentRoom = this.roomGenerator.empty();
    }
    update(world) { }
    putTile(pos, world) {
        const x = Math.floor((world.camera.x * world.tileSize + pos.x) / world.tileSize);
        const y = Math.floor((world.camera.y * world.tileSize + pos.y) / world.tileSize);
        if (x < 1000 && x >= 0 && y < 1000 && y >= 0) {
            if (this.currentRoom.tileMap[y][x] == 0) {
                this.currentRoom.tileMap[y][x] = 1;
            }
            else {
                this.currentRoom.tileMap[y][x] = 0;
            }
        }
    }
    saveMap() {
        const json = JSON.stringify(this.currentRoom);
        var a = document.createElement("a");
        var file = new Blob([json], { type: "text/plain" });
        a.href = URL.createObjectURL(file);
        a.download = "Map.json";
        a.click();
    }
    loadMap(e) {
        const fileList = e.target.files;
        const fileReader = new FileReader();
        fileReader.addEventListener("load", (e) => {
            const obj = JSON.parse(e.target.result);
            const map = new Room(obj.width, obj.height, obj.background, obj.tileSet, obj.tileMap);
            this.currentRoom = map;
        });
        fileReader.readAsText(fileList[0]);
    }
}
