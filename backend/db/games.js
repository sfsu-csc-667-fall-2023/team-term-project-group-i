//const { connection: db, pgp} = require("./connection");
const db = require("./connection");

const CREATE = "INSERT INTO games (game_socket_id) VALUES ($1) RETURNING id";
const ADD_USERS = "INSERT INTO game_users (user_id, game_id) VALUES ($1, $2)";
const GET_GAME = "SELECT * FROM games WHERE id=$1";
const GET_AVAILABLE_GAMES = "SELECT * FROM games";
const GET_USER_COUNT = "SELECT COUNT(*) FROM game_users WHERE game_id=$1";

const create = (gameSocketId) => db.one(CREATE, [gameSocketId]);

const addUser = (userId, gameId) => db.none(ADD_USERS, [userId, gameId]);

const getGame = (gameId) => db.one(GET_GAME, gameId);

const getAvailableGames = () => db.any(GET_AVAILABLE_GAMES);

const userCount = (gameId) => db.one(GET_USER_COUNT, [gameId])
    .then(({ count }) => parseInt(count));

const SHUFFLED_COMMUNITY_CARDS = "SELECT *, random() AS rand FROM game_cards";
//const SHUFFLED_CHANCE_CARDS = "SELECT *, random() AS rand FROM game_cards";

const initialize = async (gameId) => {
    //shuffled chance, community cards
    const shuffledCommunityCards = await db.many(SHUFFLED_COMMUNITY_CARDS);
   // const shuffledChanceCards = await db.many(SHUFFLED_CHANCE_CARDS);
   //const columns = new pgp.helpers.ColumnSet(['user_id', 'game_id', 'community_card_id', 'chance_card_id', 'property_card_id'], { table: 'game_cards' });
    //const values = shuffledDeck.map(({ }))
    //console.log({shuffledCommunityCards});
   //console.log({shuffledChanceCards});
    //Tile deed cards
    //Each Player starts with $1500
    //Add player to board
    //Set turn for player

}

module.exports = {
    create,
    addUser,
    getGame,
    getAvailableGames,
    userCount,
    initialize
};