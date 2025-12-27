"use client";

import React, { createContext, useReducer, useContext } from 'react';

// Create context for booking state management
const BookingContext = createContext();

/**
 * Reducer function for managing booking state
 * Handles state transitions for service, doctor, date/time, and patient info
 * @param {Object} state - Current booking state
 * @param {Object} action - Action with type and payload
 * @returns {Object} Updated booking state
 */
const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SERVICE':
      return {
        ...state,
        selectedService: action.payload,
        selectedDoctor: null, // Reset doctor when service changes
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

// Default initial state for booking context
const defaultInitialState = {
  selectedService: null,
  selectedDoctor: null,
  selectedDateTime: null,
  patientInfo: null,
};

/**
 * BookingProvider - Context provider for booking state management
 * Wraps booking flow components to provide global state access
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 * @param {Object} props.initialService - Pre-selected service for direct booking
 */
export const BookingProvider = ({ children, initialService = null }) => {
  const initialState = {
    ...defaultInitialState,
    selectedService: initialService,
  };
  
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};

/**
 * Custom hook to access booking context
 * @returns {Object} Booking context with state and dispatch
 * @throws {Error} If used outside BookingProvider
 */
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};