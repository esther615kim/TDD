## Pokemon Battle Game
- TDD-based
- Object Oriented Programming-based

### test sets are listed below.
### Pokemon

- ✅Each pokemon should have a name, hit points (health), attack damage, the sound that it makes, and one move. (e.g. 'bite')
- ✅Each pokemon should have a type property which deafults to normal.Normal pokemon have no strengths or weaknesses.
- ✅You should be able to create grass pokemon, water pokemon and fire pokemon.
- Fire pokemon are strong against grass, and weak against water. Grass pokemon are strong against water, and weak against fire. Water pokemon are strong against fire and weak against grass.
- ✅ Every pokemon should have a talk method available, which returns its sound.
- ✅ Every pokemon should have a useYourMoves method available, which returns its favourite move.

### Trainer

- ✅Pokemon trainers will have a name, and a way of storing pokemon.
- ✅Each pokemon trainer will also have a catch method available, so they can store more pokemon.

### Battle

- Finally, you will need a way to battle the pokemon.
- ✅The battle should take two trainers and the names of the pokemon they wish to battle.

- ✅The battle should have a fight method available. This should take the pokemon whose turn it is, attack the defending pokemon (deducting attacker's attack damage from the defender's hit points), and end their turn.

- ✅ The fight method should take each pokemon's strengths and weaknesses into account.
  ✅ If a defender is strong against the attacking type, the attacking type's damage should be multiplied by 0.75. 
- ✅ If a defender is weak against the attacking type, the attacking type's damage should be multiplied by 1.25.
- ✅ Each attack should be followed by an attack message. The message will vary depending on the defender's weakness/strength.
- ✅ If the defending pokemon faints (depletes all hit points), the attacker wins.
- 
![image](https://user-images.githubusercontent.com/75744588/144682054-587940e2-5b2a-4808-a795-eafa23079c9f.png)
