import { Room } from "./room.js";
import { roomGenerator } from "../../rooms/room_1.js";
import { World } from "../world/world.js";
import { Vec2 } from "../geometry/geometry.js";

export class GameMap {
  currentRoom: Room;
  roomGenerator: roomGenerator = new roomGenerator();
  tiles: Array<HTMLImageElement> = [];

  constructor() {
    this.currentRoom = this.roomGenerator.empty();
  }

  update(world: World) {}

  putTile(pos: Vec2, world: World) {
    const x = Math.floor(
      (world.camera.x * world.tileSize + pos.x) / world.tileSize
    );
    const y = Math.floor(
      (world.camera.y * world.tileSize + pos.y) / world.tileSize
    );

    if (x < 1000 && x >= 0 && y < 1000 && y >= 0) {
      if (this.currentRoom.tileMap[y][x] == 0) {
        this.currentRoom.tileMap[y][x] = 1;
      } else {
        this.currentRoom.tileMap[y][x] = 0;
      }
    }
  }

  public saveMap() {
    const json = JSON.stringify(this.currentRoom);
    var a = document.createElement("a");
    var file = new Blob([json], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = "Map.json";
    a.click();
  }

  public loadMap(e: any) {
    const fileList = e.target.files;
    const fileReader = new FileReader();

    fileReader.addEventListener("load", (e) => {
      const obj = JSON.parse(e.target!.result! as string) as Room;

      const map = new Room(
        obj.width,
        obj.height,
        obj.background,
        obj.tileSet,
        obj.tileMap
      );

      this.currentRoom = map;
    });

    fileReader.readAsText(fileList[0]);
  }
}
