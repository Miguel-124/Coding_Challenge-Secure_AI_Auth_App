from fastapi import HTTPException
from clerk_backend_api import Clerk, AutheticateRequestOptions
import os
from dotenv import load_dotenv

load_dotenv()

clerk_sdk = Clerk(bearer_auth=os.getenv("CLERK_SECRET_KEY"))

def authenticate_and_get_user_details(request):
    """
    Authenticate the user using Clerk and return user details.
    """
    try:
        request_state = clerk_sdk.authenticate_request(
            request,
            AutheticateRequestOptions(
                authorized_parties=["*"],
                jwt_key=os.getenv("JWT_KEY"),
            )
        )
        if not request_state:
            raise HTTPException(status_code=401, detail="Unauthorized")

        user_id = request_state.payload.get("sub")
        return {"user_id": user_id}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))