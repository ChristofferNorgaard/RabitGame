jse.util = {};

jse.util.getArg = function(args, index, defaultVal) {
    if (!args || typeof(args) != "object") return defaultVal;
    if (typeof(args[index]) == "undefined") return defaultVal;
    return args[index];
};

jse.util.mergeObjects = function(obj1, obj2) {
    var result = {};

    if (typeof(obj1) != "undefined")
        for (var idx in obj1)
            result[idx] = obj1[idx];

    if (typeof(obj2) != "undefined")
        for (var idx in obj2)
            result[idx] = obj2[idx];

    return result;
};
