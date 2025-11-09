import { Home, Search, PlusCircle, User, LogOut, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Home className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              RentNest
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Button
              asChild
              variant={location.pathname === "/search" ? "default" : "ghost"}
              size="sm"
            >
              <Link to="/search" className="gap-2">
                <Search className="h-4 w-4" />
                Search Rooms
              </Link>
            </Button>
            <Button
              asChild
              variant={location.pathname === "/recommendations" ? "default" : "ghost"}
              size="sm"
            >
              <Link to="/recommendations" className="gap-2">
                <Sparkles className="h-4 w-4" />
                AI Recommendations
              </Link>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <Link to="#" className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Post Property
              </Link>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <AuthModal />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
