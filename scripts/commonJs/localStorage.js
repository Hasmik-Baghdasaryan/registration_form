function SetUserDataToLocalStorage(data) {
    var self = this;
    self.user = {
      id: data.id || Math.random(),
      firstName: data.firstName || '',
      middleName: data.middleName || '',
      lastName: data.lastName || '',
      gender: data.gender || '',
      phoneNumber: data.phoneNumber || '',
      emailAddress: data.email || '',
      preferedContactType: data.contactType || '',
      interests: data.interests || [],
      cardIds: data.cardIds || [],
    }
    localStorage.setItem("user", JSON.stringify(self.user));
  };
  
  function SetUserCardsToLocalStorage(data) {
    var self = this;
    self.cards = {
      userId: data.userId || '',
      cards: data.cards || [],
    }
    localStorage.setItem("cards", JSON.stringify(self.cards));
  };
  
  function getItemFromLocalStorage(key) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
  };