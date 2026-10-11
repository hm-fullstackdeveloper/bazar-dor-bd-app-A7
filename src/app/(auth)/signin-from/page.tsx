
// import Link from "next/link";

// export default function SignInPage() {
//   return (
//     <main className="min-h-screen bg-[#f1f6f2] px-4 pt-[29px] text-[#29332d]">
//       <div className="mx-auto w-full max-w-[334px]">
//         {/* Page heading */}
//         <header className="mb-[19px] text-center">
//           <h1 className="text-[20px] font-bold leading-[29px]">
//             সাইন ইন
//           </h1>

//           <p className="mt-[3px] text-[11px] leading-[17px] text-[#78817b]">
//             বিস্তারিত দাম, বাজার তুলনা ও অফার পেতে অ্যাকাউন্টে ঢুকুন
//           </p>
//         </header>

//         {/* Sign in card */}
//         <section className="rounded-[13px] border border-[#e0e8e1] bg-[#fbfdfb] px-[19px] pb-[20px] pt-[19px]">
//           <form className="space-y-[12px]">
//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="mb-[4px] block text-[12px] font-medium"
//               >
//                 ইমেইল
//               </label>

//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="you@example.com"
//                 autoComplete="email"
//                 required
//                 className="h-[33px] w-full rounded-[7px] border border-[#e2e9e3] bg-transparent px-[10px] text-[11px] outline-none transition focus:border-[#07883f]"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="mb-[4px] block text-[12px] font-medium"
//               >
//                 পাসওয়ার্ড
//               </label>

//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="কমপক্ষে ৮ অক্ষর"
//                 autoComplete="current-password"
//                 required
//                 className="h-[33px] w-full rounded-[7px] border border-[#e2e9e3] bg-transparent px-[10px] text-[11px] outline-none transition focus:border-[#07883f]"
//               />
//             </div>

//             {/* Sign in button */}
//             <button
//               type="submit"
//               className="h-[34px] w-full rounded-[7px] bg-[#07883f] text-[12px] font-semibold text-white shadow-[0_3px_3px_rgba(0,0,0,0.20)] transition hover:bg-[#067636] active:translate-y-px"
//             >
//               সাইন ইন
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="my-[12px] flex items-center gap-[12px]">
//             <span className="h-px flex-1 bg-[#dfe5e0]" />

//             <span className="shrink-0 text-[11px] text-[#68716b]">
//               অথবা
//             </span>

//             <span className="h-px flex-1 bg-[#dfe5e0]" />
//           </div>

//           {/* Social sign in */}
//           <div className="grid grid-cols-2 gap-[6px]">
//             <button
//               type="button"
//               className="flex h-[33px] items-center justify-center gap-[5px] whitespace-nowrap rounded-[7px] border border-[#e2e9e3] text-[10px] font-semibold transition hover:bg-[#f1f6f2]"
//             >
//               <span className="text-[14px] font-bold text-[#4285f4]">
//                 G
//               </span>
//               Google দিয়ে চালিয়ে যান
//             </button>

//             <button
//               type="button"
//               className="flex h-[33px] items-center justify-center gap-[5px] whitespace-nowrap rounded-[7px] border border-[#e2e9e3] text-[10px] font-semibold transition hover:bg-[#f1f6f2]"
//             >
//               <svg
//                 viewBox="0 0 24 24"
//                 width="13"
//                 height="13"
//                 fill="currentColor"
//                 aria-hidden="true"
//               >
//                 <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.12.08 1.7 1.15 1.7 1.15 1 .1.77 2.1 3.16 1.6.1-.72.4-1.2.7-1.48-2.48-.28-5.1-1.24-5.1-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.1-2.96 0 0 .94-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.6 1.54.22 2.68.1 2.96.72.78 1.15 1.78 1.15 3 0 4.3-2.62 5.24-5.12 5.52.4.34.75 1 .75 2.03v3.01c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
//               </svg>

//               GitHub দিয়ে চালিয়ে যান
//             </button>
//           </div>

//           {/* Create account */}
//           <p className="mt-[13px] text-center text-[11px]">
//             অ্যাকাউন্ট নেই?{" "}
//             <Link
//               href="/sign-up"
//               className="font-medium text-[#07883f] hover:underline"
//             >
//               সাইন আপ করুন
//             </Link>
//           </p>
//         </section>

//         {/* Back to home */}
//         <div className="mt-[18px] text-center">
//           <Link
//             href="/"
//             className="text-[11px] text-[#818b84] transition hover:text-[#07883f]"
//           >
//             ← হোম পেজে ফিরে যান
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// }



"use client";

import { signIn, signUp } from "@/app/lib/auth-client";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";


const SignInFromPage = () => {
    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // const data: Record<string, string> =  Object.fromEntries(formData.entries())
    const data: Record<string, FormDataEntryValue> =  Object.fromEntries(formData.entries());

    console.log('data from data', data)
    const {data: resData, error} = await signIn.email({
       
        email: data.email as string,
        password: data.password as string,
        rememberMe: true,
        callbackURL: "/"
    })
    console.log('Full Data Messege',resData,error)
    // alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
  };

    return (
        <div>
           
            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
 
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

export default SignInFromPage;