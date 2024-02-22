var PersonalInformationViewModelKO;
function PersonalInformationViewModel() {
    var self = this;
    var userInformation = rootModelKO.userDataFromLocalStorage;

    self.genderInfo = [
        { id: 1, gender: 'Mr' },
        { id: 2, gender: "Mrs" }
    ];

    self.selected = ko.observable().extend({ required: true });
    self.selected(userInformation && userInformation.gender ? userInformation.gender : '');

    self.firstName = ko.observable().extend({ required: true, minLength: 3, maxLength: 32 });
    self.firstName(userInformation && userInformation.firstName ? userInformation.firstName : '');

    self.middleName = ko.observable().extend({ required: true, minLength: 3, maxLength: 32 });
    self.middleName(userInformation && userInformation.middleName ? userInformation.middleName :'');

    self.lastName = ko.observable().extend({ required: true, minLength: 3, maxLength: 32 });
    self.lastName(userInformation && userInformation.lastName ? userInformation.lastName : '');

    self.errors = ko.validation.group(self, {deep: true, live: true, observabale: true });
};

function initPersonalInformationViewModel(){
    var bindElement = document.querySelector('[data-bind-id="personal_information"]');
    if(bindElement) {
        PersonalInformationViewModelKO = new PersonalInformationViewModel();
        ko.applyBindings(PersonalInformationViewModelKO, bindElement);
    }

    rootModelKO.viewModels.push(PersonalInformationViewModelKO);
}
