import * as React from "react";
import Modal from "@mui/material/Modal";
import { setModalOpen } from "@/redux/LoginModalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IoClose } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function LoginModal() {
  const dispatch = useAppDispatch();
  const modalOpen = useAppSelector((state) => state.LoginModal.modalOpen);
  const [isLogin, setIsLogin] = React.useState(true);
  const [isSignup, setIsSignup] = React.useState(false);

  function handleClose() {
    dispatch(setModalOpen(false));
    LoginModal();
  }

  function SignupModal() {
    setIsLogin(false);
    setIsSignup(true);
  }

  function PasswordResetModal() {
    setIsLogin(false);
    setIsSignup(false);
  }

  function LoginModal() {
    setIsLogin(true);
    setIsSignup(false);
  }

  function ChangeModal() {
    isLogin ? SignupModal() : LoginModal();
  }

  return (
    <div>
      <Modal
        className="flex h-full w-full items-center justify-center"
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <div
          className={`relative flex h-[${
            isLogin ? "523" : isSignup ? "401" : "256"
          }px] w-full max-w-[400px] flex-col items-center rounded-md bg-white px-[32px] pb-[24px] pt-[48px]`}
        >
          <div onClick={handleClose}>
            <IoClose className="absolute right-[1%] top-[2%] cursor-pointer text-4xl transition-all duration-200 hover:opacity-20" />
          </div>
          <h1 className="mb-6 text-xl font-bold">
            {isLogin
              ? "Log in to Summarist"
              : isSignup
              ? "Sign up to Summarist"
              : "Reset your password"}
          </h1>
          {isLogin && (
            <>
              <div className="relative flex h-[40px] w-full cursor-pointer items-center justify-center rounded-md bg-[#3a579d] transition-all duration-200 hover:bg-[#25396b]">
                <IoPersonSharp className="absolute left-5 top-[50%] translate-x-[-50%] translate-y-[-50%] text-3xl text-white" />
                <p className="text-base text-white">Login as a Guest</p>
              </div>
              <div className="before:content['<div></div>'] after:content['<div></div>'] my-4 flex w-full items-center justify-center text-sm font-semibold text-[#394547] before:mr-5 before:h-[1px] before:w-full before:bg-[#bac8ce] after:ml-5 after:h-[1px] after:w-full after:bg-[#bac8ce]">
                or
              </div>
            </>
          )}
          {(isLogin || isSignup) && (
            <>
              <div className="relative flex h-[40px] w-full cursor-pointer items-center justify-center rounded-md bg-[#4285f4] transition-all duration-200 hover:bg-[#3367d6]">
                <img
                  className="absolute left-5 top-[50%] h-[35px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-[6px] text-white"
                  src="google.png"
                  alt=""
                />
                <p className="text-base text-white">
                  {isLogin ? "Login with Google" : "Sign up with Google"}
                </p>
              </div>
              <div className="before:content['<div></div>'] after:content['<div></div>'] my-4 flex w-full items-center justify-center text-sm font-semibold text-[#394547] before:mr-5 before:h-[1px] before:w-full before:bg-[#bac8ce] after:ml-5 after:h-[1px] after:w-full after:bg-[#bac8ce]">
                or
              </div>
            </>
          )}
          <input
            className="mb-4 h-[36px] w-full rounded-md border-[2px] border-[#bac8ce] px-[12px] text-sm text-[#394547] outline-none placeholder:text-[#394547]/70 focus:border-[#2bd97c]"
            type="text"
            placeholder="Email Address"
          />
          {(isLogin || isSignup) && (
            <input
              className="mb-4 h-[36px] w-full rounded-md border-[2px] border-[#bac8ce] px-[12px] text-sm text-[#394547] outline-none placeholder:text-[#394547]/70 focus:border-[#2bd97c]"
              type="password"
              placeholder="Password"
            />
          )}
          <button className="h-[40px] w-full rounded-md bg-[#2bd97c] text-[#032b41] transition-all duration-150 hover:bg-[#20ba68]">
            {isLogin
              ? "Login"
              : isSignup
              ? "Sign up"
              : "Send reset password link"}
          </button>
          <p
            className="m-5 cursor-pointer text-[14px] font-thin text-[#116be9]/80 transition-all duration-150 hover:text-[#124a98]"
            onClick={PasswordResetModal}
          >
            {isLogin && "Forgot your password?"}
          </p>
          <p
            className="absolute bottom-0 flex h-[40px] w-full cursor-pointer items-center justify-center rounded-b-md bg-[#f1f6f4] font-thin text-[#116be9]/80 transition-all duration-150 hover:bg-[#e1e9e8]"
            onClick={ChangeModal}
          >
            {isLogin
              ? "Don't have an account?"
              : isSignup
              ? "Already have an account?"
              : "Go to login"}
          </p>
        </div>
      </Modal>
    </div>
  );
}
