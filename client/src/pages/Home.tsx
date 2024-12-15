import { ArrowRight, ShoppingBag, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="space-y-16 py-8">
     {/* Hero Section */}
<section className="relative bg-emerald-700 text-white py-16" style={{ backgroundImage: 'url(https://southeastasiaglobe.com/wp-content/uploads/2019/11/IMG_1982.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
  <div className="absolute inset-0 bg-black opacity-50"></div> {/* Semi-transparent overlay */}
  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-2xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Empowering Rural Women Entrepreneurs
      </h1>
      <p className="text-xl mb-8">
        Connect, learn, and grow your business with our supportive community and resources.
      </p>
      <Link
        to="/marketplace"
        className="inline-flex items-center bg-white text-emerald-700 px-6 py-3 rounded-lg font-semibold transform transition-transform hover:scale-105 hover:shadow-lg"
      >
        Get Started
        <ArrowRight className="ml-2" size={20} />
      </Link>
    </div>
  </div>
</section>


{/* Features Section */}
<section className="container mx-auto px-4">
  <h2 className="text-3xl font-bold text-center mb-12">How We Help You Succeed</h2>
  <div className="grid md:grid-cols-3 gap-8">
    <div className="text-center p-6 rounded-lg bg-emerald-50 transform transition-transform hover:scale-101 hover:shadow-lg">
      <ShoppingBag className="mx-auto mb-4 text-emerald-600" size={32} />
      <h3 className="text-xl font-semibold mb-3">Online Marketplace</h3>
      <p className="text-gray-600">
        Sell your products to customers across Pakistan through our easy-to-use platform
      </p>
    </div>
    <div className="text-center p-6 rounded-lg bg-emerald-50 transform transition-transform hover:scale-101 hover:shadow-lg">
      <Star className="mx-auto mb-4 text-emerald-600" size={32} />
      <h3 className="text-xl font-semibold mb-3">Skill Development</h3>
      <p className="text-gray-600">
        Access training resources and workshops to enhance your business skills
      </p>
    </div>
    <div className="text-center p-6 rounded-lg bg-emerald-50 transform transition-transform hover:scale-101 hover:shadow-lg">
      <Users className="mx-auto mb-4 text-emerald-600" size={32} />
      <h3 className="text-xl font-semibold mb-3">Mentorship</h3>
      <p className="text-gray-600">
        Connect with experienced mentors who can guide you on your entrepreneurial journey
      </p>
    </div>
  </div>
</section>


      {/* Success Stories */}
<section className="bg-gray-50 py-16">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
    <div className="grid md:grid-cols-2 gap-8">
      {/* First Success Story */}
      <div className="bg-white p-6 rounded-lg shadow-sm transform transition-transform hover:scale-105 hover:shadow-lg">
        <img
          src="https://th.bing.com/th/id/OIP.IUOLzL6DEMeEyhYzE-MRRAHaFj?rs=1&pid=ImgDetMain"
          alt="Fatima's Handicraft Business"
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-semibold mb-2">From Local Artisan to Online Success</h3>
        <p className="text-gray-600">
          How Divya transformed her traditional handicraft business into a thriving online enterprise.
        </p>
        <a
          href="https://yourstory.com/people/divya-mallick"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 font-semibold hover:underline mt-2 block"
        >
          Read Full Story
        </a>
      </div>

      {/* Second Success Story */}
      <div className="bg-white p-6 rounded-lg shadow-sm transform transition-transform hover:scale-105 hover:shadow-lg">
        <img
          src="https://images.yourstory.com/cs/2/b094ec506da611eab285b7ee8106293d/Maavni-1632397419896.jpg?fm=png&auto=format&blur=500"
          alt="Promoting Odisha handicrafts and empowering artisans"
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-semibold mb-2">Promoting Odisha Handicrafts and Empowering Artisans</h3>
        <p className="text-gray-600">
          It offers personalised products online, ensuring a consistent income for artisans.
        </p>
        <a
          href="https://yourstory.com/2021/09/startup-bharat-bhubaneswar-based-ecommerce-startup"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 font-semibold hover:underline mt-2 block"
        >
          Read Full Story
        </a>
      </div>
    </div>
  </div>
</section>

    </div>
  );
}