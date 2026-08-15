import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logWorkoutSession } from '../api/workout.api.js';

export const useActiveSession = (initialPlan = null) => {
  const navigate = useNavigate();
  const [activeSession, setActiveSession] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Initialize or start workout
  const startSession = (plan) => {
    const sessionData = {
      planId: plan?.id || plan?._id,
      title: plan?.title || 'Custom Workout Session',
      startTime: new Date(),
      exercises: plan?.exercises?.map((e) => ({
        ...e,
        completedSets: [],
      })) || [],
    };
    setActiveSession(sessionData);
    setElapsedSeconds(0);
  };

  // Timer Ticker
  useEffect(() => {
    if (!activeSession) return;
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeSession]);

  // Log completed set
  const logSet = (exerciseId, setDetails) => {
    setActiveSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        exercises: prev.exercises.map((ex) => {
          if (ex.id === exerciseId || ex._id === exerciseId) {
            return {
              ...ex,
              completedSets: [...(ex.completedSets || []), setDetails],
            };
          }
          return ex;
        }),
      };
    });
  };

  // Save Session to Backend
  const finishSession = async () => {
    if (!activeSession) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const payload = {
        ...activeSession,
        durationSeconds: elapsedSeconds,
        completedAt: new Date(),
      };
      await logWorkoutSession(payload);
      setActiveSession(null);
      navigate('/workouts');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save active workout session.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    activeSession,
    elapsedSeconds,
    isSubmitting,
    error,
    startSession,
    logSet,
    finishSession,
  };
};