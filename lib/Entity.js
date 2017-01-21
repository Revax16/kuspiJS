/**
 * KuspiJS Game Engine
 * Copyright (C) 2017, Xavier "Revax16"
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
        this.visible = set.visible === undefined ? true : set.visible;
        this.color = set.color || '#CCC';

        if (set.anim !== undefined) this.anim(set.anim.name, set.anim.fps || 0);

        this.texture = {
            anim:null,
            frame:0,
            lastFrame:Date.now()
        }

        this.physics = {
            g:set.gravity || false,
            c:set.collision === undefined ? true : set.collision,
            p:[], // Collide Points
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

    clone () {
        var ne = new KUSPI.Entity(this.name + '-clone', {
            width:this.width,
            height:this.height,
            radian:this.angle,
            anchor:this.anchor,
            gravity:this.physics.g,
            collision:this.physics.c,
            anim:this.texture.anim === null ? undefined : {name:this.texture.anim.name + ':' + this.texture.anim.anim, fps:this.texture.anim.fps}
        });
        return ne;
    }

    collide (arg) {
        if (typeof arg === 'string') var c = this.physics.p.filter(function (p) {return p[0] === arg});
        else if (typeof arg === 'object') var c = this.physics.p.filter(function (p) {return p[1] === arg});
        if (c.length > 0) return true;
    }

    degreeToRadian (deg) {
        return deg * (Math.PI / 180);
    }
}
