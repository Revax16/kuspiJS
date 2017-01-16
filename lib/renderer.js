/**
 * KuspiJS Game Engine
 * Copyright (C) 2016, Xavier "Revax16" Hamel
 */

/**
 * Method that renderer the canvas
 * @property {Method} renderer
 * @param {Object|Array} renderable - Represent an Entity or a Container
 * @param {object} [game=Parent of the renderable object] - Represent a game object (Riquired if only entities are specified)
 */
KUSPI.renderer = function (renderable, game) {
    KUSPI.physics(renderable);
    // Internal Variable
    var canvas = null,
        ctx = null,
        view = null;
    if (!Array.isArray(renderable)) renderable = [renderable];
    for (var i in renderable) {
        var r = renderable[i];
        // If it's a container
        if (r.type === 1) {
            for (var i in r.entities) {
                setView(r.parent);
                drawShape(r.entities[i]);
            }
        }
        // If it's a shape
        if (r.type === 2) {
            setView(game);
            drawShape(r);
        }
    }

    function setView (g) {
        if (ctx === null) {
            canvas = g.canvas;
            ctx = g.ctx || g.canvas.getContext('2d');
            view = g.view;
            ctx.clearRect(0, 0, view.width, view.height)
        }
    }
    // Draw the shape
    function drawShape (entity) {
        ctx.save();
        ctx.translate(entity.pos.x, entity.pos.y);
        ctx.rotate(entity.angle);
        ctx.translate(-(entity.anchor.x * entity.width), -(entity.anchor.y * entity.height));
        if (entity.texture.anim !== null && KUSPI.textures.hasOwnProperty(entity.texture.anim.name)) {
            var texture = KUSPI.textures[entity.texture.anim.name],
                sprite = texture.sprites[entity.texture.frame],
                interval = 1000 / entity.texture.anim.fps,
                lastFrame = entity.texture.lastFrame;

            ctx.drawImage(texture.img, sprite.pos.x, sprite.pos.y, sprite.w, sprite.h, 0, 0, entity.width, entity.height);
            if (Date.now() - lastFrame > interval) {
                entity.texture.frame++;
                entity.texture.lastFrame = Date.now() - ((Date.now() - lastFrame) % interval);
                if (texture.sprites.length <= entity.texture.frame) entity.texture.frame = 0;
            }
        } else {
            ctx.fillStyle = 'CCC';
            ctx.fillRect(0, 0, entity.width, entity.height)
        }
        // Pour la rotation : http://stackoverflow.com/questions/4649836/using-html5-canvas-rotate-image-about-arbitrary-point/4650102#4650102
        ctx.restore();
    }

    function getPoints (entity, shape) {
        switch (shape) {
            default: return [
                KUSPI.vector(0, 0),
                KUSPI.vector(entity.width, 0),
                KUSPI.vector(entity.width, entity.height),
                KUSPI.vector(0, entity.height),
            ]

        }
    }
}
