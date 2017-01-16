/**
 * KuspiJS Game Engine
 * Copyright (C) 2016, Xavier "Revax16" Hamel
 */

 /**
  * Class representing a Container
  * @alias KUSPI.Container
  */
KUSPI.Container = class {
    /**
     * Create a Container.
     * @param {String} name
     * @param {Object} [setting]
     * @param {Object} [setting.pos={x:0, y:0}]     - Position of the Container in X and Y
     * @param {Number} [setting.height=30]          - Height of the Container
     * @param {Number} [setting.width=30]           - Width of the Container
     * @param {Boolean} [setting.gravity=false]     - If we apply gravity or not
     * @param {Boolean} [setting.collision=true]    - If we apply or not collision on the Container
     */
    constructor (name, set) {
        if (typeof set !== 'object') set = {};
        this.name = name || undefined;
        this.type = 1;
        this.id;
        this.parent;

        this.physics = {
            gravity:set.gravity || false,
            collision:set.collision || true
        }

        this.pos = set.pos || KUSPI.vector(0,0);
        this.width = set.width || null;
        this.height = set.height || null;

        this.entities = [];
    }
    /**
     * Set new values to the Container
     * @param {Object} [property]
     * @param {Object} [property.pos=] - Position of the Container
     * @param {Number} [property.width=] - Width of the Container
     * @param {Number} [property.height=] - Height of the Container
     */
    setPorp (prop) {
        this.pos = prop.pos || this.pos;
        this.width = porp.width || this.width;
        this.height = prop.height || this.height;
    }
    /**
     * Append an entity or a group of entities to this Container
     * @param {Array|Object} entity - Represent an Array of Entities or a single Entity
     */
    appendChild (entities) {
        if (typeof entities !== 'object') entities = [entities];
        for (var i in entities) {
            var e = entities[i];
            if (e.type === 2) {
                e.id = this.parent.newID();
                e.parent = this;
                if (this.name === undefined) this.name = 'undefined-' + e.id;
                this.entities.push(e);
            }
        }
    }
}
