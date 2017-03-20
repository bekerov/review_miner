'use strict';
const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
const credentials = require("./credentials.json");

const newsEnvironmentId = '1fbb19e5-8f49-4a25-bf3d-77c56a343396';
const newsCollectionId = '231e6d6c-dfb6-47eb-b61e-1252ab24404a';
const reviewEnvironmentId = '4bca73f7-4e8d-4536-92e5-b1c1ef46bcb0';
const reviewCollectionId = '231e6d6c-dfb6-47eb-b61e-1252ab24404a';

const discovery = new DiscoveryV1({
  // if left unspecified here, the SDK will fall back to the DISCOVERY_USERNAME and DISCOVERY_PASSWORD
  // environment properties, and then Bluemix's VCAP_SERVICES environment property
  // username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  // password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE'
  username: credentials.username,
  password: credentials.password,
  version_date: DiscoveryV1.VERSION_DATE_2016_12_15
});

discovery.getEnvironments({}, function(error, data) {
  console.log(JSON.stringify(data, null, 2));
});

const queryReviews = function(queryObject) {
  queryObject.environment_id = reviewEnvironmentId;
  queryObject.collection_id = reviewCollectionId;
  return query(queryObject);
}

const queryNews = function(queryObject) {
  queryObject.environment_id = newsEnvironmentId;
  queryObject.collection_id = newsCollectionId;
  return query(queryObject);
}

const query = function(queryObject) {
  return new Promise( (resolve, reject) => {
    discovery.query(queryObject, function(err, response) {
      if (err) {
        reject(err);
      } else {
        resolve(response)
      }
    });
  });
}
let renderValues = {};
let res = JSON.parse('{ "matching_results": 261, "results": [], "aggregations": [ { "type": "term", "field": "hotel", "results": [ { "key": "allerton_hotel", "matching_results": 261, "aggregations": [ { "type": "timeslice", "field": "date", "interval": "1y", "results": [ { "key_as_string": "2004-01-01T00:00:00.000Z", "key": 1072915200000, "matching_results": 19, "aggregations": [ { "type": "average", "field": "enriched_text.docSentiment.score", "value": 0.4747981263157895 } ] }, { "key_as_string": "2005-01-01T00:00:00.000Z", "key": 1104537600000, "matching_results": 26, "aggregations": [ { "type": "average", "field": "enriched_text.docSentiment.score", "value": 0.07553482307692308 } ] }, { "key_as_string": "2006-01-01T00:00:00.000Z", "key": 1136073600000, "matching_results": 27, "aggregations": [ { "type": "average", "field": "enriched_text.docSentiment.score", "value": 0.3211255518518519 } ] }, { "key_as_string": "2007-01-01T00:00:00.000Z", "key": 1167609600000, "matching_results": 55, "aggregations": [ { "type": "average", "field": "enriched_text.docSentiment.score", "value": 0.19947411309090904 } ] }, { "key_as_string": "2008-01-01T00:00:00.000Z", "key": 1199145600000, "matching_results": 65, "aggregations": [ { "type": "average", "field": "enriched_text.docSentiment.score", "value": 0.15336217692307694 } ] }, { "key_as_string": "2009-01-01T00:00:00.000Z", "key": 1230768000000, "matching_results": 69, "aggregations": [ { "type": "average", "field": "enriched_text.docSentiment.score", "value": 0.2754325246376812 } ] } ] } ] } ] } ] }');

    renderValues.allertonLabels = [];
    renderValues.allertonSeries1 = [];
    renderValues.allertonSeries1Label = res['aggregations'][0]['results'][0]['key'];
    for (let i of res['aggregations'][0]['results'][0]['aggregations'][0]['results']) {
      renderValues.allertonLabels.push(i['key_as_string']);
      renderValues.allertonSeries1.push(i['aggregations'][0]['value']);
    }
    console.log(JSON.stringify(renderValues, null, 2));

module.exports = {queryNews: queryNews, queryReviews: queryReviews}