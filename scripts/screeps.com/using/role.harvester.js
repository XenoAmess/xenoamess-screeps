var methods = require("methods");
var moveHarvest = require("move.harvest");
var moveTransportEnergy = require("move.transportEnergy");

var roleHarvester = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.hits < creep.hitsMax && creep.room != Game.spawns["Spawn1"].room){
            creep.moveTo(Game.spawns["Spawn1"]);
            return;
        }
        if(creep.room.controller.owner != undefined && !creep.room.controller.my){
            creep.moveTo(Game.spawns["Spawn1"]);
            return;
        }
        
        
        
        if(!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
            creep.say('🔄 harvest');
	    }
	    if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.harvesting = false;
	        creep.say('🚧 transport');
	    }
        
        if(!creep.memory.harvesting) {
            moveTransportEnergy.run(creep);
        } else {
            var harvesterCnt = roomNeedingEnergyCreepsCnt[creep.room][creep.memory.role];
            if((creep.room == Game.spawns["Spawn1"].room && harvesterCnt > 2)  || harvesterCnt > 3){
                roomNeedingEnergyCreepsCnt[creep.room][creep.memory.role]--;
                creep.moveTo(Game.flags["FlagResources"], {visualizePathStyle: {stroke: '#ffaa00'}});
            }else{
                moveHarvest.run(creep);
            }
        }
        
	}
};

module.exports = roleHarvester;