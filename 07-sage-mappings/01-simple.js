/*
  http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/indices-create-index.html
  http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/mapping-dynamic-mapping.html
*/

var sage = require('sage')
  , util = require('./util.js');

var settings = {
  "index" : {
    "number_of_shards" : 1,
    "number_of_replicas" : 0,
    "mapper" : { "dynamic" : false } // only for mapping *creation*, not augmentation
  }
};

var mappings = {};
mappings.testtype1 = {
  "properties" : {
    "iField" : { "type" : "integer" },
    "sField" : { "type" : "string", "analyzer" : "default" }
  }
};
mappings.testtype2 = {
  "dynamic": "strict",
  "properties" : {
    "iField" : { "type" : "integer" },
    "sField" : { "type" : "string", "analyzer" : "default" }
  }
};

var item1 = {
  "iField" : 37,
  "sField" : "bla bla bla"
};

var item2 = {
  "foo" : "bar"
};

var es = sage("http://localhost:9200");

es.index("testindex").destroy(function(err, result){
  es.index("testindex").create({
      "settings": settings,
      "mappings": mappings
    }, function(err, result){
      util.log("create")(err, result);
      if (!err) {
        es.index("testindex").type("testtype1").
          post(item1, util.log("index testtype1 item1"));
        es.index("testindex").type("testtype1").
          post(item2, util.log("index testtype1 item2, extends mapping"));
        es.index("testindex").type("testtype0").
          post(item1, util.log("index testtype0 item1, fails"));
        es.index("testindex").type("testtype2").
          post(item1, util.log("index testtype2 item1"));
        es.index("testindex").type("testtype2").
          post(item2, util.log("index testtype2 item2, fails"));
      }
    }
  );
});
