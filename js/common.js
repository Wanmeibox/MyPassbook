String.prototype.replaceAll = function(oldValue,newValue){
    return this.toString().replace(new RegExp(oldValue,'gm'),newValue);
//    return this.toString().split(oldValue).join(newValue);
}
String.prototype.toObject = function(obj){
    var string = this.toString();
    for(var key in obj){
        string = string.replaceAll('{' + key + '}',obj[key]);
    }
    return string;
}

Number.prototype.toFix = function(){
    var int = parseFloat(this);
    if(int.toString().indexOf('.') > 0){
        return parseFloat(int.toFixed(2));
    }
    return int;
}