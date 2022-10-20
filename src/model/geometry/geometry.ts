export class Vec2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Vec3 {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

export class Edge{
    v1 : Vec2;
    v2 : Vec2;

    constructor(v1 : Vec2, v2 : Vec2){
        this.v1 = v1;
        this.v2 = v2;
    }
}

export class geometryUtils {


    intersect(k: Vec2, l: Vec2, m: Vec2, n: Vec2, intersec: Vec2) {

        var det = (n.x - m.x) * (l.y - k.y) - (n.y - m.y) * (l.x - k.x);

        if (det == 0.0) {
            return false; // não há intersecção
        }

        var s = ((n.x - m.x) * (m.y - k.y) - (n.y - m.y) * (m.x - k.x)) / det;
        var t = ((l.x - k.x) * (m.y - k.y) - (l.y - k.y) * (m.x - k.x)) / det;

        intersec.x = k.x + (l.x - k.x) * s;
        intersec.y = k.y + (l.y - k.y) * s;

        if ((intersec.x < k.x && intersec.x < l.x)
            ||
            (intersec.x > k.x && intersec.x > l.x)
            ||
            (intersec.y < k.y && intersec.y < l.y)
            ||
            (intersec.y > k.y && intersec.y > l.y)) {
            return false;
        }
        if ((intersec.x < m.x && intersec.x < n.x)
            ||
            (intersec.x > m.x && intersec.x > n.x)
            ||
            (intersec.y < m.y && intersec.y < n.y)
            ||
            (intersec.y > m.y && intersec.y > n.y)) {
            return false;
        }

        return true; // há intersecção

    }

    distEntre2Pontos(p1: Vec2, p2: Vec2) {

        var x: number = p1.x - p2.x;
        var y: number = p1.y - p2.y;

        return Math.sqrt((x * x) + (y * y));
    }

    vetorUnit(p: Vec2): Vec2 {
        var v = new Vec2(p.x / Math.sqrt((p.x * p.x) + (p.y * p.y)), p.y / Math.sqrt((p.x * p.x) + (p.y * p.y)));
        return v;
    }

    vecModulo(p: Vec2) {
        return Math.sqrt((p.x * p.x) + (p.y * p.y))
    }

    produtoEscalar(p1: Vec2, p2: Vec2) {
        return (p1.x * p2.x) + (p1.y * p2.y);
    }

    vecMultiplication(p1: Vec2, n: number) {
        return new Vec2(p1.x * n, p1.y * n);
    }

    vecProjection(p1: Vec2, p2: Vec2) {

        return this.vecMultiplication(
            p2,
            (this.produtoEscalar(p1, p2) / this.produtoEscalar(p2, p2))
        );
    }

    interpolateVec3(p1: Vec3, p2: Vec3, level: number) {
        return new Vec3(
            p1.x + (level * (p2.x - p1.x)),
            p1.y + (level * (p2.y - p1.y)),
            p1.z + (level * (p2.z - p1.z))
        );
    }

    interpolateVec2(p1: Vec2, p2: Vec2, level: number) {
        return new Vec2(
            p1.x + (level * (p2.x - p1.x)),
            p1.y + (level * (p2.y - p1.y)),
        );
    }

}