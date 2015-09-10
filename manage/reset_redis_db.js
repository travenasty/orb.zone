var Redis = require('ioredis');
var redis = new Redis();

redis.hset('gameById', 'a', '{foo:"bar"}');
redis.hset('gameById', 'b', '{foo:{$type:"ref",value:"valuesById[a]"}}');
redis.hset('gameById', 'c', '{0:{$type:"ref",value:"valuesById[a]"},1:{Foo:"Bar"},3:{0:{foo:"baz"},1:{foo:"quux"}}}');
redis.hset('gameById', 'd', '{$type:"ref",value:"valuesById[7]"}');

console.log ("Redis database has been reset to factory defaults.");
process.exit();
