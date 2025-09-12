import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  LogIn, 
  LogOut, 
  User, 
  Settings, 
  Heart, 
  Package, 
  Users,
  Briefcase,
  Shield
} from "lucide-react";

export function UserNav() {
  const { user, profile, signOut, isClient, isProfessional, isAdmin } = useAuth();

  if (!user || !profile) {
    return (
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/auth">
            <LogIn className="h-4 w-4 mr-2" />
            Login
          </Link>
        </Button>
        <Button size="sm" className="bg-gradient-primary hover:shadow-elegant" asChild>
          <Link to="/auth">Sign Up</Link>
        </Button>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleIcon = () => {
    if (isAdmin) return <Shield className="h-3 w-3" />;
    if (isProfessional) return <Briefcase className="h-3 w-3" />;
    return <Users className="h-3 w-3" />;
  };

  const getRoleColor = () => {
    if (isAdmin) return "bg-red-100 text-red-800";
    if (isProfessional) return "bg-blue-100 text-blue-800";
    return "bg-green-100 text-green-800";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile.avatar_url || ""} alt={profile.name} />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground">
              {getInitials(profile.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{profile.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            <Badge variant="secondary" className={`text-xs w-fit mt-1 ${getRoleColor()}`}>
              <div className="flex items-center space-x-1">
                {getRoleIcon()}
                <span className="capitalize">{profile.role}</span>
              </div>
            </Badge>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        
        {isClient && (
          <DropdownMenuItem asChild>
            <Link to="/wishlist" className="cursor-pointer">
              <Heart className="mr-2 h-4 w-4" />
              <span>Wishlist</span>
            </Link>
          </DropdownMenuItem>
        )}
        
        {isProfessional && (
          <DropdownMenuItem asChild>
            <Link to="/dashboard" className="cursor-pointer">
              <Package className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem asChild>
          <Link to="/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}