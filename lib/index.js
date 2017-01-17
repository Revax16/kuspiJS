/**
 * KuspiJS Game Engine
 * Copyright (C) 2016, Xavier "Revax16" Hamel
 */

var Kuspi = function (cb) {
    cb(KUSPI);
    KUSPI.core();
}

var KUSPI = {
    Texture:null,
    Entity:null,
    Container:null,

    renderer:null,
    physics:null,
    setView:null,
    core:null,

    setup:null,
    update:null,

    textures:{},
    entities:[],

    uid:0,
    view:{
        canvas:null,
        ctx:null,
        width:null,
        height:null,
        offsetLeft:null,
        offsetTop:null
    },

    nextUID:function () {
        return KUSPI.uid++;
    },

    updateView:function () {
        if (this.view.canvas !== null) {
            this.view.offsetTop = this.view.canvas.offsetTop;
            this.view.offsetLeft = this.view.canvas.offsetLeft;
            this.view.width = this.view.canvas.offsetWidth;
            this.view.height = this.view.canvas.offsetHeight;
        }
    },
    vector:function (x, y) {
        x = x === undefined ? 0 : x;
        y = y === undefined ? 0 : y;
        return {
            x:x,
            y:y,

            add:function (x, y) {
                this.x = x === undefined ? this.x : x + this.x;
                this.y = y === undefined ? this.y : y + this.y;
            },
            sub:function (x, y) {
                this.x = x === undefined ? 0 - this.x : x - this.x;
                this.y = y === undefined ? 0 - this.y : y - this.y;
            },
            mult:function (x, y) {
                this.x = x === undefined ? this.x : x * this.x;
                this.y = y === undefined ? this.y : y * this.y;
            },
            div:function (x, y) {
                this.x = x === undefined ? this.x : x / this.x;
                this.y = y === undefined ? this.y : y / this.y;
            }
        }
    },

    inputs:{
        key:[],
        KEY:function (k) {
            if (this.key[k]) return true;
        },

        moEntity:null,
        MOUSEOVER:function (e) {

        }
    },
}
