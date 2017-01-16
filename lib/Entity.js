/**
 * KuspiJS Game Engine
 * Copyright (C) 2016, Xavier "Revax16" Hamel
 */

/** Class representing an Entity */
KUSPI.Entity = class {
    /**
     * Create an Entity.
     * @param {String} name
     * @param {Object} [setting]
     * @param {Object} [setting.pos={x:0, y:0}]     - Position of the Entity in X and Y
     * @param {Number} [setting.height=30]          - Height of the Entity
     * @param {Number} [setting.width=30]           - Width of the Entity
     * @param {Object} [setting.anchor={x:0, y:0}]  - Anchor point of the Entity (between 0 and 1)
     * @param {Number} [setting.degree=0]           - Angle of the Entity in degrees
     * @param {Number} [setting.radian=0]           - Angle of the Entity in radian
     * @param {Boolean} [setting.gravity=false]     - If we apply gravity or not
     * @param {Boolean} [setting.collision=true]    - If we apply or not collision on the Entity
     */
    constructor (name, set) {
        if (typeof set !== 'object') set = {};
        this.name = name || undefined;
        this.type = 2;
        this.id;
        this.parent;

        this.pos = set.pos || KUSPI.vector(0,0);
        this.width = set.width || 30;
        this.height = set.height || 30;
        this.angle = this.degreeToRadian(set.degree) || set.radian || 0;
        this.anchor = set.anchor || KUSPI.vector(0,0);
        this.vel = set.vel || KUSPI.vector(0,0);

        this.texture = {
            anim:null,
            frame:0,
            lastFrame:Date.now()
        }

        this.physics = {
            g:set.gravity || false,
            c:set.collision || true,
            // Some important points for the collision Engine
            p:{
                center:KUSPI.vector(this.pos.x, this.pos.y).add(this.width * .5, this.height * .5),
                top:this.pos.y,
                right:this.pos.x + this.width,
                bottom:this.pos.y + this.height,
                left:this.pos.x,
            }
        };

        //this.shapes = [];
    }
    /**
     * Set new values to the Entity
     * @param {Object} [property]
     * @param {Object} [property.pos=Current Value]           - Position of the object in X and Y
     * @param {Number} [property.height=Current Value]        - Height of the object
     * @param {Number} [property.width=Current Value]         - Width of the object
     * @param {Object} [property.anchor=Current Value]        - Anchor point of the object (between 0 and 1)
     * @param {Number} [property.degree=Current Value]        - Angle of the object in degrees
     * @param {Number} [property.radian=Current Value]        - Angle of the object in radian
     */
    setPorp (prop) {
        this.pos = prop.pos || this.pos;
        this.width = prop.width || this.width;
        this.height = prop.height || this.height;
        this.anchor = prop.anchor || this.anchor;
        this.angle = this.degreeToRadian(prop.degree) || prop.radian || this.angle;
    }
    /**
     * Set an animation to the entity
     * @param {String} name - Name of the texture in the format 'name:animation'
     * @see KUSPI.Texture
     * @param {Number} fps - Number of fps for the animation
     */
    anim (name, fps) {
        this.texture.anim = {name:name.split(':')[0], anim:name.split(':')[1], fps:fps || 0};
        this.texture.frame = 0;
    }
    /**
     * Use an animation for the texture
     */
    useAnim () {
        this.texture.use = 'anim';
    }
    /**
     * Remove the use of an animation or sprite
     */
    useNoTexture () {
        this.texture.use = null;
    }

    /**
     * Get a property of the entity
     * @param {String} prop - Property to get (eg.: height, width, x, y)
     */
    getProp (prop) {
        switch (prop) {
            case 'height':
                return this.height;
                break;
            case 'width':
                return this.width;
                break;
            case 'x':
                return this.pos.x;
                break;
            case 'y':
                return this.pos.y;
                break;
        }
    }
    /**
     * Degrees To Radian
     * @param {Object} deg - Number of degrees
     * @ignore
     */
    degreeToRadian (deg) {
        return deg * (Math.PI / 180);
    }
    /**
     * Append a shape to this Entity
     * @param {Object} shape - Represent a shape
     * @ignore
     */
    // appendChild (s) {
    //
    // }
}
