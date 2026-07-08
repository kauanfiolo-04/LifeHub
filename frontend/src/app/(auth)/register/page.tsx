import OAuthButtons from "@/components/auth/oauth-buttons";
import RegisterForm from "@/components/auth/register-form";
import { Separator } from "@/components/ui/separator";

export default function RegisterPage() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col items-center justify-center gap-4 w-full md:w-2/5 px-6 py-10">
        <h1 className="text-2xl font-bold">Register</h1>
        <p className="text-muted-foreground">
          Welcome to your <b>LifeHub</b>
        </p>

        <div className="flex flex-col w-full md:w-4/5 gap-4">
          <RegisterForm />
        
          <div className="flex items-center max-w-full gap-2">
            <Separator className="flex-1" orientation="horizontal" />

            <span>Or sign up with</span>

            <Separator className="flex-1" orientation="horizontal" />
          </div>

          <OAuthButtons />
        </div>
      </div>

      {/* Image Wrapper */}
      <div className="hidden md:block w-3/5">
        Imagem
      </div>
    </div>
  );
}