import time
from base64 import b64encode
from hashlib import sha256

import jwt
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .db import *
from .models import *


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/test")
def test():
    return {"hello test!"}


@app.get("/")
def root():
    return {"hello root!"}


@app.post("/user/signup")
def signup(user: SignupUser):
    pass

# @app.post("/user/validate_token")
# def validate_token(data: UserToken):
#     if data.access_token == None:
#         return "no token"


@app.post("/user/login")
def login(user: LoginUser):
    password = single_result_query(f"SELECT password from users WHERE id='{user.email}'")
    if not password:
        return "No user found"

    salt = single_result_query(
        "SELECT secret_value from secrets WHERE secret_name='user_salt'"
    )

    base_password = b64encode(user.password.encode()) + salt.encode()

    if sha256(base_password).hexdigest() == password:
        current_time = int(time.time())
        payload = {
            "iat": current_time,
            "exp": current_time + 3600,
        }

        access_token_secret = single_result_query(
            "SELECT secret_value from secrets WHERE secret_name='access_token_secret'"
        )
        refresh_token_secret = single_result_query(
            "SELECT secret_value from secrets WHERE secret_name='refresh_token_secret'"
        )

        access_token = jwt.encode(payload, access_token_secret, algorithm="HS256")
        refresh_token = jwt.encode(payload, refresh_token_secret, algorithm="HS256")

        # upsert refresh_token
        sql(
            f"""INSERT INTO user (id) VALUES ('{user.email}')
                ON DUPLICATE KEY UPDATE refresh_token='{refresh_token}';
            """
        )

        return access_token, refresh_token
    else:
        return "wrong password"


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port="8080", reload=True)
