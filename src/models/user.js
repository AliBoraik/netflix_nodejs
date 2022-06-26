class User {
    constructor(Id, Email,Password, UserName, NormalizedUserName,Avatar, NormalizedEmail, EmailConfirmed ) {
        this.Id = Id;
        this.Email = Email;
        this.Password = Password;
        this.UserName = UserName;
        this.NormalizedUserName = NormalizedUserName;
        this.Avatar = Avatar;
        this.NormalizedEmail = NormalizedEmail;
        this.EmailConfirmed = EmailConfirmed;
    }
}

module.exports = User;
