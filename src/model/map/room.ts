import { Vec2 } from "../geometry/geometry.js";
import { World } from "../world/world.js";

export class Room {
  width: number;
  height: number;
  background: string;
  tileSet: string;
  tileMap: number[][];
  tiles: Array<ImageBitmap> = [];

  constructor(
    width: number,
    height: number,
    background: string,
    tileSet: string,
    tileMap: number[][]
  ) {
    this.width = width;
    this.height = height;
    this.background = background;
    this.tileSet = tileSet;
    this.tileMap = tileMap;
    this.loadTiles();
  }

  async loadTiles() {
    var request = new XMLHttpRequest();
    request.open("GET", "../../../assets/images/tileset/platforms2.png", true);
    request.responseType = "arraybuffer";

    request.onload = async (e) => {
      const byteArray = new Uint8Array(request.response);
      var blob = new Blob([byteArray], { type: "image/png" });
      const img = await createImageBitmap(blob);
      this.tiles.push(img);
    };

    request.send(null);
  }

  render(world: World) {
    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
        if (this.tileMap[i][j] == 1) {
          var tile: Array<Vec2> = [
            new Vec2(
              world.tileSize * (j - world.camera.x + 0),
              world.tileSize * (i - world.camera.y + 0)
            ),
            new Vec2(
              world.tileSize * (j - world.camera.x + 1),
              world.tileSize * (i - world.camera.y + 0)
            ),
            new Vec2(
              world.tileSize * (j - world.camera.x + 1),
              world.tileSize * (i - world.camera.y + 1)
            ),
            new Vec2(
              world.tileSize * (j - world.camera.x + 0),
              world.tileSize * (i - world.camera.y + 1)
            ),
          ];
          world.drawController.fillShape(tile, 100, 0, 100);

          if (this.tiles.length > 0) {
            world.drawController.drawImage(
              this.tiles[0],
              new Vec2(
                world.tileSize * (j - world.camera.x + 0),
                world.tileSize * (i - world.camera.y + 0)
              ),
              new Vec2(world.tileSize, world.tileSize),
              new Vec2(0, 0),
              new Vec2(16, 16)
            );
          }
        }
      }
    }
  }

  update() {}
}
