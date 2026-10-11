
// "use client";


// import { signUp } from "@/app/lib/auth-client";
// import { date } from "better-auth";
// import Link from "next/link";
// import { useState, type FormEvent } from "react";

// type SignUpForm = {
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// };

// const initialForm: SignUpForm = {
//   name: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
// };

// export default function SignUpFromPage() {
//   const [form, setForm] = useState<SignUpForm>(initialForm);
//   const [message, setMessage] = useState("");

//   const handleChange = (field: keyof SignUpForm, value: string) => {
//       setForm((previous) => ({
//           ...previous,
//           [field]: value,
//         }));
//         setMessage("");
        
//     };
    
//     const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         console.log("Form Data:", form);

//     if (form.password.length < 8) {
//       setMessage("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
//       return;
//     }

//     if (form.password !== form.confirmPassword) {
//       setMessage("দুটি পাসওয়ার্ড মিলছে না।");
//       return;
//     }
//     console.log("Name:", form.name);
//   console.log("Email:", form.email);
//   console.log("Email:", form.password);
    
//     setMessage("ফর্ম সঠিক আছে। এবার API সংযোগ করতে হবে।");
  
    
//     // const {data: resData, error} = await signUp.email({
//     //     name: date.name,
//     //     email: data.email,
//     //     password: data.password
//     // })

//     };

//   const inputClass =
//     "h-[25px] w-full rounded-[6px] border border-[#e3ebe4] bg-transparent px-[8px] text-[9px] text-[#26352b] outline-none transition placeholder:text-[#7b857d] focus:border-[#078b42] focus:ring-1 focus:ring-[#078b42]/15";

//   const labelClass =
//     "mb-[4px] block text-[9px] font-medium text-[#26352b]";


//   return (
//     <main className="flex min-h-screen flex-col items-center bg-[#f1f6f1] px-3 pb-8 pt-[27px] text-[#243027]">
//       {/* Heading */}
//       <header className="mb-[15px] text-center">
//         <h1 className="text-[16px] font-bold leading-[22px] tracking-[-0.5px]">
//           অ্যাকাউন্ট তৈরি করুন
//         </h1>

//         <p className="mt-[2px] text-[8px] leading-[13px] text-[#7b857d]">
//           নিচে সহজ তথ্য প্রদান করে নতুন অ্যাকাউন্ট তৈরি করুন।
//         </p>
//       </header>

//       {/* Registration Card */}
//       <section className="w-full max-w-[250px] rounded-[10px] border border-[#e3ebe4] bg-[#ffffff]/80 px-[14px] pb-[15px] pt-[14px]">
//         <form onSubmit={handleSubmit} className="space-y-[10px]">
//           {/* Name */}
//           <div>
//             <label htmlFor="name" className={labelClass}>
//               নাম
//             </label>

//             <input
//               id="name"
//               name="name"
//               type="text"
//               autoComplete="name"
//               placeholder="Your Name"
//               value={form.name}
//               onChange={(event) =>
//                 handleChange("name", event.target.value)
//               }
//               className={inputClass}
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label htmlFor="email" className={labelClass}>
//               ইমেইল
//             </label>

//             <input
//               id="email"
//               name="email"
//               type="email"
//               autoComplete="email"
//               placeholder="you@example.com"
//               value={form.email}
//               onChange={(event) =>
//                 handleChange("email", event.target.value)
//               }
//               className={inputClass}
//               required
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label htmlFor="password" className={labelClass}>
//               পাসওয়ার্ড
//             </label>

//             <input
//               id="password"
//               name="password"
//               type="password"
//               autoComplete="new-password"
//               placeholder="কমপক্ষে ৮ অক্ষর"
//               value={form.password}
//               onChange={(event) =>
//                 handleChange("password", event.target.value)
//               }
//               className={inputClass}
//               minLength={8}
//               required
//             />
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label htmlFor="confirmPassword" className={labelClass}>
//               পাসওয়ার্ড নিশ্চিত করুন
//             </label>

//             <input
//               id="confirmPassword"
//               name="confirmPassword"
//               type="password"
//               autoComplete="new-password"
//               placeholder="আবার লিখুন"
//               value={form.confirmPassword}
//               onChange={(event) =>
//                 handleChange("confirmPassword", event.target.value)
//               }
//               className={inputClass}
//               required
//             />
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="h-[26px] w-full rounded-[5px] bg-[#078b42] text-[9px] font-semibold text-white shadow-[0_2px_3px_rgba(0,0,0,0.18)] transition hover:bg-[#067638] active:scale-[0.99]"
//           >
//             অ্যাকাউন্ট তৈরি করুন
//           </button>

//           {message && (
//             <p
//               role="status"
//               className="text-center text-[9px] leading-4 text-[#078b42]"
//             >
//               {message}
//             </p>
//           )}
//         </form>

//         {/* Divider */}
//         <div className="my-[10px] flex items-center gap-2">
//           <span className="h-px flex-1 bg-[#e5eae5]" />
//           <span className="text-[8px] text-[#6f7971]">অথবা</span>
//           <span className="h-px flex-1 bg-[#e5eae5]" />
//         </div>

//         {/* Social Buttons */}
//         <div className="grid grid-cols-2 gap-[6px]">
//           <button
//             type="button"
//             onClick={() =>
//               setMessage("Google লগইনের জন্য OAuth সংযোগ করতে হবে।")
//             }
//             className="flex h-[25px] items-center justify-center gap-[4px] whitespace-nowrap rounded-[6px] border border-[#e3e9e3] bg-transparent px-1 text-[8px] font-medium text-[#28352c] transition hover:bg-[#f5f8f5]"
//           >
//             <svg
//               viewBox="0 0 48 48"
//               aria-hidden="true"
//               className="h-[10px] w-[10px] shrink-0"
//             >
//               <path
//                 fill="#4285F4"
//                 d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
//               />
//               <path
//                 fill="#34A853"
//                 d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
//               />
//               <path
//                 fill="#FBBC05"
//                 d="M12.6 27.7a12 12 0 0 1 0-7.4V15H5.8a20 20 0 0 0 0 18Z"
//               />
//               <path
//                 fill="#EA4335"
//                 d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6.1 29.5 4 24 4A20 20 0 0 0 5.8 15l6.8 5.3c1.6-4.8 6.1-8.2 11.4-8.2Z"
//               />
//             </svg>
//             Google দিয়ে চালিয়ে যান
//           </button>

//           <button
//             type="button"
//             onClick={() =>
//               setMessage("GitHub লগইনের জন্য OAuth সংযোগ করতে হবে।")
//             }
//             className="flex h-[25px] items-center justify-center gap-[4px] whitespace-nowrap rounded-[6px] border border-[#e3e9e3] bg-transparent px-1 text-[8px] font-medium text-[#28352c] transition hover:bg-[#f5f8f5]"
//           >
//             <svg
//               viewBox="0 0 24 24"
//               fill="currentColor"
//               aria-hidden="true"
//               className="h-[10px] w-[10px] shrink-0"
//             >
//               <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.3.8-.6v-2.1c-3.4.7-4.1-1.4-4.1-1.4-.5-1.3-1.2-1.6-1.2-1.6-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-6.1 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.8-5.5 6.1.4.4.8 1 .8 2v3c0 .3.2.7.8.6A11.1 11.1 0 0 0 12 .9Z" />
//             </svg>
//             GitHub দিয়ে চালিয়ে যান
//           </button>
//         </div>

//         {/* Sign In Link */}
//         <p className="mt-[10px] text-center text-[8px] text-[#778078]">
//           অ্যাকাউন্ট আছে?{" "}
//           <Link
//             href="/sign-in"
//             className="font-medium text-[#078b42] hover:underline"
//           >
//             সাইন ইন করুন
//           </Link>
//         </p>
//       </section>

//       {/* Footer */}
//       <footer className="mt-[14px] text-center text-[8px] text-[#89928a]">
//         — নিরাপদ ডিজিটাল জীবন —
//       </footer>
//     </main>
//   );
// }

"use client";

import { signUp } from "@/app/lib/auth-client";
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

    return (
        <div>
            <h1>Bangladeah</h1>
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
        </div>
    );
};

export default SignUpFromPage;