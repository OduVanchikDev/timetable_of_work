const { connect } = require('mongoose');

module.exports = connect('mongodb://localhost:27017/timetable', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
