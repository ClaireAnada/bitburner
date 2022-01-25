import {servers} from "serverlist.js";
/** @param {NS} ns **/
export async function main(ns) {

var n = 0
var r = 0
var p = 0

while(r < servers.length){
	while(n < servers.length){

		let target = (servers[n]);
		let max = (ns.getServerMaxRam(target) - ns.getServerUsedRam(target));
    	let threads = Math.floor(max / ns.getScriptRam("hack.js"));
		if(ns.isRunning("hack.js", target, target) === true){
			n = n + 1;
			//ns.tprint(target + " is already hacked.");
		} else {
			if(ns.fileExists("BruteSSH.exe") === true){
				ns.brutessh(target);
				p = p + 1;
				//ns.tprint(target + " got its SSH bruted.");
				await ns.sleep(250);
			}
			if(ns.fileExists("FTPCrack.exe") === true){
				ns.ftpcrack(target);
				p = p + 1;
				//ns.tprint(target + " got its FTP cracked.");
				await ns.sleep(250);
			}
			if(ns.fileExists("relaySMTP.exe") === true){
				ns.relaysmtp(target);
				p = p + 1;
				//ns.tprint(target + " got its SMTP relayed.");
				await ns.sleep(250);
			}
			if(ns.fileExists("HTTPworm.exe") === true){
				ns.httpworm(target);
				p = p + 1;
				//ns.tprint(target + " got its HTTP wormed.");
				await ns.sleep(250);
			}
			if(ns.fileExists("SQLinject.exe") === true){
				ns.sqlinject(target);
				p = p + 1;
				//ns.tprint(target + " got its SQL injected.");
				await ns.sleep(250);
			}
			if(p >= ns.getServerNumPortsRequired(target)){
			 	if((ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(target)) && (threads > 0)){
					ns.nuke(target);
					await ns.scp("hack.js", target);
					ns.exec("hack.js", target, threads, target);
					n = n + 1;
					r = r + 1;
					p = 0;
					ns.tprint(target + " hacked.");
					await ns.sleep(250);
				 } else {
					 n = n +1;
					 p = 0;
					 //ns.tprint("Hacking level not high enough.");
					 await ns.sleep(250);
				 } 
			} else {
				//ns.tprint(target + " has " + p + " ports open");
				n = n + 1;
				p = 0;
				//ns.tprint("Not enough ports open.");
				await ns.sleep(250);
				}
			}
		}
		n = 0;
		//ns.tprint("Take it back now y'all.");
		await ns.sleep(1000);
	}
	ns.tprint("All servers hacked!");
}
