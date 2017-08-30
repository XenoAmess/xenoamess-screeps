var methods = require("methods");
var superRoleBaseTower = {
    run : function (tower){
        //console.log(tower.id);
        if(ENEMY_IN_MY_BASE){
            tower.attack(enemiesInMyBase[methods.lessHits(enemiesInMyBase)]);
        }else if(roomNeedingHealCreeps[tower.room] && roomNeedingHealCreeps[tower.room].length){
            tower.heal(roomNeedingHealCreeps[tower.room][methods.lessHits(roomNeedingHealCreeps[tower.room])]);
        }else if(roomNeedingRepairStructures[tower.room] && roomNeedingRepairStructures[tower.room].length){
            tower.repair(roomNeedingRepairStructures[tower.room][methods.lessHits(roomNeedingRepairStructures[tower.room])]);
        }
    }
}
module.exports = superRoleBaseTower;