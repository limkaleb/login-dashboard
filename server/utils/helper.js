const dayjs = require('dayjs');
const isBetween = require('dayjs/plugin/isBetween');

dayjs.extend(isBetween);

const isCurrentDate = (d) => dayjs(d).isSame(dayjs(), 'day');

const isBetween7Days = (d) => dayjs(d).isBetween(dayjs().subtract(7, 'day'), dayjs().add(1, 'day'), 'day');

module.exports = {
  isCurrentDate,
  isBetween7Days,
};
