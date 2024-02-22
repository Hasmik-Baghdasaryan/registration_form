var rootModelKO;

function DocumentRootModelKO () {
  var self = this;
  self.viewModels = ko.observableArray([]);
  self.viewModelsComputed = ko.pureComputed(function(){
    return self.viewModels();
  });

  self.userDataFromLocalStorage = getItemFromLocalStorage('user');

  self.errors = ko.computed(function(){
    if(self.viewModels()) {
      for (var i = 0; i<=self.viewModels().length; i++){
        if((self.viewModels()[i] && self.viewModels()[i].errors().length) ||
           (self.viewModels()[i] && self.viewModels()[i].isActive && self.viewModels()[i].isActive())){
          return false;
        }
      }
     return true;
    } 
  });

  self.buttonText = function(){
    return self.userDataFromLocalStorage ? "Edit" : "Submit";
  };

  self.resetForm = function(){
    localStorage.removeItem('user');
    localStorage.removeItem('cards');
    window.location.reload();
  };

  self.submitForm = function(){
    var personalInformation = self.viewModels()[0];
    var contactInformation = self.viewModels()[1];
    var interestsInformation = self.viewModels()[2];
    var cardsInformation = self.viewModels()[3];
    var cardsIds = [];

    if(cardsInformation && cardsInformation.userCards()){
      cardsInformation.userCards().map((c)=>{
        cardsIds.push(c.cardId);
        return cardsIds;
      })
    }

    new SetUserDataToLocalStorage({
      id: Math.ceil(Math.random() * 100 / 5),
      firstName: personalInformation.firstName(),
      middleName: personalInformation.middleName(),
      lastName: personalInformation.lastName(),
      gender: personalInformation.selected(),
      phoneNumber: contactInformation.phoneNumber(),
      email: contactInformation.email(),
      contactType: contactInformation.contactType(),
      interests: interestsInformation.choosenInterests(),
      cardIds: cardsIds,
    });

    if(getItemFromLocalStorage('user') && getItemFromLocalStorage('user').id) {
      new SetUserCardsToLocalStorage({
        userId: getItemFromLocalStorage('user').id,
        cards: cardsInformation.userCards(),
      })
    }
  }; 
}

function DocumentRootModelInit() {
  if (typeof rootModelKO == 'undefined') {
      rootModelKO = new DocumentRootModelKO();
      initModules();
  }
};

function initModules() {
  if (typeof initPersonalInformationViewModel != 'undefined') {
    initPersonalInformationViewModel();
  }
  if(typeof initUserContactInformationViewModel != 'undefined'){
    initUserContactInformationViewModel();
  }
  if(typeof initUserInterestsViewModel != 'undefined'){
    initUserInterestsViewModel();
  }
  if(typeof initUserCardsViewModel != 'undefined') {
    initUserCardsViewModel();
  }
};

window.addEventListener('load', function () {
  //root init
  DocumentRootModelInit();

  var formSubmitBtn = document.querySelector('[data-bind-id="registration_form_btn"]');
  if(formSubmitBtn) {
    ko.applyBindings(rootModelKO, formSubmitBtn);
  }
});

