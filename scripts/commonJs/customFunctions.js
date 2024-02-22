function preventNotDigits(event) {
  var regExp = new RegExp(/^[0-9]+$/g);
  if (!regExp.test(event.key)) {
    event.preventDefault();
  }
};

function preventDigits(event) {
  var regExp = new RegExp(/^[A-Za-z]+$/g);
  if (!regExp.test(event.key)) {
    event.preventDefault();
  }
};

function formatMonthAndYear (date) {
  return date.replace(/(\d{2})(\d+)/, '$1/$2');
};

function formatBankCardNumber (card) {
  var card = card.replace(/ /g, '');
  return card.replace(/(\d{4})/g, '$1 ').trim();
};

