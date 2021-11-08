


const scriptsInEvents = {

		async Emap_Event1_Act3(runtime, localVars)
		{
			window.landMapping = {};
			window.foundationsMapping = {};
		},

		async Emap_Event13_Act6(runtime, localVars)
		{
			console.log(runtime.globalVars.currentAccount, localVars.owner);
		},

		async Emap_Event29_Act23(runtime, localVars)
		{
			window.landMapping[runtime.globalVars.currentX + "/" + runtime.globalVars.currentY] = runtime.globalVars.currentHoverUID;
			window.foundationsMapping[runtime.globalVars.currentX + "/" + runtime.globalVars.currentY] = runtime.globalVars.currentFoundationUID
		},

		async Emap_Event30_Act1(runtime, localVars)
		{
			
		},

		async Emap_Event33_Act1(runtime, localVars)
		{
			try {
				if(window.isLoading) {
					return;
				}
			
				window.isLoading = true;
				const currentBlockNumber = await window.provider.getBlockNumber();
				
				const referenceX = runtime.globalVars.centerX < runtime.globalVars.area ? 0 : runtime.globalVars.centerX - runtime.globalVars.area;
				const referenceY = runtime.globalVars.centerY < runtime.globalVars.area ? 0 : runtime.globalVars.centerY - runtime.globalVars.area;
			
				console.log({referenceX, referenceY});
			
				const area = runtime.globalVars.area * 2 + 1;
				
				let referenceToX = referenceX + area;
				let referenceToY = referenceY + area;
				
				if (referenceToX > 100) referenceToX = 100;
				if (referenceToY > 100) referenceToY = 100;
			
				console.log("Getting the current status", 1, referenceX, referenceY, area);
				runtime.globalVars.logMessage = "Loading map status from (" + referenceX + "/" + referenceY + ") to (" + (referenceToX) + "/" + (referenceToY) + ")...";
			
				const result = await window.worldMapManagerSMCSigner.getFoundationsByLands(1, referenceX, referenceY, area);
				runtime.globalVars.logMessage = "Map status loaded from (" + referenceX + "/" + referenceY + ") to (" + (referenceToX) + "/" + (referenceToY) + "). Rendering foundations...";
			
				const newValues = result[1];
			
				let currentLine = 0;
				let x1 = 0;
			
				for (let i = 0; i < newValues.length; i++) {
					const positionX =  x1 + referenceX;
					const positionY =  (i - x1 * area) + referenceY;
			
					try {
						const foundationUID = window.foundationsMapping[positionX + '/' + positionY];
						const foundation = runtime.getInstanceByUid(foundationUID);
						runtime.callFunction("UpdateFoundationRemainingBlocks", 
							foundationUID,
							parseInt(result[2][i].toString()) - parseInt(currentBlockNumber)
						);
						
						const owner = result.owners[i].toLowerCase();
			
						foundation.isVisible = false;
			
						if (result.types[i].toString() === '0') {
							switch(newValues[i].toString()){
								case runtime.globalVars.FOUNDATION_TYPE_LAND:
									runtime.callFunction("ShowFoundation", foundationUID, "Default", owner);
									break;
								case runtime.globalVars.FOUNDATION_TYPE_VILLAGE:
									runtime.callFunction("ShowFoundation", foundationUID, "BuildingVillage", owner);
									break;
								case runtime.globalVars.FOUNDATION_TYPE_MARKET:
									runtime.callFunction("ShowFoundation", foundationUID, "BuildingMarket", owner);
									break;
								case runtime.globalVars.FOUNDATION_TYPE_TEMPLE:
									runtime.callFunction("ShowFoundation", foundationUID, "BuildingTemple", owner);
									break;
								case runtime.globalVars.FOUNDATION_TYPE_HIDEOUT:
									runtime.callFunction("ShowFoundation", foundationUID, "BuildingHideout", owner);
									break;
								case runtime.globalVars.FOUNDATION_TYPE_TOWER:
									runtime.callFunction("ShowFoundation", foundationUID, "BuildingTower", owner);
									break;
								case runtime.globalVars.FOUNDATION_TYPE_CLAN:
									runtime.callFunction("ShowFoundation", foundationUID, "BuildingClan", owner);
									break;
								default: 
									runtime.callFunction("HideFoundation", foundationUID);
							}
						} else {
							runtime.callFunction("ShowSpecialPlace", 
								foundationUID,
								parseInt(result.types[i].toString())
							);
						}
					} catch (e) {
						console.log(e);
					}
			
					if (currentLine === area - 1) {
						currentLine = 0;
						x1++;
					} else {
						currentLine++;
					}
				}
			
				runtime.globalVars.logMessage = "";
			
				window.isLoading = false;
			} catch (e) {
				window.isLoading = false;
				console.log(e);
			}
		},

		async Emap_Event53_Act1(runtime, localVars)
		{
			try {
				console.log("Building a foundation at ", localVars.landX, localVars.landY);
				runtime.globalVars.logMessage = "Building a foundation at (" + localVars.landX + "/" + localVars.landY + ")...";
				
				
				window.isLoading = true;
				runtime.callFunction("HideLandInfo");
				runtime.callFunction("ShowLandLoading");
				
				try {
					
					if (runtime.globalVars.allowDirectBuilding) {
						const tx = await window.worldMapManagerSMCSigner.buyLandAndBuildFoundation(1, localVars.landX, localVars.landY, parseInt(localVars.foundationType));
						await window.provider.waitForTransaction(tx.hash, 1); 
					} else {
						const tx = await window.worldMapManagerSMCSigner.buildFoundation(1, localVars.landX, localVars.landY, parseInt(localVars.foundationType));
						await window.provider.waitForTransaction(tx.hash, 1); 
					}
					
					runtime.callFunction("ShowDialog", "The process of building a new foundation has started!");
				} catch (e) {
					runtime.callFunction("ShowContractError", e.data && e.data.message ? e.data.message : e.message);
				} finally {
					runtime.globalVars.logMessage = "";
					window.isLoading = false;
					runtime.callFunction("LoadMap");
				}
			} catch (e) {
				console.error("An error has occurred while building a foundation", e);
			}
			
		},

		async Emap_Event54_Act1(runtime, localVars)
		{
			try {
				console.log("Buying the land at ", localVars.landX, localVars.landY);
				
				window.isLoading = true;
			
				runtime.callFunction("HideLandInfo");
				runtime.callFunction("ShowLandLoading");
				
				try {
					const tx =  await window.worldMapManagerSMCSigner.buyLand(1, localVars.landX, localVars.landY);
					await window.provider.waitForTransaction(tx.hash, 1); 
					
					runtime.callFunction("ShowDialog", "Congratulations! After approving your contract, you are now a Land owner in Arcadia. Take good care!");
					
					window.isLoading = false;
					runtime.callFunction("LoadMap");
				} catch (e) {
					runtime.callFunction("ShowContractError", e.data && e.data.message ? e.data.message : e.message);
					window.isLoading = false;
					runtime.callFunction("HideFoundation", runtime.globalVars.currentLoadingFoundationUID);
				}
			} catch (e) {
				console.log(e);
			}
		},

		async Emap_Event55_Act1(runtime, localVars)
		{
			console.log(runtime.globalVars.selectedLandX, runtime.globalVars.selectedLandY);
			runtime.globalVars.logMessage = "Getting the land price to " + runtime.globalVars.selectedLandX + "/" + runtime.globalVars.selectedLandY + "...";
		},

		async Emap_Event55_Act4(runtime, localVars)
		{
			const result = await window.worldMapManagerSMCSigner.getLandPrice(1, runtime.globalVars.selectedLandX, runtime.globalVars.selectedLandY);
			runtime.globalVars.landPrice = window.utils.formatEther(result.toString());
			
			const message = "Land price to " + runtime.globalVars.selectedLandX + "/" + runtime.globalVars.selectedLandY + " is " + runtime.globalVars.landPrice + " wLAND";
			runtime.globalVars.logMessage = message;
			
			
			setTimeout(() => {
				if (runtime.globalVars.logMessage === message) {
					runtime.globalVars.logMessage = "";
				}
			}, 2000);
		},

		async Emap_Event70_Act1(runtime, localVars)
		{
			if (localVars.error.indexOf("APWarsWorldManager:INVALID_LAND") >= 0) {
				runtime.callFunction("ShowError", "Hey, old chap! You have selected an invalid land.");
			} else if (localVars.error.indexOf("APWarsWorldManager:LAND_IS_OWNED") >= 0) {
				runtime.callFunction("ShowError", "How about somewhere else? This land is unavailable to buy!");
			} else if (localVars.error.indexOf("APWarsWorldManager:INVALID_WLAND_ALLOWANCE") >= 0) {
				runtime.callFunction("ShowError", "You need to approve me to manage your inventory! Go you your inventory and approve the wLAND token.");
			} else if (localVars.error.indexOf("APWarsWorldManager:INVALID_COLLECTIBLES_ALLOWANCE") >= 0 || localVars.error.indexOf("ERC1155: caller is not owner nor approve") >= 0) {
				runtime.callFunction("ShowError", "You need to approve me to manage your inventory! Go you your inventory and approve game items.");
			} else if (localVars.error.indexOf("APWarsWorldManager:INVALID_WLAND_BALANCE") >= 0) {
				runtime.callFunction("ShowError", "Poor friend, you don't have enough wLAND to buy this land. But I'm rooting for your prosperity!");
			} else if (localVars.error.indexOf("APWarsWorldManager:INVALID_OWNER") >= 0) {
				runtime.callFunction("ShowError", "Only the owner of the land can build foundations on it. How about cutting down on beer, old chap?");
			} else if (localVars.error.indexOf("APWarsWorldManager:ALREADY_FOUNDED") >= 0) {
				runtime.callFunction("ShowError", "This land already has a foundation. How about thinking of some other strategy?");
			} else if (localVars.error.indexOf("APWarsWorldManager:INVALID_WORKERS_BALANCE") >= 0) {
				runtime.callFunction("ShowError", "You don't have enough workers to build this foundation. If we weren't in medieval times, you could advertise the job vacancy on LinkedIn.");
			} else if (localVars.error.indexOf("APWarsWorldManager:INVALID_FOUNDATION_TICKET_BALANCE") >= 0) {
				runtime.callFunction("ShowError", "You do not have the game item to found this foundation!");
			} else if (localVars.error.indexOf("ERC1155: insufficient balance for transfer") >= 0) {
				runtime.callFunction("ShowError", "Hey, old chap, check if you have a sufficient balance of required game items (workers and foundation tickets).");
			} else if (localVars.error.indexOf("MetaMask Tx Signature: User denied transaction signature.") >= 0) {
				runtime.callFunction("ShowError", "You need to sign the transaction. Can we call it an autograph?");
				
			} else {
				runtime.callFunction("ShowError", "An unexpected error has occurred! Open your browser console, print the error and contact the developers!");
				console.log(localVars.error);
			}
		},

		async Emap_Event113_Act3(runtime, localVars)
		{
			localStorage.setItem('soundState', 'off');
		},

		async Emap_Event114_Act3(runtime, localVars)
		{
			localStorage.setItem('soundState', 'on');
		},

		async Emap_Event135_Act1(runtime, localVars)
		{
			window.isLoading = false;
		},

		async Emap_Event136_Act1(runtime, localVars)
		{
			try {
			if (window.wLANDSMC && window.wLANDSMC.balanceOf) {
				const balance = parseFloat(
						parseFloat(
							window.utils.formatEther(
								await window.wLANDSMC.balanceOf(window.account)
							)
						).toFixed(2)
					).toLocaleString();
				runtime.callFunction("UpdatewLANDBalance", balance);
			}
			} catch (e) {
				console.log(e);
			}
		},

		async Emap_Event137_Act2(runtime, localVars)
		{
			const addresses = await provider.send("eth_requestAccounts", []);
			window.account = (addresses.length > 0 ? addresses[0] : "").toLowerCase();
			
			runtime.callFunction("UpdateAddress", window.account, window.account.slice(0, 6) + '...' + window.account.slice(-6));
			
			if (window.account.toLowerCase() !== runtime.globalVars.currentAccount) {
				runtime.callFunction("HideFoundationBorders");
			}
			
			runtime.globalVars.currentAccount = window.account.toLowerCase();
		},

		async Emap_Event148_Act1(runtime, localVars)
		{
			try {
				const huntId = runtime.globalVars.TREASURE_HUNT_ID;
			
			
				console.log(`[MAP] Loading hunts by user...`);
			
				const playerHunts = [null, null, null, null, null];
				const hunts = parseInt((await window.treasureHuntSMC.getHuntsLengthByPlayer(
					huntId, 
					window.account
				)).toString());
			
			
				console.log(`[MAP] Hunts by user: ${hunts}`);
			
			
				for(let i = 0; i < hunts; i++) {
					console.log(`[MAP] Getting hunt info by index: ${i}`);
					playerHunts[i] = await window.treasureHuntSMC.getPlayerHuntByIndex(
						huntId, 
						window.account, 
						i
					);
				}
				
				for(let i = 0; i < 5; i++) {
					if (playerHunts[i]) {
						const landX = parseInt(playerHunts[i].x.toString());
						const landY = parseInt(playerHunts[i].y.toString());
						
						const spotX = parseInt(playerHunts[i].innerX.toString());
						const spotY = parseInt(playerHunts[i].innerY.toString());
						
						runtime.callFunction(
							"MAP:UpdateTreasureHuntSlot",
							i, 
							false, 
							landX, 
							landY, 
							spotX, 
							spotY, 
							0
						);
					} else {
						runtime.callFunction(
							"MAP:UpdateTreasureHuntSlot",
							i, 
							true, 
							0, 
							0, 
							0, 
							0, 
							0
						);
					}
				}
			
				runtime.callFunction("MAP:_ShowTreasureHuntDialog", hunts);
			} catch (e) {
				console.log(`[MAP] An error has occurred while loading hunts`, e);
			}
		},

		async Ewelcome_Event1(runtime, localVars)
		{
			
		},

		async Ewelcome_Event5_Act1(runtime, localVars)
		{
			runtime.globalVars.currentAccount = window.account
		},

		async Eland_Event5_Act1(runtime, localVars)
		{
			const x = runtime.globalVars.landCurrentX;
			const y = runtime.globalVars.landCurrentY;
			const worldId = runtime.globalVars.WORLD_ID;
			const huntId = runtime.globalVars.TREASURE_HUNT_ID;
			
			const landPlaceType = await window.worldMapSMC.getSpecialPlace(x, y);
			
			if (!runtime.globalVars.landIsWaitingBlockchain) {
				runtime.callFunction("ScreenLogging", "Loading land map...");
			}
			
			console.log(`[LAND] Getting spots based on the land located at (${x},${y}) and type ${landPlaceType}`);
			
			const landMapId = await window.landMapSMC.getLandMap(worldId, landPlaceType, x, y);
			const landMap = await window.landMapSMC.getLandAreas(landPlaceType, landMapId, 10, 10);
			const hunters = await window.treasureHuntSMC.getHunters(huntId, x, y);
			
			let index = 0;
			
			for(let i = 0; i < 10; i++) {
				for(let j = 0; j < 10; j++) {
					const spotType = landMap[index].toString();
					console.log(`[LAND] Ploting land spot at (${i},${j}): ${spotType}`);
					runtime.callFunction(
						"LAND:DrawLandArea", 
						i, 
						j, 
						spotType, 
						!window.isZeroAddress(hunters[index]),
						hunters[index].toLowerCase() === window.account.toLowerCase()
					);
					
					if (!window.isZeroAddress(hunters[index])) {
						console.log(`[LAND] The spot has hunting (${i},${j}): ${spotType}`);
					}
					
					index++;
				}
			}
			
			if (!runtime.globalVars.landIsWaitingBlockchain) {
				runtime.callFunction("ScreenLogging", "");
			}
		},

		async Eland_Event14_Act1(runtime, localVars)
		{
			const x = runtime.globalVars.landCurrentX;
			const y = runtime.globalVars.landCurrentY;
			const worldId = runtime.globalVars.WORLD_ID;
			
			console.log(`[LAND] Getting land owner at (${x},${y})`);
			const address = (await window.worldMapManagerSMC.getLandOwner(worldId, x, y)).toLowerCase();
			
			console.log(`[LAND] Land owner at (${x},${y}): ${address}`, window.account);
			runtime.callFunction("LAND:UpdateLandInfo", address, window.parseAccount(address, 4));
		},

		async Eland_Event20_Act3(runtime, localVars)
		{
			localStorage.setItem('soundState', 'off');
		},

		async Eland_Event21_Act3(runtime, localVars)
		{
			localStorage.setItem('soundState', 'on');
		},

		async Eland_Event31_Act1(runtime, localVars)
		{
			const landX = runtime.globalVars.landCurrentX;
			const landY = runtime.globalVars.landCurrentY;
			const spotX = runtime.globalVars.selectedSpotX;
			const spotY = runtime.globalVars.selectedSpotY;
			
			runtime.globalVars.landIsWaitingBlockchain = true;
			runtime.callFunction("ScreenLogging", `Joining the treasure hunt at (${spotX}, ${spotY})`);
			
			console.log(`[LAND] Joining the treasure hunt at (${spotX}, ${spotY})`);
			
			try {
				const tx = await window.treasureHuntSMCSigner.join(0, landX, landY, spotX, spotY);
				await window.provider.waitForTransaction(tx.hash, 1); 
			
				runtime.callFunction("LAND:LoadLandMap");
				runtime.callFunction("LAND:HiddeTreasureHuntDialog");
			} catch (e) {
				const error = e.data && e.data.message ? e.data.message : e.message;
				
				let message = "";
				
				if (error.indexOf("APWarsTreasureHunt:WALLET_AMOUNT_EXCEEDED") >= 0) {
					message = "Hey old chap, take it easy! You cannot exceed the five-bet limit.";
				} 
				
				if (error.indexOf("APWarsTreasureHunt:INVALID_LAND") >= 0) {
					message = "Hey, old chap! You have selected an invalid land.";
				} 
				
				if (error.indexOf("APWarsTreasureHunt:ALREADY_HUNTING") >= 0) {
					message = "Hey, old chap! You have selected an invalid spot, another player is already looking for the key there.";
				} 
				
				if (error.indexOf("APWarsTreasureHunt:ALREADY_CLOSED") >= 0) {
					message = "Hey, old chap, this treasure hunt has been closed!";
				} 
				
				
				if (error.indexOf("APWarsTreasureHuntSetup:INVALID_WLAND_ALLOWANCE") >= 0) {
					message = "You need to approve me to manage your inventory! Go to your inventory and approve the wLAND token.";
				} 
				
				if (error.indexOf("APWarsTreasureHuntSetup:INVALID_COLLECTIBLES_ALLOWANCE") >= 0) {
					message = "You need to approve me to manage your inventory! Go to your inventory and approve game items."
				} 
				
				if (error.indexOf("ERC1155: caller is not owner nor approve") >= 0) {
					message = "You need to approve me to manage your inventory! Go to your inventory and approve game items."
				} 
				
				if (error.indexOf("APWarsTreasureHuntSetup:INVALID_WLAND_BALANCE") >= 0) {
					message = "Poor friend, you don't have enough wLAND to join this treasure hunt. But I'm rooting for your prosperity!"
				} 
				
				if (error.indexOf("ERC1155: insufficient balance for transfer") >= 0) {
					message = "Hey, old chap, check if you have a sufficient balance of required game items (workers)."
				} 
				
				if (error.indexOf("APWarsTreasureHuntSetup:INVALID_FOUNDATION_TICKET_BALANCE") >= 0) {
					message = "You don't have enough workers to join this treasure hunt. If we weren't in medieval times, you could advertise the job vacancy on LinkedIn."
				} 
				
				if (error.indexOf("MetaMask Tx Signature: User denied transaction signature.") >= 0) {
					message = "You need to sign the transaction. Can we call it an autograph?";
				}
				
				if (!message) {
					message = "An unexpected error has occurred! Open your browser console, print the error and contact the developers!"
				}
				
				console.log(e);
				
				runtime.callFunction("LAND:ShowTreasureHuntErrorDialog", message);
			} finally {
				runtime.globalVars.landIsWaitingBlockchain = false;
			}
		},

		async Ehelpers_Event1_Act1(runtime, localVars)
		{
			runtime.setReturnValue(window.rnd())
		},

		async Ehelpers_Event2(runtime, localVars)
		{
			
		},

		async Logs_Event1_Act1(runtime, localVars)
		{
			console.log(localVars.message);
		}

};

self.C3.ScriptsInEvents = scriptsInEvents;

