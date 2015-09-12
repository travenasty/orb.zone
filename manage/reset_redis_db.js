var Redis = require('ioredis');
var redisConfig = require('../redis_config');
var redis = new Redis(redisConfig);

redis.on('ready', function(err) {
  redis.pipeline()
  .hset('gameById', 'a', '{foo:"bar"}')
  .hset('gameById', 'b', '{foo:{$type:"ref",value:"valuesById[a]"}}')
  .hset('gameById', 'c', '{0:{$type:"ref",value:"valuesById[a]"},1:{Foo:"Bar"},3:{0:{foo:"baz"},1:{foo:"quux"}}}')
  .hget('gameById', 'a')
  .hset('gameById', 'd', '{$type:"ref",value:"valuesById[7]"}')
  .exec(function(err, results) {
    console.log ("Redis database has been reset to factory defaults.\n\n", results);
    process.exit();
  });
}); 

