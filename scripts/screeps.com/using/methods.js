var methods = {
    closest : function(creep,targets) {
        var mina = 1<<30;
        var mini = undefined;
        for(var name in targets){
            var newa = creep.pos.getRangeTo(targets[name].pos);
            if(newa>=0 && newa < mina){
                mina = newa;
                mini = name;
            }
        }
        return mini;
    },
    lessHits : function(targets){
        var mina = 1<<30;
        var mini = undefined;
        for(var name in targets){
            var newa = targets[name].hits;
            if(newa < mina){
                mina = newa;
                mini = name;
            }
        }
        return mini;
    },
    random : function(targets){
        return ti = Math.floor(Math.random() * targets.length);
    }
}
module.exports = methods;