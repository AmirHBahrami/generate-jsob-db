/*
 * put the custom generator functions to produce or pick data from a provided range (/argument)
 * in this module.
 *
 * then include the function's name along with the data to be passed to it, in the src file
 * provided like this: [key] : { generatorFunc:[name_of_the_function] , args: ... }
 *
 * NOTE: to make the job easier, use objects as the parameters for your custom functions, so the
 * args in the res file could also be packed easily in an object, and then destructure parameter object...
 *
 */

exports.genDepName=require('./gen-dep-name');
exports.genPhoneNum=require('./gen-phone-num');
exports.genRandBirth=require('./gen-rand-birth');
exports.genRandDate=require('./gen-rand-date');
exports.genRandPrice=require('./gen-rand-price');
exports.genRandStreet=require('./gen-rand-street');
exports.makeEmail=require('./make-email')
exports.makeNamePass=require('./make-name-pass');
exports.pickRandNum=require('./pick-random');
exports.selectRandMember=require('./select-rand-member');
