var methods = require("methods");
var moveChargeTower = {
    run : function(creep){
        if(roomNeedingChargeTowers[creep.room] && roomNeedingChargeTowers[creep.room].length > 0){
            var mini = methods.closest(creep,roomNeedingChargeTowers[creep.room]);
            creep.moveTo(roomNeedingChargeTowers[creep.room][mini]);
            creep.transfer(roomNeedingChargeTowers[creep.room][mini],RESOURCE_ENERGY);
            return true;
        }
        return false;
    }
}
module.exports = moveChargeTower;