import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, FileText, Sparkles, Zap, Shield, Smartphone } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  const features = [
    {
      icon: CheckSquare,
      title: 'Task Management',
      description: 'Create, organize, and track your tasks with an intuitive interface.'
    },
    {
      icon: FileText,
      title: 'API Integration',
      description: 'Seamlessly fetch and display data from external APIs with proper error handling.'
    },
    {
      icon: Sparkles,
      title: 'Modern Design',
      description: 'Beautiful, responsive interface with dark mode support and smooth animations.'
    },
    {
      icon: Zap,
      title: 'Fast Performance',
      description: 'Built with React 18 and optimized for speed with efficient state management.'
    },
    {
      icon: Shield,
      title: 'Type Safety',
      description: 'Full TypeScript support for better development experience and fewer bugs.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Fully responsive design that works perfectly on all devices and screen sizes.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-20 animate-fade-in">
        <div className="mb-8">
          <CheckSquare className="h-20 w-20 text-primary-600 dark:text-primary-400 mx-auto mb-6 animate-bounce-gentle" />
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              TaskFlow
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            A modern, production-ready React application demonstrating best practices in 
            component architecture, state management, and API integration.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/tasks">
            <Button size="lg" className="w-full sm:w-auto">
              Start Managing Tasks
            </Button>
          </Link>
          <Link to="/posts">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Explore Posts
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Built with modern React patterns and best practices to showcase 
            professional front-end development skills.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              hover
              className="p-8 text-center animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <feature.icon className="h-12 w-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Technical Stack */}
      <Card className="p-8 mb-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Built with Modern Technologies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Leveraging the latest tools and frameworks for optimal performance and developer experience.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 text-center">
          {[
            'React 18',
            'TypeScript',
            'Tailwind CSS',
            'Vite',
            'React Router'
          ].map((tech) => (
            <div
              key={tech}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {tech}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Call to Action */}
      <Card className="p-12 text-center bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-primary-200 dark:border-primary-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Explore the full functionality of our task management system and see how 
          modern React development practices come together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/tasks">
            <Button size="lg" className="w-full sm:w-auto">
              Try Task Manager
            </Button>
          </Link>
          <Link to="/posts">
            <Button variant="ghost" size="lg" className="w-full sm:w-auto">
              Browse Posts
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Home;