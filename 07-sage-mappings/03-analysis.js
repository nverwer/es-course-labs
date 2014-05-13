
var sage = require('sage')
  , andthen = require('and-then')
  , util = require('./util.js');

util.extend(sage.Client.prototype, {
  analyze: function(doc /* [analyzer], [doc], [headers], [callback] */) {
    var request = this._(arguments, 1);
    return request('GET', '_analyze', {b: doc});
  }
})

util.extend(sage.Index.prototype, {
  analyze: function(doc /* [analyzer], [doc], [headers], [callback] */) {
    var request = this._(arguments, 1);
    return request('GET', '_analyze', {b: doc});
  }
})


var filters = [ "asciifolding", "lowercase", "nl_stop", "nl_dictionary_decompounder", "nl_stemmer", "my_synonyms" ];

var settings = {

  "settings" : {
    "index" : {
      "number_of_shards" : 1,
      "number_of_replicas" : 0,
      "analysis" : {

          "analyzer" : {
            "testanalyzer" : {
              "type" : "custom",
              "tokenizer" : "standard",
              "filter" :  filters
            }
          },

          "filter" : {

            "asciifolding" : { "type" : "asciifolding" },

            "lowercase" : { "type" : "lowercase" },

            "nl_stop" : { "type" : "stop", "stopwords" : ["de", "en", "van", "ik", "te", "dat", "die", "in", "een", "hij", "het", "niet", "zijn", "is", "was", "op", "aan", "met", "als", "voor", "had", "er", "maar", "om", "hem", "dan", "zou", "of", "wat", "mijn", "men", "dit", "zo", "door", "over", "ze", "zich", "bij", "ook", "tot", "je", "mij", "uit", "der", "daar", "haar", "naar", "heb", "hoe", "heeft", "hebben", "deze", "u", "want", "nog", "zal", "me", "zij", "nu", "ge", "geen", "omdat", "iets", "worden", "toch", "al", "waren", "veel", "meer", "doen", "toen", "moet", "ben", "zonder", "kan", "hun", "dus", "alles", "onder", "ja", "eens", "hier", "wie", "werd", "altijd", "doch", "wordt", "wezen", "kunnen", "ons", "zelf", "tegen", "na", "reeds", "wil", "kon", "niets", "uw", "iemand", "geweest", "andere"] },

            "my_synonyms" : { "type" : "synonym", "synonyms" : ["tweewieler, rijwiel => fiets"] },

            "nl_stemmer" : { "type" : "stemmer", "language" : "dutch" },
            "nl_snowball" : { "type" : "snowball", "language" : "Dutch" },

            "nl_dictionary_decompounder" : { "type" : "dictionary_decompounder", "word_list" : ["beleid", "medewerker", "ondersteuner", "secretaresse", "secretaris", "project"]}

          }

      } // analysis
    }
  },

  "mappings" : {
    "testtype" : {
      "properties" : {
        "testfield" : { "type" : "string", "analyzer" : "testanalyzer" }
      }
    }
  }

};

var es = sage("http://localhost:9200");
var es_index = es.index('testindex');
var es_type = es_index.type('testtype');

var test_zin = "Máxima beëdigde de 3e projectsecretaris van Curaçao, volgens adviezen van de premier.";


util.do(es_index, "exists")
.then(function(exists){
  return exists ? util.do(es_index, "destroy") :andthen(true);
})
.then(function(){return util.do(es_index, "create", settings)})
.then(function(){return util.do(es_index, "analyze", test_zin, {analyzer: "testanalyzer"})})
.then(function(result){console.log(JSON.stringify(result, null, 2))});
