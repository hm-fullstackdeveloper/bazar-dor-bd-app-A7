
"use client";

import { signIn, signUp } from "@/app/lib/auth-client";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";



const SignUpFromPage = () => {
    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // const data: Record<string, string> =  Object.fromEntries(formData.entries())
    const data: Record<string, FormDataEntryValue> =  Object.fromEntries(formData.entries());

    console.log('data from data', data)
    const {data: resData, error} = await signUp.email({
        name: data.name as string,
        email: data.email as string,
        password: data.password as string
    })
    console.log('Full Data Messege',resData,error)
    // alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
  };
    const handelGoogleSign = async() => {
      const resData = await signIn.social({
        provider: 'google',

      })
      console.log('Data Analaisis google',resData)
    }

    const handelGithubSign = async() => {
      const restData = await signIn.social({
        provider: 'github',

      })
      console.log('Data Analaisis github',restData)
    }
    return (
        <div>
            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label>Name</Label>
            <Input placeholder="Your Name" />
            <FieldError />
          </TextField>
         
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="Your Email" />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button type="submit">
          {/* <Check /> */}
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
    <p><br/>
    <Button  onClick={handelGoogleSign}>

    Sign In With Google
    </Button> Or
    <Button onClick={handelGithubSign}>

    Sign In With Github
    </Button>
    </p>
        </div>
    );
};

export default SignUpFromPage;