from pydantic import BaseModel

class LoginUser(BaseModel):
    id: str
    password: str


class SignupUser(BaseModel):
    id: str
    password: str
