var UserContactInformationViewModelKO;
function UserContactInformationViewModel() {
    var self = this;
    var userInformation = rootModelKO.userDataFromLocalStorage;

    self.phoneNumber = ko.observable().extend({required: true, minLength: 9});
    self.phoneNumber(userInformation && userInformation.phoneNumber ? userInformation.phoneNumber : '');

    self.email = ko.observable().extend({required: true, emailAddressFormatValidation: self.email});
    self.email(userInformation && userInformation.emailAddress ? userInformation.emailAddress : '');
    
    self.isOnlyNumbersEntered = function (event) {
        preventNotDigits(event);
        return true;
    };

    self.contactType = ko.observable().extend({required: true});
    self.contactType(userInformation && userInformation.preferedContactType ? userInformation.preferedContactType : '')

    self.errors = ko.validation.group(self, {deep: true, observable: true, live: true});
};

function initUserContactInformationViewModel(){
    var bindElement = document.querySelector('[data-bind-id="contact_details"]');
    if(bindElement){
        UserContactInformationViewModelKO = new UserContactInformationViewModel();
        ko.applyBindings(UserContactInformationViewModelKO, bindElement);
    }

    rootModelKO.viewModels.push(UserContactInformationViewModelKO);
};
