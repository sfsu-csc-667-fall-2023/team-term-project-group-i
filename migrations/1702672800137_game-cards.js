/* eslint-disable camelcase */

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm 
 */
exports.up = (pgm) => {
    pgm.createType("property_types", 
        [ "light_blue", 
        "pink", 
        "orange", 
        "red", 
        "yellow", 
        "green", 
        "dark_blue", 
        "stations", 
        "utilities",
        "jail",
        "go"
    ]);

    pgm.createType("property_name", 
        ["Mediterranean_Avenue", "Baltic_Avenue", "Oriental_Avenue",
        "Vermont_Avenue", "Conneticut_Avenue", "St_Charles_Place",
        "States_Avenue", "Virginia_Avenue", "St_James_Place",
        "Tennesse_Avenue", "New_York_Avenue", "Kentucky_Avenue",
        "Indiana_Avenue", "Illinois_Avenue", "Atlantic_Avenue", 
        "Ventnor_Avenue","Marvin_Gardens", "Pacific_Avenue",
        "North_Carolina_Avenue", "Pennsylvania_Avenue", "Park_Place",
        "Boardwalk"
    ]);

    pgm.createType("railroad_name", 
        ["Reading_Railroad", 
        "Pennsylvania_Railroad", 
        "Baltimore_And_Ohio_Railroad", 
        "Short_Line"
    ]);

    pgm.createType("utility_name", 
        ["Electric_Company", "Water_Works"
    ]);

    pgm.createType("chance_card_list", 
        ["Advance to 'Go'", "Advance to Illinois Ave",
        "Advance to St.Charles Place", "Advance token to nearest Utility",
        "Advance to nearest Railroad", "Bank pays you $50",
        "Get out of Jail Free", "Go Back Three Spaces",
        "Go to Jail", "Make Repairs on all Owned Properties",
        "Take a trip to Reading Railroad", "Pay Poor Tax of $15",
        "Take a Walk on the Boardwalk", "Pay each Player $50",
        "Collect $150" 
    ]);

    pgm.createType("community_card_list", 
        ["Advance to 'Go'", "Bank Error in Your Favor",
        "Doctor's Fees", "From Sales of Stock you get $50",
        "Get Out of Jail Free", "Go to Jail", "Grand Opera Night", "Holiday Fund Matures",
        "Income Tax Refund", "It's Your Birthday", "Life Insurance Matures",
        "Hospital Fees", "School Fees", "Recieve $25 Consultancy Fee",
        "You are Assesed for Street Repairs", "You Have Won Second Prize in a Beauty Contest",
        "You Inherit $100" 
    ]);

    pgm.createTable("chance_cards", {
        id: { 
            type: "int" 
        },
        collect_money: {
            type: "boolean", 
            default: false 
        },
        money_amount: {
            type: "int" 
        },
        is_jail: {
            type: "boolean", 
            default: false 
        },
        jail_free: {
            type: "boolean", 
            default: true 
        },
        if_move: {
            type: "boolean", 
            default: false 
        },
        move_spaces: {
            type: "int" 
        },
        if_repair: {
            type: "boolean", 
            default: false 
        },
        if_tax: {
            type: "boolean", 
            default: false 
        },
        tax_amount: {
            type: "int" 
        },
        if_chairman: {
            type: "boolean", 
            default: false 
        }
    });

    const sql = "INSERT INTO chance_cards (value) VALUES";
    const chanceCards = 15;
    const communityCards = 16;

    for(i = 0; i <= chanceCards; i++) {
        
    }

    pgm.createTable("community_cards", {
        id: "int",
        collect_money: { 
            type: "boolean",
            default: false 
        },
        money_amount: {
            type: "int" 
        },
        is_jail: {
            type: "boolean", 
            default: false 
        },
        jail_free: {
            type: "boolean", 
            default: true 
        },
        if_fees: {
            type: "boolean", 
            default: false 
        },
        fee_amount: {
            type: "int"
        }
    });

    pgm.createTable("property_cards", {
        id: {
            type: "int" 
        },
        owned: {
            type: "boolean", 
            default: false 
        },
        propertyName: {
            type: "property_name", 
            notNull: true 
        },
        railroadName: {
            type: "railroad_name", 
            notNull: true 
        },
        utilityName: {
            type: "utility_name", 
            notNull: true 
        },
        property_type: {
            type: "property_types" 
        },
        mortgageValue: {
            type: "int" 
        },
        house_cost: {
            type: "int", 
            notNull: true 
        },
        rent_amount: {
            type: "int", 
            notNull: true 
        }
    });

    pgm.createTable("property_upgrade_price", {
        id: {
            type: "int" 
        },
        base_price: {
            type: "int" 
        },
        one_house: {
            type: "int" 
        },
        two_houses: {
            type: "int" 
        },
        three_houses: {
            type: "int" 
        },
        four_houses: {
            type: "int" 
        },
        hotel: {
            type: "int" 
        }
    });

    pgm.createTable("game_cards", {
        user_id: {
            type: "int"
        },
        game_id: {
            type: "int"
        },
        community_card_id: {
            type: "int",
        },
        chance_card_id: {
            type: "int",
        },
        property_card_id: {
            type: "int",
        }
    });
};


/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm 
 */
exports.down = (pgm) => {
    pgm.dropTable("chance_cards");
    pgm.dropTable("community_cards");
    pgm.dropTable("game_cards");
    pgm.dropTable("property_cards");
    pgm.dropTable("property_upgrade_price");

    pgm.dropType("chance_card_list");
    pgm.dropType("community_card_list");
    pgm.dropType("property_name");
    pgm.dropType("property_types");
    pgm.dropType("railroad_name");
    pgm.dropType("utility_name");
};