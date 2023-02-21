import {useEffect, useState} from 'react';
import { Formik, Form, useField } from 'formik';
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import './output.css';
import axios from 'axios';
document.body.style.backgroundColor="#FFFFFF"
const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="mt-4 text-sm" htmlFor={props.name}>{label}</label>
          <input {...field} {...props} style={{borderWidth: "1.5px"}} className="w-full mt-1 border-great-blue-1 p-3 text-slate-500 border-2 border-solid drop-shadow-lg focus:outline-none rounded-2xl h-10 mb-5 mb-0 text-sm"/>
     {meta.touched && meta.error ? (
          <p className="text-m ml-1 font-base text-red-600 w-full">{meta.error}</p>
      ) : null}
    </>
  );
};
const Register =  () => {
    const [test,setTest] = useState([]);
   // const [to,setTo] = useState('/register/signup');
        
       const navigate = useNavigate();
   
   /*let result = await fetch('/register/userlist',{
        method: 'post'
    })
   let response = await result.json();*/
   //response.push(null);
   useEffect(function (){ fetch('/register/userlist',{
       method: "post"
   }).then(response => response.json()).then(data => setTest(data))
   },[])
  return (
    <>
        <div className="rounded-br-4xl pt-7 pl-5 h-28 shadow-xl">
        <h3 className="text-xl text-great-blue-10 capitalize">New account</h3>
        <p className="text-slate-900 text-md">
            Sign up and get started 
        </p>
    </div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          pass: '', // added for our select
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .min(4, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .min(4, 'Must be 20 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
          .notOneOf([...test,null], "Email exists")
            .required('Required'),
          pass: Yup.string()
	    .min(6, 'Must be 6 characters or greater')
	 //   .notOneOf([...test,null],'Error etc')
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting}, ...rest) => {
          axios({url:'http://localhost:8000/userlist/signup',
           method: 'post',
           data: values
          });
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
         
        }}
      >{({isSubmitting}) => (
        <Form className="mt-10 px-9" action="/signup" method="post" encType="multipart/form-data">
          <MyTextInput
            label="Email"
            name="email"
            type="mail"
            placeholder="Enter your mail"
          />
	<div className="mt-4 mb-4 flex">
          <div className="mr-3">
          <MyTextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="First Name"
          />
         </div>
         <div>
	  <MyTextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Last Name"
          />
          </div>
          </div>
          <MyTextInput
            label="Enter your password"
            name="pass"
            type="password"
            placeholder="Enter your password"
          />
 <button type="submit" style={{borderWidth: "1.5px"}} className="mt-5 text-white rounded-2xl h-9 w-full bg-gradient-to-r from-great-blue-50 to-great-blue-100 hover:bg-slate-200 hover:from-slate-200 hover:to-slate-200 hover:text-slate-500 hover:border-solid hover:border-2 hover:border-great-blue-100" disabled={isSubmitting}>Sign Up</button>
        </Form>
      )}
      </Formik>
          <hr className="w-1/2 mx-auto mt-5"/>    
    <div className="px-10">
          <button onClick={()=>{navigate('/register/login')}} style={{borderWidth: "1.5px"}} className="hover:bg-gradient-to-r hover:from-great-blue-50 hover:border-slate-200 hover:to-great-blue-100 text-great-blue-100 bg-slate-200 hover:text-white rounded-2xl mt-3 h-9 w-full border-solid border-2 border-great-blue-100 mb-13">Sign In</button>
</div>
    </>
  );
}
export default Register
