import React, { useState, FormEvent } from "react";
import { AuthsignInWithEmailAndPassword,  createUserDocumentFromAuth, signInWithGooglePopup } from "../../firebase/firebase";
import { AuthError, AuthErrorCodes } from "firebase/auth";
//123456@
interface LoginState {
  
  email:string,
  password: string;
  
}

const initialLoginState: LoginState = {
  email:"",
  password: "",
};

const LoginForm: React.FC = () => {
    const signUPWithGoogle=async():Promise<void>=>{
        try {
         const {user}= await signInWithGooglePopup()
         const ref=await createUserDocumentFromAuth(user)
         console.log("Ref",ref)
         console.log(user)
         alert("Login Successful")
        } catch (error) {
         alert("Login UnSuccessful")
         console.log("Login UnSuccessful:",error)
        }
       }


  const [formData, setFormData] = useState<LoginState>(
    initialLoginState
  );
const{email,password}=formData;
  const handleInputChange =async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });   
  };

  const loginHaldler =async (e: FormEvent) => {
    e.preventDefault();
    console.log("formData", formData); // You can handle the form data submission here
    setFormData(initialLoginState); // Reset the form after submission

    try {
        const user=await AuthsignInWithEmailAndPassword(email,password)
        console.log("Login:",user)

    } catch (error) {
        switch ((error as AuthError).code) {
            case AuthErrorCodes.INVALID_PASSWORD:
              alert("incorrect password for email");
              break;
            case AuthErrorCodes.INVALID_EMAIL:
              alert("no user associated with this email");
              break;
            default:
              console.log(error);
          }
    }
   
  };

  return (
    <div className="flex bg-slate-400 flex-col gap-3 items-center  px-[4%]">
      <div className="lg:w-[60%] md:w-[80%] w-[100%] flex-col gap-4">
        <h1 className="text-2xl font-bold md:text-start text-center py-4">Create your Daraz Account</h1>
        <div className="flex md:flex-row flex-col gap-3 justify-center items-center m-auto">
          <form
            onSubmit={loginHaldler}
            className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md md:w-[45%] w-[100%]"
          >
           

            
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
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Login
            </button>
          </form>

          <h1 className="text-xl font-bold">OR</h1>

          <div className="flex flex-col gap-2 max-w-md mx-auto p-6 bg-white rounded-md shadow-md md:w-[45%] w-[100%]">
            <h1 className="text-xl font-bold">Login With</h1>
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

export default LoginForm;
