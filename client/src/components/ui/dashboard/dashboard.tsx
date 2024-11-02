"use client";
import React, { useState } from 'react'
import { MessageCircle, Users, CheckCircle, Clock, AlertCircle, Settings, LucideIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, logout } from '@/redux/userSlice';
import { MdOutlinePerson2 } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import withAuth from '@/hoc/withAuth';

interface Feature {
  id: 'broadcast' | 'template' | 'tracking' | 'queue' | 'error' | 'settings'
  title: string
  icon: LucideIcon
  description: string
  color: string
}

interface FeatureContentProps {
  id: Feature['id']
}

interface FormState {
  templateName: string
  recipients: string
  parameters: string
}

const Dashboard = () => {

  const dispatch = useDispatch();
  const navigate = useRouter();
  const isAuthenticated: boolean  = useSelector(selectIsAuthenticated);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)
  const [formState, setFormState] = useState<FormState>({
    templateName: '',
    recipients: '',
    parameters: ''
  });
 


  const features: Feature[] = [
    {
      id: 'broadcast',
      title: 'Broadcast Message',
      icon: Users,
      description: 'Send template messages to multiple recipients',
      color: 'bg-blue-500'
    },
    {
      id: 'template',
      title: 'Template Validation',
      icon: CheckCircle,
      description: 'Verify WhatsApp message templates',
      color: 'bg-green-500'
    },
    {
      id: 'tracking',
      title: 'Message Tracking',
      icon: Clock,
      description: 'Track message delivery status',
      color: 'bg-purple-500'
    },
    {
      id: 'queue',
      title: 'Message Queue',
      icon: MessageCircle,
      description: 'Monitor queued messages',
      color: 'bg-orange-500'
    },
    {
      id: 'error',
      title: 'Error Logs',
      icon: AlertCircle,
      description: 'View error logs and failed messages',
      color: 'bg-red-500'
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: Settings,
      description: 'Configure API keys and preferences',
      color: 'bg-gray-500'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/broadcast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })
      if (!response.ok) throw new Error('Failed to send broadcast')
      setSelectedFeature(null)
      setFormState({ templateName: '', recipients: '', parameters: '' })
    } catch (error) {
      console.error('Broadcast error:', error)
    }
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate.push('/');
  }

  const FeatureContent: React.FC<FeatureContentProps> = ({ id }) => {
    
    switch (id) {
      case 'broadcast':
        return (
          <div className="space-y-4">
            {isAuthenticated ? (
      <p>Hello</p>
    ) : (
      <p>Hi</p>
    ) }
   
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Template Name</label>
                <input 
                  type="text" 
                  name="templateName"
                  value={formState.templateName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter template name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Recipients</label>
                <textarea 
                  name="recipients"
                  value={formState.recipients}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  rows={4}
                  placeholder="Enter phone numbers (one per line)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Parameters</label>
                <textarea 
                  name="parameters"
                  value={formState.parameters}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  rows={4}
                  placeholder="Enter parameters in JSON format"
                />
              </div>
              <Button type="submit" className="w-full">Send Broadcast</Button>
            </form>
          </div>
        )
      default:
        return <div>Content for {id}</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
         <div className='flex justify-between'>
            <h1 className="text-3xl font-bold text-gray-900">KwikBuy Dashboard</h1>
            <button onClick={handleLogout}>
              <div className='rounded-full bg-gray-300 p-3'>
                <MdOutlinePerson2 style={{ color: 'black', fontSize: '30px' }} />
              </div>
            </button>
            
          </div> 
          <p className="text-gray-600">Manage your messaging operations</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <Card 
              key={feature.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedFeature(feature)}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`${feature.color} p-3 rounded-lg text-white`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog 
          open={selectedFeature !== null} 
          onOpenChange={(open) => !open && setSelectedFeature(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {selectedFeature?.title}
              </DialogTitle>
            </DialogHeader>
            {selectedFeature && (
              <FeatureContent id={selectedFeature.id} />
            )}
          </DialogContent>
        </Dialog>
      </div>

    
    </div>

  )
}

export default withAuth(Dashboard, {requireAuth: true, redirectPath: '/login'});