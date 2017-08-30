var methods = require("methods");
var moveHarvest = require("move.harvest");
var moveRepairAndBuild = require("move.repairAndBuild");
var moveChargeTower = require("move.chargeTower");

var roleBuilder = {
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
        
        
        if(cnt["harvester"] < MIN_HARVESTER){
            creep.memory.role = "harvester";
            cnt["harvester"]++;
            return;
        }
        
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }else if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }
    
        
        
	    if(creep.memory.building) {
	        if(moveChargeTower.run(creep)){
	            return;
	        }
            moveRepairAndBuild.run(creep);
	    } else {
	        var builderCnt = roomNeedingEnergyCreepsCnt[creep.room][creep.memory.role];
            if((creep.room == Game.spawns["Spawn1"].room && builderCnt > 1) || builderCnt > 2){
                creep.moveTo(Game.flags["FlagResources"], {visualizePathStyle: {stroke: '#ffaa00'}});
            }else{
                moveHarvest.run(creep);
            }
	    }
	}
};

module.exports = roleBuilder;