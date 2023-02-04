import os
from typing import Optional, List

import psycopg2
from dotenv import load_dotenv

load_dotenv()

user = os.environ.get("DATABASE_USER")
db = os.environ.get("DATABASE_NAME")
endpoint = os.environ.get("DATABASE_ENDPOINT")
password = os.environ.get("DATABASE_PASSWORD")

conn = psycopg2.connect(
    host=endpoint,
    user=user,
    password=password,
    dbname=db,
)


def single_result_query(query: str):
    result = sql(query)

    if not result:
        return []

    return sql(query)[0][0]


def sql(query: str) -> Optional[List[tuple]]:
    with conn.cursor() as cur:
        cur.execute(query)
        conn.commit()
        return cur.fetchall()


if __name__ == "__main__":
    print(sql("SELECT id FROM user"))
