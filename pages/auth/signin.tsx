import React from "react";
import FormSignIn from "../../components/form/signIn";
import { getProviders, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";
interface IProviders {
  id: string;
  name: string;
}
interface SignInProps {
  providers: IProviders[];
}
const SignInPage = ({ providers }: SignInProps) => {
  const handleSubmit = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): void => {
    signIn("credentials", { email, password });
    // console.log(email, password);
  };
  console.log(providers);
  return (
    <div>
      {/* {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))} */}
      <FormSignIn onSubmit={handleSubmit} />
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
export default SignInPage;
