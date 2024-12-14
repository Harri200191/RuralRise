import type { TutorialType } from '../../types';
import { TutorialCard } from './TutorialCard';

export function Tutorials() {
  const tutorials: TutorialType[] = [
    {
      id: '1',
      title: 'Getting Started with E-commerce',
      description: 'Learn the basics of setting up and managing your online store',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=500',
      category: 'E-commerce',
      duration: '2 hours',
      lessons: 8,
      link: 'https://www.coursera.org/learn/foundations-of-digital-marketing-and-e-commerce?msockid=0b90f7273dad609518f1e5103ca461f5'
    },
    {
      id: '2',
      title: 'Social Media Marketing',
      description: 'Master social media platforms to promote your business',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500',
      category: 'Marketing',
      duration: '1.5 hours',
      lessons: 6,
      link:'https://www.bing.com/search?q=Social+Media+Marketing+coursera&cvid=cdd20254a6514a79a526100289bd39bd&gs_lcrp=EgRlZGdlKgYIABBFGDkyBggAEEUYOTIGCAEQABhAMgYIAhAAGEAyBggDEAAYQDIGCAQQABhAMgYIBRAAGEAyBggGEAAYQDIGCAcQABhAMgYICBAAGEDSAQg1MTA0ajBqOagCALACAA&FORM=ANAB01&PC=DCTS'
    },
    {
      id: '3',
      title: 'Financial Planning',
      description: 'Essential financial skills for small business owners',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=500',
      category: 'Finance',
      duration: '3 hours',
      lessons: 10,
      link:'https://www.coursera.org/specializations/wharton-business-financial-modeling'
    }
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Tutorials</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Step-by-step guides to help you develop essential business skills
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial) => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} />
          ))}
        </div>
      </div>
    </div>
  );
}