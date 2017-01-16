/**
 * KuspiJS Game Engine
 * Copyright (C) 2016, Xavier "Revax16" Hamel
 */

var KUSPI = {
    /**
     * Represent the core
     * @property {class} Game
     */
    Game:null,
    /**
     * Represent the Texture module
     * @property {class} Texture
     */
    Texture:null,
    /**
     * Represent the Entity module
     * @property {class} Entity
     */
    Entity:null,
    /**
     * Represent the Container module
     * @property {class} Container
     */
    Container:null,


    /**
     * Method that renderer the canvas
     * @property {method} renderer
     */
    renderer:null,
    /**
     * Method that renderer the canvas
     * @property {method} renderer
     */
    physics:null,

    /**
     * List of all Textures
     * @property {object} textures
     */
    textures:{},

    /**
     * Create a vector object
     * @method
     * @param {number} x - Position X
     * @param {number} y - Position Y
     */
    vector:function (x, y, z) {
        x = x === undefined ? 0 : x;
        y = y === undefined ? 0 : y;
        z = z === undefined ? 0 : z;
        return {
            x:x,
            y:y,
            z:z,
            /**
             * Adds another vector to itself.
             * @param {number} x - X position
             * @param {number} y - Y position
             * @ignore
             */
            add:function (x, y, z) {
                this.x = x === undefined ? this.x : x + this.x;
                this.y = y === undefined ? this.y : y + this.y;
                this.z = z === undefined ? this.z : z + this.z;
            },
            /**
             * Substracs another vector to itself.
             * @param {number} x - X position
             * @param {number} y - Y position
             * @ignore
             */
            sub:function (x, y, z) {
                this.x = x === undefined ? 0 - this.x : x - this.x;
                this.y = y === undefined ? 0 - this.y : y - this.y;
                this.z = z === undefined ? 0 - this.z : z - this.z;
            },
            /**
             * Multiplies components with another vector.
             * @param {number} x - X position
             * @param {number} y - Y position
             * @ignore
             */
            mult:function (x, y, z) {
                this.x = x === undefined ? this.x : x * this.x;
                this.y = y === undefined ? this.y : y * this.y;
                this.z = z === undefined ? this.z : z * this.z;
            },
            /**
             * Divides components with another vector.
             * @param {number} x - X position
             * @param {number} y - Y position
             * @ignore
             */
            div:function (x, y, z) {
                this.x = x === undefined ? this.x : x / this.x;
                this.y = y === undefined ? this.y : y / this.y;
                this.z = z === undefined ? this.z : z / this.z;
            }
        }
    },
    /**
     * Inputs functions
     * @method
     * @property {object} inputs - Method related to keys
     */
    inputs:{
        /**
         * Return true if the spesified key is trigered
         * @method
         * @param {number} k - KeyCode
         */
        KEY:function (k) {
            if (this.keyState[k]) return true;
        },
        keyState:[]
    },
}
