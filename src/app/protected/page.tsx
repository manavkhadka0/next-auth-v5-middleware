import { auth } from "@/auth";
import { logout } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import TodoForm from "@/components/todo-form";

const Protected = async () => {
  const session = await auth();

  return (
    <>
      <form
        action={logout}
        className="flex  container flex-row justify-between items-center gap-10"
      >
        <div>
          <p className="text-white">{session?.user?.name}</p>
          <p className="text-white">{session?.user?.email}</p>
        </div>
        <Button type="submit" className="w-40" variant="secondary">
          logout
        </Button>
      </form>
      <div className="container h-screen items-center justify-center py-9">
        <TodoForm />
      </div>
    </>
  );
};

export default Protected;
