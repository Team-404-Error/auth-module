'user strict';

module.exports = (capability) => {
  return (req, res, next) => {
    console.log(req.user)
    try {
      if(req.user.capabilities.includes(capability)){
        next();
      } else {
        next('Access Denied');
      }
    } catch (error) {
      next('Invalid Login');
    }
  };
}
;
