import React, { useState, useEffect } from 'react';
import { FileText, ChevronRight, Download, Upload, Check, AlertCircle, Globe, HelpCircle, Eye, Edit3, Sparkles, CreditCard } from 'lucide-react';

const ItalianFiscalCodeAssistant = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentField, setCurrentField] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [uploadedPdf, setUploadedPdf] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  // Initialize EmailJS
  useEffect(() => {
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
      welcome: 'Italian Fiscal Code Assistant',
      subtitle: 'Fill out your form with expert guidance',
      startButton: 'Start with Official Form',
      downloadForm: 'Download Official Form',
      uploadForm: 'Upload Your Form',
      orText: 'OR',
      uploadDesc: 'Already have the form? Upload it here',
      fieldGuide: 'Field Guide',
      currentField: 'Current Field',
      whatToWrite: 'What to write',
      example: 'Example',
      tips: 'Important Tips',
      markComplete: 'Mark Field as Complete',
      allFieldsComplete: 'All Fields Complete - Submit Form',
      uploadCompleted: 'Upload Completed Form',
      email: 'Your Email',
      submitPay: 'Submit & Pay €75'
    }
  };

  const t = (key) => translations[currentLanguage]?.[key] || translations.en[key];

  const formFields = [
    {
      id: 'request_type',
      section: 'QUADRO A - Sezione II',
      label: 'Request Type (Tipo richiesta)',
      page: 1,
      position: { top: '30%', left: '10%', width: '15%', height: '15%' },
      instruction: {
        en: 'Check box 1 - "ATTRIBUZIONE CODICE FISCALE" (Attribution of Fiscal Code) for your first fiscal code. This is the most common option for foreigners.',
        it: 'Spuntare la casella 1 - "ATTRIBUZIONE CODICE FISCALE" per il primo codice fiscale.',
        fr: 'Cochez la case 1 - "ATTRIBUZIONE CODICE FISCALE" pour votre premier code fiscal.',
        es: 'Marque la casilla 1 - "ATTRIBUZIONE CODICE FISCALE" para su primer código fiscal.',
        zh: '勾选框1 - "ATTRIBUZIONE CODICE FISCALE"（税号分配）获取您的第一个税号'
      },
      example: '✓ in box 1',
      tips: 'Most international applicants need option 1. Options 2-5 are for updates or special cases.'
    },
    {
      id: 'requester_type',
      section: 'QUADRO A - Sezione I',
      label: 'Requester Type',
      page: 1,
      position: { top: '25%', left: '50%', width: '10%', height: '5%' },
      instruction: {
        en: 'Check "D" if you are applying for yourself (RICHIESTA DIRETTA). Check "T" only if applying on behalf of someone else.',
        it: 'Spuntare "D" per richiesta diretta per se stessi. Spuntare "T" solo se per conto terzi.',
        fr: 'Cochez "D" pour une demande directe. Cochez "T" uniquement si pour quelqu\'un d\'autre.',
        es: 'Marque "D" para solicitud directa. Marque "T" solo si es para otra persona.',
        zh: '如果为自己申请，勾选"D"（直接申请）。如果代他人申请，勾选"T"'
      },
      example: '✓ D',
      tips: 'Unless you are a parent applying for a child or a legal representative, always choose "D"'
    },
    {
      id: 'cognome',
      section: 'QUADRO B',
      label: 'COGNOME (Last Name)',
      page: 1,
      position: { top: '45%', left: '10%', width: '40%', height: '5%' },
      instruction: {
        en: 'Write your LAST NAME / SURNAME / FAMILY NAME in CAPITAL LETTERS exactly as it appears on your passport. Include all parts of compound surnames.',
        it: 'Scrivere il COGNOME in STAMPATELLO come sul passaporto. Includere tutti i cognomi composti.',
        fr: 'Écrivez votre NOM DE FAMILLE en MAJUSCULES exactement comme sur le passeport.',
        es: 'Escriba su APELLIDO en MAYÚSCULAS exactamente como en el pasaporte.',
        zh: '用大写字母写您的姓氏，与护照上完全一致'
      },
      example: 'SMITH, MÜLLER-SCHMIDT, DE LA CRUZ',
      tips: 'Use BLOCK CAPITALS. Include hyphens, spaces, and special characters exactly as shown in passport.'
    },
    {
      id: 'nome',
      section: 'QUADRO B',
      label: 'NOME (First Name)',
      page: 1,
      position: { top: '45%', left: '55%', width: '40%', height: '5%' },
      instruction: {
        en: 'Write your FIRST NAME(S) / GIVEN NAME(S) in CAPITAL LETTERS. Include all given names as shown on passport, including middle names.',
        it: 'Scrivere il/i NOME/I in STAMPATELLO. Includere tutti i nomi come sul passaporto.',
        fr: 'Écrivez votre/vos PRÉNOM(S) en MAJUSCULES. Incluez tous les prénoms du passeport.',
        es: 'Escriba su(s) NOMBRE(S) en MAYÚSCULAS. Incluya todos los nombres del pasaporte.',
        zh: '用大写字母写您的名字，包括所有名字'
      },
      example: 'JOHN PAUL, MARIA TERESA',
      tips: 'Include ALL given names. If you have multiple first names, write them all.'
    },
    {
      id: 'sesso',
      section: 'QUADRO B',
      label: 'SESSO (Gender)',
      page: 1,
      position: { top: '50%', left: '10%', width: '5%', height: '5%' },
      instruction: {
        en: 'Write "M" for Male (Maschio) or "F" for Female (Femmina) in the small box.',
        it: 'Scrivere "M" per Maschio o "F" per Femmina nella casella.',
        fr: 'Écrivez "M" pour Masculin ou "F" pour Féminin dans la case.',
        es: 'Escriba "M" para Masculino o "F" para Femenino en la casilla.',
        zh: '在小框中写"M"（男性）或"F"（女性）'
      },
      example: 'M or F',
      tips: 'Single letter only. Must match your official documents.'
    },
    {
      id: 'data_nascita',
      section: 'QUADRO B',
      label: 'DATA DI NASCITA (Date of Birth)',
      page: 1,
      position: { top: '50%', left: '20%', width: '20%', height: '5%' },
      instruction: {
        en: 'Write date in format GG/MM/AAAA (day/month/year). Each number in its own box. Example: 15/03/1985',
        it: 'Scrivere la data nel formato GG/MM/AAAA. Ogni numero nella propria casella.',
        fr: 'Écrivez la date au format JJ/MM/AAAA. Chaque chiffre dans sa case.',
        es: 'Escriba la fecha en formato DD/MM/AAAA. Cada número en su casilla.',
        zh: '按GG/MM/AAAA格式写日期（日/月/年）'
      },
      example: '15/03/1985',
      tips: 'European format: day first, then month. Write 01 not just 1 for single digits.'
    },
    {
      id: 'comune_nascita',
      section: 'QUADRO B',
      label: 'COMUNE DI NASCITA (Place of Birth)',
      page: 1,
      position: { top: '55%', left: '10%', width: '40%', height: '5%' },
      instruction: {
        en: 'Write the CITY/TOWN where you were born. For foreign births, write city name and country in parentheses.',
        it: 'Scrivere la CITTÀ di nascita. Per nascite estere, città e stato tra parentesi.',
        fr: 'Écrivez la VILLE de naissance. Pour naissances étrangères, ville et pays entre parenthèses.',
        es: 'Escriba la CIUDAD de nacimiento. Para nacimientos extranjeros, ciudad y país entre paréntesis.',
        zh: '写出生城市。国外出生写城市和国家'
      },
      example: 'LONDON (UK), NEW YORK (USA), TORONTO (CANADA)',
      tips: 'Always add country in parentheses if born outside Italy.'
    },
    {
      id: 'provincia',
      section: 'QUADRO B',
      label: 'PROVINCIA (Province)',
      page: 1,
      position: { top: '55%', left: '55%', width: '10%', height: '5%' },
      instruction: {
        en: 'For births outside Italy, write "EE" (Esteri = Foreign). For Italian births, use the 2-letter province code.',
        it: 'Per nascite all\'estero scrivere "EE". Per nascite in Italia, sigla provincia.',
        fr: 'Pour naissances à l\'étranger, écrivez "EE". Pour Italie, code province.',
        es: 'Para nacimientos en el extranjero, escriba "EE". Para Italia, código provincia.',
        zh: '国外出生写"EE"。意大利出生写省份代码'
      },
      example: 'EE',
      tips: 'Almost all international applicants write "EE" here.'
    },
    {
      id: 'indirizzo',
      section: 'QUADRO C',
      label: 'INDIRIZZO (Address)',
      page: 1,
      position: { top: '65%', left: '10%', width: '60%', height: '5%' },
      instruction: {
        en: 'First box: street type (Via, Piazza, etc.). Second box: street name. Third box: house number.',
        it: 'Prima casella: tipo via. Seconda: nome via. Terza: numero civico.',
        fr: 'Première case: type de rue. Deuxième: nom. Troisième: numéro.',
        es: 'Primera casilla: tipo de calle. Segunda: nombre. Tercera: número.',
        zh: '第一格：街道类型。第二格：街道名。第三格：门牌号'
      },
      example: 'TIPOLOGIA: Via | INDIRIZZO: Roma | N.CIVICO: 42',
      tips: 'If living abroad, write your foreign address here and complete QUADRO D.'
    },
    {
      id: 'comune_residenza',
      section: 'QUADRO C',
      label: 'COMUNE (City of Residence)',
      page: 1,
      position: { top: '70%', left: '10%', width: '30%', height: '5%' },
      instruction: {
        en: 'Write the city where you currently live. Use the Italian name if it\'s an Italian city.',
        it: 'Scrivere il comune di residenza attuale.',
        fr: 'Écrivez la ville de résidence actuelle.',
        es: 'Escriba la ciudad de residencia actual.',
        zh: '写当前居住城市'
      },
      example: 'MILANO, ROMA, FIRENZE',
      tips: 'For foreign residents, write your foreign city here and complete QUADRO D.'
    },
    {
      id: 'stato_estero',
      section: 'QUADRO D',
      label: 'STATO ESTERO (Foreign Country)',
      page: 1,
      position: { top: '80%', left: '10%', width: '30%', height: '5%' },
      instruction: {
        en: 'If you live outside Italy, write your country name here in CAPITAL LETTERS.',
        it: 'Se residente all\'estero, scrivere il nome del paese in STAMPATELLO.',
        fr: 'Si résident à l\'étranger, écrivez le pays en MAJUSCULES.',
        es: 'Si reside en el extranjero, escriba el país en MAYÚSCULAS.',
        zh: '如果居住在意大利境外，用大写字母写国家名称'
      },
      example: 'UNITED STATES, UNITED KINGDOM, CANADA',
      tips: 'Only fill this if you don\'t live in Italy. Use the official country name.'
    },
    {
      id: 'data_firma',
      section: 'SOTTOSCRIZIONE',
      label: 'DATA (Date)',
      page: 2,
      position: { top: '85%', left: '10%', width: '20%', height: '5%' },
      instruction: {
        en: 'Write today\'s date in format GG/MM/AAAA (day/month/year).',
        it: 'Scrivere la data odierna nel formato GG/MM/AAAA.',
        fr: 'Écrivez la date du jour au format JJ/MM/AAAA.',
        es: 'Escriba la fecha de hoy en formato DD/MM/AAAA.',
        zh: '按GG/MM/AAAA格式写今天的日期'
      },
      example: '16/07/2025',
      tips: 'Use the date you sign the form, not when you submit it.'
    },
    {
      id: 'firma',
      section: 'SOTTOSCRIZIONE',
      label: 'FIRMA (Signature)',
      page: 2,
      position: { top: '85%', left: '40%', width: '40%', height: '10%' },
      instruction: {
        en: 'Sign your name as it normally appears on official documents. Use blue or black ink.',
        it: 'Firmare come sui documenti ufficiali. Usare inchiostro blu o nero.',
        fr: 'Signez comme sur les documents officiels. Encre bleue ou noire.',
        es: 'Firme como en documentos oficiales. Tinta azul o negra.',
        zh: '按照官方文件上的签名方式签名。使用蓝色或黑色墨水'
      },
      example: 'Your regular signature',
      tips: 'Must match your passport signature style. Don\'t print - use cursive signature.'
    }
  ];

  const [completedFields, setCompletedFields] = useState([]);
  const currentFieldData = formFields[currentField];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      setUploadedPdf(file);
      setShowWelcome(false);
    }
  };

  const markFieldComplete = () => {
    if (!completedFields.includes(currentField)) {
      setCompletedFields([...completedFields, currentField]);
    }
    if (currentField < formFields.length - 1) {
      setCurrentField(currentField + 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const newApplicationId = `FC-${Date.now()}`;
    setApplicationId(newApplicationId);

    try {
      // Send emails
      await sendUserConfirmation(newApplicationId);
      await sendAgencyNotification(newApplicationId);
      
      setShowPayment(false);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error:', error);
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Application Submitted!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your completed form has been sent to our processing team. You'll receive updates via email.
          </p>
          
          <div className="bg-emerald-50 rounded-2xl p-6 mb-8">
            <p className="text-gray-700">Application ID: <span className="font-bold">{applicationId}</span></p>
            <p className="text-gray-700 mt-2">Email confirmation sent to: <span className="font-bold">{email}</span></p>
          </div>
          
          <p className="text-gray-500">Processing time: 5-7 business days</p>
        </div>
      </div>
    );
  }

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-center">
            <CreditCard className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white">Complete Your Application</h2>
          </div>
          
          <div className="p-8">
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">{t('email')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div className="bg-purple-50 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700 font-semibold">Service Fee</span>
                <span className="text-2xl font-bold text-purple-600">€75</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Professional form review</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Official submission to authorities</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Status updates via email</span>
                </li>
              </ul>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={!email || isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : t('submitPay')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showWelcome) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-indigo-700 to-teal-700">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">{t('welcome')}</div>
                  <div className="text-purple-200 text-sm">{t('subtitle')}</div>
                </div>
              </div>
              
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl"
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

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-light text-white mb-8">
            Fill Your <span className="font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">Codice Fiscale</span> Form
          </h1>
          
          <p className="text-xl text-white/90 mb-12">
            We'll guide you through every field in your preferred language
          </p>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Option 1</h3>
                <p className="text-white/80 mb-6">{t('downloadForm')}</p>
                <a
                  href="/AA4-8-fiscal-code-form.pdf"
                  download="AA4-8-fiscal-code-form.pdf"
                  onClick={() => setPdfUrl('/AA4-8-fiscal-code-form.pdf')}
                  className="inline-flex items-center gap-2 bg-white/90 text-purple-700 px-6 py-3 rounded-full font-bold hover:bg-white transition-all"
                >
                  <Download className="w-5 h-5" />
                  <span>Download PDF</span>
                </a>
              </div>
              
              <div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Option 2</h3>
                <p className="text-white/80 mb-6">{t('uploadDesc')}</p>
                <label className="inline-flex items-center gap-2 bg-white/90 text-purple-700 px-6 py-3 rounded-full font-bold hover:bg-white transition-all cursor-pointer">
                  <Upload className="w-5 h-5" />
                  <span>{t('uploadForm')}</span>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/20">
              <button
                onClick={() => {
                  setPdfUrl('/AA4-8-fiscal-code-form.pdf');
                  setShowWelcome(false);
                }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all"
              >
                {t('startButton')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-purple-600" />
              <h1 className="text-lg font-bold text-gray-800">{t('fieldGuide')}</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <span className="text-gray-600">Progress: </span>
                <span className="font-bold text-purple-600">
                  {completedFields.length} / {formFields.length} fields
                </span>
              </div>
              
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-1.5"
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

      <div className="flex h-[calc(100vh-60px)]">
        {/* PDF Viewer */}
        <div className="flex-1 bg-gray-200 relative overflow-hidden">
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              className="w-full h-full"
              title="Fiscal Code Form"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p>PDF will be displayed here</p>
              </div>
            </div>
          )}
          
          {/* Field Highlight Overlay */}
          {currentFieldData && (
            <div
              className="absolute border-4 border-red-500 rounded-lg pointer-events-none animate-pulse"
              style={{
                top: currentFieldData.position.top,
                left: currentFieldData.position.left,
                width: currentFieldData.position.width,
                height: currentFieldData.position.height,
              }}
            >
              <div className="absolute -top-8 left-0 bg-red-500 text-white px-3 py-1 rounded-t-lg text-sm font-bold">
                Fill this field
              </div>
            </div>
          )}
        </div>

        {/* Instructions Panel */}
        <div className="w-96 bg-white shadow-xl overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                {currentFieldData?.section}
              </h2>
              <h3 className="text-2xl font-bold text-gray-800">
                {currentFieldData?.label}
              </h3>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">{t('whatToWrite')}</h4>
                    <p className="text-blue-800">
                      {currentFieldData?.instruction[currentLanguage] || currentFieldData?.instruction.en}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                <h4 className="font-semibold text-emerald-900 mb-2">{t('example')}</h4>
                <p className="font-mono text-lg text-emerald-700 bg-white px-3 py-2 rounded">
                  {currentFieldData?.example}
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-2">{t('tips')}</h4>
                    <p className="text-amber-800">{currentFieldData?.tips}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={markFieldComplete}
                className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  completedFields.includes(currentField)
                    ? 'bg-green-100 text-green-700'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {completedFields.includes(currentField) ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" />
                    Field Completed
                  </span>
                ) : (
                  t('markComplete')
                )}
              </button>

              {completedFields.length === formFields.length && (
                <button
                  onClick={() => setShowPayment(true)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  {t('allFieldsComplete')}
                </button>
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="font-semibold text-gray-700 mb-3">All Fields</h4>
              <div className="space-y-1">
                {formFields.map((field, index) => (
                  <button
                    key={field.id}
                    onClick={() => setCurrentField(index)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      index === currentField
                        ? 'bg-purple-100 text-purple-700 font-medium'
                        : completedFields.includes(index)
                        ? 'bg-green-50 text-green-700'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {completedFields.includes(index) && <Check className="w-4 h-4" />}
                      {field.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItalianFiscalCodeAssistant;
