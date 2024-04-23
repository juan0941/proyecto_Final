export interface AuthResponse{
    body:{
        user: User;
        accessToken:String;
        refreshToken:string;
    };

}

export interface AuthResponseError{
    body:{
        error: string;
    };
}
export interface User{
    _id:String;
    name:string;
    username: string;
}