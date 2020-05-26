import React from 'react';
import SMUAuth from './SMUAuth';

const SignUp = () => {
    return <SMUAuth
        header="Create new account"
        footer="Already have an account?"
        content="It is free and hardly takes more than 20 seconds."
        toggleText="Sign In"
        buttonText="Sign up with"
        source="signup"
    />;
}

export default SignUp;