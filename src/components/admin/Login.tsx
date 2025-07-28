import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";


export default function Login(
    {email, setEmail, password, setPassword, error, handleSubmit, type}:
    {email:string, setEmail: (email:string)=>void, password:string, setPassword: (pass:string)=>void, error:string, handleSubmit: (e: React.FormEvent)=>void, type:string}
) {
      return (
    <div className="flex items-center justify-center" style={{height: "calc(100vh - 50px)"}}>
      <Card className="w-full max-w-lg shadow-lg rounded-sm">
        <CardContent className="space-y-4 py-1">
          <h1 className="text-xl font-semibold text-center">{type} Manager Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-5">
                <Label className="mb-2">Email</Label>
                <div className="flex items-center">
                      <Input
                        className="flex-1 rounded-sm rounded-tr-none rounded-br-none"
                        placeholder="e.g., apple"
                        value={email.replace(".agent", "").replace("@masartr.com", "")}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <span className="bg-muted px-1 sm:px-3 py-2 text-xs sm:text-sm rounded-sm rounded-tl-none rounded-bl-none">{type == "Agent" ? ".agent" : ""}@masartr.com</span>
                </div>
            </div>

            <div className="mb-5">
              <Label className="mb-2">Password</Label>
              <Input
                type="password"
                placeholder="Agent password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <Button type="submit" className="w-full rounded-sm">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}