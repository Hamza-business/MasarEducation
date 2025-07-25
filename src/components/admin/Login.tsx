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
      <Card className="w-full max-w-sm shadow-lg">
        <CardContent className="space-y-4 py-6">
          <h1 className="text-xl font-semibold text-center">{type} Manager Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                type=""
                placeholder="manager@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}