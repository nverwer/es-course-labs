var andthen = require('and-then');

exports.log = function(title) {
  title = title || "";
  return function(error, result) {
    console.log("\n--- "+title+" ---");
    if (error) {
      console.log("ERROR: "+error);
    } else {
      console.log(JSON.stringify(result, null, 2));
    }
  }
}

exports.do = function(self, fun) {
  var defer = andthen();
  var args = [].slice.call(arguments);
  args = args.slice(2);
  console.log("calling "+fun+" on "+self.uri+" with "+JSON.stringify(args));
  args.push(function(error, result){
    if (error) {
      throw(fun.name+" ERROR: "+error);
    } else {
      defer.resolve(result);
    }
  });
  self[fun].apply(self, args);
  return defer.promise;
}

exports.extend = function(target /* sources.. */) {
  var source, key, i = 1;
  while (source = arguments[i++]) {
    for (key in source) target[key] = source[key];
  }
  return target;
};

