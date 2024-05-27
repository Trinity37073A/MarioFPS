class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(other) {
        return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    subtract(other) {
        return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
    }

    multiply(scalar) {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }

    normalize() {
        const len = this.length();
        return new Vector3(this.x / len, this.y / len, this.z / len);
    }
}

class Projectile {
    constructor(position, direction, speed) {
        this.position = position;
        this.direction = direction.normalize();
        this.speed = speed;
    }

    update(deltaTime) {
        this.position = this.position.add(this.direction.multiply(this.speed * deltaTime));
    }
}

class Target {
    constructor(position, radius) {
        this.position = position;
        this.radius = radius;
    }

    isHit(projectile) {
        const distance = this.position.subtract(projectile.position).length();
        return distance <= this.radius;
    }
}

// Example usage:
const projectile = new Projectile(new Vector3(0, 0, 0), new Vector3(1, 0, 0), 50);
const target = new Target(new Vector3(100, 0, 0), 5);

const deltaTime = 0.016; // Assume 60 FPS

let hit = false;
while (!hit) {
    projectile.update(deltaTime);
    hit = target.isHit(projectile);
    console.log(`Projectile position: (${projectile.position.x}, ${projectile.position.y}, ${projectile.position.z})`);
    if (hit) {
        console.log('Target hit!');
    }
}
