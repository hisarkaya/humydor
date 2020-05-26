import React from 'react';
import SMUAuth from './SMUAuth';

const SignIn = () => {
    return <SMUAuth 
        header= "Sign in to your account"
        content="Track your Cigar journey"
        footer="Don't you have any account?"
        toggleText="Sign Up"
        buttonText="Continue with"
        source="signin"
         />;
}

export default SignIn;