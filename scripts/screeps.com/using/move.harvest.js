var methods = require("methods");
var moveHarvest = {
    run : function(creep) {
        //console.log(creep.memory.lastRepairTarget);
        //console.log(nowTarget);
        var nowTarget = Game.getObjectById(creep.memory.lastHarvestTarget);
        
        if(creep.memory.lastHarvestTarget && nowTarget){
	        if(nowTarget.room == creep.room && nowTarget.energy > 0){
	            creep.moveTo(nowTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                creep.harvest(nowTarget);
                return;
	        }
        }
        creep.memory.lastHarvestTarget = null;
        
        var targets = creep.room.find(FIND_SOURCES , {
            filter: (object) => {
                return (object.energy > 0);
            }
        });
        if(targets.length){
            var mini = methods.closest(creep,targets);
            creep.memory.lastHarvestTarget = targets[mini].id;
            if(creep.harvest(targets[mini]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[mini], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
}
module.exports = moveHarvest;