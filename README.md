# KuspiJS
A JS game Engine inspired by MelonJS and StageJS and p5JS

Un Moteur de Jeu JS inspiré par MelonJS, StageJS et p5JS

## Sample Code / Exemple

```javascript
Kuspi(function ( k ) {
    k.setView();
    k.setup = function () {
        bb = new k.Entity('bb', {pos:k.vector(0, k.view.height - 10), width:k.view.width, height:10});
        bl = new k.Entity('bl', {pos:k.vector(101, k.view.height - 50), width:20, height:50});
        p = new k.Entity('p', {pos:k.vector(200, 200), width:20, height:50, gravity:true, anchor:k.vector(0.5, 0.5), degree:0});
    }
    k.update = function () {
        if (k.inputs.KEY(87) && p.vel.y === 0) p.vel.y = -9;
        if (k.inputs.KEY(68)) {
            p.vel.x = 5;
        } else if (k.inputs.KEY(65)) {
            p.vel.x = -5;
        } else {
            if (p.vel.x > 0) p.vel.x -= 1;
            if (p.vel.x < 0) p.vel.x += 1;
        }
        k.renderer([bb, p, bl]);
    }
});
```

## Documentation

See the Wiki Page / Voir la page du Wiki
