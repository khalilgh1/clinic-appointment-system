"use client";

import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, User, Mail, Phone, Calendar, MapPin } from 'lucide-react';
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Stocker les informations du patient dans le contexte
    dispatch({ 
      type: 'SET_PATIENT_INFO', 
      payload: formData 
    });
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto"> {/* Augmentation de la width */}
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
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="civilite"
                  value="M"
                  checked={formData.civilite === 'M'}
                  onChange={handleInputChange}
                  className="text-primary focus:ring-primary"
                  required
                />
                <span className="ml-2">Monsieur</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="civilite"
                  value="Mme"
                  checked={formData.civilite === 'Mme'}
                  onChange={handleInputChange}
                  className="text-primary focus:ring-primary"
                />
                <span className="ml-2">Madame</span>
              </label>
            </div>
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="Votre nom"
                required
              />
            </div>
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="Votre prénom"
                required
              />
            </div>
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="votre@email.com"
                required
              />
            </div>
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="+213 XXX XX XX XX"
                required
              />
            </div>
          </div>

          {/* Date de naissance */}
          <div>
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                required
              />
            </div>
          </div>

          {/* Adresse */}
          {/* <div className="md:col-span-2">
            <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 mb-2">
              Adresse <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="adresse"
                name="adresse"
                value={formData.adresse}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="Numéro et rue"
                required
              />
            </div>
          </div> */}

           {/* Ville */}
          {/* <div>
            <label htmlFor="ville" className="block text-sm font-medium text-gray-700 mb-2">
              Ville <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="ville"
              name="ville"
              value={formData.ville}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              placeholder="Votre ville"
              required
            />
          </div>  */}


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
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              placeholder="Allergies, médicaments en cours, antécédents médicaux..."
            />
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