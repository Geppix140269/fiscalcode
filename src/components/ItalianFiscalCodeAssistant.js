import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Upload, FileText, Check, AlertCircle, Download, Edit3, HelpCircle, CreditCard, ArrowRight, FileCheck, Sparkles, Globe } from 'lucide-react';

const ItalianFiscalCodeAssistant = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentField, setCurrentField] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [formCompleted, setFormCompleted] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [uploadedPDF, setUploadedPDF] = useState(null);
  const fileInputRef = useRef(null);

  // Initialize EmailJS
  useEffect(() => {
    // Load EmailJS from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      if (window.emailjs) {
        window.emailjs.init('wKn1_xMCtZssdZzpb');
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const languages = {
    en: { name: 'English', flag: '🇬🇧' },
    it: { name: 'Italiano', flag: '🇮🇹' },
    fr: { name: 'Français', flag: '🇫🇷' },
    es: { name: 'Español', flag: '🇪🇸' },
    de: { name: 'Deutsch', flag: '🇩🇪' },
    zh: { name: '中文', flag: '🇨🇳' },
    ar: { name: 'العربية', flag: '🇸🇦' },
    ru: { name: 'Русский', flag: '🇷🇺' }
  };

  const translations = {
    en: {
      welcome: 'Welcome to Your Italian Fiscal Code Assistant',
      subtitle: 'Professional guidance in your language',
      heroTitle: 'Fill Out Your Codice Fiscale Form with Expert Help',
      heroSubtitle: "We'll guide you through every field in your preferred language",
      startButton: 'Start Guided Form Filling',
      downloadFirst: 'First, download the official form',
      downloadDesc: 'Click below to download the official Italian fiscal code application form (AA4/8)',
      downloadButton: 'Download Official Form',
      uploadPrompt: 'Upload Your Form',
      uploadDesc: 'After filling out the form with our guidance, upload it here',
      fieldGuide: 'Field-by-Field Guide',
      currentField: 'Current Field',
      whatToWrite: 'What to write',
      example: 'Example',
      nextField: 'Next Field',
      prevField: 'Previous Field',
      completeForm: 'Complete & Submit',
      uploadCompleted: 'Upload Completed Form',
      proceedPayment: 'Proceed to Payment',
      serviceFee: 'Professional Service Fee',
      price: '€75',
      serviceIncludes: 'Service includes',
      benefit1: 'Form review by Italian bureaucracy experts',
      benefit2: 'Official submission to Italian tax authorities',
      benefit3: 'Updates throughout the process',
      benefit4: 'Digital copy of your fiscal code',
      payNow: 'Pay & Submit Application',
      success: 'Application Submitted Successfully!',
      successDesc: 'We have received your form and will process it within 24 hours.',
      emailLabel: 'Your Email Address',
      signature: 'Electronic Signature',
      signatureDesc: 'Type your full name as it appears on the form'
    },
    it: {
      welcome: 'Benvenuti nel vostro assistente per il Codice Fiscale',
      subtitle: 'Guida professionale nella vostra lingua',
      heroTitle: 'Compilate il modulo del Codice Fiscale con assistenza esperta',
      heroSubtitle: 'Vi guideremo attraverso ogni campo nella vostra lingua preferita',
      startButton: 'Inizia la compilazione guidata',
      downloadFirst: 'Prima, scarica il modulo ufficiale',
      downloadDesc: 'Clicca qui sotto per scaricare il modulo ufficiale AA4/8',
      downloadButton: 'Scarica Modulo Ufficiale'
    },
    fr: {
      welcome: 'Bienvenue dans votre assistant Code Fiscal Italien',
      subtitle: 'Conseils professionnels dans votre langue',
      heroTitle: 'Remplissez votre formulaire Codice Fiscale avec une aide experte',
      heroSubtitle: 'Nous vous guiderons à travers chaque champ dans votre langue préférée',
      startButton: 'Commencer le remplissage guidé',
      downloadFirst: "D'abord, téléchargez le formulaire officiel",
      downloadDesc: 'Cliquez ci-dessous pour télécharger le formulaire officiel AA4/8',
      downloadButton: 'Télécharger le formulaire officiel'
    },
    es: {
      welcome: 'Bienvenido a su asistente de Código Fiscal Italiano',
      subtitle: 'Orientación profesional en su idioma',
      heroTitle: 'Complete su formulario de Codice Fiscale con ayuda experta',
      heroSubtitle: 'Le guiaremos a través de cada campo en su idioma preferido',
      startButton: 'Iniciar llenado guiado',
      downloadFirst: 'Primero, descargue el formulario oficial',
      downloadDesc: 'Haga clic abajo para descargar el formulario oficial AA4/8',
      downloadButton: 'Descargar formulario oficial'
    },
    zh: {
      welcome: '欢迎使用意大利税号助手',
      subtitle: '用您的语言提供专业指导',
      heroTitle: '在专家帮助下填写您的税号申请表',
      heroSubtitle: '我们将用您喜欢的语言指导您填写每个字段',
      startButton: '开始指导填表',
      downloadFirst: '首先，下载官方表格',
      downloadDesc: '点击下方下载官方AA4/8表格',
      downloadButton: '下载官方表格'
    }
  };

  const t = (key) => translations[currentLanguage]?.[key] || translations.en[key];

  const formFields = [
    {
      section: 'QUADRO A - Request Type',
      fields: [
        {
          id: 'request_type',
          label: 'Type of Request',
          instruction: {
            en: 'Check box 1 (ATTRIBUZIONE CODICE FISCALE) if you are applying for a NEW fiscal code for the first time',
            it: 'Spuntare la casella 1 (ATTRIBUZIONE CODICE FISCALE) se si richiede un NUOVO codice fiscale per la prima volta',
            fr: "Cochez la case 1 (ATTRIBUZIONE CODICE FISCALE) si vous demandez un NOUVEAU code fiscal pour la première fois",
            es: 'Marque la casilla 1 (ATTRIBUZIONE CODICE FISCALE) si está solicitando un NUEVO código fiscal por primera vez',
            zh: '如果您是第一次申请新税号，请勾选框1（ATTRIBUZIONE CODICE FISCALE）'
          },
          example: '✓ in box 1',
          highlight: 'Most international applicants select box 1'
        },
        {
          id: 'requester_type',
          label: 'Requester Type',
          instruction: {
            en: 'Check "D" if applying for yourself, or "T" if applying on behalf of someone else',
            it: 'Spuntare "D" se la richiesta è per se stessi, o "T" se per conto di terzi',
            fr: 'Cochez "D" si vous postulez pour vous-même, ou "T" si vous postulez pour quelqu\'un d\'autre',
            es: 'Marque "D" si solicita para usted mismo, o "T" si solicita en nombre de otra persona',
            zh: '如果为自己申请请勾选"D"，如果代他人申请请勾选"T"'
          },
          example: '✓ D',
          highlight: 'Most people select "D" for direct request'
        }
      ]
    },
    {
      section: 'QUADRO B - Personal Data',
      fields: [
        {
          id: 'cognome',
          label: 'COGNOME (Last Name)',
          instruction: {
            en: 'Write your LAST NAME / FAMILY NAME / SURNAME exactly as it appears on your passport',
            it: 'Scrivere il COGNOME esattamente come appare sul passaporto',
            fr: 'Écrivez votre NOM DE FAMILLE exactement comme il apparaît sur votre passeport',
            es: 'Escriba su APELLIDO exactamente como aparece en su pasaporte',
            zh: '请按照护照上显示的完全一样写您的姓氏'
          },
          example: 'SMITH, GARCÍA, WANG, MÜLLER',
          highlight: 'Use CAPITAL LETTERS'
        },
        {
          id: 'nome',
          label: 'NOME (First Name)',
          instruction: {
            en: 'Write your FIRST NAME(S) / GIVEN NAME(S) exactly as shown on your passport',
            it: 'Scrivere il NOME esattamente come appare sul passaporto',
            fr: 'Écrivez votre/vos PRÉNOM(S) exactement comme sur votre passeport',
            es: 'Escriba su(s) NOMBRE(S) exactamente como aparece en su pasaporte',
            zh: '请按照护照上显示的完全一样写您的名字'
          },
          example: 'JOHN PAUL, MARIA TERESA, XIAOMING',
          highlight: 'Include all given names in CAPITAL LETTERS'
        },
        {
          id: 'sesso',
          label: 'SESSO (Gender)',
          instruction: {
            en: 'Write "M" for Male or "F" for Female in the small box',
            it: 'Scrivere "M" per Maschio o "F" per Femmina nella casella',
            fr: 'Écrivez "M" pour Masculin ou "F" pour Féminin dans la case',
            es: 'Escriba "M" para Masculino o "F" para Femenino en la casilla',
            zh: '在小框中写"M"（男性）或"F"（女性）'
          },
          example: 'M or F',
          highlight: 'Single letter only'
        },
        {
          id: 'data_nascita',
          label: 'DATA DI NASCITA (Date of Birth)',
          instruction: {
            en: 'Write your birth date in format: DD/MM/YYYY (day/month/year)',
            it: 'Scrivere la data di nascita nel formato: GG/MM/AAAA',
            fr: 'Écrivez votre date de naissance au format: JJ/MM/AAAA',
            es: 'Escriba su fecha de nacimiento en formato: DD/MM/AAAA',
            zh: '按以下格式写出生日期：日/月/年（DD/MM/YYYY）'
          },
          example: '15/03/1985',
          highlight: 'European date format: day first, then month'
        },
        {
          id: 'comune_nascita',
          label: 'COMUNE DI NASCITA (Place of Birth)',
          instruction: {
            en: 'Write the CITY where you were born. If born outside Italy, write the city name and country',
            it: 'Scrivere il COMUNE di nascita. Se nato all\'estero, scrivere città e stato',
            fr: 'Écrivez la VILLE où vous êtes né. Si né hors d\'Italie, écrivez ville et pays',
            es: 'Escriba la CIUDAD donde nació. Si nació fuera de Italia, escriba ciudad y país',
            zh: '写出生城市。如果在意大利境外出生，写城市和国家'
          },
          example: 'LONDON (UK), PARIS (FRANCE), NEW YORK (USA)',
          highlight: 'Include country if born outside Italy'
        },
        {
          id: 'provincia',
          label: 'PROVINCIA (Province)',
          instruction: {
            en: 'If born in Italy, write the 2-letter province code. If born abroad, write "EE"',
            it: 'Se nato in Italia, scrivere la sigla della provincia. Se nato all\'estero, scrivere "EE"',
            fr: 'Si né en Italie, écrivez le code de province. Si né à l\'étranger, écrivez "EE"',
            es: 'Si nació en Italia, escriba el código de provincia. Si nació en el extranjero, escriba "EE"',
            zh: '如果在意大利出生，写省份代码。如果在国外出生，写"EE"'
          },
          example: 'EE (for foreign births), RM (Rome), MI (Milan)',
          highlight: 'Most international applicants write "EE"'
        }
      ]
    },
    {
      section: 'QUADRO C - Current Address',
      fields: [
        {
          id: 'indirizzo',
          label: 'INDIRIZZO (Street Address)',
          instruction: {
            en: 'Write your current street name. In TIPOLOGIA write the type (Via, Piazza, etc.), then the street name',
            it: 'Scrivere l\'indirizzo attuale. In TIPOLOGIA scrivere il tipo (Via, Piazza, ecc.), poi il nome',
            fr: 'Écrivez votre adresse actuelle. Dans TIPOLOGIA écrivez le type (Via, Piazza, etc.), puis le nom',
            es: 'Escriba su dirección actual. En TIPOLOGIA escriba el tipo (Via, Piazza, etc.), luego el nombre',
            zh: '写当前街道地址。在TIPOLOGIA写类型（Via，Piazza等），然后写街道名'
          },
          example: 'TIPOLOGIA: Via | INDIRIZZO: Roma',
          highlight: 'Separate street type from street name'
        },
        {
          id: 'numero_civico',
          label: 'NUMERO CIVICO (House Number)',
          instruction: {
            en: 'Write your house/building number',
            it: 'Scrivere il numero civico',
            fr: 'Écrivez votre numéro de maison/bâtiment',
            es: 'Escriba su número de casa/edificio',
            zh: '写门牌号'
          },
          example: '42, 15A, 7',
          highlight: 'Include letter if applicable (e.g., 15A)'
        },
        {
          id: 'comune',
          label: 'COMUNE (City)',
          instruction: {
            en: 'Write the city where you currently live',
            it: 'Scrivere il comune di residenza attuale',
            fr: 'Écrivez la ville où vous vivez actuellement',
            es: 'Escriba la ciudad donde vive actualmente',
            zh: '写您当前居住的城市'
          },
          example: 'ROMA, MILANO, FIRENZE',
          highlight: 'Use Italian city name if living in Italy'
        },
        {
          id: 'cap',
          label: 'C.A.P. (Postal Code)',
          instruction: {
            en: 'Write the 5-digit Italian postal code if living in Italy, otherwise leave blank',
            it: 'Scrivere il CAP a 5 cifre se in Italia, altrimenti lasciare vuoto',
            fr: 'Écrivez le code postal italien à 5 chiffres si en Italie, sinon laissez vide',
            es: 'Escriba el código postal italiano de 5 dígitos si está en Italia, si no déjelo en blanco',
            zh: '如果在意大利居住，写5位邮政编码，否则留空'
          },
          example: '00100, 20121, 50123',
          highlight: 'Only for Italian addresses'
        },
        {
          id: 'provincia_residenza',
          label: 'PROVINCIA (Province of Residence)',
          instruction: {
            en: 'Write the 2-letter province code if living in Italy, otherwise leave blank',
            it: 'Scrivere la sigla della provincia se in Italia, altrimenti lasciare vuoto',
            fr: 'Écrivez le code de province si en Italie, sinon laissez vide',
            es: 'Escriba el código de provincia si está en Italia, si no déjelo en blanco',
            zh: '如果在意大利居住，写省份代码，否则留空'
          },
          example: 'RM, MI, FI',
          highlight: 'Leave blank if living abroad'
        }
      ]
    },
    {
      section: 'QUADRO D - Foreign Residence (if applicable)',
      fields: [
        {
          id: 'stato_estero',
          label: 'STATO ESTERO (Foreign Country)',
          instruction: {
            en: 'If you live outside Italy, write your country name here',
            it: 'Se residente all\'estero, scrivere il nome del paese',
            fr: 'Si vous vivez hors d\'Italie, écrivez votre pays ici',
            es: 'Si vive fuera de Italia, escriba su país aquí',
            zh: '如果居住在意大利境外，在此写国家名称'
          },
          example: 'UNITED KINGDOM, FRANCE, USA, CHINA',
          highlight: 'Only fill if living outside Italy'
        },
        {
          id: 'foreign_address',
          label: 'Foreign Address Details',
          instruction: {
            en: 'Write your complete foreign address including street, city, state/province, and postal code',
            it: 'Scrivere l\'indirizzo completo all\'estero incluso via, città, stato/provincia e codice postale',
            fr: 'Écrivez votre adresse complète à l\'étranger, y compris rue, ville, état/province et code postal',
            es: 'Escriba su dirección completa en el extranjero, incluida calle, ciudad, estado/provincia y código postal',
            zh: '写完整的国外地址，包括街道、城市、州/省和邮政编码'
          },
          example: '123 Main St, New York, NY 10001',
          highlight: 'Include all address components'
        }
      ]
    },
    {
      section: 'Signature Section',
      fields: [
        {
          id: 'data_firma',
          label: 'DATA (Date)',
          instruction: {
            en: 'Write today\'s date in format DD/MM/YYYY',
            it: 'Scrivere la data odierna nel formato GG/MM/AAAA',
            fr: 'Écrivez la date du jour au format JJ/MM/AAAA',
            es: 'Escriba la fecha de hoy en formato DD/MM/AAAA',
            zh: '按DD/MM/YYYY格式写今天的日期'
          },
          example: '16/07/2025',
          highlight: 'Use today\'s date'
        },
        {
          id: 'firma',
          label: 'FIRMA (Signature)',
          instruction: {
            en: 'Sign your name as it normally appears on official documents',
            it: 'Firmare come si firma normalmente sui documenti ufficiali',
            fr: 'Signez votre nom comme il apparaît normalement sur les documents officiels',
            es: 'Firme su nombre como aparece normalmente en documentos oficiales',
            zh: '按照官方文件上的正常签名方式签名'
          },
          example: 'Your handwritten signature',
          highlight: 'Must match passport signature style'
        }
      ]
    }
  ];

  const allFields = formFields.flatMap(section => section.fields);
  const currentFieldData = allFields[currentField];
  const progress = ((currentField + 1) / allFields.length) * 100;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedPDF(file);
      setFormCompleted(true);
    }
  };

  const handlePayment = async () => {
    setIsSubmitting(true);
    const newApplicationId = `FC-${Date.now()}`;
    setApplicationId(newApplicationId);

    try {
      // Send confirmation emails
      await sendUserConfirmation(newApplicationId);
      await sendAgencyNotification(newApplicationId);
      
      // Show success
      setShowPayment(false);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error processing payment:', error);
      setIsSubmitting(false);
    }
  };

  const sendUserConfirmation = async (appId) => {
    try {
      const templateParams = {
        to_email: email,
        application_id: appId,
        submission_date: new Date().toLocaleDateString(),
        processing_time: '5-7 business days',
        from_name: 'Italian Fiscal Code Service'
      };

      if (window.emailjs) {
        await window.emailjs.send(
          'service_w6tghqr',
          'template_j0xsdcl',
          templateParams
        );
      }
    } catch (error) {
      console.error('Error sending user confirmation:', error);
    }
  };

  const sendAgencyNotification = async (appId) => {
    try {
      const templateParams = {
        application_id: appId,
        client_email: email,
        submission_date: new Date().toLocaleDateString(),
        submission_time: new Date().toLocaleTimeString(),
        language: currentLanguage.toUpperCase(),
        payment_amount: '€75.00',
        to_email: 'codicefiscale@marietrulli.com'
      };

      if (window.emailjs) {
        await window.emailjs.send(
          'service_w6tghqr',
          'template_pkjko4e',
          templateParams
        );
      }
    } catch (error) {
      console.error('Error sending agency notification:', error);
    }
  };

  if (applicationId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/50">
            <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Check className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
              {t('success')}
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              {t('successDesc')}
            </p>
            
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 mb-8 border border-emerald-200">
              <p className="text-gray-600">Application ID: <span className="font-bold text-gray-800">{applicationId}</span></p>
              <p className="text-gray-600 mt-2">Confirmation sent to: <span className="font-bold text-gray-800">{email}</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Complete Your Application</h1>
              <p className="text-purple-100">One final step to submit your fiscal code application</p>
            </div>

            <div className="p-8">
              <div className="mb-8">
                <label className="block text-gray-700 font-semibold mb-2">{t('emailLabel')}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="text-lg font-semibold">{t('serviceFee')}</h4>
                    <p className="text-purple-100">Complete processing and submission</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{t('price')}</div>
                    <div className="text-purple-200 text-sm">One-time fee</div>
                  </div>
                </div>
                
                <div className="border-t border-white/20 pt-4 mt-4">
                  <p className="font-semibold mb-2">{t('serviceIncludes')}:</p>
                  <ul className="space-y-2 text-purple-100">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span>{t('benefit1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span>{t('benefit2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span>{t('benefit3')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span>{t('benefit4')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={!email || isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-2xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 font-semibold text-lg shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>{t('payNow')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showWelcome) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-indigo-700 to-teal-700"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-transparent to-teal-900/50"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Italian Fiscal Code</div>
                  <div className="text-purple-200 text-sm">PDF Assistant Service</div>
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

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-xl">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            PROFESSIONAL ITALIAN BUREAUCRACY SERVICE
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 leading-tight">
            Get Your Italian<br />
            <span className="font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
              Codice Fiscale
            </span>
          </h1>
          
          <div className="max-w-4xl mx-auto mb-10">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
              <p className="text-xl md:text-2xl text-white font-medium mb-3">
                We guide you through every field in your preferred language
              </p>
              <p className="text-lg md:text-xl text-white/90 font-light">
                Professional assistance, multilingual support, and expert guidance—all in one place
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl text-white font-medium hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-emerald-300" />
                <span>✓ 8 Languages</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl text-white font-medium hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <FileCheck className="w-5 h-5 text-blue-300" />
                <span>✓ Official Form</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl text-white font-medium hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span>✓ Expert Guidance</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 max-w-3xl mx-auto mb-12 shadow-2xl">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Download className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Step 1: Download the Official Form</h2>
            <p className="text-white/80 mb-8">Download the official Italian fiscal code application form (AA4/8) to get started</p>
            
            <a
              href="/AA4-8-fiscal-code-form.pdf"
              download="AA4-8-fiscal-code-form.pdf"
              className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md text-purple-700 px-8 py-4 rounded-full font-bold hover:bg-white hover:shadow-2xl transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              <span>Download Official Form AA4/8</span>
            </a>
            
            <p className="text-white/60 text-sm mt-4">PDF • 2 pages • Italian Revenue Agency</p>
          </div>

          <button
            onClick={() => setShowWelcome(false)}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-5 rounded-full font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-lg"
          >
            Start Guided Form Filling
          </button>
          
          <div className="mt-16 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 inline-block shadow-xl">
            <p className="text-white font-medium text-lg mb-3">Questions? We're here to help.</p>
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

  if (formCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <FileCheck className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Form Completed!</h2>
            <p className="text-lg text-gray-600 mb-8">
              Great job! You've successfully filled out your fiscal code application form.
            </p>

            {!uploadedPDF ? (
              <>
                <p className="text-gray-600 mb-6">{t('uploadDesc')}</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  <Upload className="w-5 h-5" />
                  <span>{t('uploadCompleted')}</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
                  <p className="text-emerald-700 font-medium">✓ PDF uploaded successfully</p>
                  <p className="text-emerald-600 text-sm">{uploadedPDF.name}</p>
                </div>
                <button
                  onClick={() => setShowPayment(true)}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  <span>{t('proceedPayment')}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Italian Fiscal Code</h1>
                <p className="text-gray-600 text-sm">Field-by-Field Assistant</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Progress:</span>
                <div className="w-32 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-purple-600">{Math.round(progress)}%</span>
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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-6 sticky top-24 border border-white/20">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-600">Form Progress</span>
                  <span className="text-sm font-bold text-purple-600">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 h-3 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <h3 className="font-bold text-gray-800 mb-4">Field Navigation</h3>
              <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                {formFields.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{section.section}</h4>
                    <div className="space-y-1">
                      {section.fields.map((field, fieldIndex) => {
                        const globalIndex = formFields
                          .slice(0, sectionIndex)
                          .reduce((acc, s) => acc + s.fields.length, 0) + fieldIndex;
                        const isActive = globalIndex === currentField;
                        
                        return (
                          <button
                            key={field.id}
                            onClick={() => setCurrentField(globalIndex)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
                              isActive 
                                ? 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 font-medium shadow-sm' 
                                : 'hover:bg-gray-100 text-gray-600'
                            }`}
                          >
                            {field.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden">
              <div className={`bg-gradient-to-r from-purple-600 to-indigo-600 p-8`}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Edit3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {currentFieldData?.label}
                    </h2>
                    <p className="text-white/80">
                      {formFields.find(s => s.fields.includes(currentFieldData))?.section} • Field {currentField + 1} of {allFields.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 mb-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-blue-900 mb-2">Instructions:</h3>
                      <p className="text-blue-800 text-lg leading-relaxed">
                        {currentFieldData?.instruction[currentLanguage] || currentFieldData?.instruction.en}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 mb-6">
                  <h3 className="font-bold text-emerald-900 mb-2">Example:</h3>
                  <p className="text-emerald-700 font-mono text-lg bg-white/50 px-4 py-2 rounded-xl inline-block">{currentFieldData?.example}</p>
                </div>

                {currentFieldData?.highlight && (
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-5">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-amber-800 font-medium">{currentFieldData.highlight}</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center mt-10 pt-8 border-t border-gray-200">
                  <button
                    onClick={() => setCurrentField(Math.max(0, currentField - 1))}
                    disabled={currentField === 0}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    <ChevronRight className="w-5 h-5 rotate-180" />
                    <span>Previous Field</span>
                  </button>
                  
                  {currentField === allFields.length - 1 ? (
                    <button
                      onClick={() => setFormCompleted(true)}
                      className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold transform hover:scale-105"
                    >
                      <Check className="w-5 h-5" />
                      <span>Complete Form</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentField(Math.min(allFields.length - 1, currentField + 1))}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                    >
                      <span>Next Field</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItalianFiscalCodeAssistant;
