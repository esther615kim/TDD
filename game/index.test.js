const { expect, test } = require('@jest/globals');
const { Pokemon, Trainer, Battle } = require('./class');

describe('Pokemon', () => {
    test("Pokemon-check the type: object", () => {
        const newPokemon = new Pokemon("chuchu");
        expect(typeof newPokemon).toBe('object');
    })
    test('Pokemon- should have the following properties:name, type, hitPoint, attackDamage, sound and move', () => {
        const newPokemon = new Pokemon("chuchu");
        expect(newPokemon).toHaveProperty('name');
        expect(newPokemon).toHaveProperty('hitPoint');
        expect(newPokemon).toHaveProperty('attackDamage');
        expect(newPokemon).toHaveProperty('type');
    })
    test("Pokemon- can talk", () => {
        const newPokemon = new Pokemon("chuchu", 55);
        expect(newPokemon.talk()).toBe("chucchuc");
    })
    test("Pokemon- returns normal type when nothing has been passed", () => {
        const newPokemon = new Pokemon("chuchu", 55);
        expect(newPokemon.type).toBe("Normal");
    })
    test("Pokemon- test the passed poke type", () => {
        const newPokemon = new Pokemon("chuchu", 55, "Fire", 15);
        expect(newPokemon.type).toBe("Fire");
    })
    test("Pokemon- has a userYourMoves method", () => {
        const newPokemon = new Pokemon("chuchu", 55, "Fire");
        expect(newPokemon.useYourMoves("walk")).toBe('walk');
    })
    test("Pokemon- has strength", () => {
        const newPokemon = new Pokemon("chuchu", 55, "Fire");
        expect(newPokemon.strength).toBe("Grass");
    })
    test("Pokemon -has weakness", () => {
        const newPokemon = new Pokemon("chuchu", 55, "Fire");
        expect(newPokemon.weakness).toBe("Water");
        const newPokemon1 = new Pokemon("khukhu", 55, "Grass");
        expect(newPokemon1.weakness).toBe("Fire");
    })
})

describe('Trainer', () => {
    test("Trainer- should have a name property", () => {
        const newTrainer = new Trainer("Esther");
        expect(newTrainer).toHaveProperty('name');
    })
    test("Trainer- should have 0 pokes when started", () => {
        const newTrainer = new Trainer("Esther");
        expect(newTrainer.pokemons).toEqual([]);
        expect(newTrainer.pokemons.length).toBe(0);
    })
    test("Trainer- can catch a poke", () => {
        const newTrainer = new Trainer("Esther");
        const newPokemon1 = new Pokemon("khukhu", 55, "Grass");
        //   const newPokemon2 = new Pokemon("chuchu", 55, "Fire");
        newTrainer.catch(newPokemon1)
        //  newTrainer.catch(newPokemon2)
        expect(newTrainer.pokemons).toEqual([{
            name: 'khukhu',
            type: 'Grass',
            hitPoint: 55,
            attackDamage: 0,
            strength: 'Water',
            weakness: 'Fire'
        }]);
    })
})

describe('Battle', () => {
    //trainers and pokemons

    test('Battle- can access the passed trainer\'s pokemons', () => {
        const trainer1 = new Trainer("Esther");
        const pokemon1 = new Pokemon("khukhu", 55, "Grass", 100);
        const trainer2 = new Trainer("Roshni");
        const pokemon2 = new Pokemon("didi", 100, "Fire", 20);
        trainer1.catch(pokemon1);
        trainer2.catch(pokemon2);
        const battle = new Battle(trainer1, trainer2, 0, 0);
        expect(battle).toHaveProperty("trainer1Poke");
        expect(battle).toHaveProperty("trainer2Poke");
        expect(battle.trainer1Poke).toEqual({
            name: 'khukhu',
            type: 'Grass',
            hitPoint: 55,
            attackDamage: 100,
            strength: 'Water',
            weakness: 'Fire'
        })

    })

    test('fight- deducts the attacker\'s damagePoint', () => {
        const trainer1 = new Trainer("Esther");
        const pokemon1 = new Pokemon("khukhu", 55, "Normal", 100);
        const trainer2 = new Trainer("Roshni");
        const pokemon2 = new Pokemon("didi", 100, "Normal", 20);
        trainer1.catch(pokemon1);
        trainer2.catch(pokemon2);
        const battle = new Battle(trainer1, trainer2, 0, 0);

        battle.fight();
        expect(pokemon1.attackDamage).toBe(100);
        expect(pokemon2.hitPoint).toBe(0);
    })

    test('fight- when the defender\'s hitPoints is 0, the attacker should win ', () => {
        const trainer1 = new Trainer("Esther");
        const pokemon1 = new Pokemon("khukhu", 0, "Grass", 100);
        const trainer2 = new Trainer("Roshni");
        const pokemon2 = new Pokemon("didi", 0, "Fire", 20);
        trainer1.catch(pokemon1);
        trainer2.catch(pokemon2);
        const battle = new Battle(trainer1, trainer2, 0, 0);
        expect(battle.fight()).toBe("The Winner is didi")
    })

    test('fight- type check: fire vs grass', () => {
        const trainer3 = new Trainer("Esther");
        const pokemon3 = new Pokemon("khukhu", 50, "Fire", 10);
        trainer3.catch(pokemon3);

        const trainer4 = new Trainer("Roshni");
        const pokemon4 = new Pokemon("didi", 100, "Grass", 10);
        trainer4.catch(pokemon4);

        const battle = new Battle(trainer3, trainer4, 0, 0);
        battle.fight();
        expect(pokemon4.hitPoint).toBe(92.5);
    })

    test('fight- type check: fire vs water ', () => {
        const trainer3 = new Trainer("Esther");
        const pokemon3 = new Pokemon("khukhu", 50, "Fire", 10);
        trainer3.catch(pokemon3);

        const trainer4 = new Trainer("Roshni");
        const pokemon4 = new Pokemon("didi", 100, "Water", 10);
        trainer4.catch(pokemon4);

        const battle = new Battle(trainer3, trainer4, 0, 0);
        battle.fight();
        expect(pokemon4.hitPoint).toBe(87.5);
    })

    // test for grass type
    test('fight- type check: grass vs water', () => {
        const trainer5 = new Trainer("Roshni");
        const pokemon5 = new Pokemon("Leafeon", 65, "Grass", 17);
        trainer5.catch(pokemon5);

        const trainer6 = new Trainer("Esther");
        const pokemon6 = new Pokemon("Vaporeon", 70, "Water", 19);
        trainer6.catch(pokemon6);

        const battle = new Battle(trainer5, trainer6, 0, 0);
        battle.fight();
        expect(pokemon6.hitPoint).toBe(55.75);

    })
    test('fight- type check: grass vs fire', () => {
        const trainer3 = new Trainer("Roshni");
        const pokemon3 = new Pokemon("Leafeon", 65, "Grass", 17);
        trainer3.catch(pokemon3);

        const trainer4 = new Trainer("Esther");
        const pokemon4 = new Pokemon("Flareon", 65, "Fire", 20);
        trainer4.catch(pokemon4);

        const battle = new Battle(trainer3, trainer4, 0, 0);
        battle.fight();
        expect(pokemon4.hitPoint).toBe(40);
    })
    // test for water type
    test('fight- type check: water vs fire', () => {
        const trainer5 = new Trainer("Roshni");
        const pokemon5 = new Pokemon("Vaporeon", 70, "Water", 19);
        trainer5.catch(pokemon5);

        const trainer6 = new Trainer("Esther");
        const pokemon6 = new Pokemon("Flareon", 65, "Fire", 20);
        trainer6.catch(pokemon6);

        const battle = new Battle(trainer5, trainer6, 0, 0);
        battle.fight();
        expect(pokemon6.hitPoint).toBe(50);

    })
    test('fight- type check: water vs grass', () => {
        const trainer3 = new Trainer("Roshni");
        const pokemon3 = new Pokemon("Vaporeon", 70, "Water", 19);
        trainer3.catch(pokemon3);

        const trainer4 = new Trainer("Esther");
        const pokemon4 = new Pokemon("Leafeon", 65, "Grass", 17);
        trainer4.catch(pokemon4);

        const battle = new Battle(trainer3, trainer4, 0, 0);
        battle.fight();
        expect(pokemon4.hitPoint).toBe(43.75);
    })

    test('fight- every fight the attacker/defender takes turns', () => {
        const trainer3 = new Trainer("Roshni");
        const pokemon3 = new Pokemon("Vaporeon", 70, "Water", 19);
        trainer3.catch(pokemon3);

        const trainer4 = new Trainer("Esther");
        const pokemon4 = new Pokemon("Leafeon", 65, "Grass", 17);
        trainer4.catch(pokemon4);

        const battle = new Battle(trainer3, trainer4, 0, 0);
        battle.fight();
        battle.fight();
        battle.fight();
        //expect(pokemon4.hitPoint).toBe(50.75);
    })

})
