/**
 * KuspiJS Game Engine
 * Copyright (C) 2016, Xavier "Revax16" Hamel
 */

KUSPI.Entity = class {
    constructor (name, set) {
        if (typeof set !== 'object') set = {};
        this.id = KUSPI.nextUID();
        this.name = name || 'undefined-' + this.id;
        this.type = 2;
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
            p:{
                center:KUSPI.vector(this.pos.x, this.pos.y).add(this.width * .5, this.height * .5),
                top:this.pos.y,
                right:this.pos.x + this.width,
                bottom:this.pos.y + this.height,
                left:this.pos.x,
            }
        };

        this.events = {
            CLICK:null,
            MM:null, // MouseMove
            ANIMEND:null,
            MD:null, // MouseDown
            ME:null, // MouseEnter
            MO:null, // MouseOver
        }

        KUSPI.entities.push(this);
    }
    anim (name, fps) {
        this.texture.anim = {name:name.split(':')[0], anim:name.split(':')[1], fps:fps || 0};
        this.texture.frame = 0;
    }

    on (a, cb) {
        if (a === 'click' || a === 'mousedown') this.events.CLICK = cb;
        if (a === 'mousemove') this.events.MM = cb;
        if (a === 'animationend') this.events.ANIMEND = cb;
    }

    setPorp (prop) {
        this.pos = prop.pos || this.pos;
        this.width = prop.width || this.width;
        this.height = prop.height || this.height;
        this.anchor = prop.anchor || this.anchor;
        this.angle = this.degreeToRadian(prop.degree) || prop.radian || this.angle;
    }
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

    degreeToRadian (deg) {
        return deg * (Math.PI / 180);
    }
}
