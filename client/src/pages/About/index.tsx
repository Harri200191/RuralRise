import type { TeamMemberType } from '../../types';
import { Mission } from './Mission';
import { TeamMember } from './TeamMember';

export function About() {
  const team: TeamMemberType[] = [
    {
      name: 'Haris Rehman',
      role: 'Founder & CEO',
      description: 'Passionate about empowering rural women through technology',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQHFCzdNAWKkOw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1726953021890?e=1739404800&v=beta&t=faTBejL_2VZ7xZax_T5au2ti22FFTV3aCw-HWxcdBkA'
    },
    {
      name: 'Aima Sibtain',
      role: 'Community Director',
      description: 'Expert in building and nurturing entrepreneurial communities',
      image: 'https://th.bing.com/th/id/OIP.CjW4KuMskKzlsS14Ek4YDQHaHa?rs=1&pid=ImgDetMain'
    },
    {
      name: 'Muhammad Sulleman',
      role: 'Technology Lead',
      description: 'Dedicated to making technology accessible to all',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQHfQunIzV_S8A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1685737190556?e=1739404800&v=beta&t=5vV1oanGf8q2CEXILblMtUfNNiPr6LmGmPHjPMDCx5c'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-emerald-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About RuralRise</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Empowering rural women entrepreneurs through technology, community, and support
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <Mission />

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
            <p className="text-gray-600 mb-6">
              RuralRise began with a simple observation: talented women entrepreneurs in rural areas faced significant barriers to growing their businesses. Limited access to markets, technology, and business networks held back their potential.
            </p>
            <p className="text-gray-600 mb-6">
              Founded in 2024, we set out to bridge these gaps by creating a platform that combines e-commerce capabilities with educational resources and mentorship opportunities. Our goal is to empower rural women entrepreneurs to reach their full potential.
            </p>
            <p className="text-gray-600">
              Today, RuralRise serves thousands of entrepreneurs across Pakistan, helping them build successful businesses and contribute to their local economies.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {team.map((member) => (
              <TeamMember key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}