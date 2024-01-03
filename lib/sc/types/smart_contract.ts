export type SmartContract = {
  "version": "0.1.0",
  "name": "smart_contract",
  "instructions": [
    {
      "name": "setupTreasury",
      "accounts": [
        {
          "name": "master",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "cancelTreasury",
      "accounts": [
        {
          "name": "master",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setupFeeAccount",
      "accounts": [
        {
          "name": "master",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "cancelFeeAccount",
      "accounts": [
        {
          "name": "master",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initiateBet",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "betAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "bet",
          "type": "i64"
        }
      ]
    },
    {
      "name": "cancelBet",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "betAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "bet",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "betAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "finalizeBet",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "master",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "betAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "configAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vaultIsInitialized",
            "type": "u8"
          },
          {
            "name": "master",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "feeAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInit",
            "type": "u8"
          },
          {
            "name": "master",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "betAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "betAmount",
            "type": "u64"
          },
          {
            "name": "bet",
            "type": "i64"
          },
          {
            "name": "fee",
            "type": "u64"
          },
          {
            "name": "player",
            "type": "publicKey"
          },
          {
            "name": "result",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "TreasuryAlreadyExist",
      "msg": "The treasury is already initialized"
    },
    {
      "code": 6001,
      "name": "FeeAccountAlreadyExist",
      "msg": "The fee account is already initialized"
    },
    {
      "code": 6002,
      "name": "UserIsNotMaster",
      "msg": "The master key is different than the one used to initialize the game"
    },
    {
      "code": 6003,
      "name": "WrongAuthorityKey",
      "msg": "The authority key is different than the one used to initialize the game"
    },
    {
      "code": 6004,
      "name": "WrongFeeWallet",
      "msg": "This fee wallet provided is not correct"
    },
    {
      "code": 6005,
      "name": "PlayerIsNotBetInitiator",
      "msg": "Player cancelling the best is different that the one initializing it"
    },
    {
      "code": 6006,
      "name": "PlayerHasNotPaidForBet",
      "msg": "Player have no pay for bet"
    },
    {
      "code": 6007,
      "name": "BetLost",
      "msg": "Lost the bet"
    },
    {
      "code": 6008,
      "name": "BetWon",
      "msg": "Win the bet"
    }
  ]
};

export const IDL: SmartContract = {
  "version": "0.1.0",
  "name": "smart_contract",
  "instructions": [
    {
      "name": "setupTreasury",
      "accounts": [
        {
          "name": "master",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "cancelTreasury",
      "accounts": [
        {
          "name": "master",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setupFeeAccount",
      "accounts": [
        {
          "name": "master",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "cancelFeeAccount",
      "accounts": [
        {
          "name": "master",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initiateBet",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "betAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "bet",
          "type": "i64"
        }
      ]
    },
    {
      "name": "cancelBet",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "betAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "bet",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "betAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "finalizeBet",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "master",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "betAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "configAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vaultIsInitialized",
            "type": "u8"
          },
          {
            "name": "master",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "feeAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInit",
            "type": "u8"
          },
          {
            "name": "master",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "betAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "betAmount",
            "type": "u64"
          },
          {
            "name": "bet",
            "type": "i64"
          },
          {
            "name": "fee",
            "type": "u64"
          },
          {
            "name": "player",
            "type": "publicKey"
          },
          {
            "name": "result",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "TreasuryAlreadyExist",
      "msg": "The treasury is already initialized"
    },
    {
      "code": 6001,
      "name": "FeeAccountAlreadyExist",
      "msg": "The fee account is already initialized"
    },
    {
      "code": 6002,
      "name": "UserIsNotMaster",
      "msg": "The master key is different than the one used to initialize the game"
    },
    {
      "code": 6003,
      "name": "WrongAuthorityKey",
      "msg": "The authority key is different than the one used to initialize the game"
    },
    {
      "code": 6004,
      "name": "WrongFeeWallet",
      "msg": "This fee wallet provided is not correct"
    },
    {
      "code": 6005,
      "name": "PlayerIsNotBetInitiator",
      "msg": "Player cancelling the best is different that the one initializing it"
    },
    {
      "code": 6006,
      "name": "PlayerHasNotPaidForBet",
      "msg": "Player have no pay for bet"
    },
    {
      "code": 6007,
      "name": "BetLost",
      "msg": "Lost the bet"
    },
    {
      "code": 6008,
      "name": "BetWon",
      "msg": "Win the bet"
    }
  ]
};
