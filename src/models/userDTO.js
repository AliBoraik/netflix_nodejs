class UserDTO {
    constructor() {
        this.Id = undefined;
        this.Email = undefined;
        this.UserName = undefined;
        this.Avatar = undefined;
        this.EmailConfirmed = undefined;
        this.Status = undefined;
        this.Roles = undefined;
    }
    setId(Id){
        this.Id = Id
        return this
    }
    setEmail(Email){
        this.Email = Email
        return this
    }
    setUserName(UserName){
        this.UserName = UserName
        return this
    }
    setAvatar(Avatar){
        this.Avatar = Avatar
        return this
    }
    setEmailConfirmed(EmailConfirmed){
        this.EmailConfirmed = EmailConfirmed
        return this
    }
    setStatus(Status){
        this.Status = Status
        return this
    }
    setRoles(Roles){
        this.Roles = Roles
        return this
    }
}

module.exports = UserDTO;
