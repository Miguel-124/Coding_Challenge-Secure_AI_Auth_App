import "react"
import {SignIn, SignUp, SignedIn, SignedOut} from "@clerk/clerk-react";

export default function AuthenticatorPage() {
    return <div className="auth-container">
        <SignedOut>
            <h1>Please sign in or sign up</h1>
            <SignIn path="/sign-in" routing="path" />
            <SignUp path="/sign-up" routing="path" />
        </SignedOut>
        <SignedIn>
            <div className="redirect-message">
                <p>You are already signed in.</p>
            </div>
        </SignedIn>
    </div>
}
