var UserCardsViewModelKO;
function UserCardsViewModel() {
    var self = this;
    var cardsInformation = getItemFromLocalStorage('cards');

    self.isActive = ko.observable(false);

    self.userCards = ko.observableArray(cardsInformation && cardsInformation.cards ? cardsInformation.cards : []);

    self.isRequired = ko.computed(function () {
        return (self.isActive() || !self.userCards().length) ? true : false;
    });

    self.userName = ko.observable().extend({ required: { onlyIf: self.isRequired } });
    self.userName('');

    self.cardNumber = ko.observable().extend({ required: { onlyIf: self.isRequired }, minLength: 19 });
    self.cardNumber('');

    self.validDate = ko.observable().extend(
        {
            required: { onlyIf: self.isRequired },
            isDateGreaterThanCurrent: { onlyIf: self.isRequired }
        }
    );
    self.validDate('');

    self.errors = ko.validation.group(self, { deep: true, observable: true, live: true });

    self.isDeleteBtnActive = function(){
        return self.userCards().length > 1 ? true : false;
    };

    self.isOnlyLettersEntered = function(event){
        preventDigits(event);
    };

    self.addCreditCard = function () {
        self.isActive(true);
        if (!self.errors().length) {
            self.userCards.push({
                cardId: Math.ceil(Math.random() * 100 / 5),
                userName: self.userName(),
                userCardNumber: self.cardNumber(),
                userCardValidDate: self.validDate()
            })
            self.userName('');
            self.cardNumber('');
            self.validDate('');
            self.isActive(false);
        }
    };

    self.delete = function (index) {
        self.userCards.remove(index);
    };

    self.formatCardNumber = function (event) {
        preventNotDigits(event);
        self.cardNumber(formatBankCardNumber(self.cardNumber()));
    };

    self.formatDate = function (event) {
        preventNotDigits(event);
        self.validDate(formatMonthAndYear(self.validDate()));
    };
};

function initUserCardsViewModel() {
    var bindElement = document.querySelector('[data-bind-id="credit_card"]');
    if (bindElement) {
        UserCardsViewModelKO = new UserCardsViewModel();
        ko.applyBindings(UserCardsViewModelKO, bindElement);

        rootModelKO.viewModels.push(UserCardsViewModelKO);
    }
};

