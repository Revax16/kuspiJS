/**
 * KuspiJS Game Engine
 * Copyright (C) 2017, Xavier "Revax16"
 */

KUSPI.Container = class {
    constructor (name, set) {
        if (typeof set !== 'object') set = {};
        this.name = name || undefined;
        this.type = 1;
        this.id = KUSPI.nextUID();

        this.physics = {
            gravity:set.gravity || false,
            collision:set.collision || true
        }

        this.pos = set.pos || KUSPI.vector(0,0);
        this.width = set.width || null;
        this.height = set.height || null;

        this.entities = [];
        this.particules = [];

        KUSPI.containers.push(this);
    }
    setPorp (prop) {
        this.pos = prop.pos || this.pos;
        this.width = porp.width || this.width;
        this.height = prop.height || this.height;
    }
    append (entities) {
        if (!Array.isArray(entities)) entities = [entities];
        for (var i in entities) {
            var e = entities[i];
            if (e.type === 2) {
                e.parent = this;
                this.entities.push(e);
            } else if (e.type === 3) {
                e.parent = this;
                this.particules.push(e);
            }
        }
    }
}
