/**
 * KuspiJS Game Engine
 * Copyright (C) 2016, Xavier "Revax16" Hamel
 */

/**
 * Class representing a game or an app
 * @alias KUSPI.Game
 */
KUSPI.Game = class {
    /**
     * Create a game.
     * @param {Object} [setting]
     * @param {Callback} setting.setup=setup   - The setup function  (Executed one time)
     * @param {Callback} setting.update=update  - The update function (Executed each frame)
     */
    constructor (set) {
        this.type = 0;
        this.id = -1;
        this.set = set

        this.ctx = null;
        this.canvas = null;
        this.view = {
            width:0,
            height:0,
        }

        this.container = [];

        window.addEventListener('keydown', function(e) {
            console.log(e.keyCode);
            KUSPI.inputs.keyState[e.keyCode || e.which] = true;
        });
        window.addEventListener('keyup', function(e) {
            KUSPI.inputs.keyState[e.keyCode || e.which] = false;
        });
    }
    create (set) {
        if (typeof set !== 'object') set = {setup, update};
        set.setup = set.hasOwnProperty('setup') ? set.setup : 'setup';
        set.update = set.hasOwnProperty('update') ? set.update : 'update';

        set.setup();
        if (this.ctx !== null) {
            var animate = function () {
                set.update();
                window.requestAnimationFrame(animate);
            }
            animate();
        }
    }
    newID () {
        this.id++;
        return this.id;
    }
    /**
     * Append the canvas to the parent and set the view
     * @param {number} [width=600] - Represent the width of the canvas
     * @param {number} [height=400] - Represent the height of the canvas
     * @param {number} [parent=document.body] - Represent a div
     */
    setView (w, h, p) {
        p = p || document.body;
        w = w || 600;
        h = h || 400;

        var c = document.createElement('CANVAS');
        c.width = w;
        c.height = h;
        p.appendChild(c);

        this.canvas = c;
        this.ctx = c.getContext('2d');
        this.view.width = w;
        this.view.height = h;

        this.create(this.set);
    }
    /**
     * Append a container to this game view
     * @param {Object} container - Represent a Container
     * @see KUSPI.Container
     */
    appendChild (c) {
        if (c.type === 1) {
            c.id = this.newID();
            c.parent = this;
            c.width = c.width === null ? this.view.width : c.width;
            c.height = c.height === null ? this.view.height : c.height;
            this.container.push(c);
        }
    }
}
