import { FiLock, FiMail, FiPhone } from "react-icons/fi";

//internal  import
import Layout from "@layout/Layout";
import Error from "@components/form/Error";
import useLoginSubmit from "@hooks/useLoginSubmit";
import InputArea from "@components/form/InputArea";
import BottomNavigation from "@components/login/BottomNavigation";
import Link from "next/link";

const Login = () => {
  const { handleSubmit, submitHandler, isOpen, register, errors, loading, isBtnName } =
    useLoginSubmit();

  return (
    <Layout title="Login" description="This is login page">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="py-4 flex flex-col lg:flex-row w-full">
          <div className="w-full sm:p-5 lg:p-8">
            <div className="mx-auto text-left justify-center rounded-md w-full max-w-lg px-4 py-8 sm:p-10 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2x">
              <div className="overflow-hidden mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold ">Login</h2>
                  <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
                    Login with your Mobile Number and OTP
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className="flex flex-col justify-center"
                >
                  <div className="grid grid-cols-1 gap-5">
                    <div className="form-group">
                      <InputArea
                        register={register}
                        label="Phone"
                        name="phone"
                        type="number"
                        placeholder="Phone"
                        Icon={FiPhone}
                        autocomplete="phone"
                      />
                      <Error errorName={errors.phone} />
                    </div>

                    {isOpen && (
                      <div className="form-group">
                        <InputArea
                          register={register}
                          label="otp"
                          name="otp"
                          type="number"
                          placeholder="otp"
                          Icon={FiLock}
                        />

                        <Error errorName={errors.otp} />
                      </div>
                    )}

                    {/* <div className="flex items-center justify-between">
                      <div className="flex ms-auto">
                        <Link
                          href="/auth/forget-password"
                          className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </div> */}
                    {loading ? (
                      <button
                        disabled={loading}
                        type="submit"
                        className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-cyan-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-cyan-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
                      >
                        <img
                          src="/loader/spinner.gif"
                          alt="Loading"
                          width={20}
                          height={10}
                        />
                        <span className=" ml-2 font-light">
                          Processing
                        </span>
                      </button>
                    ) : (
                      <button
                        disabled={loading}
                        type="submit"
                        className="w-full text-center py-3 rounded bg-cyan-500 text-white hover:bg-cyan-600 transition-all focus:outline-none my-1"
                      >
                        {isBtnName}
                      </button>
                    )}
                  </div>
                </form>
                {/* <BottomNavigation
                  or={true}
                  route={"/auth/signup"}
                  pageName={"Sign Up"}
                  loginTitle="Login"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
