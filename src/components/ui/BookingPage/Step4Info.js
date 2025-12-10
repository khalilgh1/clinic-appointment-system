"use client";

import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, User, Mail, Phone, Calendar, MapPin, AlertCircle } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

const Step4Info = ({ onNext, onBack }) => {
  const { state, dispatch } = useBooking();
  const [formData, setFormData] = useState({
    civilite: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    dateNaissance: '',
    adresse: '',
    ville: '',
    codePostal: '',
    pays: 'Algérie',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation patterns
  const patterns = {
    nom: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
    prenom: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    telephone: /^(\+213|0)[5-7][0-9]{8}$/,
    notes: /^[^<>]{0,500}$/
  };

  // Sanitize input to prevent XSS
  const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    
    // Remove HTML tags and script content
    let sanitized = input.replace(/<[^>]*>/g, '');
    
    // Remove potentially dangerous characters
    sanitized = sanitized.replace(/[<>]/g, '');
    
    // Limit consecutive spaces
    sanitized = sanitized.replace(/\s+/g, ' ');
    
    return sanitized.trim();
  };

  // Validate individual field
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'civilite':
        if (!value) error = 'La civilité est requise';
        if (!['M', 'Mme'].includes(value)) error = 'Civilité invalide';
        break;

      case 'nom':
        if (!value) {
          error = 'Le nom est requis';
        } else if (value.length < 2) {
          error = 'Le nom doit contenir au moins 2 caractères';
        } else if (value.length > 50) {
          error = 'Le nom ne doit pas dépasser 50 caractères';
        } else if (!patterns.nom.test(value)) {
          error = 'Le nom contient des caractères invalides';
        }
        break;

      case 'prenom':
        if (!value) {
          error = 'Le prénom est requis';
        } else if (value.length < 2) {
          error = 'Le prénom doit contenir au moins 2 caractères';
        } else if (value.length > 50) {
          error = 'Le prénom ne doit pas dépasser 50 caractères';
        } else if (!patterns.prenom.test(value)) {
          error = 'Le prénom contient des caractères invalides';
        }
        break;

      case 'email':
        if (!value) {
          error = 'L\'email est requis';
        } else if (!patterns.email.test(value)) {
          error = 'L\'email n\'est pas valide';
        } else if (value.length > 100) {
          error = 'L\'email est trop long';
        }
        break;

      case 'telephone':
        if (!value) {
          error = 'Le téléphone est requis';
        } else if (!patterns.telephone.test(value)) {
          error = 'Format: +213 5XX XX XX XX ou 05XX XX XX XX';
        }
        break;

      case 'dateNaissance':
        if (!value) {
          error = 'La date de naissance est requise';
        } else {
          const birthDate = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          
          if (birthDate > today) {
            error = 'La date de naissance ne peut pas être dans le futur';
          } else if (age > 120) {
            error = 'Date de naissance invalide';
          } else if (age < 0) {
            error = 'Date de naissance invalide';
          }
        }
        break;

      case 'notes':
        if (value && value.length > 500) {
          error = 'Les notes ne doivent pas dépasser 500 caractères';
        } else if (value && !patterns.notes.test(value)) {
          error = 'Les notes contiennent des caractères invalides';
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Handle input change with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Sanitize input
    const sanitizedValue = sanitizeInput(value);
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));

    // Validate field if it has been touched
    if (touched[name]) {
      const error = validateField(name, sanitizedValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  // Handle blur event
  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['civilite', 'nom', 'prenom', 'email', 'telephone', 'dateNaissance'];

    requiredFields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Validate optional notes field if filled
    if (formData.notes) {
      const notesError = validateField('notes', formData.notes);
      if (notesError) {
        newErrors.notes = notesError;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    // Validate form
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.border-red-500');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Additional security check: verify all required fields are present
    const requiredFields = ['civilite', 'nom', 'prenom', 'email', 'telephone', 'dateNaissance'];
    const hasAllRequired = requiredFields.every(field => formData[field] && formData[field].trim());

    if (!hasAllRequired) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Sanitize all data before storing
    const sanitizedData = Object.keys(formData).reduce((acc, key) => {
      acc[key] = sanitizeInput(formData[key]);
      return acc;
    }, {});

    // Store patient info in context
    dispatch({ 
      type: 'SET_PATIENT_INFO', 
      payload: sanitizedData 
    });
    
    onNext();
  };

  // Helper function to get input classes
  const getInputClasses = (fieldName) => {
    const baseClasses = "w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors";
    if (errors[fieldName] && touched[fieldName]) {
      return `${baseClasses} border-red-500 focus:ring-red-500 focus:border-red-500`;
    }
    return `${baseClasses} border-gray-300 focus:ring-primary focus:border-primary`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        Informations personnelles
      </h1>
      <p className="text-gray-600 mb-8">
        Veuillez remplir vos informations pour finaliser la réservation
      </p>

      {/* Récapitulatif de la réservation */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-primary mb-4">Récapitulatif de votre rendez-vous</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 block">Service:</span>
            <span className="font-medium text-primary">{state.selectedService?.name}</span>
          </div>
          <div>
            <span className="text-gray-600 block">Médecin:</span>
            <span className="font-medium text-primary">{state.selectedDoctor?.name}</span>
          </div>
          <div>
            <span className="text-gray-600 block">Date:</span>
            <span className="font-medium text-primary">
              {state.selectedDateTime?.date ? 
                state.selectedDateTime.date.toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long',
                  year: 'numeric'
                }) : 'Non sélectionnée'
              }
            </span>
          </div>
          <div>
            <span className="text-gray-600 block">Horaire:</span>
            <span className="font-medium text-primary">{state.selectedDateTime?.time || 'Non sélectionné'}</span>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Civilité */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Civilité <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="civilite"
                  value="M"
                  checked={formData.civilite === 'M'}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="text-primary focus:ring-primary cursor-pointer"
                  required
                />
                <span className="ml-2">Monsieur</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="civilite"
                  value="Mme"
                  checked={formData.civilite === 'Mme'}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="text-primary focus:ring-primary cursor-pointer"
                />
                <span className="ml-2">Madame</span>
              </label>
            </div>
            {errors.civilite && touched.civilite && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.civilite}
              </p>
            )}
          </div>

          {/* Nom */}
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
              Nom <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={getInputClasses('nom')}
                placeholder="Votre nom"
                maxLength={50}
                required
              />
            </div>
            {errors.nom && touched.nom && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.nom}
              </p>
            )}
          </div>

          {/* Prénom */}
          <div>
            <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2">
              Prénom <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={getInputClasses('prenom')}
                placeholder="Votre prénom"
                maxLength={50}
                required
              />
            </div>
            {errors.prenom && touched.prenom && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.prenom}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={getInputClasses('email')}
                placeholder="votre@email.com"
                maxLength={100}
                required
              />
            </div>
            {errors.email && touched.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Téléphone */}
          <div>
            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={getInputClasses('telephone')}
                placeholder="+213 5XX XX XX XX"
                maxLength={15}
                required
              />
            </div>
            {errors.telephone && touched.telephone && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.telephone}
              </p>
            )}
          </div>

          {/* Date de naissance */}
          <div className="md:col-span-2">
            <label htmlFor="dateNaissance" className="block text-sm font-medium text-gray-700 mb-2">
              Date de naissance <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                id="dateNaissance"
                name="dateNaissance"
                value={formData.dateNaissance}
                onChange={handleInputChange}
                onBlur={handleBlur}
                max={new Date().toISOString().split('T')[0]}
                min="1900-01-01"
                className={getInputClasses('dateNaissance')}
                required
              />
            </div>
            {errors.dateNaissance && touched.dateNaissance && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.dateNaissance}
              </p>
            )}
          </div>

          {/* Notes médicales */}
          <div className="md:col-span-2">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Informations médicales importantes (optionnel)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              onBlur={handleBlur}
              rows={4}
              maxLength={500}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                errors.notes && touched.notes 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-primary focus:border-primary'
              }`}
              placeholder="Allergies, médicaments en cours, antécédents médicaux..."
            />
            <p className="mt-1 text-sm text-gray-500">
              {formData.notes.length}/500 caractères
            </p>
            {errors.notes && touched.notes && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.notes}
              </p>
            )}
          </div>

        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-400 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            RETOUR
          </button>
          <button
            type="submit"
            className="bg-secondary text-primary font-semibold px-8 py-3 rounded-lg hover:bg-secondary/90 transition-colors flex items-center gap-2"
          >
            CONFIRMER LE RENDEZ-VOUS
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step4Info;