| Action              | Input/Data            |        Pre Condition(s)       |         Post Condition(s)                       |          API Endpoint           |
| ------------------- | --------------------- | ----------------------------- | ----------------------------------------------- | ------------------------------- |
| User Creates a Game | 1. player_id          |                               | 1. A new game is created (new game_id)          |                                 |
|                     | 2. game_title         |                               | 2. player_id is added to game_id                |                                 |
|                     | 3. numb_players       |                               | 3. Player is moved into the game’s waiting room |                                 |
| ------------------- | --------------------- | ----------------------------- | ----------------------------------------------- | ------------------------------- |
| User Rolls Dice     | 1. player_id          | 1. player_id is the player’s in game id | 1. dice_1 & dice_2 get a random number from 1 to 6 |                                 |
|                     | 2. dice_1             |                               |                                                 |                                 |
|                     | 3. dice_2             | 2. It has to be the player_id’s turn | 2. Player_location will increase by the sum of dice_1 & dice_2 |                                 |
|                     | 3. player_location    |                               |                                  |                                 |
|                     |                       |                               | 3. If the dice have matching numbers the player rolls again |                                 |
| ------------------- | --------------------- | ----------------------------- | ----------------------------------------------- | ------------------------------- |
| User Passes Go      | 1. player_id          | 1. It has to be the           | 1. Player passes by go (maybe determined by     |                                 |
|                     | 2. player_location    | player_id’s turn              | space_id)                                       |                                 |
|                     | 3. player_cash        | 2. The player has already     | 2. Player receives $200                         |                                 |
|                     | 4. space_id           | rolled                        |                                                 |                                 |
| ------------------- | --------------------- | ----------------------------- | ----------------------------------------------- | ------------------------------- |
| User Lands on Tax   | 1. player_id          |                               | 1. Player pays the associated tax               |                                 |
| Spaces              | 2. player_location    |                               | 2. If the player for player_id cannot pay, the  |                                 |
|                     | 3. space_id           |                               | player goes bankrupt (bank is creditor)         |                                 |
|                     | 4. player_cash        |                               |                                                 |                                 |
| ------------------- | --------------------- | ----------------------------- | ----------------------------------------------- | ------------------------------- |
| User Lands on       | 1. player_id          | 1. Has to be the player_id’s  | 1. Player is given a card                       |                                 |
| Chance Space        | 2. player_location    | turn                          |                                                 |                                 |
|                     | 3. space_id           | 2. Player_location is on a    |                                                 |                                 |
|                     | 4. card_id            | chance space                  |                                                 |                                 |
| ------------------- | --------------------- | ----------------------------- | ----------------------------------------------- | ------------------------------- |
| User Lands on       | 1. player_id          |                               |                                                 |                                 |
| Community Chest     | 2. player_location    |                               |                                                 |                                 |
|                     | 3. space_id           |                               |                                                 |                                 |
|                     | 4. player_cash        |                               |                                                 |                                 |
| ------------------- | --------------------- | ----------------------------- | ----------------------------------------------- | ------------------------------- |
| User sells property | 1. player_id_seller   | 1. The player with            | 1. The property changes ownership from the      |                                 |
| to player           | 2. player_id_buyer    | player_id_seller owns the     | seller to the buyer                             |                                 |
|                     | 3. space_id           | space of space_id             | 2. Money is transferred from the buyer to the   |                                 |
|                     | 4. player_cash        | 2. There are no buildings     | seller                                          |                                 |
|                     |                       | erected in the properties     |                                                 |                                 |
|                     |                       | color-group                   |                                                 |                                 |
| ------------------- | --------------------- | ----------------------------- | ----------------------------------------------- | ------------------------------- |
| User goes bankrupt  | 1. player_id_creditor | 1. It has to be the           | 1. All buildings on the properties of the debtor|                                 |
| (player is creditor)| 2. player_id_debtor   | player_id_debtors’s turn      | are sold to the bank for half price             |                                 |
|                     | 3. player_cash        | 2. The debtor has already     | 2. Money made from the sale of buildings is     |                                 |
|                     |                       | rolled                        | transferred to the creditor                     |                                 |
|                     |                       | 3. The debtor cannot pay the  | 3. All property is transferred to the creditor  |                                 |
|                     |                       | fee to the creditor           | 4. If a property was mortgaged the new owner    |                                 |
|                     |                       |                               | must either immediately pay off the mortgage or |                                 |
|                     |                       |                               | pay a 10% interest fee on the mortgage          |                                 |
|                     |                       |                               | 5. The debtor is retired from the game          |                                 |
| ------------------- | --------------------- | ----------------------------- | ----------------------------------------------- | ------------------------------- |
| User goes bankrupt  | 1. player_id_debtor   | 1. It has to be the           | 1. All buildings on the properties of the debtor|                                 |
| (bank is creditor)  | 2. player_cash        | player_id_debtors’s turn      | are removed                                     |                                 |
|                     |                       | 2. The debtor has already     | 2. All properties are auctioned off             |                                 |
|                     |                       | rolled                        | 3. The debtor is retired from the game          |                                 |
|                     |                       | 3. The debtor cannot pay the  |                                                 |                                 |
|                     |                       | fee to the bank               |                                                 |                                 |
| ------------------- | --------------------- | ----------------------------- | ----------------------------------------------- | ------------------------------- |
| User sells building | 1. player_id          | 1. player_id owns the property| 1. There is a building on the property of       |                                 |
|                     | 2. space_id           | of space_id                   | space_id                                        |                                 |
|                     | 3. player_cash        | 2. There are buildings on the | 2. Half the cash value of each building sold is |                                 |
|                     |                       | property of space_id          | transferred from the bank to the player         |                                 |
|                     |                       |                               | 3. The amount of buildings that are sold are    |                                 |
|                     |                       |                               | removed from the same color-group evenly in the |                                 |
|                     |                       |                               | reverse order that they were built              |                                 |
| ------------------- | --------------------- | ----------------------------- | ----------------------------------------------- | ------------------------------- |
| User takes out a    | 1. player_id          | 1. The player with player_id  | 1. The amount of money for the mortgage, as     |                                 |
| mortgage            | 2. space_id           | owns the property of space_id | shown on the Title Deed, is transferred from    |                                 |
|                     | 3. player_cash        | 2. The space of space_id is   | the bank to the player                          |                                 |
|                     |                       | unimproved                    | 2. The property no longer charges rent when     |                                 |
|                     |                       | 3. There is no existing       |                                                 |                                 |
|                     |                       | mortgage on the property      |                                                 |                                 |
| ------------------- | --------------------- | ----------------------------- | ----------------------------------------------- | ------------------------------- |
| User builds building| 1. player_id          | 1. There are still buildings  | 1. Erects the buildings purchased evenly across |                                 |
|                     | 2. player_cash        | available to build            | the properties color-group                      |                                 |
|                     | 3. space_id           | 2. The player with player_id  | 3. Deducts the amount of money spent on         |                                 |
|                     |                       | owns all properties of a group| buildings from the player                       |                                 |
|                     |                       | 3. The player has enough money|                                                 |                                 |
|                     |                       | to build the buildings        |                                                 |                                 |
| ------------------- | --------------------- | ----------------------------- | ----------------------------------------------- | ------------------------------- |
| User triggers       | 1. player_id          | 1. Two or more players are    | 1. An auction is triggered for the available    |                                 |
| building shortage   | 2. building_stock     | trying to build more buildings| buildings in demand, whoever bid the highest    |                                 |
|                     |                       | than there are left available | gets the buildings                              |                                 |
|                     |                       |                               | 5. Removes the buildings from the banks pool of |                                 |
|                     |                       |                               | available buildings                             |                                 |
|                     |                       |                               | 5. Removes the amount of money equal to the     |                                 |
|                     |                       |                               | winning bid from the player who won the auction |                                 |
|                     |                       |                               |                                                 |                                 |
| ------------------- | --------------------- | ----------------------------- | ----------------------------------------------- | ------------------------------- |









