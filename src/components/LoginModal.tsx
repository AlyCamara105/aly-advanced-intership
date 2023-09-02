import * as React from "react";
import Modal from "@mui/material/Modal";
import { setModalOpen } from "@/redux/LoginModalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IoClose } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";
import emailjs from "@emailjs/browser";
import { auth } from "@/../firebase";

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
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firebaseError, setFirebaseError] = React.useState("");
  const [passwordResetLinkSent, setPasswordResetLinkSent] =
    React.useState(false);
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const guestEmail = "guest@gmail.com";
  const guestPassword = "guest123";

  function handleClose(): void {
    dispatch(setModalOpen(false));
    LoginModal();
    setEmail("");
    setPassword("");
    setFirebaseError("");
    setPasswordResetLinkSent(false);
  }

  function SignupModal(): void {
    setIsLogin(false);
    setIsSignup(true);
  }

  function PasswordResetModal(): void {
    setIsLogin(false);
    setIsSignup(false);
  }

  function LoginModal(): void {
    setIsLogin(true);
    setIsSignup(false);
  }

  function ChangeModal(): void {
    isLogin ? SignupModal() : LoginModal();
    setFirebaseError("");
    setPasswordResetLinkSent(false);
  }

  async function Signup(): Promise<void> {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        router.push("/for-you");
      })
      .catch((error) => {
        setFirebaseError(error.message);
      });
  }

  async function Login(): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        router.push("/for-you");
      })
      .catch((error) => {
        setFirebaseError(error.message);
      });
  }

  async function GuestLogin(): Promise<void> {
    await signInWithEmailAndPassword(auth, guestEmail, guestPassword)
      .then((userCredentials) => {
        router.push("/for-you");
      })
      .catch((error) => {
        setFirebaseError(error.message);
      });
  }

  async function GoogleLogin(): Promise<void> {
    await signInWithPopup(auth, provider)
      .then((result) => {
        router.push("/for-you");
      })
      .catch((error) => {
        setFirebaseError(error.message);
      });
  }

  async function ResetPassword(): Promise<void> {
    await sendPasswordResetEmail(auth, email)
      .then((result) => {
        emailjs.send(
          "service_3szihua",
          "template_o8jdiyt",
          { to_email: email },
          "yiI1xLsErg1b4Rcpi",
        );
        setFirebaseError("Your reset email has been sent!");
        setPasswordResetLinkSent(true);
      })
      .catch((error) => {
        setFirebaseError(error.message);
        setPasswordResetLinkSent(false);
      });
  }

  function Submit(): void {
    isLogin ? Login() : isSignup ? Signup() : ResetPassword();
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
              <button
                className="relative flex h-[40px] w-full cursor-pointer items-center justify-center rounded-md bg-[#3a579d] transition-all duration-200 hover:bg-[#25396b]"
                onClick={GuestLogin}
              >
                <IoPersonSharp className="absolute left-5 top-[50%] translate-x-[-50%] translate-y-[-50%] text-3xl text-white" />
                <p className="text-base text-white">Login as a Guest</p>
              </button>
              <div className="before:content['<div></div>'] after:content['<div></div>'] my-4 flex w-full items-center justify-center text-sm font-semibold text-[#394547] before:mr-5 before:h-[1px] before:w-full before:bg-[#bac8ce] after:ml-5 after:h-[1px] after:w-full after:bg-[#bac8ce]">
                or
              </div>
            </>
          )}
          {(isLogin || isSignup) && (
            <>
              <button
                className="relative flex h-[40px] w-full cursor-pointer items-center justify-center rounded-md bg-[#4285f4] transition-all duration-200 hover:bg-[#3367d6]"
                onClick={GoogleLogin}
              >
                <img
                  className="absolute left-5 top-[50%] h-[35px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-[6px] text-white"
                  src="google.png"
                  alt=""
                />
                <p className="text-base text-white">
                  {isLogin ? "Login with Google" : "Sign up with Google"}
                </p>
              </button>
              <div className="before:content['<div></div>'] after:content['<div></div>'] mt-4 flex w-full items-center justify-center text-sm font-semibold text-[#394547] before:mr-5 before:h-[1px] before:w-full before:bg-[#bac8ce] after:ml-5 after:h-[1px] after:w-full after:bg-[#bac8ce]">
                or
              </div>
            </>
          )}
          {firebaseError || passwordResetLinkSent ? (
            passwordResetLinkSent ? (
              <h1 className={"mb-2 flex w-full items-center text-[#2bd97c]"}>
                {firebaseError}
              </h1>
            ) : (
              <h1 className={"mb-2 flex w-full items-center text-[#f56c6c]"}>
                {firebaseError}
              </h1>
            )
          ) : (
            <div className="h-4"></div>
          )}
          <input
            className="mb-4 h-[36px] w-full rounded-md border-[2px] border-[#bac8ce] px-[12px] text-sm text-[#394547] outline-none placeholder:text-[#394547]/70 focus:border-[#2bd97c]"
            type="text"
            placeholder="Email Address"
            onChange={(event) => setEmail(event.target.value)}
          />
          {(isLogin || isSignup) && (
            <input
              className="mb-4 h-[36px] w-full rounded-md border-[2px] border-[#bac8ce] px-[12px] text-sm text-[#394547] outline-none placeholder:text-[#394547]/70 focus:border-[#2bd97c]"
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          )}
          <button
            className="h-[40px] w-full rounded-md bg-[#2bd97c] text-[#032b41] transition-all duration-150 hover:bg-[#20ba68]"
            onClick={Submit}
          >
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
