// PATH: src/components/ItalianTaxFormService.js
// REPLACE your existing ItalianTaxFormService.js with this entire content

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, Check, AlertCircle, Globe, CreditCard, FileText, User, MapPin, Calendar, Hash, Shield, Award, Clock, Star, ArrowRight, Sparkles, Zap, Brain } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { jsPDF } from 'jspdf';
import emailjs from '@emailjs/browser';

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_stripe_key_here');

const ItalianTaxFormService = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [showPayment, setShowPayment] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [applicationId, setApplicationId] = useState('');

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'wKn1_xMCtZssdZzpb');
  }, []);

  const languages = {
    en: { name: 'English', flag: '🇬🇧' },
    fr: { name: 'Français', flag: '🇫🇷' },
    zh: { name: '中文', flag: '🇨🇳' },
    ar: { name: 'العربية', flag: '🇸🇦' }
  };

  const translations = {
    en: {
      title: 'Italian Fiscal Code',
      subtitle: 'Professional Service',
      heroTitle: 'Get Your Italian Codice Fiscale',
      heroSubtitle: 'Fast, reliable, and professionally handled by Italian bureaucracy experts',
      trustBadge1: 'GDPR Compliant',
      trustBadge2: '5-7 Day Processing',
      trustBadge3: '99.8% Success Rate',
      requestType: 'Service Type',
      personalData: 'Personal Information',
      residence: 'Address Details',
      foreignResidence: 'International Address',
      review: 'Review & Payment',
      serviceFee: 'Professional Service Fee',
      price: '€75',
      serviceDescription: 'Our Italian bureaucracy specialists will handle your application from start to finish.',
      payNow: 'Complete Payment',
      downloadPdf: 'Download Application Form',
      nextStep: 'Continue',
      prevStep: 'Back',
      startApplication: 'Start Your Application',
      whyChooseUs: 'Why Choose Our Service',
      benefit1: 'Expert Knowledge',
      benefit1Desc: 'Deep understanding of Italian bureaucracy',
      benefit2: 'Fast Processing',
      benefit2Desc: 'Priority handling with government offices',
      benefit3: 'Multilingual Support',
      benefit3Desc: 'Assistance in your preferred language',
      
      requestTypeInstr: 'Select the type of service you need for your Italian tax code',
      lastNameInstr: 'Enter your family name exactly as shown on your passport or ID',
      firstNameInstr: 'Enter your given name(s) exactly as shown on official documents',
      genderInstr: 'Select your gender as it appears on official documents',
      birthDateInstr: 'Enter your complete date of birth',
      birthPlaceInstr: 'Enter the city where you were born',
      birthProvinceInstr: 'Enter the province or state where you were born',
      addressInstr: 'Enter your current residential address',
      cityInstr: 'Enter the city where you currently reside',
      postalCodeInstr: 'Enter your postal or ZIP code',
      provinceInstr: 'Enter the province code for your current residence'
    },
    fr: {
      title: 'Code Fiscal Italien',
      subtitle: 'Service Professionnel',
      heroTitle: 'Obtenez Votre Codice Fiscale Italien',
      heroSubtitle: 'Rapide, fiable et géré professionnellement par des experts de la bureaucratie italienne',
      startApplication: 'Commencer Votre Demande'
    },
    zh: {
      title: '意大利税号',
      subtitle: '专业服务',
      heroTitle: '获取您的意大利税务代码',
      heroSubtitle: '快速、可靠，由意大利官僚制度专家专业处理',
      startApplication: '开始您的申请'
    },
    ar: {
      title: 'الرقم الضريبي الإيطالي',
      subtitle: 'خدمة مهنية',
      heroTitle: 'احصل على الرمز الضريبي الإيطالي',
      heroSubtitle: 'سريع وموثوق ومعالج بشكل مهني من قبل خبراء البيروقراطية الإيطالية',
      startApplication: 'ابدأ طلبك'
    }
  };

  const t = translations[currentLanguage] || translations.en;
  const isRTL = currentLanguage === 'ar';

  const formSteps = [
    {
      title: t.requestType,
      icon: FileText,
      gradient: 'from-purple-600 to-indigo-600',
      fields: [
        {
          name: 'requestType',
          type: 'radio',
          label: t.requestType,
          required: true,
          instruction: t.requestTypeInstr || 'Select the type of request you need',
          options: [
            { value: '1', label: 'New Fiscal Code', desc: 'First-time application', icon: '🆕' },
            { value: '2', label: 'Data Variation', desc: 'Update existing information', icon: '✏️' },
            { value: '3', label: 'Death Communication', desc: 'Report a death', icon: '📋' },
            { value: '4', label: 'Certificate Request', desc: 'Official certificate', icon: '📜' },
            { value: '5', label: 'Duplicate Card Request', desc: 'Replace lost card', icon: '🔄' }
          ]
        }
      ]
    },
    {
      title: t.personalData,
      icon: User,
      gradient: 'from-indigo-600 to-blue-600',
      fields: [
        {
          name: 'lastName',
          type: 'text',
          label: 'Family Name',
          required: true,
          instruction: t.lastNameInstr
        },
        {
          name: 'firstName',
          type: 'text',
          label: 'Given Name(s)',
          required: true,
          instruction: t.firstNameInstr
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email Address',
          required: true,
          instruction: 'Enter your email address for confirmation and updates'
        },
        {
          name: 'gender',
          type: 'radio',
          label: 'Gender',
          required: true,
          instruction: t.genderInstr,
          options: [
            { value: 'M', label: 'Male', icon: '♂️' },
            { value: 'F', label: 'Female', icon: '♀️' }
          ]
        },
        {
          name: 'birthDate',
          type: 'date',
          label: 'Date of Birth',
          required: true,
          instruction: t.birthDateInstr
        },
        {
          name: 'birthPlace',
          type: 'text',
          label: 'Place of Birth',
          required: true,
          instruction: t.birthPlaceInstr
        },
        {
          name: 'birthProvince',
          type: 'text',
          label: 'Birth Province/State',
          required: true,
          instruction: t.birthProvinceInstr || 'Enter province code'
        }
      ]
    },
    {
      title: t.residence,
      icon: MapPin,
      gradient: 'from-blue-600 to-teal-600',
      fields: [
        {
          name: 'address',
          type: 'text',
          label: 'Street Address',
          required: true,
          instruction: t.addressInstr
        },
        {
          name: 'civicNumber',
          type: 'text',
          label: 'House Number',
          required: true,
          instruction: 'Enter your house or building number'
        },
        {
          name: 'city',
          type: 'text',
          label: 'City',
          required: true,
          instruction: t.cityInstr || 'Enter your city of residence'
        },
        {
          name: 'postalCode',
          type: 'text',
          label: 'Postal Code',
          required: true,
          instruction: t.postalCodeInstr || 'Enter postal code'
        },
        {
          name: 'province',
          type: 'text',
          label: 'Province',
          required: true,
          instruction: t.provinceInstr || 'Enter province code'
        }
      ]
    },
    {
      title: t.foreignResidence,
      icon: Globe,
      gradient: 'from-teal-600 to-emerald-600',
      fields: [
        {
          name: 'foreignCountry',
          type: 'text',
          label: 'Country (if outside Italy)',
          required: false,
          instruction: 'Enter your country if you reside outside Italy'
        },
        {
          name: 'foreignAddress',
          type: 'text',
          label: 'International Address',
          required: false,
          instruction: 'Enter your complete foreign address if applicable'
        }
      ]
    }
  ];

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const isStepValid = (stepIndex) => {
    const step = formSteps[stepIndex];
    return step.fields.every(field => {
      if (field.required) {
        return formData[field.name] && formData[field.name].trim() !== '';
      }
      return true;
    });
  };

  const nextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowPayment(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Enhanced Payment Processing with Stripe
  const handlePayment = async () => {
    setIsLoading(true);
    setPaymentError(null);

    // Generate unique application ID
    const newApplicationId = `FC-${Date.now()}`;
    setApplicationId(newApplicationId);

    try {
      // For now, simulate payment (you can add real Stripe later)
      setTimeout(async () => {
        // Send confirmation emails
        await sendConfirmationEmail(newApplicationId);
        await sendAgencyNotification(newApplicationId);
        
        setIsCompleted(true);
        setShowPayment(false);
        setIsLoading(false);
      }, 2000);

    } catch (error) {
      setPaymentError('Payment failed. Please try again.');
      setIsLoading(false);
    }
  };

  // Send confirmation email to user
  const sendConfirmationEmail = async (appId) => {
    try {
      const templateParams = {
        to_email: formData.email,
        to_name: `${formData.firstName} ${formData.lastName}`,
        application_id: appId,
        service_type: getServiceTypeName(formData.requestType),
        full_name: `${formData.firstName} ${formData.lastName}`,
        birth_date: formData.birthDate,
        birth_place: formData.birthPlace,
        current_address: `${formData.address} ${formData.civicNumber}, ${formData.city}`,
        email: formData.email,
        submission_date: new Date().toLocaleDateString(),
        processing_time: '5-7 business days',
        from_name: 'Italian Fiscal Code Service',
        reply_to: 'info@fiscalcode.service'
      };

      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_w6tghqr',
        process.env.REACT_APP_EMAILJS_FISCAL_USER_TEMPLATE_ID || 'template_j0xsdcl',
        templateParams
      );

      console.log('User confirmation email sent successfully');
    } catch (error) {
      console.error('Error sending user confirmation email:', error);
    }
  };

  // Send notification to agency
  const sendAgencyNotification = async (appId) => {
    try {
      const templateParams = {
        application_id: appId,
        client_name: `${formData.firstName} ${formData.lastName}`,
        client_email: formData.email,
        service_type: getServiceTypeName(formData.requestType),
        birth_date: formData.birthDate,
        birth_place: `${formData.birthPlace}, ${formData.birthProvince}`,
        current_address: `${formData.address} ${formData.civicNumber}, ${formData.city} ${formData.postalCode}, ${formData.province}`,
        foreign_address: formData.foreignCountry ? `${formData.foreignAddress}, ${formData.foreignCountry}` : 'N/A',
        gender: formData.gender,
        submission_date: new Date().toLocaleDateString(),
        submission_time: new Date().toLocaleTimeString(),
        language: currentLanguage.toUpperCase(),
        payment_amount: '€75.00',
        payment_status: 'Completed',
        to_email: 'info@fiscalcode.service',
        from_name: 'Italian Fiscal Code Service System'
      };

      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_w6tghqr',
        process.env.REACT_APP_EMAILJS_FISCAL_AGENCY_TEMPLATE_ID || 'template_pkjko4e',
        templateParams
      );

      console.log('Agency notification email sent successfully');
    } catch (error) {
      console.error('Error sending agency notification email:', error);
    }
  };

  // Get service type name
  const getServiceTypeName = (typeId) => {
    const serviceTypes = {
      '1': 'New Fiscal Code Application',
      '2': 'Data Variation Request',
      '3': 'Death Communication',
      '4': 'Certificate Request',
      '5': 'Duplicate Card Request'
    };
    return serviceTypes[typeId] || 'Unknown Service';
  };

  // Enhanced PDF Generation with Official Italian Form Format
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Set up the PDF with official Italian formatting
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    
    // Header
    doc.text('DOMANDA DI ATTRIBUZIONE CODICE FISCALE', 20, 20);
    doc.text('COMUNICAZIONE VARIAZIONE DATI', 20, 30);
    doc.text('E RICHIESTA TESSERINO/DUPLICATO TESSERA SANITARIA', 20, 40);
    doc.text('(PERSONE FISICHE)', 20, 50);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    // Application ID
    doc.text(`Application ID: ${applicationId}`, 20, 65);
    
    // Personal Information Section
    doc.text('QUADRO B - Dati anagrafici', 20, 80);
    doc.text(`Cognome: ${formData.lastName || ''}`, 20, 95);
    doc.text(`Nome: ${formData.firstName || ''}`, 20, 105);
    doc.text(`Sesso: ${formData.gender || ''}`, 20, 115);
    doc.text(`Data di Nascita: ${formData.birthDate || ''}`, 120, 115);
    doc.text(`Comune di Nascita: ${formData.birthPlace || ''}`, 20, 125);
    doc.text(`Provincia: ${formData.birthProvince || ''}`, 120, 125);
    doc.text(`Email: ${formData.email || ''}`, 20, 135);
    
    // Residence Section
    doc.text('QUADRO C - Residenza anagrafica/domicilio fiscale', 20, 155);
    doc.text(`Indirizzo: ${formData.address || ''} ${formData.civicNumber || ''}`, 20, 170);
    doc.text(`Comune: ${formData.city || ''}`, 20, 180);
    doc.text(`CAP: ${formData.postalCode || ''}`, 120, 180);
    doc.text(`Provincia: ${formData.province || ''}`, 20, 190);
    
    // Foreign Residence (if applicable)
    if (formData.foreignCountry) {
      doc.text('QUADRO D - Residenza estera', 20, 210);
      doc.text(`Stato estero: ${formData.foreignCountry || ''}`, 20, 225);
      doc.text(`Indirizzo: ${formData.foreignAddress || ''}`, 20, 235);
    }
    
    // Request Type
    const requestTypes = {
      '1': 'Attribuzione Codice Fiscale',
      '2': 'Variazione Dati',
      '3': 'Comunicazione Decesso',
      '4': 'Richiesta Certificato',
      '5': 'Richiesta Duplicato Tesserino'
    };
    
    doc.text('QUADRO A - Tipo richiesta', 20, 255);
    doc.text(`Servizio richiesto: ${requestTypes[formData.requestType] || ''}`, 20, 270);
    
    // Footer
    doc.setFontSize(10);
    doc.text('Applicazione processata tramite servizio professionale', 20, 285);
    doc.text(`Data di generazione: ${new Date().toLocaleDateString('it-IT')}`, 20, 295);
    
    // Save the PDF
    const fileName = `codice-fiscale-${formData.lastName || 'application'}-${applicationId}.pdf`;
    doc.save(fileName);
    
    // Track download (Google Analytics - safe version)
    trackPDFDownload(fileName);
  };

  // Track PDF downloads for analytics (fixed version)
  const trackPDFDownload = (fileName) => {
    try {
      // Google Analytics tracking - check if gtag exists
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'pdf_download', {
          event_category: 'engagement',
          event_label: fileName,
          application_id: applicationId
        });
      }
    } catch (error) {
      console.log('Analytics tracking not available');
    }
  };

  const currentFormStep = formSteps[currentStep];
  const completedSteps = formSteps.slice(0, currentStep + 1).filter((_, index) => isStepValid(index)).length;
  const progress = (completedSteps / formSteps.length) * 100;

  // Landing/Hero Section with InvestiScope-inspired design
  if (currentStep === 0 && !showPayment && !isCompleted && Object.keys(formData).length === 0) {
    return (
      <div className={`min-h-screen relative overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-indigo-700 to-teal-700"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-transparent to-teal-900/50"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Floating elements background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Glassmorphic Header */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">{t.title}</div>
                  <div className="text-purple-200 text-sm">{t.subtitle}</div>
                </div>
              </div>
              
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent font-medium"
              >
                {Object.entries(languages).map(([code, lang]) => (
                  <option key={code} value={code} className="bg-gray-900 text-white">
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          {/* Glass Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-xl">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            PROFESSIONAL ITALIAN BUREAUCRACY SERVICE
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 leading-tight">
            {t.heroTitle?.split(' ').slice(0, 3).join(' ')}<br />
            <span className="font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
              {t.heroTitle?.split(' ').slice(3).join(' ')}
            </span>
          </h1>
          
          {/* Glass Card for Subtitle */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
              <p className="text-xl md:text-2xl text-white font-medium mb-3">
                {t.heroSubtitle}
              </p>
              <p className="text-lg md:text-xl text-white/90 font-light">
                Professional assistance, multilingual support, and expert guidance—all in one place
              </p>
            </div>
          </div>
          
          {/* Glass Benefits Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl text-white font-medium hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-emerald-300" />
                <span>✓ {t.trustBadge1}</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl text-white font-medium hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-300" />
                <span>✓ {t.trustBadge2}</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl text-white font-medium hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-yellow-300" />
                <span>✓ {t.trustBadge3}</span>
              </div>
            </div>
          </div>
          
          {/* Glass CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
            <button
              onClick={() => handleInputChange('started', true)}
              className="bg-white/90 backdrop-blur-md text-purple-700 px-8 py-5 rounded-full font-bold hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-lg border border-white/50"
            >
              {t.startApplication}
            </button>
            <button className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-5 rounded-full text-lg font-bold hover:bg-white/20 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-xl">
              <span>Learn More</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Benefits Section */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-4">{t.benefit1}</h3>
              <p className="text-white/80">{t.benefit1Desc}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-4">{t.benefit2}</h3>
              <p className="text-white/80">{t.benefit2Desc}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-4">{t.benefit3}</h3>
              <p className="text-white/80">{t.benefit3Desc}</p>
            </div>
          </div>
          
          {/* Glass Contact Card */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 inline-block shadow-xl">
            <p className="text-white font-medium text-lg mb-3">Questions? Let's talk.</p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-white">
              <a href="mailto:info@fiscalcode.service" className="hover:text-emerald-300 transition-colors font-medium">
                ✉️ info@fiscalcode.service
              </a>
              <span className="text-white/30">•</span>
              <span className="font-medium">Professional Support Available</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
        {/* Floating background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/50">
            <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Check className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
              Application Successfully Submitted!
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Your Italian fiscal code application has been processed and will be submitted to the Italian Revenue Agency within 24 hours. 
              You'll receive regular updates via email throughout the 5-7 business day processing period.
            </p>
            
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 mb-8 border border-emerald-200">
              <div className="flex items-center justify-center space-x-8 text-sm">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-lg"></div>
                  <span className="text-emerald-700 font-semibold">Application Received</span>
                </div>
                <div className="w-16 h-px bg-gradient-to-r from-emerald-400 to-teal-400"></div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse shadow-lg"></div>
                  <span className="text-teal-700 font-semibold">Email Sent</span>
                </div>
                <div className="w-16 h-px bg-gradient-to-r from-teal-400/30 to-gray-400/30"></div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-600 font-semibold">Completion (5-7 days)</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={generatePDF}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-xl font-bold text-lg flex items-center space-x-3 mx-auto"
            >
              <Download className="w-5 h-5" />
              <span>{t.downloadPdf}</span>
            </button>
            
            <p className="text-sm text-gray-500 mt-4">
              Application ID: {applicationId} • Confirmation email sent to {formData.email}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showPayment) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
        {/* Floating background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{t.review}</h1>
              <p className="text-purple-100">{t.serviceDescription}</p>
            </div>

            <div className="p-8">
              {/* Application Summary */}
              <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl p-6 mb-8 border border-gray-200">
                <h3 className="font-bold text-xl mb-6 text-gray-800">Application Summary</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Full Name:</span>
                      <span className="font-semibold">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-semibold">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Birth Date:</span>
                      <span className="font-semibold">{formData.birthDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Birth Place:</span>
                      <span className="font-semibold">{formData.birthPlace}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current City:</span>
                      <span className="font-semibold">{formData.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Address:</span>
                      <span className="font-semibold">{formData.address} {formData.civicNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Type:</span>
                      <span className="font-semibold">{getServiceTypeName(formData.requestType)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white mb-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-semibold">{t.serviceFee}</h4>
                    <p className="text-purple-100">Complete processing and submission</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{t.price}</div>
                    <div className="text-purple-200 text-sm">One-time fee</div>
                  </div>
                </div>
              </div>

              {/* Payment Error */}
              {paymentError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <p className="text-red-700 font-medium">{paymentError}</p>
                </div>
              )}

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-2xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 font-semibold text-lg shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing Application...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>{t.payNow}</span>
                  </>
                )}
              </button>

              <p className="text-center text-gray-500 text-sm mt-4">
                Secure processing • Email confirmations • GDPR compliant • Professional service
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{t.title}</h1>
                <p className="text-gray-600 text-sm">{t.subtitle}</p>
              </div>
            </div>
            
            <select
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
              className="bg-white/70 backdrop-blur-sm border border-gray-200 text-gray-700 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
            >
              {Object.entries(languages).map(([code, lang]) => (
                <option key={code} value={code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="xl:col-span-1">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-6 sticky top-24 border border-white/20">
              {/* Progress Header */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-600">Progress</span>
                  <span className="text-sm font-bold text-purple-600">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`bg-gradient-to-r ${currentFormStep?.gradient || 'from-purple-600 to-indigo-600'} h-3 rounded-full transition-all duration-700 ease-out`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                {formSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = index === currentStep;
                  const isCompleted = isStepValid(index) && index < currentStep;

                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                        isActive 
                          ? 'bg-white/90 backdrop-blur-xl shadow-lg transform scale-105 border border-purple-200' 
                          : isCompleted 
                            ? 'bg-emerald-50 hover:bg-emerald-100 border border-emerald-200' 
                            : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-lg ${
                          isCompleted 
                            ? 'bg-emerald-500 text-white' 
                            : isActive 
                              ? `bg-gradient-to-r ${step.gradient} text-white` 
                              : 'bg-gray-200 text-gray-500'
                        }`}>
                          {isCompleted ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <StepIcon className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className={`font-medium text-sm ${
                            isActive ? 'text-purple-700' : 
                            isCompleted ? 'text-emerald-700' : 'text-gray-600'
                          }`}>
                            {step.title}
                          </div>
                          <div className={`text-xs ${
                            isActive ? 'text-purple-500' : 
                            isCompleted ? 'text-emerald-500' : 'text-gray-500'
                          }`}>
                            Step {index + 1} of {formSteps.length}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="xl:col-span-3">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden">
              {/* Form Header */}
              <div className={`bg-gradient-to-r ${currentFormStep.gradient} p-8`}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <currentFormStep.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {currentFormStep.title}
                    </h2>
                    <p className="text-white/80">
                      Step {currentStep + 1} of {formSteps.length} • Complete all required fields
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8">
                <div className="space-y-8">
                  {currentFormStep.fields.map((field, index) => (
                    <div key={field.name} className="space-y-4">
                      <label className="block">
                        <span className="text-lg font-semibold text-gray-800 mb-2 block">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </span>
                      </label>
                      
                      {/* Instruction Card */}
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4 mb-4">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                          <p className="text-purple-700 font-medium">{field.instruction}</p>
                        </div>
                      </div>

                      {/* Form Input */}
                      {field.type === 'radio' ? (
                        <div className="grid gap-3">
                          {field.options.map((option) => (
                            <label 
                              key={option.value} 
                              className="group relative bg-white border-2 border-gray-200 rounded-xl p-4 cursor-pointer hover:border-purple-300 hover:shadow-md transition-all duration-200 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50"
                            >
                              <div className="flex items-center space-x-3">
                                <input
                                  type="radio"
                                  name={field.name}
                                  value={option.value}
                                  checked={formData[field.name] === option.value}
                                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                                  className="w-5 h-5 text-purple-600 focus:ring-purple-500 focus:ring-2"
                                />
                                <div className="text-xl">{option.icon}</div>
                                <div className="flex-1">
                                  <div className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                                    {option.label}
                                  </div>
                                  {option.desc && (
                                    <div className="text-sm text-gray-500 mt-1">{option.desc}</div>
                                  )}
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <input
                          type={field.type}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-lg font-medium placeholder-gray-400"
                          placeholder={`Enter your ${field.label.toLowerCase()}...`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Navigation */}
                <div className={`flex items-center justify-between mt-12 pt-8 border-t border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {currentStep > 0 ? (
                    <button
                      onClick={prevStep}
                      className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      <span>{t.prevStep}</span>
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  <button
                    onClick={nextStep}
                    disabled={!isStepValid(currentStep)}
                    className={`flex items-center space-x-2 px-8 py-4 bg-gradient-to-r ${currentFormStep.gradient} text-white rounded-xl hover:shadow-lg disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-semibold transform hover:scale-105 disabled:transform-none`}
                  >
                    <span>{currentStep === formSteps.length - 1 ? t.review : t.nextStep}</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItalianTaxFormService;
