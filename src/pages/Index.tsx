import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {  Carousel,  CarouselContent,  CarouselItem,  CarouselPrevious,  CarouselNext,} from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Database, Zap, FileText, Settings, BarChart3, Map, Package } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
   /*  {
      icon: Database,
      title: 'Asset Management',
      description: 'Comprehensive tracking and management of electric utility assets including transformers, conductors, and more.',
      action: () => navigate('/dashboards/assets'),
      color: 'text-primary'
    },
    {
      icon: Map,
      title: 'GIS Integration',
      description: 'Seamless integration with Geographic Information Systems for spatial asset data and discrepancy management.',
      action: () => navigate('/dashboards/gis-integration'),
      color: 'text-blue-500'
    },
    {
      icon: Package,
      title: 'SAP Integration',
      description: 'Direct connection to SAP systems for synchronized asset data and correction request workflows.',
      action: () => navigate('/dashboards/sap-integration'),
      color: 'text-green-500'
    },
    {
      icon: FileText,
      title: 'Work Orders',
      description: 'Track and manage maintenance work orders with detailed status monitoring and reporting capabilities.',
      action: () => navigate('/dashboards/work-orders'),
      color: 'text-orange-500'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reports',
      description: 'Advanced analytics dashboard with real-time insights into asset health, maintenance, and performance metrics.',
      action: () => navigate('/dashboards/analytics'),
      color: 'text-purple-500'
    },
    {
      icon: Settings,
      title: 'Data Quality',
      description: 'Monitor and improve data quality with automated discrepancy detection and correction workflows.',
      action: () => navigate('/dashboards/gis-discrepancy'),
      color: 'text-red-500'
    } */
  ];

  
  const images = [
    { src: "/public/HomePageImage.png", alt: "AssetDataQuality" } //,
   /*  { src: "/images/photo-2.jpg", alt: "Control room" },
    { src: "/images/photo-3.jpg", alt: "Field team" }, */
  ];


  return (
    <PageLayout title="Welcome to the Asset Data Hub Tool">
      <div className="space-y-8">
        {/* Hero Section */}
        <Card className="border-primary/20">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="flex justify-center">
              <Zap className="h-16 w-16 text-primary" />
            </div>
            <CardTitle className="text-4xl">Electric Utility Asset Management</CardTitle>
            <CardDescription className="text-lg max-w-3xl mx-auto">
              A comprehensive platform for managing electric utility assets in Avangrid.
            </CardDescription>
          </CardHeader>
        </Card>

        
          
          <Carousel className="relative w-full">
                  <CarouselContent className="h-[320px]"> 
                    {images.map((img) => (
                      <CarouselItem key={img.src} className="p-2">
                        <div className="relative h-full w-full overflow-hidden rounded-md">
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {/* <CarouselPrevious /> */}
                  {/* <CarouselNext /> */}
                </Carousel>



        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={feature.action}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <feature.icon className={`h-10 w-10 ${feature.color} group-hover:scale-110 transition-transform`} />
                </div>
                <CardTitle className="text-xl mt-4">{feature.title}</CardTitle>
                <CardDescription className="mt-2">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full group-hover:bg-primary/10">
                  Learn More →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Overview</CardTitle>
            <CardDescription>Asset numbers at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">15K+</div>
                <div className="text-sm text-muted-foreground mt-1">Total Assets</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500">3K</div>
                <div className="text-sm text-muted-foreground mt-1">Reclosers, Switches and Sectionalizers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">1K</div>
                <div className="text-sm text-muted-foreground mt-1">Voltage Regulators and Capacitor Bank</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500">100K</div>
                <div className="text-sm text-muted-foreground mt-1">Distribution Transformers</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Index;
