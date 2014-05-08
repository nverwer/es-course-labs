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
