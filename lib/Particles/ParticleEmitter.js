/**
 * KuspiJS Game Engine
 * Copyright (C) 2017, Xavier "Revax16"
 */

KUSPI.ParticleEmitter = class {
    constructor (set) {
        if (typeof set !== 'object') set = {};
        if (!set.hasOwnProperty('particles')) set.particles = {};
        this.id = KUSPI.nextUID();
        this.name = set.name || 'undefined-' + this.id;
        this.type = 3;
        this.parent;

        this.pos = set.pos || KUSPI.vector(0, 0);
        this.width = set.width || 100;
        this.height = set.height || 0;
        this.angle = this.degreeToRadian(set.degree) || set.radian || 0;

        this.status = true;

        this.p = {
            total:0,
            max:set.particles.max || 300,
            duration:set.particles.duration || 200,
            // fade:KUSPI.random(0.1, 0.5),
            texture:set.particles.texture || null,
            perFrame:set.particles.perFrame || 1,
            vel:set.particles.vel,
            height:set.particles.height || 15,
            width:set.particles.width || 15,
            uid:0,
        }

        this.particles = [];

        KUSPI.particleEmitters.push(this);
    }

    newParticles () {
        var p = this.p,
            max = !this.status ? 0 : p.max,
            amount = max - p.total >= p.perFrame ? p.perFrame : max - p.total;
        for (var i = 0; i < amount; i++) {
            this.particles.push(new KUSPI.Particle({
                p:this,
                width:p.width,
                height:p.height,
                duration:p.duration
            }));
        }
    }

    nextUID () {
        return this.p.uid++;
    }

    remove (uid) {
        for (var i in this.particles) {
            if (this.particles[i].uid === uid) this.particles.splice(i, 1);
        }
    }

    toggle () {
        if (this.status) this.status = false
        else this.status = true;
    }
    start () {
        this.status = true;
    }
    stop () {
        this.status = false;
    }

    degreeToRadian (deg) {
        return deg * (Math.PI / 180);
    }
}
