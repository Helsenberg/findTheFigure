
const getCurrentTime = function() {
    return new Date().getTime();
}

const getExpire = (countMinutes = 20) => {
    return getCurrentTime() + 60 * 1000 * countMinutes;
}

module.exports.getResponse = (data, expireLive = 20) => {
    const min = data ? expireLive : 0;
    return{
        data: data ? data : null,
        meta:{
            expire: getExpire(min)
        }
    }
}
