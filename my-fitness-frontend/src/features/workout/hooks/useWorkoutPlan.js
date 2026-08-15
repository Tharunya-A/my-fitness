import { useState, useEffect, useCallback } from 'react';
import { getWorkoutPlans, createWorkoutPlan } from '../api/workout.api.js';

export const useWorkoutPlan = () => {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlans = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getWorkoutPlans();
      setPlans(data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load workout plans.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const savePlan = async (planData) => {
    setIsLoading(true);
    setError(null);
    try {
      const newPlan = await createWorkoutPlan(planData);
      setPlans((prev) => [newPlan, ...prev]);
      return newPlan;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to save workout plan.';
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return { plans, isLoading, error, fetchPlans, savePlan };
};