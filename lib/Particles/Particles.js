/**
 * KuspiJS Game Engine
 * Copyright (C) 2017, Xavier "Revax16"
 */

KUSPI.Particle = class {
    constructor (set) {
        this.parent = set.p;
        this.type = 4;

        this.uid = this.parent.nextUID();
        this.pos = KUSPI.vector(KUSPI.random(set.p.pos.x, set.p.pos.x + set.p.width), KUSPI.random(set.p.pos.y, set.p.pos.y + set.p.height)),
        this.vel = set.vel || KUSPI.vector(KUSPI.random(-.5, .5), KUSPI.random(-0.5, -2));
        this.width = set.width;
        this.height = set.height;

        this.duration = {
            current:set.duration,
            initial:set.duration
        }
    }
    compute () {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.height = this.height * (this.duration.current / this.duration.initial);
        this.width = this.width * (this.duration.current / this.duration.initial);

        if (this.duration.current === 0 || this.width < 1 || this.width < 1) {
            this.parent.remove(this.uid);
        }
        this.duration.current--;
    }
}
