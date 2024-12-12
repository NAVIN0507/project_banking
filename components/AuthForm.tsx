'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'


import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Custominput from './Custominput'
import { AuthFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'
import PlaidLink from './PlaidLink'


const AuthForm = ({type} :{type : string} ) => {
    const router = useRouter();
    const [user, setuser] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    
    const formSchema = AuthFormSchema(type);
      const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setisLoading(true);
   try {
//     let PostalCode;
//     function isValidIndianPostalCode(postalCode: string): boolean {
//   const indianPostalCodeRegex = /^[1-9][0-9]{5}$/;
//   return indianPostalCodeRegex.test(postalCode.trim());
// }


    const userData = {
        firstName : data.firstName!,
        lastName : data.lastName!,
        address1 : data.address1!,
        city:data.city!,
        state:data.state!,
        postalCode:data.postalCode!,
        dateOfBirth:data.dateOfBirth!,
       
        ssn:data.ssn!,
        email:data.email,
        password:data.password

    }
    if(type === 'sign-up'){
        const newUser = await signUp(userData);
        setuser(newUser);
    }
    if(type==='sign-in'){
        const response = await signIn({
            email:data.email,
            password:data.password
        })
        if(response) router.push('/');
    }
   } catch (error) {
    console.log(error)
   } finally{
    setisLoading(false);
   }
  }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link href= "/" className=' cursor-pointer flex items-center gap-1 '>
      <Image
      src="/icons/logo.svg"
      width={34}
      height={34}
      alt='HoriZon Logo'
    
      />
      <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
      </Link>  
      <div className='flex flex-col gap-1 md:gap-3'>
        <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
            {user 
            ? 'Link Account' 
            : type === 'sign-in'
            ? 'Sign In'
            :'Sign Up'
        }
        <p className='text-16 font-normal text-gray-600'>
            {user
            ? 'Link your account to get started'
            :'Please enter your details'
            }
        </p>
        </h1>
      </div>
        </header>
        {user ? (
            <div className='flex flex-col gap-4'>
              <PlaidLink user = {user} variant = "primary"/>
            </div>
         ):( 
            <>
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {type==='sign-up' && (
            <>
            <div className='flex gap-4'>
            <Custominput control={form.control} name='firstName' label = "First Name" placeholder='Enter Your first name' />
            <Custominput control={form.control} name='lastName' label = "Last Name" placeholder='Enter Your Last Name' />
            </div>
            <Custominput control={form.control} name='address1' label = "Address" placeholder='Enter Your specific address' />
              <Custominput control={form.control} name='city' label = "City" placeholder='Enter Your City' />
            <div className='flex gap-4'>
            <Custominput control={form.control} name='state' label = "State" placeholder='Example: TN' />
            <Custominput control={form.control} name='postalCode' label = "Postal Code" placeholder='Example : 637410' />
            </div>
            <div className='flex gap-4'>
             <Custominput control={form.control} name='dateOfBirth' label = "Date Of Birth" placeholder='YYYY-MM-DD' />
              <Custominput control={form.control} name='ssn' label = "SSN" placeholder='Example : 1234' />
              </div>
            </>
        )}
        <Custominput control={form.control} name='email' label = "E-Mail" placeholder='Enter Your Email' />
        <Custominput control={form.control} name='password' label = "Password" placeholder='Enter Your Password' />
        <div className='flex flex-col gap-4'>
        <Button type="submit" className='form-btn' disabled={isLoading}>
            {isLoading ? (
                <>
                <Loader2 size={20} className='animate-spin' /> &nbsp; Loading...
                </>
            ) : type ==='sign-in' ? 'Sign In' : 'Sign Up'}

        </Button>
        </div>
      </form>
    </Form> 
    <footer className='flex justify-center gap-1'>
        <p className='text-14 font-normal text-gray-600'>
            {type==='sign-in'?"Don't have an account?" :"Already have an account?"}
        </p>
        <Link  href={type==='sign-in'?'/sign-up':'sign-in'} className='form-link'>
        {type==='sign-in'?'Sign Up' : 'Sign In'}
        </Link>
    </footer>
            </>
        )} 
    </section>
  )
}

export default AuthForm