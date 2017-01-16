/**
 * KuspiJS Game Engine
 * Copyright (C) 2016, Xavier "Revax16" Hamel
 */

 /**
  * Class representing a Texture
  */
KUSPI.Texture = class {
    /**
     * Create a Texture.
     * @param {String} name
     * @param {Object} setting
     * @param {String} [setting.name=undefined]     - Position of the Container in X and Y
     * @param {String} setting.src                  - Src of the image
     * @param {Object} setting.anim                 - Object of animation list
     * @param {Object} setting.sprites              - Object of sprites
     * //@see Exemple pour
     */
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
