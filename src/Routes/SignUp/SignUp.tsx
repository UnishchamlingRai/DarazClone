import React, { useState, FormEvent } from "react";
import { createUserAuthWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from "../../firebase/firebase";
//123456@
interface SignUpFormState {
  displayName: string;
  phoneNumber: string;
  email:string,
  password: string;
  checkPassword: string;
  birthday: string;
  gender: string;
}

const initialSignUpFormState: SignUpFormState = {
  displayName: "",
  phoneNumber: "",
  email:"",
  password: "",
  checkPassword: "",
  birthday: "",
  gender: "",
};

const SignUpForm: React.FC = () => {


  const signUPWithGoogle=async():Promise<void>=>{
   try {
    const {user}= await signInWithGooglePopup()
    const ref=await createUserDocumentFromAuth(user)
    console.log("Ref",ref)
    console.log(user)
    alert("signUp Successful")
   } catch (error) {
    alert("signUp UnSuccessful")
    console.log("signUp UnSuccessful:",error)
   }
  }

  const [formData, setFormData] = useState<SignUpFormState>(
    initialSignUpFormState
  );
const{displayName,phoneNumber,email,password,checkPassword,birthday,gender}=formData;
  const handleInputChange =async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });   
  };

  const onClickSignUpHandler =async (e: FormEvent) => {
    e.preventDefault();
    console.log("formData", formData); // You can handle the form data submission here
    setFormData(initialSignUpFormState); // Reset the form after submission
    if(password!==checkPassword){
      alert("Password is not match")
      return;
    }

   try {
    const userRef=await createUserAuthWithEmailAndPassword(email,password)
   if(userRef){
    const ref=await createUserDocumentFromAuth(userRef.user,{displayName,phoneNumber,birthday,gender})
    console.log("Email:ref",ref)
   }
   
   } catch (error) {
    console.log(error)
    
   }
  };

  return (
    <div className="flex bg-slate-400 flex-col gap-3 items-center  px-[4%]">
      <div className="lg:w-[60%] md:w-[80%] w-[100%] flex-col gap-4">
        <h1 className="text-2xl font-bold md:text-start text-center py-4">Create your Daraz Account</h1>
        <div className="flex md:flex-row flex-col gap-3 justify-center items-center m-auto">
          <form
            onSubmit={onClickSignUpHandler}
            className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md md:w-[45%] w-[100%]"
          >
            <input
              type="text"
              required
              name="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full mb-4 p-2 rounded-md border border-gray-300"
            />

            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="w-full mb-4 p-2 rounded-md border border-gray-300"
            />

            
<input
              type="email"
              required
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="w-full mb-4 p-2 rounded-md border border-gray-300"
            />

            <input
              type="password"
              required
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full mb-4 p-2 rounded-md border border-gray-300"
            />
            <input
              type="password"
              required
              name="checkPassword"
              value={formData.checkPassword}
              onChange={handleInputChange}
              placeholder="Check Password"
              className="w-full mb-4 p-2 rounded-md border border-gray-300"
            />
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 rounded-md border border-gray-300"
            />
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              placeholder="Gender"
              className="w-full mb-4 p-2 rounded-md border border-gray-300"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
            >
              SignUp
            </button>
          </form>

          <h1 className="text-xl font-bold">OR</h1>

          <div className="flex flex-col gap-2 max-w-md mx-auto p-6 bg-white rounded-md shadow-md md:w-[45%] w-[100%]">
            <h1 className="text-xl font-bold">Sign With</h1>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
              
            >
              FaceBook
            </button>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
              onClick={signUPWithGoogle}
            >
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
