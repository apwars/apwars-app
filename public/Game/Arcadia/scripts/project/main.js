
// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";


// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";

import { ethers } from "./ethers-5.1.esm.min.js";
import LAND_MAP_ABI from "./APWarsLandMap.js"; 
import WORLD_MAP_ABI from "./APWarsWorldMap.js"; 
import WORLD_MAP_MANAGER_ABI from "./APWarsWorldMapManager.js"; 
import ERC20_ABI from "./ERC20.js"; 
import TREASURE_HUNT_ABI from "./APWarsTreasureHunt.js"; 

const WORLD_MAP_MANAGER_CONTRACT_ADDRESS = '0x615554De772cc5354591992C040B8CDEf85c5021';
const LAND_MAP_CONTRACT_ADDRESS = '0x390347D614608e8BffA34B8a6DF2FBd2853a8d81';
const TREASURE_HUNT_CONTRACT_ADDRESS = '0xD194b65dfFd32db4977b7562f0c94D013d40d432';

	
runOnStartup(async runtime =>
{
	window.parseAccount = function(acc, len) {
		return acc.slice(0, len + 2) + '...' + acc.slice(-6)
	}
	
	window.isZeroAddress = function(addr) {
		return addr === '0x0000000000000000000000000000000000000000';
	}

	const contract = getQueryVariable("worldManager") || WORLD_MAP_MANAGER_CONTRACT_ADDRESS;
	const landMapContractAddress = getQueryVariable("landMap") || LAND_MAP_CONTRACT_ADDRESS;
	const treasureHuntAddress = getQueryVariable("treasureHunt") || TREASURE_HUNT_CONTRACT_ADDRESS;
	
	runtime.globalVars.expectedVersion = getQueryVariable("expectedVersion") || runtime.projectVersion;
	window.provider = new ethers.providers.Web3Provider(window.ethereum);
	window.utils = ethers.utils;
	
	window.signer = provider.getSigner();
	
	const addresses = await provider.send("eth_requestAccounts", []);
	window.account = addresses.length > 0 ? addresses[0] : "";
	
	try {
		console.log(`[MAIN] Initializing WorldMapManager contract at ${contract}`);
		window.worldMapManagerSMC = new ethers.Contract(contract , WORLD_MAP_MANAGER_ABI, window.provider);
		window.worldMapManagerSMCSigner = window.worldMapManagerSMC.connect(window.signer);
		
		console.log(`[MAIN] Initializing LandMap contract at ${landMapContractAddress}`);
		window.landMapSMC = new ethers.Contract(landMapContractAddress, LAND_MAP_ABI, window.provider);
		
		console.log(`[MAIN] Initializing TreasureHunt contract at ${treasureHuntAddress}`);
		window.treasureHuntSMC = new ethers.Contract(treasureHuntAddress, TREASURE_HUNT_ABI, window.provider);
		window.treasureHuntSMCSigner = window.treasureHuntSMC.connect(window.signer);
	
		const setupVars = await window.worldMapManagerSMC.getSetup();
		console.log("[MAIN] Getting setup variables...");
		
		console.log(setupVars);
		const wLANDAddress = setupVars[6];
		
		console.log(`[MAIN] Initializing wLAND contract at ${landMapContractAddress}`);
		window.wLANDSMC = new ethers.Contract(wLANDAddress, ERC20_ABI, window.provider);
		
		console.log(`[MAIN] Getting WorldMap contract...`);
		const worldMapAddress = await window.worldMapManagerSMC.getWorldMap(runtime.globalVars.WORLD_ID);
		
		console.log(`[MAIN] Initializing WorldMap contract at ${landMapContractAddress}`);
		window.worldMapSMC = new ethers.Contract(worldMapAddress, WORLD_MAP_ABI, window.provider);
	} catch (e) {
		console.log(e);
	}
	
	runtime.globalVars.isSoundEnabled = localStorage.getItem('soundState') !== 'off';
	
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.
	
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

async function OnBeforeProjectStart(runtime)
{
	// Code to run just before 'On start of layout' on
	// the first layout. Loading has finished and initial
	// instances are created and available to use here.
	
	runtime.addEventListener("tick", () => Tick(runtime));
}

function Tick(runtime)
{
	// Code to run every tick
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}