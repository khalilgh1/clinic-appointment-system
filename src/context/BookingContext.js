"use client";

import React, { createContext, useReducer, useContext } from 'react';

const BookingContext = createContext();

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SERVICE':
      return {
        ...state,
        selectedService: action.payload,
        selectedDoctor: null, // Reset doctor quand service change
      };
    case 'SET_DOCTOR':
      return {
        ...state,
        selectedDoctor: action.payload,
      };
    case 'SET_DATE_TIME':
      return {
        ...state,
        selectedDateTime: action.payload,
      };
    case 'SET_PATIENT_INFO':
      return {
        ...state,
        patientInfo: action.payload,
      };
    case 'RESET_BOOKING':
      return {
        selectedService: null,
        selectedDoctor: null,
        selectedDateTime: null,
        patientInfo: null,
      };
    default:
      return state;
  }
};

const initialState = {
  selectedService: null,
  selectedDoctor: null,
  selectedDateTime: null,
  patientInfo: null,
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};