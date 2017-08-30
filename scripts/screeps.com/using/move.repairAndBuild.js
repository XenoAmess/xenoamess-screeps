var methods = require("methods");
var moveRepairAndBuild = {
    run : function(creep){
        var nowTarget;
        nowTarget = Game.getObjectById(creep.memory.lastRepairTarget);
        
        //console.log(creep.memory.lastRepairTarget);
        //console.log(nowTarget);
        
        if(creep.memory.lastRepairTarget && nowTarget){
            if(nowTarget.room == creep.room && nowTarget.hits < nowTarget.hitsMax && (!(nowTarget.structureType == STRUCTURE_RAMPART && nowTarget.hits >= RAMPART_HP))){
                creep.moveTo(nowTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                creep.repair(nowTarget);
                return;
            }
        }
        creep.memory.lastRepairTarget = null;
        
        nowTarget = Game.getObjectById(creep.memory.lastBuildTarget);
        
        if(creep.memory.lastBuildTarget && nowTarget){
            if(nowTarget.room == creep.room && creep.memory.lastBuildTarget && nowTarget.progress < nowTarget.progressTotal){
                creep.moveTo(nowTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                creep.build(nowTarget);
                return;
            }
        }
        creep.memory.lastBuildTarget = null;
        
        var targets = roomNeedingRepairStructures[creep.room];
        
        if(targets && targets.length) {
            var mini = methods.closest(creep,targets);
            
            creep.memory.lastRepairTarget = targets[mini].id;
            creep.moveTo(targets[mini], {visualizePathStyle: {stroke: '#ffffff'}});
            creep.repair(targets[mini]);
        }else{
            var targets = roomNeedingBuildConstructionSite[creep.room];
            if(targets && targets.length) {
                var mini = methods.closest(creep,targets);
                creep.memory.lastBuildTarget = targets[mini].id;
                creep.moveTo(targets[mini], {visualizePathStyle: {stroke: '#ffffff'}});
                creep.build(targets[mini]);
            }else{
                creep.moveTo(Game.spawns["Spawn1"], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
}
module.exports = moveRepairAndBuild;