/**
 * KuspiJS Game Engine
 * Copyright (C) 2016, Xavier "Revax16" Hamel
 */

KUSPI.Texture = class {
    constructor (set) {
        this.name       = set.name || 'undefined-' + Object.keys(KUSPI.textures).length;
        this.img        = new Image();
        this.img.src    = set.src
        this.anim       = set.anim;

        this.sprites    = [];

        for (var i in set.sprites) {
            this.sprites.push({
                name:i,
                pos:set.sprites[i].pos,
                h:set.sprites[i].height,
                w:set.sprites[i].width,
            })
        }

        KUSPI.textures[this.name] = this;
    }
}
