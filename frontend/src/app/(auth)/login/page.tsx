import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col items-center justify-start gap-4 w-full md:w-2/5 px-6 py-10">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-muted-foreground">
          Welcome to your <b>LifeHub</b>
        </p>
        
        <LoginForm />
      </div>

      {/* Image Wrapper */}
      <div className="hidden md:block w-3/5">
        Imagem
      </div>
    </div>
  );
}