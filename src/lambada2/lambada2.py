import json
import os
from typing import Dict

import requests


def handler(event: Dict, context: Dict):
    print(context)
    print(event)
    print(os.environ["ENV_VAL"])
    url = "http://mb:4572/test"
    result = requests.get(url)
    print(result)
    print(result.json())
    return {
        "statusCode": 200,
        "body": json.dumps(
            {
                "message": "🕺🏼🕺🏼🕺🏼",
                "env_val": os.environ["ENV_VAL"]
            }
        ),
    }
