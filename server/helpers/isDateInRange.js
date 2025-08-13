module.exports.isDateInRange = function(date, start, end) {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), start.month - 1, start.day);
  const endDate = new Date(today.getFullYear(), end.month - 1, end.day);
  return today >= startDate && today <= endDate;
}
