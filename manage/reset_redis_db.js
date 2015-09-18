var Redis = require('ioredis');
var redisConfig = require('../redis_config');
var redis = new Redis(redisConfig);

function fWrap (type, value) {
  if (typeof value != "string") {
    value = JSON.stringify(value);
  }
  return '{"$type":"' + type + '", "value":' + value +' }';
}

function fAtom (value) {
  return fWrap('atom', value);
}

function fRef (value) {
  return fWrap('ref', value);
}

redis.on('ready', function(err) {
  redis.pipeline()

/*
  .del('gameById')

  .hset('gameById', 'a', '{"foo":"bar"}')
  .hset('gameById', 'b', '{"foo":{"$type":"ref","value":"valuesById[a]"}}')
  .hset('gameById', 'c', '{0:{"$type":"ref","value":"valuesById[a]"},1:{"Foo":"Bar"},3:{0:{"foo":"baz"},1:{"foo":"quux"}}}')
  .hget('gameById', 'a')
  .hset('gameById', 'd', '{"$type":"ref","value":"valuesById[7]"}')
*/

  .del('todos')

  .hset('todos', 0, fRef(["todosById", 44]) )
  .hset('todos', 1, fRef(["todosById", 54]) )
  .hset('todos', 2, fRef(["todosById", 97]) )

  .del('todosById')

  .hset('todosById', '44', fAtom({
	  name: "get milk from corner store",
    done: false,
    prerequisites: [
    	fRef(["todosById", 54]),
      fRef(["todosById", 97]),
    ]})
  )
  .hset('todosById', '54', fAtom({
    name: "withdraw money from ATM",
    done: false,
  }))
  .hset('todosById', '97', fAtom({
    name: "pick car up from shop",
    done: false,
  }))

  .exec(function(err, results) {
    console.log ("Redis database has been reset to factory defaults.\n\n", results);
    process.exit();
  });
}); 

