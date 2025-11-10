import { Home, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">RentNest</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Find Your Space, Live Your Story
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/search" className="hover:text-primary transition-colors">Search Rooms</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Post Property</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Cities</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Delhi</li>
              <li>Chandigarh</li>
              <li>Haryana</li>
              <li className="text-primary">More coming soon...</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                hello@rentnest.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Delhi, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} RentNest. All rights reserved. Made with ❤️ for everyone seeking a home.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
