/* eslint-disable camelcase */

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm 
 */
exports.up = (pgm) => {
    pgm.createTable("game_users", {
        user_id: {
            type: "int"
        },
        game_id: {
            type: "int"
        },
        owned_properties: {
            type: "int",
        },
        currency: {
            type: "int",
        }
    });
};


/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm 
 */
exports.down = (pgm) => {
    pgm.dropTable("game_users");
};