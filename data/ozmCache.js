var expiredTimestamp = Date.now() - 100;
var Model = require("falcor/lib/Model");

var $ref = Model.ref;
var $atom = Model.atom;
var $error = Model.error;

// This object is user specific, extended from a global zone basis.

var Ozm = function() {
  return {
    "appById": {
      "battle2099": {
        "name": "Battle 2099",
        "info": "Dice based strategy game.",
      }
    },
    "apps": {
      "0": {
        name: "Games",
        zones: [
          $ref("zoneById[100]"),
          $ref("zoneById[200]"),
        ]
      }
    },

    "zoneById": {
      "100": {

      },
      "200": {

      }
    },
    "zones": {
      0: {
        name: "Strategy",
        orbs: [
          $ref("orbById[100]"),
          $ref("orbById[200]"),
        ]
      }
    },

    "orbById": {
      "100": {

      },
      "200": {
        "name": "",
      }
    },
    "orbs": {
      "0": {
        "name": "oz",
        "ecos": [
          $ref("ecoById[100]"),
          $ref("ecoById[200]"),
        ],
        "list": $atom(["A","B","C","D"])
      }
    },

    "ecoById": {
      100: {
        name: "United States",
        population: 318900000,
      },
      200: {
        name: "Kazakhstan",
        population: 35000000,
      }
    },
    "ecos": {
      "0": {
        "name": "Utah",
        "bios": [
          $ref("bioById[200]"),
        ]
      }
    },

    "bioById": {
      "12345abc": {
        "appState": $atom({
          lang: "en",
          road: ["Oz","Earth","Walmart","Camping","Tents","Returns","Policy"],
        })
      }
    }
    "bios": {
      "0": {
        "name": "Travis",
        "arts": [
          $ref("artById[100]"),
        ]
      }
    },

    "artById": {
      "100": $atom({
        "name": "Knife",
        "weight": "12kg",
      })
    }
    "arts": {
      "0": {
        "name": "Karate",
        "jobs": [
          $ref("jobById[100]"),
          $ref("jobById[200]"),
        ]
      }
    },

    "jobById:" {
      "100": $atom({
        "name": "Wash Dishes",
        "access": "",
      })
    },
    "jobs": {
      "0": {
        "name": "Bow Out"
      }
    },

    "vows": {
      "0": {
        "name": "Silence"
      }
    },

    "logs": {
      0: {
        utc: 1234567890,
      }
    },

  };
};

module.exports = Ozm;
