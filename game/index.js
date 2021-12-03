class Pokemon {
    constructor(name, hitPoint, type = "Normal", attackDamage = 0) {
        this.name = name;
        this.type = type;
        this.hitPoint = hitPoint;
        this.attackDamage = attackDamage;
        this.strength = "None";
        this.weakness = "None";

        if (type === "Fire") {
            this.strength = "Grass";
            this.weakness = "Water";
        } else if (type === "Grass") {
            this.strength = "Water";
            this.weakness = "Fire"
        } else if (type === "Water") {
            this.strength = "Fire";
            this.weakness = "Grass"
        }
    }
    talk() {
        const sound = this.name.substring(0, 4);
        const returnSound = `${sound.repeat(2)}`
        return returnSound;
    };

    useYourMoves(move) {
        return move;
    }
}

class Trainer {
    constructor(name) {
        this.name = name;
        this.pokemons = [];
        this.isAttacker = true;
    }
    catch(pokemon) {
        this.pokemons.push(pokemon)
    }
}

class Battle {
    constructor(trainer1, trainer2, index1, index2) {
        this.trainer1Poke = trainer1.pokemons[index1];
        this.trainer2Poke = trainer2.pokemons[index2];
    }
    fight() {
        // take turns
        const attacker = (this.trainer1Poke.isAttacker) ? this.trainer1Poke : this.trainer2Poke;
        const defender = (this.trainer1Poke.isAttacker) ? this.trainer2Poke : this.trainer1Poke;

        // edge case
        if (!defender.hitPoint) return `The Winner is ${attacker.name}`;

        // fight message
        console.log("attacker:", attacker.name);

        // types
        const attackerPoke = attacker.type;
        const defenderPoke = defender.type;
        const strongAttack = attacker.attackDamage * 1.25;
        const weakAttack = attacker.attackDamage * 0.75;

        // fight
        if (attackerPoke === "Fire" && defenderPoke === "Grass" || attackerPoke === "Grass" && defenderPoke === "Water" || attackerPoke === "Water" && defenderPoke === "Fire") {
            this.trainer2Poke.hitPoint -= strongAttack; //
        } else if (attackerPoke === "Fire" && defenderPoke === "Water" || attackerPoke === "Grass" && defenderPoke === "Fire" || attackerPoke === "Water" && defenderPoke === "Grass") {
            this.trainer2Poke.hitPoint -= weakAttack;
        } else { this.trainer2Poke.hitPoint -= this.trainer1Poke.attackDamage; }

        // turnchage
        this.trainer1Poke.isAttacker = !this.trainer1Poke.isAttacker;

        // winning message;
        if (defender.hitPoint <= 0) return `The Winner is ${attacker.name}`;
    }
}

module.exports = { Pokemon, Trainer, Battle }
