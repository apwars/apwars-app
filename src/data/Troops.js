export function getTroops() {
  return [
    {
      id: 0,
      team: 1,
      teamDesc: 'The Corporation',
      race: 1,
      raceDesc: 'Humans',
      tier: 1,
      tierDesc: 'Barracks',
      name: "wWARRIOR",
      lpAddresses: "0x6CABE6C94DC8BC63F8b71BBA7B2ed3381B1fe6e9",
      contractAddress: {
        "5777": "0x0b0e318f0DD8a99e863d84841D0E7dcF07F8e5dE",
        "56": "0x54f653f539a78d3db0e0d3b166cf32c4f6cc5fb6",
        "97": "0x0447072Aa3E3b448d77cD9B322cDfe7Ea990A1F8",
      },
      image: "/images/troops/wWARRIOR.png",
      strength: 2,
      defense: 4,
      combinators: {
        warPreparation: {
          combinatorAddress: {
            "56": "0x4311C6e36FaAD6B3Cd5bf4A73fc273A02b32Ec46",
            "97": "0xCAE00ce5282CF2b559BC45f17c47b2f5d3E20244",
          },
          claimRouter: "/war-preparation",
          idCombinator: {
            "5777": 0,
            "56": 4,
            "97": 4,
          },
          name: 'Simple Shield',
          imageNft: '/images/nfts/weapon-simple-shield.png',
          imageIcon: '/images/nfts/weapon-simple-shield-28x48.png',
          image: '/images/icons/simple-shield.png',
          inputs: [{
            name: 'wCOURAGE',
            image: '/images/wcourage.png'
          },
          {
            name: 'wWARRIOR',
            image: '/images/icons/coins/wWARRIOR.png'
          }]
        },
      }
    },
    {
      id: 1,
      team: 1,
      teamDesc: 'The Corporation',
      race: 1,
      raceDesc: 'Humans',
      tier: 1,
      tierDesc: 'Barracks',
      name: "wARCHER",
      lpAddresses: "0x764A521590ebd2686cC629E47f3464E8fD53b0F0",
      contractAddress: {
        "5777": "0x4fC1251bBE24caEbe4a33956A32a11333f77fEBd",
        "56": "0xAA2E03E7838148ce9FAd6Ce4C00275D89127A03e",
        "97": "0x159FF39cf0fFca109b123dc81890Cf37D157eBE7",
      },
      image: "/images/troops/wARCHER.png",
      strength: 5,
      defense: 1,
      combinators: {
        warPreparation: {
          combinatorAddress: {
            "56": "0x4311C6e36FaAD6B3Cd5bf4A73fc273A02b32Ec46",
            "97": "0xCAE00ce5282CF2b559BC45f17c47b2f5d3E20244",
          },
          claimRouter: "/war-preparation",
          idCombinator: {
            "5777": 0,
            "56": 5,
            "97": 5,
          },
          name: 'Simple Shield',
          imageNft: '/images/nfts/weapon-simple-shield.png',
          imageIcon: '/images/nfts/weapon-simple-shield-28x48.png',
          image: '/images/icons/simple-shield.png',
          inputs: [{
            name: 'wCOURAGE',
            image: '/images/wcourage.png'
          },
          {
            name: 'wARCHER',
            image: '/images/icons/coins/wARCHER.png'
          }]
        },
      }
    },
    {
      id: 2,
      team: 1,
      teamDesc: 'The Corporation',
      race: 1,
      raceDesc: 'Humans',
      tier: 2,
      tierDesc: 'Armory',
      name: "wARMOURED-WARRIOR",
      lpAddresses: "0xcb7a7E4257ABC87745B40B5b51B82FFFBAa087A0",
      contractAddress: {
        "5777": "0xF234C4AF44D4345269d433ce74Bf0366eAD25067",
        "56": "0xd67761dF2b76eE251d48816691f5ff7728d94DAa",
        "97": "0x84866c7C2c490242ae37C9d73de588203B93e0B2",
      },
      image: "/images/troops/wARMOURED-WARRIOR.png",
      strength: 0,
      defense: 0,
    },
    {
      id: 3,
      team: 1,
      teamDesc: 'The Corporation',
      race: 1,
      raceDesc: 'Humans',
      tier: 2,
      tierDesc: 'Armory',
      name: "wCROSSBOWMAN",
      lpAddresses: "0xEd5D84185d0BB1d9fEAF7b59F38220Fc26F4FDD0",
      contractAddress: {
        "5777": "0x39597c82A835d0D4c1Fae84BCd2F142731088925",
        "56": "0xA0ecF9c7114eFFB43440B95D54e09A2a67331236",
        "97": "0x9DB33bFDBCE63aC62717950ACea4cf030BDCFD92",
      },
      image: "/images/troops/wCROSSBOWMAN.png",
      strength: 0,
      defense: 0,
      combinators: {
        trainingCenter: {
          combinatorAddress: {
            "56": "0x4311C6e36FaAD6B3Cd5bf4A73fc273A02b32Ec46",
            "97": "0xCAE00ce5282CF2b559BC45f17c47b2f5d3E20244",
          },
          claimRouter: "/training-center",
          idCombinator: {
            "5777": 0,
            "56": 3,
            "97": 3,
          },
          name: 'wHORSEMAN',
          image: '/images/icons/wHORSEMAN-coin.png',
          inputs: [{
            name: 'wCOURAGE',
            image: '/images/wcourage.png'
          },
          {
            name: 'wCROSSBOWMAN',
            image: '/images/icons/coins/wCROSSBOWMAN.png'
          }]
        },
      }
    },
    {
      id: 4,
      team: 1,
      teamDesc: 'The Corporation',
      race: 1,
      raceDesc: 'Humans',
      tier: 3,
      tierDesc: 'Arcane Library',
      name: "wWIZARD",
      lpAddresses: "0x651E5fE33a17f39E65c94A4e4D6AA220C33C9b2B",
      contractAddress: {
        "5777": "0x14742bB55d8949Ee0DddF9136461514746b0b174",
        "56": "0x1225C7999483544c7859fE5A23c9Be70d14d5378",
        "97": "0x4F1580e353c16F05f234D2718Dd12d3f7B44a21d",
      },
      image: "/images/troops/wWIZARD.png",
      strength: 0,
      defense: 0,
    },
    {
      id: 5,
      team: 2,
      teamDesc: 'The Degenerate',
      race: 2,
      raceDesc: 'Orcs',
      tier: 1,
      tierDesc: 'Barracks',
      name: "wGRUNT",
      lpAddresses: "0x8C58f3aEe4924D0Ab0a8e0Ee680a6611296573FF",
      contractAddress: {
        "5777": "0xA161008870579B16A717360d8754f4C484e18183",
        "56": "0xd7544Fe7668f3dfb7AD21F9E02D7A51e116b6D75",
        "97": "0x9FA4946089CBE11a5Bfda9C397e29cd093626F37",
      },
      image: "/images/icons/coins/wGRUNT.png",
      strength: 2,
      defense: 4,
      combinators: {
        warPreparation: {
          combinatorAddress: {
            "56": "0x4311C6e36FaAD6B3Cd5bf4A73fc273A02b32Ec46",
            "97": "0xCAE00ce5282CF2b559BC45f17c47b2f5d3E20244",
          },
          claimRouter: "/war-preparation",
          idCombinator: {
            "5777": 0,
            "56": 6,
            "97": 6,
          },
          name: 'Simple Shield',
          imageNft: '/images/nfts/weapon-simple-shield.png',
          imageIcon: '/images/nfts/weapon-simple-shield-28x48.png',
          image: '/images/icons/simple-shield.png',
          inputs: [{
            name: 'wCOURAGE',
            image: '/images/wcourage.png'
          },
          {
            name: 'wGRUNT',
            image: '/images/icons/coins/wGRUNT.png'
          }]
        },
      }
    },
    {
      id: 6,
      team: 2,
      teamDesc: 'The Degenerate',
      race: 2,
      raceDesc: 'Orcs',
      tier: 1,
      tierDesc: 'Barracks',
      name: "wORC-ARCHER",
      lpAddresses: "0x9e15154b80a68191E2D5C4B220a24bd99a422DeE",
      contractAddress: {
        "5777": "0x9BD4BD678286E99696024cBDEd857B83aE20058A",
        "56": "0x934e11a44b2e817fe9bd6f337ef21bd35e46080e",
        "97": "0x3Bd57F3209a88016f7645bbD6FacacAf50d631d4",
      },
      image: "/images/troops/wORC-ARCHER.png",
      strength: 5,
      defense: 1,
      combinators: {
        warPreparation: {
          combinatorAddress: {
            "56": "0x4311C6e36FaAD6B3Cd5bf4A73fc273A02b32Ec46",
            "97": "0xCAE00ce5282CF2b559BC45f17c47b2f5d3E20244",
          },
          claimRouter: "/war-preparation",
          idCombinator: {
            "5777": 0,
            "56": 7,
            "97": 7,
          },
          name: 'Simple Shield',
          imageNft: '/images/nfts/weapon-simple-shield.png',
          imageIcon: '/images/nfts/weapon-simple-shield-28x48.png',
          image: '/images/icons/simple-shield.png',
          inputs: [{
            name: 'wCOURAGE',
            image: '/images/wcourage.png'
          },
          {
            name: 'wORC-ARCHER',
            image: '/images/icons/coins/wORC-ARCHER.png'
          }]
        },
      }
    },
    {
      id: 7,
      team: 2,
      teamDesc: 'The Degenerate',
      race: 2,
      raceDesc: 'Orcs',
      tier: 2,
      tierDesc: 'Armory',
      name: "wARMOURED-GRUNT",
      lpAddresses: "0xc0749fA16072c377B786213aCa2837D4Aa203c8A",
      contractAddress: {
        "5777": "0xbBe4AA52a30bC5d360d6497F5cf2Dcd17ee0a6F2",
        "56": "0x56c09E954690d80C5728194f7eAf473737Dc2180",
        "97": "0xC2d75018Cd8c2e87794d5839B80c35a09EeeA1BB",
      },
      image: "/images/troops/wARMOURED-GRUNT.png",
      strength: 0,
      defense: 0,
    },
    {
      id: 8,
      team: 2,
      teamDesc: 'The Degenerate',
      race: 2,
      raceDesc: 'Orcs',
      tier: 2,
      tierDesc: 'Armory',
      name: "wPIKE-ORC",
      lpAddresses: "0xC3Bc2A25C100fEf3A38f99543f89dCE330ceaBa0",
      contractAddress: {
        "5777": "0xF1b0d0a63D2D4497C598006c363904563485fa26",
        "56": "0x491c739efd076655f7D8D0DB545b7fb09DdF517f",
        "97": "0x7b58Fc38F4EcD3f14F0189307881E63d79490A07",
      },
      image: "/images/troops/wPIKE-ORC.png",
      strength: 0,
      defense: 0,
      combinators: {
        trainingCenter: {
          combinatorAddress: {
            "56": "0x4311C6e36FaAD6B3Cd5bf4A73fc273A02b32Ec46",
            "97": "0xCAE00ce5282CF2b559BC45f17c47b2f5d3E20244",
          },
          claimRouter: "/training-center",
          idCombinator: {
            "5777": 0,
            "56": 2,
            "97": 2,
          },
          name: 'wWARG',
          image: '/images/icons/wWARG-coin.png',
          inputs: [{
            name: 'wCOURAGE',
            amount: 2200,
            image: '/images/wcourage.png'
          },
          {
            name: 'wPIKE-ORC',
            amount: 100,
            image: '/images/icons/coins/wPIKE-ORC.png'
          }]
        },
      }
    },
    {
      id: 9,
      team: 2,
      teamDesc: 'The Degenerate',
      race: 2,
      raceDesc: 'Orcs',
      tier: 3,
      tierDesc: 'Arcane Library',
      name: "wSHAMAN",
      lpAddresses: "0xA6Ab5C50F7db14b96d03e64AE3fe3B0041f6aE0C",
      contractAddress: {
        "5777": "0xA9747cd1701DD66dcBc6EA2671b0514cbb61E693",
        "56": "0x10eAAC888b70aBE542a50b787ABe7f94b8989CB7",
        "97": "0x433499f0c12E6aE0D1f2A90fB640AE1EBe1Df890",
      },
      image: "/images/troops/wSHAMAN.png",
      strength: 0,
      defense: 0,
    },
    {
      id: 10,
      team: 2,
      teamDesc: 'The Degenerate',
      race: 3,
      raceDesc: 'Undead',
      tier: 1,
      tierDesc: 'Barracks',
      name: "wSKELETON-WARRIOR",
      lpAddresses: "0xf101954d51ffc12640b006e9c951ffebbd6b7259",
      contractAddress: {
        "5777": "",
        "56": "0xb5d488dc4DE64A6a968D8f317DB8DE2cDBF52828",
        "97": "0x7a355C7633d3d097F6ed009faC66727E7C4E0Dee",
      },
      image: "/images/icons/coins/wSKELETON-WARRIOR.png",
      strength: 8,
      defense: 2,
      combinators: {
        warPreparation: {
          combinatorAddress: {
            "56": "0x4311C6e36FaAD6B3Cd5bf4A73fc273A02b32Ec46",
            "97": "0xCAE00ce5282CF2b559BC45f17c47b2f5d3E20244",
          },
          claimRouter: "/war-preparation",
          idCombinator: {
            "5777": 0,
            "56": 8,
            "97": 8,
          },
          name: 'Simple Shield',
          imageNft: '/images/nfts/weapon-simple-shield.png',
          imageIcon: '/images/nfts/weapon-simple-shield-28x48.png',
          image: '/images/icons/simple-shield.png',
          inputs: [{
            name: 'wCOURAGE',
            image: '/images/wcourage.png'
          },
          {
            name: 'wSKELETON-WARRIOR',
            image: '/images/icons/coins/wSKELETON-WARRIOR.png'
          }]
        },
      }
    },
    {
      id: 11,
      team: 2,
      teamDesc: 'The Degenerate',
      race: 3,
      raceDesc: 'Undead',
      tier: 1,
      tierDesc: 'Barracks',
      name: "wHOUND",
      lpAddresses: "0xe8eae2eac9e1d87932c4e94303894ac28304ee23",
      contractAddress: {
        "5777": "",
        "56": "0x4D21177Bf8a0F9cfAca6d0f568Ff3e79a121B106",
        "97": "0x7DC031d20cc8DB621A9aaD99D834CfBCF1DCA8bf",
      },
      image: "/images/troops/wHOUND.png",
      strength: 8,
      defense: 2,
      combinators: {
        warPreparation: {
          combinatorAddress: {
            "56": "0x4311C6e36FaAD6B3Cd5bf4A73fc273A02b32Ec46",
            "97": "0xCAE00ce5282CF2b559BC45f17c47b2f5d3E20244",
          },
          claimRouter: "/war-preparation",
          idCombinator: {
            "5777": 0,
            "56": 9,
            "97": 9,
          },
          name: 'Simple Shield',
          imageNft: '/images/nfts/weapon-simple-shield.png',
          imageIcon: '/images/nfts/weapon-simple-shield-28x48.png',
          image: '/images/icons/simple-shield.png',
          inputs: [{
            name: 'wCOURAGE',
            image: '/images/wcourage.png'
          },
          {
            name: 'wHOUND',
            image: '/images/icons/coins/wHOUND.png'
          }]
        },
      }
    },
    {
      id: 12,
      team: 2,
      teamDesc: 'The Degenerate',
      race: 3,
      raceDesc: 'Undead',
      tier: 2,
      tierDesc: 'Armory',
      name: "wUNDEAD-ARCHER",
      lpAddresses: "0xdf9aff48816e5e9930b050b7ab8ec2de04db2772",
      contractAddress: {
        "5777": "",
        "56": "0xd048cDf2e870E60D46527463a14aEFC0377D754c",
        "97": "0x2d533A617956f47E63150A0fb13441Da202DAC9F",
      },
      image: "/images/troops/wUNDEAD-ARCHER.png",
      strength: 35,
      defense: 8,
    },
    {
      id: 13,
      team: 2,
      teamDesc: 'The Degenerate',
      race: 3,
      raceDesc: 'Undead',
      tier: 2,
      tierDesc: 'Armory',
      name: "wUNDEAD-PIKEMAN",
      lpAddresses: "0xD6406A6b247436bbc07a5B021740746c0dc1081d",
      contractAddress: {
        "5777": "",
        "56": "0x8b394cfAeBA9812801C92388570C95208Ad1300D",
        "97": "0x8df7145Fc3a1B7BC590a229737d8c39bD058Ab49",
      },
      image: "/images/troops/wUNDEAD-PIKEMAN.png",
      strength: 22,
      defense: 22,
      combinators: {
        trainingCenter: {
          combinatorAddress: {
            "56": "0x4311C6e36FaAD6B3Cd5bf4A73fc273A02b32Ec46",
            "97": "0xCAE00ce5282CF2b559BC45f17c47b2f5d3E20244",
          },
          claimRouter: "/training-center",
          idCombinator: {
            "5777": 0,
            "56": 1,
            "97": 1,
          },
          name: 'wDEATH-KNIGHT',
          image: '/images/icons/wDEATH-KNIGHT-coin.png',
          inputs: [{
            name: 'wCOURAGE',
            image: '/images/wcourage.png'
          },
          {
            name: 'wUNDEAD-PIKEMAN',
            image: '/images/icons/coins/wUNDEAD-PIKEMAN.png'
          }]
        },
      }
    },
    {
      id: 14,
      team: 2,
      teamDesc: 'The Degenerate',
      race: 3,
      raceDesc: 'Undead',
      tier: 3,
      tierDesc: 'Arcane Library',
      name: "wWITCH",
      lpAddresses: "0xc706987bfe6a81de045480772786c8d945d52b56",
      contractAddress: {
        "5777": "",
        "56": "0x2a63DDDD2c0ba10F465080a06563aF3acb5d1d3c",
        "97": "0xB80797707aa7b6663d87cc4Cd754DC0F206c6eB3",
      },
      image: "/images/troops/wWITCH.png",
      strength: 70,
      defense: 20,
    },
    {
      id: 15,
      team: 1,
      teamDesc: 'The Corporation',
      race: 1,
      raceDesc: 'Humans',
      tier: 4,
      tierDesc: 'Stables',
      name: "wHORSEMAN",
      lpAddresses: "0x205e51964a88ecfcfe0ee3516d0b4a952d1b2425",
      contractAddress: {
        "5777": "",
        "56": "0x5898d096deC52527A2900F7482492C71107B7520",
        "97": "0xC523c0a1DC59B00efEbDdD6a527CDf44269E16Dd",
      },
      image: "/images/troops/wHORSEMAN.png",
      strength: 150,
      defense: 50,
    },
    {
      id: 16,
      team: 2,
      teamDesc: 'The Degenerate',
      race: 2,
      raceDesc: 'Orcs',
      tier: 4,
      tierDesc: 'Stables',
      name: "wWARG",
      lpAddresses: "0xae387d80862bdbf818adf80885e1039db1739a34",
      contractAddress: {
        "5777": "",
        "56": "0xc15bE042471eBAC1908d7bD93648161A1B82Ee3d",
        "97": "0x1E3d19Eb941B20eC6Ee5BD81Ff089529CB9563F4",
      },
      image: "/images/icons/coins/wWARG.png",
      strength: 150,
      defense: 50,
    },
    {
      id: 17,
      team: 2,
      teamDesc: 'The Degenerate',
      race: 3,
      raceDesc: 'Undead',
      tier: 4,
      tierDesc: 'Stables',
      name: "wDEATH-KNIGHT",
      lpAddresses: "0x65ede43524c68c5b7d14bc9d8792a46dda7f50ac",
      contractAddress: {
        "5777": "",
        "56": "0x62876880fd6fe05285ea758aac09d68a90337f51",
        "97": "0x2BCEb0E99B9Eb54540aE32F3d5278e19829466ae",
      },
      image: "/images/troops/wDEATH-KNIGHT.png",
      strength: 150,
      defense: 50,
    },
    {
      id: 18,
      team: 1,
      teamDesc: 'The Corporation',
      race: 4,
      raceDesc: 'Elves',
      tier: 1,
      tierDesc: 'Barracks',
      name: "wPIKE-ELF",
      lpAddresses: "0x302eF0De472FA31aff1b52af943C425B6695d0F4",
      contractAddress: {
        "5777": "",
        "56": "0xa248284fB4E3E58400644dc4Cd37410F8AB31266",
        "97": "0xf2ed33A19453f30CAA9a548D2f3c2F38133469A9",
      },
      image: "/images/troops/wPIKE-ELF.png",
      strength: 6,
      defense: 10,
      combinators: {
        warPreparation: {
          combinatorAddress: {
            "56": "0x4311C6e36FaAD6B3Cd5bf4A73fc273A02b32Ec46",
            "97": "0xCAE00ce5282CF2b559BC45f17c47b2f5d3E20244",
          },
          claimRouter: "/war-preparation",
          idCombinator: {
            "5777": 0,
            "56": 0,
            "97": 11,
          },
          name: 'Simple Shield',
          imageNft: '/images/nfts/weapon-simple-shield.png',
          imageIcon: '/images/nfts/weapon-simple-shield-28x48.png',
          image: '/images/icons/simple-shield.png',
          inputs: [{
            name: 'wCOURAGE',
            image: '/images/wcourage.png'
          },
          {
            name: 'wPIKE-ELF',
            image: '/images/icons/wPIKE-ELF-coin.png'
          }]
        },
      }
    },
    {
      id: 19,
      team: 1,
      teamDesc: 'The Corporation',
      race: 4,
      raceDesc: 'Elves',
      tier: 1,
      tierDesc: 'Barracks',
      name: "wELVEN-ARCHER",
      lpAddresses: "0x39F18435FfAc6d5bdE24551EfE166620DCc315B0",
      contractAddress: {
        "5777": "",
        "56": "0x804e7030F932CA06DEe7bC08051f1123898ceF5d",
        "97": "0xDa11E338567eb633E17Ad8C9544B00A54B6862ce",
      },
      image: "/images/troops/wELVEN-ARCHER.png",
      strength: 12,
      defense: 6,
    },
    {
      id: 20,
      team: 1,
      teamDesc: 'The Corporation',
      race: 4,
      raceDesc: 'Elves',
      tier: 2,
      tierDesc: 'Armory',
      name: "wARMORED-ELF",
      lpAddresses: "0xaf08fe199dd8abb88cb62526955956ee8784b3f7",
      contractAddress: {
        "5777": "",
        "56": "0xF35e1Bd15E49651ad76aB0A4B9ce93F6e9850f7F",
        "97": "0xeab81a541Dc97222894c16c8DA7DA301b464dd2E",
      },
      image: "/images/troops/wARMORED-ELF.png",
      strength: 25,
      defense: 25,
    },
    {
      id: 20,
      team: 1,
      teamDesc: 'The Corporation',
      race: 4,
      raceDesc: 'Elves',
      tier: 2,
      tierDesc: 'Armory',
      name: "wBLADEMASTER",
      lpAddresses: "0x15548700a20ab8437a916b9e2c5f550c0fa645fd",
      contractAddress: {
        "5777": "",
        "56": "0xE7Cb07032a9b9150a25249709C50b9BD923E445e",
        "97": "0x30201b70c98479370b38903682eB39A4570644Ed",
      },
      image: "/images/troops/wBLADEMASTER.png",
      strength: 25,
      defense: 25,
      combinators: {
        trainingCenter: {
          combinatorAddress: {
            "56": "0x4311C6e36FaAD6B3Cd5bf4A73fc273A02b32Ec46",
            "97": "0xCAE00ce5282CF2b559BC45f17c47b2f5d3E20244",
          },
          claimRouter: "/training-center",
          idCombinator: {
            "5777": 0,
            "56": 10,
            "97": 10,
          },
          name: 'wELK-RIDER',
          image: '/images/icons/wELK-RIDER.png',
          tokenImage: '/images/icons/coins/wELK-RIDER.png',
          inputs: [{
            name: 'wCOURAGE',
            image: '/images/wCOURAGE.png'
          },
          {
            name: 'wBLADEMASTER',
            image: '/images/icons/coins/wBLADEMASTER.png'
          }]
        },
      }
    },
    {
      id: 21,
      team: 1,
      teamDesc: 'The Corporation',
      race: 4,
      raceDesc: 'Elves',
      tier: 3,
      tierDesc: 'Arcane Library',
      name: "wFERAL-SPIRIT",
      lpAddresses: "0x9bE00135880c4db3D3759d370758bDc87443af36",
      contractAddress: {
        "5777": "",
        "56": "0xA7439A291251F4Dd250fE3B3f65FbE537fE633bb",
        "97": "0x9E19cc4Ff587489d561b7Fd09Fe8Ef339faCfB9A",
      },
      image: "/images/troops/wFERAL-SPIRIT.png",
      strength: 70,
      defense: 20,
    },
    {
      id: 22,
      team: 1,
      teamDesc: 'The Corporation',
      race: 4,
      raceDesc: 'Elves',
      tier: 4,
      tierDesc: 'Stables',
      name: "wELK-RIDER",
      lpAddresses: "0xd6a89d10659895487e24d4a5f46baefdff4a7ea2",
      contractAddress: {
        "5777": "",
        "56": "0x2e67BD04a28faD0d243d7f7Cd436027D41a68A25",
        "97": "0xE575aA96B86128d9Ae7Cf30C540E56A47F2e3D5C",
      },
      image: "/images/troops/wELK-RIDER.png",
      strength: 250,
      defense: 90,
    },
  ];
}