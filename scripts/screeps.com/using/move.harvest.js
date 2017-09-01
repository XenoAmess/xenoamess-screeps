var methods = require("methods");

var moveHarvest = {
    run : function(creep) {
        if(Memory.CLEAR_TIME == MEMORY_CLEAR_TIME){
            creep.memory.lastHarvestTarget = null;
        }
        
        //console.log(creep.memory.lastRepairTarget);
        //console.log(nowTarget);
        var nowTarget = Game.getObjectById(creep.memory.lastHarvestTarget);
        
        // if(!Memory.roomNeedingHarvestResourcesNum){
        //     Memory.roomNeedingHarvestResourcesNum = {};
        // }
        // if(!Memory.roomNeedingHarvestResourcesNum[creep.room]){
        //     Memory.roomNeedingHarvestResourcesNum[creep.room]={
        //         cnt : -1
        //     };
        // }
        if(!creep.memory.roomNeedingHarvestResourcesNum){
            creep.memory.roomNeedingHarvestResourcesNum = 0;
        }
        if(creep.memory.lastHarvestTarget && nowTarget){
	        if(nowTarget.room == creep.room && nowTarget.energy > 0 && roomNeedingHarvestResources[creep.room].length <= creep.memory.roomNeedingHarvestResourcesNum){
	            var res = creep.moveTo(nowTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                if(res != ERR_NO_PATH){
                    creep.harvest(nowTarget);
                    return;
                }
	        }
        }
        
        creep.memory.lastHarvestTarget = null;
        creep.memory.roomNeedingHarvestResourcesNum = roomNeedingHarvestResources[creep.room].length;
        
        var targets = roomNeedingHarvestResources[creep.room];
        //Memory.roomNeedingHarvestResourcesNum[creep.room] = targets.length.cnt;
        
        if(targets.length){
            var mini = methods.random(targets);
            
            creep.memory.lastHarvestTarget = targets[mini].id;
            if(creep.harvest(targets[mini]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[mini], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
}
module.exports = moveHarvest;