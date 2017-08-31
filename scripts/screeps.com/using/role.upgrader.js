var methods = require("methods");
var moveHarvest = require("move.harvest");
var roleUpgrader = {

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
            creep.memory = {};
            creep.memory.role = "harvester";
            cnt["harvester"]++;
            return;
        }
        
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
	        if(!creep.room.controller.my){
	            creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffffff'}});
	        }else{
	            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
	            var res = creep.upgradeController(creep.room.controller);
                if(res == ERR_NOT_IN_RANGE) {
                    // creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
	        }
        } else {
            moveHarvest.run(creep);
        }
	}
};

module.exports = roleUpgrader;