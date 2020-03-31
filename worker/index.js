const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

// duplicate of the client
const sub = redisClient.duplicate();

// fib recursive solution
function fib(index){
    if(index < 2){
        return 1
    }else{
        return fib(index-1) + fib(index-2);
    }
}

sub.on("message", (channel, message) => {
    // add to hash with key as message and value as its value
    redisClient.hset('values', message, fib(parseInt(message)));
})

sub.subscribe("insert");