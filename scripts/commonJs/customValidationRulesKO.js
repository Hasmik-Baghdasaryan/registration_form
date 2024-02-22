ko.validation.init({
  errorMessageClass: 'koErrorMessage',
  errorElementClass: 'koErrorField',
  decorateInputElement: true,
});

ko.validation.rules['isDateGreaterThanCurrent'] = {
  validator: function (value) {
    if (value.length === 5) {
      var date = new Date();
      var currentYear = parseInt(date.getFullYear().toString().slice(2, 5));
      var currentMonth = parseInt(date.getMonth().toString());
      var compareDate = value.split('/');
      var enteredMonth = parseInt(compareDate[0] - 1);
      var enteredYear = parseInt(compareDate[1]);
      return (enteredYear === currentYear && enteredMonth < currentMonth) ||
        (enteredMonth >= 12) || (enteredYear < currentYear) ? false : true
    }
  },
  message: 'Invalid date'
};

ko.validation.rules['emailAddressFormatValidation'] = {
  validator: function (email) {
    var regExp = new RegExp( /^[\w\.\-]+@[\w]+\.[a-zA-Z]{2,4}$/gm);
    return regExp.test(email) ? true : false;
  },
  message: 'Invalid format'
};

ko.validation.registerExtenders();