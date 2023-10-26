import React from 'react'
import {useState} from 'react'
const NavSmallDevive: React.FC=()=>{
    return(
        <div className='flex flex-col gap-2 absolute right-[0%] top-[100%] w-[100%] h-100px] bg-orange-400 px-[4%] py-[4%]'>
<div className="flex  rounded-lg py-2 px-4 justify-around bg-white">
                    <input className='w-[90%] rounded-md outline-0 p-0' type="search" placeholder='Search in Daraz' />
                    <div className='bg-red bg-red-400 px-4 text-center rounded-md'>
                        Search
                    </div>
                </div>


                <div className="flex flex-col  text-white justify-start font-semibold">
                    <div className='flex flex-col gap-2'>
                        
                        <h4 className='flex gap-2'><span>User Icons</span>Login</h4>
                        <h4>Sign UP</h4>
                    </div>
                </div>
        </div>
    )
}



const Navbar: React.FC = () => {
    const[openMenu,setOpenMenu]=useState<boolean>(false)
  return (
    <nav>
        <div className='flex flex-col gap-2 bg-orange-400 pt-1 pb-4 lg:px-[5%] md:px-[2%] px-[4%] relative'>
            <div className='flex flex-row '>
                <ul className='flex flex-row'>
                    <li className='text-white text-sm font-semibold'>Become a Seller</li>
                    <li className='text-white text-sm font-semibold'>Payment & Recharge</li>
                    <li className='text-white text-sm font-semibold'>Help & Support</li>
                </ul>
            </div>

            <div className='flex gap-4 justify-between items-center'>

                <div className='flex gap-4 items-center justify-between md:w-[25%] lg:w-[15%] bg-slate-500'>
                    <h1 className='text-2xl text-white'>Daraz</h1>
                    <h1 className='text-lg font-semibold text-white md:block hidden'>Categories</h1>
                </div>

                <div className="md:flex hidden md:w-[40%] lg:w-[60%] rounded-lg py-2 px-4 justify-around bg-orange-300">
                    <input className='w-[90%] rounded-md outline-0 p-0' type="search" placeholder='Search in Daraz' />
                    <div className='bg-red bg-red-400 px-4 text-center rounded-md'>
                        Icon
                    </div>
                </div>

                <div className="md:flex hidden lg:w-[25%] md:w-[35%] text-white justify-start md:justify-between font-semibold bg-red-400">
                    <div className='flex gap-3'>
                        
                        <h4 className='flex gap-2'><span>User Icons</span>Login</h4>

                        <div>|</div>

                        <h4>Sign UP</h4>
                    </div>

                    <div className='flex justify-between'>
                        <h1>EN</h1>

                        <div className='cartLogo'>
                            Cart 1
                        </div>

                    </div>

                  
                </div>


                <div className='flex md:hidden'>
                   
                    <h1>Cart</h1>

                    <h1 onClick={()=>setOpenMenu(!openMenu)}>Open</h1>
                    {openMenu && <NavSmallDevive />}

                </div>

            </div>
        </div>
    </nav>
  )
}

export default Navbar