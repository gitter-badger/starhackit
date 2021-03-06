import _ from 'lodash';

let log = require('logfilename')(__filename);

export default function MeApi(app) {
  let models = app.data.models();

  return {
    index: function (userId) {
      log.debug("index userId: ", userId);
      return models.User.findByUserId(userId).then(user => {
        log.debug("index user: ", user.get());
        return _.omit(user.toJSON(), 'id');
      });
    },
    patch: async function (userId, data) {
      log.debug("patch userId %s, data: ", userId, data);
      await models.User.update({
        username: data.username
      }, {
        where: {
          id: userId
        }
      });
      log.debug("patch done");
      return data;
    }
  };
}
