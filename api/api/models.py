from pydantic import BaseModel


class LoginUser(BaseModel):
    email: str
    password: str


class SignupUser(BaseModel):
    id: str
    password: str
