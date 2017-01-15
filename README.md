Name     | Type       | Opt. | Default         | Description
----     | ----       | ---- | -------         | -----------
width    | Number     | True | 600            | Width of the canvas
height   | Number     | True | 400            | Height of the canvas
parent   | Element    | True | `document.body`| Parent to append the canvas
# KuspiJS
Un Game Engine en JS

## Guide
Exemple de projet

```javascript
var game = new KUSPI.Game();
game.setView(width, height, parent); // Défaut => width:600, height:400, parent:document.body

var container, player;
function setup () {
    container = new KUSPI.Container('border', { // Créer un Container pour contenir certain Entity
        gravity:true,                           // La gravité est activé dans ce container
    });
    game.appendChild(container);                // On ajoute le container à l'app

    player = new KUSPI.Entity('player', {       // Créer un Entity et la nomme player
        pos:KUSPI.vector(0, 0),                 // Utilise la méthode KUSPI.vector pour créer un nouveau vecteur
        width:10,                               // Défini la largeur
        height:game.view.height,                // Défini la hauteur
        gravity:true,                           // Gravité activé pour l'entité
        collision:true,                         // collision activé pour l'entité
        degree:0,                               // Rotation de l'objet
        anchor:KUSPI.vector(0,0),               // Le point de rotation de l'objet
        vel:KUSPI.vector(0,0)                   // Velocité en x et y
    });

    container.appendChild(player);              // Ajoute l'entité au container
}

function update() {                             // À chaque frame
    if (KUSPI.inputs.KEY(65)) {                 // On regarde si la touche avec le keyCode 65 en enfoncé
        p.vel.x = -4;                           // Si oui on met la velocité à -4
    } else if (KUSPI.inputs.KEY(68)) {          // On regarde si la touche avec le keyCode 68 en enfoncé
        p.vel.x = 4;                            // Si oui on met la velocité à 4
    } else p.vel.x = 0;                         // Sinon, on met la velocité à 0

    KUSPI.renderer(container);                    // On affiche le container
}
```

## Documentation

### KUSPI.Game({setup:setup, update:update})
Initialize a new app or game
Parameters:<br>
Name     | Type       | Opt. | Default      | Description
-------- | ---------- | ---- | ------------ | -----------
setup    | CallBack   | True | `setup`      | Function call 1 time when the app is initialized
update   | CallBack   | True | `update`     | Function call on each refresh (60 times per second normally)

#### \<Game\>.setView(width, height, parent)
Append the Canvas in the parent and set the width and the height
Parameters:
Name     | Type       | Opt. | Default         | Description
----     | ----       | ---- | -------         | -----------
width    | Number     | True | 600            | Width of the canvas
height   | Number     | True | 400            | Height of the canvas
parent   | Element    | True | `document.body`| Parent to append the canvas

#### \<Game\>.appendChild(container)
Append a container to the app
Parameters:
Name     | Type       | Opt.  | Description
----     | ----       | ----  | -----------
container| Object     | False | Represent a container
