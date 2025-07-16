import React, { useState, useEffect } from 'react';
import { FileText, Download, Check, AlertCircle, HelpCircle, ChevronRight, ChevronLeft, Globe, Printer, Upload, FileCheck } from 'lucide-react';

const ItalianFiscalCodeAssistant = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState(0);
  const [showPrintView, setShowPrintView] = useState(false);
  const [showSubmissionConfirmation, setShowSubmissionConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    requestType: '1',
    requesterType: 'D',
    cognome: '',
    nome: '',
    sesso: '',
    dataNascita: '',
    comuneNascita: '',
    provinciaNascita: 'EE',
    tipoVia: '',
    nomeVia: '',
    numeroCivico: '',
    cap: '',
    comuneResidenza: '',
    provinciaResidenza: '',
    statoEstero: '',
    indirizzoEstero: '',
    localitaEstera: '',
    dataFirma: new Date().toLocaleDateString('it-IT'),
    email: '',
    telefono: '',
    signature: '',
    signatureFile: null,
    signaturePreview: '',
    passportFile: null,
    passportPreview: '',
    proofOfResidence: null,
    proofOfResidencePreview: '',
    // Delegation info - Giuseppe Funaro
    delegateName: 'GIUSEPPE FUNARO',
    delegateFiscalCode: 'FNRGPP69B14C800K',
    delegateBirthPlace: 'CLUSONE (BG)',
    delegateBirthDate: '14/02/1969'
  });
  const [errors, setErrors] = useState({});

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
      title: 'Italian Fiscal Code Application',
      subtitle: 'Complete your official form with guided assistance',
      next: 'Next',
      previous: 'Previous',
      generatePDF: 'Generate & Print Form',
      downloadPDF: 'Download Your Completed Form',
      required: 'This field is required',
      step: 'Step',
      of: 'of',
      complete: 'Complete',
      almostThere: 'Almost there!',
      reviewInfo: 'Review your information and generate your filled form.',
      generatingPDF: 'Preparing your form...',
      pdfReady: 'Your form is ready!',
      startOver: 'Start New Application',
      contactInfo: 'Contact Information',
      helpText: 'We\'ll guide you through each field of the official form',
      printInstructions: 'Click "Print" below or use Ctrl+P (Cmd+P on Mac) to save as PDF',
      print: 'Print / Save as PDF',
      signatureTitle: 'Digital Signature & Documents',
      drawSignature: 'Draw your signature below',
      clearSignature: 'Clear',
      uploadSignature: 'Upload Signature Image',
      signatureHelper: 'Upload a PNG image of your signature (transparent background recommended)',
      uploadPassport: 'Upload Passport Copy',
      passportHelper: 'Upload a clear photo or scan of your passport (main page with photo)',
      submitApplication: 'Submit Complete Application',
      applicationComplete: 'Application Complete!',
      documentsReceived: 'We have received your signed form and passport copy.',
      nextSteps: 'Next Steps',
      step1: 'We will review your application within 24 hours',
      step2: 'Submit your documents to the Italian consulate or tax office',
      step3: 'Your fiscal code will be issued within 5-7 business days',
      downloadSignedForm: 'Download Signed Form',
      signatureRequired: 'Please add your signature',
      passportRequired: 'Please upload your passport copy',
      proofOfResidenceRequired: 'Please upload your proof of residence',
      uploadProofOfResidence: 'Upload Proof of Residence'
    },
    it: {
      title: 'Richiesta Codice Fiscale',
      subtitle: 'Compila il modulo ufficiale con assistenza guidata',
      next: 'Avanti',
      previous: 'Indietro',
      generatePDF: 'Genera e Stampa Modulo',
      downloadPDF: 'Scarica il Modulo Compilato',
      required: 'Campo obbligatorio',
      step: 'Passo',
      of: 'di',
      complete: 'Completo',
      almostThere: 'Ci siamo quasi!',
      reviewInfo: 'Rivedi le tue informazioni e genera il modulo compilato.',
      generatingPDF: 'Preparazione modulo in corso...',
      pdfReady: 'Il tuo modulo è pronto!',
      startOver: 'Nuova Richiesta',
      contactInfo: 'Informazioni di Contatto',
      helpText: 'Ti guideremo attraverso ogni campo del modulo ufficiale',
      printInstructions: 'Clicca "Stampa" o usa Ctrl+P (Cmd+P su Mac) per salvare come PDF',
      print: 'Stampa / Salva come PDF',
      signatureTitle: 'Firma Digitale e Documenti',
      drawSignature: 'Disegna la tua firma qui sotto',
      clearSignature: 'Cancella',
      uploadSignature: 'Carica Immagine Firma',
      signatureHelper: 'Carica un\'immagine PNG della tua firma (sfondo trasparente consigliato)',
      uploadPassport: 'Carica Copia Passaporto',
      passportHelper: 'Carica una foto o scansione chiara del passaporto (pagina principale con foto)',
      submitApplication: 'Invia Domanda Completa',
      applicationComplete: 'Domanda Completata!',
      documentsReceived: 'Abbiamo ricevuto il modulo firmato e la copia del passaporto.',
      nextSteps: 'Prossimi Passi',
      step1: 'Esamineremo la domanda entro 24 ore',
      step2: 'Presenta i documenti al consolato o all\'ufficio delle entrate',
      step3: 'Il codice fiscale sarà emesso entro 5-7 giorni lavorativi',
      downloadSignedForm: 'Scarica Modulo Firmato',
      signatureRequired: 'Aggiungi la tua firma',
      passportRequired: 'Carica la copia del passaporto',
      proofOfResidenceRequired: 'Carica la prova di residenza',
      uploadProofOfResidence: 'Carica Prova di Residenza'
    }
  };

  const t = (key) => translations[currentLanguage]?.[key] || translations.en[key];

  const formSteps = [
    {
      id: 'request_type',
      title: 'Request Type / Tipo richiesta',
      fields: [
        {
          name: 'requestType',
          type: 'radio',
          label: {
            en: 'What type of request are you making?',
            it: 'Che tipo di richiesta stai facendo?',
            fr: 'Quel type de demande faites-vous?',
            es: '¿Qué tipo de solicitud está haciendo?',
            zh: '您要提出什么类型的申请？'
          },
          options: [
            { value: '1', label: 'New Fiscal Code (First time)', labelIt: 'ATTRIBUZIONE (Prima volta)' },
            { value: '2', label: 'Communication of data variation', labelIt: 'COMUNICAZIONE VARIAZIONE DATI' },
            { value: '3', label: 'Communication of merger', labelIt: 'COMUNICAZIONE AVVENUTA FUSIONE' },
            { value: '4', label: 'Request for duplicate card', labelIt: 'RICHIESTA DUPLICATO TESSERINO' },
            { value: '5', label: 'Request for attribution following identification', labelIt: 'RICHIESTA ATTRIBUZIONE A SEGUITO IDENTIFICAZIONE' }
          ],
          help: {
            en: 'Most foreign applicants need option 1 - "New Fiscal Code" for their first Italian tax number.',
            it: 'La maggior parte dei richiedenti stranieri necessita dell\'opzione 1 - "ATTRIBUZIONE" per il primo codice fiscale.',
            fr: 'La plupart des demandeurs étrangers ont besoin de l\'option 1 - "Nouveau code fiscal".',
            es: 'La mayoría de los solicitantes extranjeros necesitan la opción 1 - "Nuevo código fiscal".',
            zh: '大多数外国申请人需要选择选项1 - "新税号"。'
          },
          required: true
        },
        {
          name: 'requesterType',
          type: 'radio',
          label: {
            en: 'Are you applying for yourself or someone else?',
            it: 'Stai facendo domanda per te stesso o per qualcun altro?',
            fr: 'Faites-vous une demande pour vous-même ou pour quelqu\'un d\'autre?',
            es: '¿Está solicitando para usted o para otra persona?',
            zh: '您是为自己还是为他人申请？'
          },
          options: [
            { value: 'D', label: 'For myself', labelIt: 'DIRETTA (Per me stesso)' },
            { value: 'T', label: 'For someone else', labelIt: 'PER CONTO DI TERZI' }
          ],
          help: {
            en: 'Choose "For myself" unless you are a parent applying for a child or a legal representative.',
            it: 'Scegli "Per me stesso" a meno che tu non sia un genitore che fa domanda per un figlio.',
            fr: 'Choisissez "Pour moi-même" sauf si vous êtes un parent demandant pour un enfant.',
            es: 'Elija "Para mí" a menos que sea un padre solicitando para un hijo.',
            zh: '选择"为自己"，除非您是为孩子申请的父母或法定代表人。'
          },
          required: true
        }
      ]
    },
    {
      id: 'personal_info',
      title: 'Personal Information / Dati Anagrafici',
      fields: [
        {
          name: 'cognome',
          type: 'text',
          label: {
            en: 'Last Name / Surname (COGNOME)',
            it: 'Cognome',
            fr: 'Nom de famille',
            es: 'Apellido',
            zh: '姓氏'
          },
          placeholder: 'SMITH',
          help: {
            en: 'Enter your last name in CAPITAL LETTERS exactly as it appears on your passport.',
            it: 'Inserisci il cognome in STAMPATELLO come sul passaporto.',
            fr: 'Entrez votre nom en MAJUSCULES exactement comme sur le passeport.',
            es: 'Ingrese su apellido en MAYÚSCULAS exactamente como en el pasaporte.',
            zh: '用大写字母输入您的姓氏，与护照上完全一致。'
          },
          transform: 'uppercase',
          required: true
        },
        {
          name: 'nome',
          type: 'text',
          label: {
            en: 'First Name(s) / Given Name(s) (NOME)',
            it: 'Nome',
            fr: 'Prénom(s)',
            es: 'Nombre(s)',
            zh: '名字'
          },
          placeholder: 'JOHN PAUL',
          help: {
            en: 'Enter ALL your first names in CAPITAL LETTERS. Include middle names if on passport.',
            it: 'Inserisci TUTTI i nomi in STAMPATELLO.',
            fr: 'Entrez TOUS vos prénoms en MAJUSCULES.',
            es: 'Ingrese TODOS sus nombres en MAYÚSCULAS.',
            zh: '用大写字母输入您的所有名字。'
          },
          transform: 'uppercase',
          required: true
        },
        {
          name: 'sesso',
          type: 'radio',
          label: {
            en: 'Gender (SESSO)',
            it: 'Sesso',
            fr: 'Sexe',
            es: 'Sexo',
            zh: '性别'
          },
          options: [
            { value: 'M', label: 'Male', labelIt: 'Maschio' },
            { value: 'F', label: 'Female', labelIt: 'Femmina' }
          ],
          help: {
            en: 'Select your gender as it appears on official documents.',
            it: 'Seleziona il sesso come sui documenti ufficiali.',
            fr: 'Sélectionnez votre sexe comme sur les documents officiels.',
            es: 'Seleccione su sexo como en los documentos oficiales.',
            zh: '选择您在官方文件上的性别。'
          },
          required: true
        },
        {
          name: 'dataNascita',
          type: 'date',
          label: {
            en: 'Date of Birth (DATA DI NASCITA)',
            it: 'Data di nascita',
            fr: 'Date de naissance',
            es: 'Fecha de nacimiento',
            zh: '出生日期'
          },
          help: {
            en: 'Select your birth date. It will be formatted as DD/MM/YYYY on the form.',
            it: 'Seleziona la data di nascita. Sarà formattata come GG/MM/AAAA.',
            fr: 'Sélectionnez votre date de naissance. Format: JJ/MM/AAAA.',
            es: 'Seleccione su fecha de nacimiento. Formato: DD/MM/AAAA.',
            zh: '选择您的出生日期。格式：日/月/年。'
          },
          required: true
        }
      ]
    },
    {
      id: 'birth_place',
      title: 'Place of Birth / Luogo di Nascita',
      fields: [
        {
          name: 'comuneNascita',
          type: 'text',
          label: {
            en: 'City/Town of Birth (COMUNE DI NASCITA)',
            it: 'Comune di nascita',
            fr: 'Ville de naissance',
            es: 'Ciudad de nacimiento',
            zh: '出生城市'
          },
          placeholder: 'LONDON (UK)',
          help: {
            en: 'Enter the city where you were born. For foreign births, add country in parentheses.',
            it: 'Inserisci la città di nascita. Per nascite estere, aggiungi il paese tra parentesi.',
            fr: 'Entrez la ville de naissance. Pour l\'étranger, ajoutez le pays entre parenthèses.',
            es: 'Ingrese la ciudad de nacimiento. Para el extranjero, añada el país entre paréntesis.',
            zh: '输入出生城市。国外出生请在括号中添加国家。'
          },
          transform: 'uppercase',
          required: true
        },
        {
          name: 'provinciaNascita',
          type: 'text',
          label: {
            en: 'Province of Birth (PROVINCIA)',
            it: 'Provincia di nascita',
            fr: 'Province de naissance',
            es: 'Provincia de nacimiento',
            zh: '出生省份'
          },
          placeholder: 'EE',
          help: {
            en: 'For births outside Italy, always write "EE" (Esteri = Foreign).',
            it: 'Per nascite all\'estero, scrivere sempre "EE".',
            fr: 'Pour les naissances à l\'étranger, écrivez toujours "EE".',
            es: 'Para nacimientos en el extranjero, escriba siempre "EE".',
            zh: '国外出生始终写"EE"。'
          },
          transform: 'uppercase',
          maxLength: 2,
          required: true
        }
      ]
    },
    {
      id: 'residence',
      title: 'Current Residence / Residenza',
      fields: [
        {
          name: 'livingInItaly',
          type: 'radio',
          label: {
            en: 'Do you currently live in Italy?',
            it: 'Vivi attualmente in Italia?',
            fr: 'Vivez-vous actuellement en Italie?',
            es: '¿Vive actualmente en Italia?',
            zh: '您目前居住在意大利吗？'
          },
          options: [
            { value: 'yes', label: 'Yes, I live in Italy', labelIt: 'Sì, vivo in Italia' },
            { value: 'no', label: 'No, I live abroad', labelIt: 'No, vivo all\'estero' }
          ],
          help: {
            en: 'This determines which address section to complete.',
            it: 'Questo determina quale sezione indirizzo compilare.',
            fr: 'Cela détermine quelle section d\'adresse remplir.',
            es: 'Esto determina qué sección de dirección completar.',
            zh: '这决定了要填写哪个地址部分。'
          },
          required: true
        }
      ]
    },
    {
      id: 'italian_address',
      title: 'Italian Address / Indirizzo in Italia',
      condition: (data) => data.livingInItaly === 'yes',
      fields: [
        {
          name: 'tipoVia',
          type: 'select',
          label: {
            en: 'Street Type (TIPOLOGIA)',
            it: 'Tipologia via',
            fr: 'Type de rue',
            es: 'Tipo de calle',
            zh: '街道类型'
          },
          options: [
            { value: 'Via', label: 'Via (Street)' },
            { value: 'Piazza', label: 'Piazza (Square)' },
            { value: 'Corso', label: 'Corso (Avenue)' },
            { value: 'Viale', label: 'Viale (Boulevard)' },
            { value: 'Largo', label: 'Largo' },
            { value: 'Vicolo', label: 'Vicolo (Alley)' }
          ],
          help: {
            en: 'Select the type of street from the dropdown.',
            it: 'Seleziona il tipo di via dal menu.',
            fr: 'Sélectionnez le type de rue.',
            es: 'Seleccione el tipo de calle.',
            zh: '从下拉菜单中选择街道类型。'
          },
          required: true
        },
        {
          name: 'nomeVia',
          type: 'text',
          label: {
            en: 'Street Name (INDIRIZZO)',
            it: 'Nome via',
            fr: 'Nom de la rue',
            es: 'Nombre de la calle',
            zh: '街道名称'
          },
          placeholder: 'Roma',
          help: {
            en: 'Enter only the street name, without the type.',
            it: 'Inserisci solo il nome della via, senza il tipo.',
            fr: 'Entrez seulement le nom de la rue.',
            es: 'Ingrese solo el nombre de la calle.',
            zh: '只输入街道名称。'
          },
          required: true
        },
        {
          name: 'numeroCivico',
          type: 'text',
          label: {
            en: 'House Number (N. CIVICO)',
            it: 'Numero civico',
            fr: 'Numéro',
            es: 'Número',
            zh: '门牌号'
          },
          placeholder: '42',
          help: {
            en: 'Enter the house/building number.',
            it: 'Inserisci il numero civico.',
            fr: 'Entrez le numéro de maison.',
            es: 'Ingrese el número de casa.',
            zh: '输入门牌号。'
          },
          required: true
        },
        {
          name: 'cap',
          type: 'text',
          label: {
            en: 'Postal Code (CAP)',
            it: 'CAP',
            fr: 'Code postal',
            es: 'Código postal',
            zh: '邮政编码'
          },
          placeholder: '00100',
          help: {
            en: 'Enter the 5-digit Italian postal code.',
            it: 'Inserisci il CAP a 5 cifre.',
            fr: 'Entrez le code postal à 5 chiffres.',
            es: 'Ingrese el código postal de 5 dígitos.',
            zh: '输入5位意大利邮政编码。'
          },
          maxLength: 5,
          required: true
        },
        {
          name: 'comuneResidenza',
          type: 'text',
          label: {
            en: 'City (COMUNE)',
            it: 'Comune',
            fr: 'Ville',
            es: 'Ciudad',
            zh: '城市'
          },
          placeholder: 'MILANO',
          help: {
            en: 'Enter the city name in capital letters.',
            it: 'Inserisci il nome del comune in stampatello.',
            fr: 'Entrez le nom de la ville en majuscules.',
            es: 'Ingrese el nombre de la ciudad en mayúsculas.',
            zh: '用大写字母输入城市名称。'
          },
          transform: 'uppercase',
          required: true
        },
        {
          name: 'provinciaResidenza',
          type: 'text',
          label: {
            en: 'Province (PROV)',
            it: 'Provincia',
            fr: 'Province',
            es: 'Provincia',
            zh: '省份'
          },
          placeholder: 'MI',
          help: {
            en: 'Enter the 2-letter province code (e.g., MI for Milano, RM for Roma).',
            it: 'Inserisci la sigla della provincia (es. MI per Milano).',
            fr: 'Entrez le code de province à 2 lettres.',
            es: 'Ingrese el código de provincia de 2 letras.',
            zh: '输入2个字母的省份代码。'
          },
          transform: 'uppercase',
          maxLength: 2,
          required: true
        }
      ]
    },
    {
      id: 'foreign_address',
      title: 'Foreign Address / Indirizzo Estero',
      condition: (data) => data.livingInItaly === 'no',
      fields: [
        {
          name: 'statoEstero',
          type: 'text',
          label: {
            en: 'Country (STATO ESTERO)',
            it: 'Stato estero',
            fr: 'Pays',
            es: 'País',
            zh: '国家'
          },
          placeholder: 'UNITED STATES',
          help: {
            en: 'Enter your country of residence in capital letters.',
            it: 'Inserisci il paese di residenza in stampatello.',
            fr: 'Entrez votre pays de résidence en majuscules.',
            es: 'Ingrese su país de residencia en mayúsculas.',
            zh: '用大写字母输入您的居住国。'
          },
          transform: 'uppercase',
          required: true
        },
        {
          name: 'indirizzoEstero',
          type: 'text',
          label: {
            en: 'Foreign Address (INDIRIZZO ESTERO)',
            it: 'Indirizzo estero',
            fr: 'Adresse étrangère',
            es: 'Dirección extranjera',
            zh: '国外地址'
          },
          placeholder: '123 MAIN STREET, APT 4B',
          help: {
            en: 'Enter your complete street address.',
            it: 'Inserisci l\'indirizzo completo.',
            fr: 'Entrez votre adresse complète.',
            es: 'Ingrese su dirección completa.',
            zh: '输入您的完整街道地址。'
          },
          transform: 'uppercase',
          required: true
        },
        {
          name: 'localitaEstera',
          type: 'text',
          label: {
            en: 'City/State (LOCALITÀ)',
            it: 'Località',
            fr: 'Ville/État',
            es: 'Ciudad/Estado',
            zh: '城市/州'
          },
          placeholder: 'NEW YORK, NY 10001',
          help: {
            en: 'Enter city, state/province and postal code.',
            it: 'Inserisci città, stato/provincia e codice postale.',
            fr: 'Entrez ville, état/province et code postal.',
            es: 'Ingrese ciudad, estado/provincia y código postal.',
            zh: '输入城市、州/省和邮政编码。'
          },
          transform: 'uppercase',
          required: true
        }
      ]
    },
    {
      id: 'contact',
      title: 'Contact Information / Informazioni di Contatto',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: {
            en: 'Email Address',
            it: 'Indirizzo Email',
            fr: 'Adresse Email',
            es: 'Correo Electrónico',
            zh: '电子邮件地址'
          },
          placeholder: 'your.email@example.com',
          help: {
            en: 'We\'ll send your completed form to this email address.',
            it: 'Invieremo il modulo completato a questo indirizzo email.',
            fr: 'Nous enverrons votre formulaire à cette adresse.',
            es: 'Enviaremos su formulario a esta dirección.',
            zh: '我们将把您的完整表格发送到此电子邮件地址。'
          },
          required: true
        },
        {
          name: 'telefono',
          type: 'tel',
          label: {
            en: 'Phone Number (optional)',
            it: 'Numero di Telefono (opzionale)',
            fr: 'Numéro de Téléphone (optionnel)',
            es: 'Número de Teléfono (opcional)',
            zh: '电话号码（可选）'
          },
          placeholder: '+1 234 567 8900',
          help: {
            en: 'Include country code if outside Italy.',
            it: 'Includi il prefisso internazionale se fuori Italia.',
            fr: 'Incluez l\'indicatif du pays si hors d\'Italie.',
            es: 'Incluya el código de país si está fuera de Italia.',
            zh: '如果在意大利境外，请包含国家代码。'
          },
          required: false
        }
      ]
    },
    {
      id: 'signature_documents',
      title: 'Signature & Documents / Firma e Documenti',
      fields: [
        {
          name: 'signature',
          type: 'file',
          label: {
            en: 'Your Signature',
            it: 'La tua firma',
            fr: 'Votre signature',
            es: 'Su firma',
            zh: '您的签名'
          },
          help: {
            en: 'Upload a PNG image of your signature. Use a transparent background for best results.',
            it: 'Carica un\'immagine PNG della tua firma. Usa uno sfondo trasparente per risultati migliori.',
            fr: 'Téléchargez une image PNG de votre signature. Utilisez un fond transparent pour de meilleurs résultats.',
            es: 'Suba una imagen PNG de su firma. Use un fondo transparente para mejores resultados.',
            zh: '上传您签名的PNG图片。使用透明背景以获得最佳效果。'
          },
          accept: 'image/png,image/jpeg,image/jpg',
          required: true
        },
        {
          name: 'passportFile',
          type: 'file',
          label: {
            en: 'Passport Copy',
            it: 'Copia del passaporto',
            fr: 'Copie du passeport',
            es: 'Copia del pasaporte',
            zh: '护照副本'
          },
          help: {
            en: 'Upload a clear photo or scan of your passport main page (with photo and personal details).',
            it: 'Carica una foto o scansione chiara della pagina principale del passaporto.',
            fr: 'Téléchargez une photo ou scan de la page principale du passeport.',
            es: 'Suba una foto o escaneo de la página principal del pasaporte.',
            zh: '上传护照主页的清晰照片或扫描件（带照片和个人信息）。'
          },
          accept: 'image/*,.pdf',
          required: true
        },
        {
          name: 'proofOfResidence',
          type: 'file',
          label: {
            en: 'Proof of Residence',
            it: 'Prova di residenza',
            fr: 'Preuve de résidence',
            es: 'Prueba de residencia',
            zh: '居住证明'
          },
          help: {
            en: 'Upload a utility bill, bank statement, or rental agreement showing your current address (max 3 months old).',
            it: 'Carica una bolletta, estratto conto o contratto di affitto che mostri il tuo indirizzo attuale (max 3 mesi).',
            fr: 'Téléchargez une facture, relevé bancaire ou contrat de location montrant votre adresse actuelle.',
            es: 'Suba una factura, extracto bancario o contrato de alquiler que muestre su dirección actual.',
            zh: '上传显示您当前地址的水电费账单、银行对账单或租赁协议（最多3个月）。'
          },
          accept: 'image/*,.pdf',
          required: true
        }
      ]
    },
    {
      id: 'review',
      title: 'Review & Submit / Rivedi e Invia',
      isReview: true,
      fields: []
    }
  ];

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    if (!value && isFieldRequired(name)) {
      if (name === 'signature') {
        newErrors[name] = t('signatureRequired');
      } else if (name === 'passportFile') {
        newErrors[name] = t('passportRequired');
      } else if (name === 'proofOfResidence') {
        newErrors[name] = t('proofOfResidenceRequired');
      } else {
        newErrors[name] = t('required');
      }
    } else if (name === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
      newErrors[name] = 'Invalid email address';
    } else if (name === 'dataNascita' && value) {
      const date = new Date(value);
      const today = new Date();
      if (date > today) {
        newErrors[name] = 'Date cannot be in the future';
      }
    } else {
      delete newErrors[name];
    }
    
    setErrors(newErrors);
    return !newErrors[name];
  };

  const isFieldRequired = (fieldName) => {
    for (const step of formSteps) {
      const field = step.fields?.find(f => f.name === fieldName);
      if (field) return field.required;
    }
    return false;
  };

  const handleInputChange = (name, value) => {
    const field = getCurrentStepFields().find(f => f.name === name);
    
    if (field?.transform === 'uppercase') {
      value = value.toUpperCase();
    }
    
    if (field?.maxLength) {
      value = value.slice(0, field.maxLength);
    }
    
    setFormData({ ...formData, [name]: value });
    
    if (name === 'livingInItaly') {
      if (value === 'yes') {
        setFormData(prev => ({
          ...prev,
          [name]: value,
          statoEstero: '',
          indirizzoEstero: '',
          localitaEstera: ''
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: value,
          tipoVia: '',
          nomeVia: '',
          numeroCivico: '',
          cap: '',
          comuneResidenza: '',
          provinciaResidenza: ''
        }));
      }
    }
    
    validateField(name, value);
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (fieldName === 'signature') {
          setFormData(prev => ({
            ...prev,
            signatureFile: file,
            signaturePreview: reader.result,
            signature: reader.result
          }));
        } else if (fieldName === 'passportFile') {
          setFormData(prev => ({
            ...prev,
            passportFile: file,
            passportPreview: reader.result
          }));
        } else if (fieldName === 'proofOfResidence') {
          setFormData(prev => ({
            ...prev,
            proofOfResidence: file,
            proofOfResidencePreview: reader.result
          }));
        }
        validateField(fieldName, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCurrentStepFields = () => {
    const step = formSteps[currentStep];
    if (!step || !step.fields) return [];
    
    if (step.condition && !step.condition(formData)) {
      return [];
    }
    
    return step.fields;
  };

  const isStepValid = () => {
    const fields = getCurrentStepFields();
    for (const field of fields) {
      if (field.required && !formData[field.name]) {
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    const fields = getCurrentStepFields();
    let hasErrors = false;
    
    fields.forEach(field => {
      if (!validateField(field.name, formData[field.name])) {
        hasErrors = true;
      }
    });
    
    if (!hasErrors) {
      let nextStep = currentStep + 1;
      while (nextStep < formSteps.length && formSteps[nextStep].condition && !formSteps[nextStep].condition(formData)) {
        nextStep++;
      }
      
      if (nextStep < formSteps.length) {
        setCurrentStep(nextStep);
      }
    }
  };

  const handlePrevious = () => {
    let prevStep = currentStep - 1;
    while (prevStep >= 0 && formSteps[prevStep].condition && !formSteps[prevStep].condition(formData)) {
      prevStep--;
    }
    
    if (prevStep >= 0) {
      setCurrentStep(prevStep);
    }
  };

  const formatDateForPDF = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleFinalSubmit = () => {
    setShowSubmissionConfirmation(true);
  };

  const getStepProgress = () => {
    const totalSteps = formSteps.filter(step => !step.condition || step.condition(formData)).length;
    const currentStepIndex = formSteps.slice(0, currentStep + 1).filter(step => !step.condition || step.condition(formData)).length;
    return { current: currentStepIndex, total: totalSteps };
  };

  const progress = getStepProgress();
  const currentStepData = formSteps[currentStep];
  const fields = getCurrentStepFields();
  const isReviewStep = currentStepData?.isReview === true;

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        body * {
          visibility: hidden;
        }
        .print-content, .print-content * {
          visibility: visible;
        }
        .print-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        .no-print {
          display: none !important;
        }
        @page {
          size: A4;
          margin: 10mm;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  if (showSubmissionConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{t('applicationComplete')}</h1>
          <p className="text-lg text-gray-600 mb-8">{t('documentsReceived')}</p>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-800 mb-4">{t('nextSteps')}:</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">1</span>
                <span className="text-gray-700">{t('step1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">2</span>
                <span className="text-gray-700">{t('step2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">3</span>
                <span className="text-gray-700">{t('step3')}</span>
              </li>
            </ol>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => setShowPrintView(true)}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              {t('downloadSignedForm')}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              {t('startOver')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showPrintView) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="print-content bg-white">
          <div className="max-w-4xl mx-auto p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">MODELLO AA4/8</h1>
              <h2 className="text-lg mt-2">DOMANDA DI ATTRIBUZIONE CODICE FISCALE</h2>
              <h3 className="text-lg">CITTADINI STRANIERI</h3>
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-4 bg-gray-100 p-2">QUADRO A - TIPO DI RICHIESTA</h3>
              <div className="mb-4">
                <span className="font-semibold">Sezione I - Richiesta:</span>
                <div className="ml-4 mt-2">
                  <label className="inline-flex items-center mr-8">
                    <span className="border border-black w-4 h-4 inline-flex items-center justify-center mr-2">
                      {formData.requesterType === 'D' && '✓'}
                    </span>
                    DIRETTA
                  </label>
                  <label className="inline-flex items-center">
                    <span className="border border-black w-4 h-4 inline-flex items-center justify-center mr-2">
                      {formData.requesterType === 'T' && '✓'}
                    </span>
                    PER CONTO TERZI
                  </label>
                </div>
              </div>
              <div>
                <span className="font-semibold">Sezione II - Tipo richiesta:</span>
                <div className="ml-4 mt-2 space-y-2">
                  {[
                    { value: '1', text: 'ATTRIBUZIONE CODICE FISCALE' },
                    { value: '2', text: 'COMUNICAZIONE VARIAZIONE DATI' },
                    { value: '3', text: 'COMUNICAZIONE AVVENUTA FUSIONE' },
                    { value: '4', text: 'RICHIESTA DUPLICATO TESSERINO' },
                    { value: '5', text: 'RICHIESTA ATTRIBUZIONE A SEGUITO IDENTIFICAZIONE' }
                  ].map((type, index) => (
                    <label key={type.value} className="flex items-center">
                      <span className="border border-black w-4 h-4 inline-flex items-center justify-center mr-2">
                        {formData.requestType === type.value && '✓'}
                      </span>
                      {index + 1}. {type.text}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-4 bg-gray-100 p-2">QUADRO B - DATI ANAGRAFICI</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-black p-2">
                  <div className="text-xs">COGNOME</div>
                  <div className="font-mono text-lg">{formData.cognome}</div>
                </div>
                <div className="border border-black p-2">
                  <div className="text-xs">NOME</div>
                  <div className="font-mono text-lg">{formData.nome}</div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-4">
                <div className="border border-black p-2">
                  <div className="text-xs">SESSO</div>
                  <div className="font-mono text-lg text-center">{formData.sesso}</div>
                </div>
                <div className="border border-black p-2 col-span-2">
                  <div className="text-xs">DATA DI NASCITA</div>
                  <div className="font-mono text-lg">{formatDateForPDF(formData.dataNascita)}</div>
                </div>
                <div className="border border-black p-2">
                  <div className="text-xs">PROVINCIA</div>
                  <div className="font-mono text-lg text-center">{formData.provinciaNascita}</div>
                </div>
              </div>
              <div className="border border-black p-2 mt-4">
                <div className="text-xs">COMUNE DI NASCITA</div>
                <div className="font-mono text-lg">{formData.comuneNascita}</div>
              </div>
            </div>

            {formData.livingInItaly === 'yes' && (
              <div className="mb-8">
                <h3 className="font-bold mb-4 bg-gray-100 p-2">QUADRO C - DOMICILIO FISCALE IN ITALIA</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="border border-black p-2">
                    <div className="text-xs">TIPOLOGIA</div>
                    <div className="font-mono">{formData.tipoVia}</div>
                  </div>
                  <div className="border border-black p-2 col-span-2">
                    <div className="text-xs">INDIRIZZO</div>
                    <div className="font-mono">{formData.nomeVia}</div>
                  </div>
                  <div className="border border-black p-2">
                    <div className="text-xs">N. CIVICO</div>
                    <div className="font-mono text-center">{formData.numeroCivico}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="border border-black p-2">
                    <div className="text-xs">CAP</div>
                    <div className="font-mono">{formData.cap}</div>
                  </div>
                  <div className="border border-black p-2">
                    <div className="text-xs">COMUNE</div>
                    <div className="font-mono">{formData.comuneResidenza}</div>
                  </div>
                  <div className="border border-black p-2">
                    <div className="text-xs">PROV</div>
                    <div className="font-mono text-center">{formData.provinciaResidenza}</div>
                  </div>
                </div>
              </div>
            )}

            {formData.livingInItaly === 'no' && (
              <div className="mb-8">
                <h3 className="font-bold mb-4 bg-gray-100 p-2">QUADRO D - RESIDENZA ESTERA</h3>
                <div className="border border-black p-2 mb-4">
                  <div className="text-xs">STATO ESTERO</div>
                  <div className="font-mono text-lg">{formData.statoEstero}</div>
                </div>
                <div className="border border-black p-2 mb-4">
                  <div className="text-xs">INDIRIZZO ESTERO</div>
                  <div className="font-mono">{formData.indirizzoEstero}</div>
                </div>
                <div className="border border-black p-2">
                  <div className="text-xs">LOCALITÀ</div>
                  <div className="font-mono">{formData.localitaEstera}</div>
                </div>
              </div>
            )}

            <div className="mb-8">
              <h3 className="font-bold mb-4 bg-gray-100 p-2">RECAPITI</h3>
              <div className="space-y-2">
                <div><span className="font-semibold">Email:</span> {formData.email}</div>
                {formData.telefono && <div><span className="font-semibold">Telefono:</span> {formData.telefono}</div>}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-4 bg-gray-100 p-2">DELEGA / DELEGATION</h3>
              <div className="border border-black p-4">
                <p className="mb-2 text-sm">
                  Il/La sottoscritto/a autorizza il/la Sig./Sig.ra / The undersigned authorizes Mr./Ms.:
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className="text-xs">NOME E COGNOME / NAME AND SURNAME</div>
                    <div className="font-mono font-bold">{formData.delegateName}</div>
                  </div>
                  <div>
                    <div className="text-xs">CODICE FISCALE / FISCAL CODE</div>
                    <div className="font-mono font-bold">{formData.delegateFiscalCode}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className="text-xs">NATO A / BORN IN</div>
                    <div className="font-mono">{formData.delegateBirthPlace}</div>
                  </div>
                  <div>
                    <div className="text-xs">IL / ON</div>
                    <div className="font-mono">{formData.delegateBirthDate}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm">
                  a presentare la presente domanda per mio conto / to submit this application on my behalf.
                </p>
              </div>
            </div>

            <div className="mt-16">
              <h3 className="font-bold mb-4 bg-gray-100 p-2">SOTTOSCRIZIONE</h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-sm mb-2">DATA</div>
                  <div className="border-b border-black pb-8">{formData.dataFirma}</div>
                </div>
                <div>
                  <div className="text-sm mb-2">FIRMA DEL RICHIEDENTE</div>
                  {formData.signature ? (
                    <div className="border-b border-black pb-2">
                      <img src={formData.signature} alt="Signature" className="h-16" />
                    </div>
                  ) : (
                    <div className="border-b border-black pb-8"></div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-600">
              * Documento generato automaticamente - Da firmare prima della presentazione
            </div>
          </div>
        </div>

        <div className="no-print max-w-4xl mx-auto p-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">{t('printInstructions')}</h3>
            <button
              onClick={handlePrint}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Printer className="w-5 h-5" />
              {t('print')}
            </button>
          </div>
          <button
            onClick={() => setShowPrintView(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back to form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">{t('title')}</h1>
                <p className="text-sm text-gray-600">{t('subtitle')}</p>
              </div>
            </div>
            
            <select
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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

      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              {t('step')} {progress.current} {t('of')} {progress.total}
            </span>
            <span className="text-sm font-medium text-blue-600">
              {Math.round((progress.current / progress.total) * 100)}% {t('complete')}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">{currentStepData.title}</h2>
            {isReviewStep && (
              <p className="text-blue-100 mt-2">{t('reviewInfo')}</p>
            )}
          </div>

          <div className="p-8">
            {isReviewStep ? (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Check className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-semibold text-green-800">{t('almostThere')}</h3>
                  </div>
                  <p className="text-green-700">{t('reviewInfo')}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Personal Information</h4>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-sm text-gray-600">Full Name:</dt>
                        <dd className="font-medium">{formData.nome} {formData.cognome}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-600">Gender:</dt>
                        <dd className="font-medium">{formData.sesso === 'M' ? 'Male' : 'Female'}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-600">Date of Birth:</dt>
                        <dd className="font-medium">{formatDateForPDF(formData.dataNascita)}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-600">Place of Birth:</dt>
                        <dd className="font-medium">{formData.comuneNascita} ({formData.provinciaNascita})</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Contact & Address</h4>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-sm text-gray-600">Email:</dt>
                        <dd className="font-medium">{formData.email}</dd>
                      </div>
                      {formData.telefono && (
                        <div>
                          <dt className="text-sm text-gray-600">Phone:</dt>
                          <dd className="font-medium">{formData.telefono}</dd>
                        </div>
                      )}
                      <div>
                        <dt className="text-sm text-gray-600">Residence:</dt>
                        <dd className="font-medium">
                          {formData.livingInItaly === 'yes' 
                            ? `${formData.tipoVia} ${formData.nomeVia} ${formData.numeroCivico}, ${formData.comuneResidenza} (${formData.provinciaResidenza})`
                            : `${formData.indirizzoEstero}, ${formData.localitaEstera}, ${formData.statoEstero}`
                          }
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
                  <h4 className="font-semibold text-gray-700 mb-2">Delegation / Delega</h4>
                  <p className="text-sm text-gray-600">
                    This application will be submitted by: <strong>{formData.delegateName}</strong><br/>
                    Fiscal Code: {formData.delegateFiscalCode}<br/>
                    Born in {formData.delegateBirthPlace} on {formData.delegateBirthDate}
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowPrintView(true)}
                    className="flex-1 bg-blue-600 text-white py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold flex items-center justify-center gap-3"
                  >
                    <Printer className="w-5 h-5" />
                    {t('generatePDF')}
                  </button>
                  
                  {formData.signature && formData.passportFile && formData.proofOfResidence && (
                    <button
                      onClick={handleFinalSubmit}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold flex items-center justify-center gap-3"
                    >
                      <FileCheck className="w-5 h-5" />
                      {t('submitApplication')}
                    </button>
                  )}
                </div>
                
                {(!formData.signature || !formData.passportFile || !formData.proofOfResidence) && (
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-amber-800 text-sm">
                      {!formData.signature && !formData.passportFile && !formData.proofOfResidence
                        ? 'Please add your signature, passport copy, and proof of residence to submit'
                        : !formData.signature && !formData.passportFile 
                        ? 'Please add your signature and passport copy to submit'
                        : !formData.signature && !formData.proofOfResidence
                        ? 'Please add your signature and proof of residence to submit'
                        : !formData.passportFile && !formData.proofOfResidence
                        ? 'Please add your passport copy and proof of residence to submit'
                        : !formData.signature 
                        ? 'Please add your signature to submit'
                        : !formData.passportFile
                        ? 'Please upload your passport copy to submit'
                        : 'Please upload your proof of residence to submit'
                      }
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-gray-700 font-medium mb-2">
                      {field.label[currentLanguage] || field.label.en}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    
                    {field.type === 'text' || field.type === 'email' || field.type === 'tel' ? (
                      <input
                        type={field.type}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors[field.name] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        maxLength={field.maxLength}
                      />
                    ) : field.type === 'date' ? (
                      <input
                        type="date"
                        value={formData[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors[field.name] ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    ) : field.type === 'select' ? (
                      <select
                        value={formData[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors[field.name] ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select...</option>
                        {field.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'radio' ? (
                      <div className="space-y-3">
                        {field.options.map((option) => (
                          <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name={field.name}
                              value={option.value}
                              checked={formData[field.name] === option.value}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-700">
                              {option.label}
                              {option.labelIt && <span className="text-gray-500 ml-2">({option.labelIt})</span>}
                            </span>
                          </label>
                        ))}
                      </div>
                    ) : field.type === 'file' ? (
                      <div>
                        <label className="block">
                          <div className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 cursor-pointer">
                            {field.name === 'signature' && formData.signaturePreview ? (
                              <div className="relative">
                                <img 
                                  src={formData.signaturePreview} 
                                  alt="Signature preview" 
                                  className="max-h-28"
                                  style={{ backgroundColor: 'white' }}
                                />
                                <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                                  <FileCheck className="w-4 h-4 text-white" />
                                </div>
                              </div>
                            ) : field.name === 'passportFile' && formData.passportPreview ? (
                              <div className="relative">
                                <img 
                                  src={formData.passportPreview} 
                                  alt="Passport preview" 
                                  className="max-h-28 rounded"
                                />
                                <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                                  <FileCheck className="w-4 h-4 text-white" />
                                </div>
                              </div>
                            ) : field.name === 'proofOfResidence' && formData.proofOfResidencePreview ? (
                              <div className="relative">
                                {formData.proofOfResidence?.type === 'application/pdf' ? (
                                  <div className="flex flex-col items-center">
                                    <FileText className="w-16 h-16 text-gray-500" />
                                    <span className="text-xs text-gray-600 mt-1">PDF Document</span>
                                  </div>
                                ) : (
                                  <img 
                                    src={formData.proofOfResidencePreview} 
                                    alt="Proof of residence preview" 
                                    className="max-h-28 rounded"
                                  />
                                )}
                                <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                                  <FileCheck className="w-4 h-4 text-white" />
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center">
                                <Upload className="w-8 h-8 text-gray-400" />
                                <p className="mt-2 text-sm text-gray-600">
                                  {field.name === 'signature' ? t('uploadSignature') : 
                                   field.name === 'passportFile' ? t('uploadPassport') : 
                                   t('uploadProofOfResidence')}
                                </p>
                              </div>
                            )}
                          </div>
                          <input
                            type="file"
                            accept={field.accept}
                            onChange={(e) => handleFileUpload(e, field.name)}
                            className="hidden"
                          />
                        </label>
                        {field.name === 'signature' && formData.signatureFile && (
                          <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                            <Check className="w-4 h-4" />
                            {formData.signatureFile.name}
                          </p>
                        )}
                        {field.name === 'passportFile' && formData.passportFile && (
                          <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                            <Check className="w-4 h-4" />
                            {formData.passportFile.name}
                          </p>
                        )}
                        {field.name === 'proofOfResidence' && formData.proofOfResidence && (
                          <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                            <Check className="w-4 h-4" />
                            {formData.proofOfResidence.name}
                          </p>
                        )}
                      </div>
                    ) : null}
                    
                    {field.help && (
                      <div className="mt-2 flex items-start gap-2">
                        <HelpCircle className="w-4 h-4 text-gray-400 mt-0.5" />
                        <p className="text-sm text-gray-600">
                          {field.help[currentLanguage] || field.help.en}
                        </p>
                      </div>
                    )}
                    
                    {errors[field.name] && (
                      <div className="mt-2 flex items-center gap-2 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        <p className="text-sm">{errors[field.name]}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  currentStep === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                {t('previous')}
              </button>

              {!isReviewStep && (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    isStepValid()
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {t('next')}
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            <HelpCircle className="inline w-4 h-4 mr-1" />
            {t('helpText')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItalianFiscalCodeAssistant;
