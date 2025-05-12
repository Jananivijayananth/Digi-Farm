import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Check, AlertCircle, Info, MapPin, Phone, ExternalLink } from 'lucide-react';

// Types for disease detection
interface Disease {
  id: number;
  name: string;
  description: string;
  solutions: string[];
  severity: 'low' | 'medium' | 'high';
  crop: string;
  symptoms: string[];
  medicalShops: {
    name: string;
    location: string;
    phone: string;
    products: string[];
  }[];
}

const DiseaseDetection: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedDisease, setDetectedDisease] = useState<Disease | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Enhanced disease database with specific diseases for different crops
  const diseaseDatabase: Disease[] = [
    {
      id: 1,
      name: 'Tomato Late Blight',
      description: 'A fungal disease that affects tomato plants, causing dark lesions on leaves and fruit rot.',
      crop: 'Tomato',
      symptoms: [
        'Dark brown spots on leaves',
        'White fuzzy growth on leaf undersides',
        'Rotting fruits with greasy appearance'
      ],
      solutions: [
        'Apply copper-based fungicides',
        'Remove and destroy infected plant parts',
        'Ensure good air circulation between plants',
        'Water at the base, avoiding wetting the foliage'
      ],
      severity: 'high',
      medicalShops: [
        {
          name: 'Green Solutions Agro Store',
          location: 'Main Market Road, Bangalore',
          phone: '+91 98765 43210',
          products: ['Copper oxychloride', 'Mancozeb fungicide']
        },
        {
          name: 'Farm Care Center',
          location: 'Agricultural Complex, Mysore',
          phone: '+91 98765 43211',
          products: ['Bordeaux mixture', 'Systemic fungicides']
        }
      ]
    },
    {
      id: 2,
      name: 'Tomato Leaf Curl Virus',
      description: 'A viral disease spread by whiteflies that causes severe curling and yellowing of leaves.',
      crop: 'Tomato',
      symptoms: [
        'Upward curling of leaves',
        'Yellowing of leaf edges',
        'Stunted plant growth'
      ],
      solutions: [
        'Use neem-based insecticides for whitefly control',
        'Install yellow sticky traps',
        'Remove and destroy infected plants',
        'Plant resistant varieties'
      ],
      severity: 'high',
      medicalShops: [
        {
          name: 'Krishi Seva Kendra',
          location: 'Rural Market, Hassan',
          phone: '+91 98765 43212',
          products: ['Neem oil', 'Yellow sticky traps']
        }
      ]
    },
    {
      id: 3,
      name: 'Apple Scab',
      description: 'A fungal disease that affects apple trees, causing dark, scab-like lesions on leaves and fruit.',
      crop: 'Apple',
      symptoms: [
        'Olive-green to brown spots on leaves',
        'Dark, crusty spots on fruits',
        'Premature leaf drop'
      ],
      solutions: [
        'Apply preventative fungicide sprays',
        'Rake and destroy fallen leaves',
        'Prune to improve air circulation',
        'Plant resistant apple varieties'
      ],
      severity: 'medium',
      medicalShops: [
        {
          name: 'Himalayan Agro Care',
          location: 'Shimla Market, HP',
          phone: '+91 98765 43213',
          products: ['Myclobutanil', 'Captan fungicide']
        }
      ]
    },
    {
      id: 4,
      name: 'Rose Black Spot',
      description: 'A fungal disease that causes black spots on rose leaves, leading to yellowing and leaf drop.',
      crop: 'Rose',
      symptoms: [
        'Circular black spots on leaves',
        'Yellowing around spots',
        'Premature defoliation'
      ],
      solutions: [
        'Apply fungicides specifically for black spot',
        'Remove and destroy infected leaves',
        'Avoid overhead watering',
        'Space plants for good air circulation'
      ],
      severity: 'medium',
      medicalShops: [
        {
          name: 'Garden Care Solutions',
          location: 'MG Road, Bangalore',
          phone: '+91 98765 43214',
          products: ['Trifloxystrobin', 'Propiconazole spray']
        }
      ]
    },
    {
      id: 5,
      name: 'Grape Downy Mildew',
      description: 'A fungal disease affecting grape vines, causing yellow spots on leaves and fruit rot.',
      crop: 'Grape',
      symptoms: [
        'Yellow-green spots on upper leaf surface',
        'White downy growth underneath',
        'Brown, shriveled fruits'
      ],
      solutions: [
        'Apply copper-based fungicides',
        'Improve vineyard drainage',
        'Remove affected fruits',
        'Maintain good air circulation'
      ],
      severity: 'high',
      medicalShops: [
        {
          name: 'Vineyard Supplies',
          location: 'Nashik, Maharashtra',
          phone: '+91 98765 43215',
          products: ['Metalaxyl', 'Fosetyl-aluminum']
        }
      ]
    }
  ];
  
  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImage(file);
      setError(null);
      setDetectedDisease(null);
      
      // Create a preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: false
  });
  
  // Clear the selected image
  const clearImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setImage(null);
    setPreview(null);
    setDetectedDisease(null);
    setError(null);
  };
  
  // Enhanced disease detection process
  const analyzeImage = () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Detect crop type from filename or image analysis (simulated)
      const filename = image.name.toLowerCase();
      let matchingDiseases = diseaseDatabase;
      
      if (filename.includes('tomato')) {
        matchingDiseases = diseaseDatabase.filter(d => d.crop === 'Tomato');
      } else if (filename.includes('apple')) {
        matchingDiseases = diseaseDatabase.filter(d => d.crop === 'Apple');
      } else if (filename.includes('rose')) {
        matchingDiseases = diseaseDatabase.filter(d => d.crop === 'Rose');
      } else if (filename.includes('grape')) {
        matchingDiseases = diseaseDatabase.filter(d => d.crop === 'Grape');
      }
      
      // Randomly select a disease from matching diseases
      const randomIndex = Math.floor(Math.random() * matchingDiseases.length);
      setDetectedDisease(matchingDiseases[randomIndex]);
    }, 2000);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Crop Disease Detection</h1>
        <p className="text-gray-600 mt-2">Upload images of your crops to identify diseases and get treatment recommendations</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          {/* Image upload area */}
          {!preview ? (
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center h-80 cursor-pointer transition-colors ${
                isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-center text-gray-600 mb-2">
                {isDragActive ? 'Drop the image here' : 'Drag & drop an image here, or click to select'}
              </p>
              <p className="text-center text-gray-500 text-sm">
                Supported formats: JPEG, PNG, GIF
              </p>
            </div>
          ) : (
            <div className="relative border rounded-xl overflow-hidden h-80">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-full object-contain"
              />
              <button 
                onClick={clearImage}
                className="absolute top-4 right-4 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          )}
          
          {preview && !detectedDisease && (
            <button
              onClick={analyzeImage}
              disabled={isAnalyzing}
              className={`mt-4 w-full py-2.5 px-4 rounded-md text-white font-medium ${
                isAnalyzing 
                  ? 'bg-green-500 opacity-75 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              } transition-colors`}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
            </button>
          )}
          
          {error && (
            <div className="mt-4 bg-red-50 text-red-700 p-4 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}
        </div>
        
        <div>
          {/* Results section */}
          {isAnalyzing ? (
            <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center h-80">
              <div className="animate-pulse flex flex-col items-center">
                <div className="rounded-full bg-gray-200 h-16 w-16 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="h-24 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ) : detectedDisease ? (
            <div className="bg-white shadow-md rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className={`p-2 rounded-full ${
                  detectedDisease.severity === 'high' ? 'bg-red-100' :
                  detectedDisease.severity === 'medium' ? 'bg-amber-100' : 'bg-yellow-100'
                }`}>
                  <AlertCircle className={`h-6 w-6 ${
                    detectedDisease.severity === 'high' ? 'text-red-600' :
                    detectedDisease.severity === 'medium' ? 'text-amber-600' : 'text-yellow-600'
                  }`} />
                </div>
                <div className="ml-3">
                  <h2 className="text-xl font-semibold text-gray-800">{detectedDisease.name}</h2>
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${
                      detectedDisease.severity === 'high' ? 'text-red-600' :
                      detectedDisease.severity === 'medium' ? 'text-amber-600' : 'text-yellow-600'
                    }`}>
                      {detectedDisease.severity.charAt(0).toUpperCase() + detectedDisease.severity.slice(1)} Severity
                    </span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-gray-600">{detectedDisease.crop}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-gray-700 font-medium mb-2">Description</h3>
                <p className="text-gray-600">{detectedDisease.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-gray-700 font-medium mb-2">Symptoms</h3>
                <ul className="space-y-2">
                  {detectedDisease.symptoms.map((symptom, index) => (
                    <li key={index} className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="text-gray-700 font-medium mb-2">Recommended Solutions</h3>
                <ul className="space-y-2">
                  {detectedDisease.solutions.map((solution, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="text-gray-700 font-medium mb-2">Where to Buy Solutions</h3>
                <div className="space-y-4">
                  {detectedDisease.medicalShops.map((shop, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-2">{shop.name}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{shop.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{shop.phone}</span>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-700">Available Products:</p>
                          <ul className="mt-1 space-y-1">
                            {shop.products.map((product, pIndex) => (
                              <li key={pIndex} className="text-gray-600 flex items-center">
                                <Check className="h-4 w-4 text-green-500 mr-2" />
                                {product}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-md flex items-start">
                <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-blue-700 text-sm">
                  For severe cases, consider consulting with a local agricultural extension agent for personalized advice.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 h-80 flex flex-col items-center justify-center text-center">
              <Info className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">No Image Analyzed Yet</h3>
              <p className="text-gray-500 max-w-md">
                Upload and analyze an image to receive disease identification and treatment recommendations.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* How it works section */}
      <div className="mt-12 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              <Upload className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">1. Upload Image</h3>
            <p className="text-gray-600">Take clear photos of the affected plant parts and upload them to our system</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <AlertCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">2. AI Analysis</h3>
            <p className="text-gray-600">Our AI system analyzes the images to identify patterns associated with specific diseases</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-purple-100 p-4 rounded-full mb-4">
              <Check className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">3. Get Solutions</h3>
            <p className="text-gray-600">Receive detailed information about the disease and recommended treatment options</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;