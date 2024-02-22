var UserInterestsViewModelKO;
function UserInterestsViewModel() {
    var self = this;
    var userInformation = rootModelKO.userDataFromLocalStorage;
    
    self.interests = ko.observableArray([
        { id: 1, interest: 'sports' },
        { id: 2, interest: 'news' },
        { id: 3, interest: 'comedy' },
        { id: 4, interest: 'movies' }
    ]);
       
    self.choosenInterests = ko.observableArray().extend({required: true});
    self.choosenInterests(userInformation && userInformation.interests ? userInformation.interests : []);
    self.errors = ko.validation.group(self, {deep: true, observable: true, live: true});
};

function initUserInterestsViewModel(){
    var bindingElement = document.querySelector('[data-bind-id="interests"]');
    if(bindingElement) {
        UserInterestsViewModelKO = new UserInterestsViewModel();
        ko.applyBindings(UserInterestsViewModelKO, bindingElement);
    }

    rootModelKO.viewModels.push(UserInterestsViewModelKO);
}
