import { create } from 'zustand';

// Performance computation constants - adjust these to fine-tune computation load
const COMPUTATION_CONFIG = {
  // Main computation loop iterations (higher = more intensive)
  MAIN_LOOP_ITERATIONS: 900,
  // Inner loop iterations per main iteration
  INNER_LOOP_ITERATIONS: 20,
  // Size of temporary array created in each inner loop
  TEMP_ARRAY_SIZE: 20,
  // Blocking computation iterations (affects UI responsiveness)
  BLOCKING_SUM_ITERATIONS: 500,
  // Size of array for sorting operations
  SORT_ARRAY_SIZE: 100,
  // Interval frequency in milliseconds (lower = more frequent stress)
  COMPUTATION_INTERVAL_MS: 1000,
} as const;

interface PerformanceStore {
  isHeavyComputationActive: boolean;
  intervalId: ReturnType<typeof setInterval> | null;
}

interface PerformanceActions {
  toggleHeavyComputation: () => void;
  setHeavyComputationActive: (active: boolean) => void;
}

const runHeavyComputation = () => {
  let result = 0;

  for (let i = 0; i < COMPUTATION_CONFIG.MAIN_LOOP_ITERATIONS; i++) {
    for (let j = 0; j < COMPUTATION_CONFIG.INNER_LOOP_ITERATIONS; j++) {
      result += Math.sin(i * j) + Math.cos(i / (j + 1));
      result += Math.sqrt(Math.abs(i * j) + 1);

      const tempArray = new Array(COMPUTATION_CONFIG.TEMP_ARRAY_SIZE).fill(0).map((_, k) => Math.random() * i * k);
      result += tempArray.reduce((sum, val) => sum + val, 0) / tempArray.length;
    }

    const obj = {
      value: result,
      computed: Math.sin(i) * Math.cos(result),
    };
    result += obj.value * 0.001 + obj.computed;
  }

  return result;
};

export const usePerformanceStore = create<PerformanceStore & PerformanceActions>((set, get) => ({
  isHeavyComputationActive: false,
  intervalId: null,

  toggleHeavyComputation: () => {
    const { isHeavyComputationActive, intervalId } = get();

    if (isHeavyComputationActive) {
      if (intervalId) {
        clearInterval(intervalId);
      }
      set({ isHeavyComputationActive: false, intervalId: null });
    } else {
      const newIntervalId = setInterval(() => {
        runHeavyComputation();

        const smallArray = new Array(COMPUTATION_CONFIG.SORT_ARRAY_SIZE).fill(0).map(() => Math.random());
        smallArray.sort();

        let blockingSum = 0;
        for (let i = 0; i < COMPUTATION_CONFIG.BLOCKING_SUM_ITERATIONS; i++) {
          blockingSum += Math.sin(i) * Math.cos(i);
        }
        if (blockingSum > Number.MAX_SAFE_INTEGER) {
          console.log('Overflow:', blockingSum);
        }
      }, COMPUTATION_CONFIG.COMPUTATION_INTERVAL_MS);

      set({ isHeavyComputationActive: true, intervalId: newIntervalId });
    }
  },

  setHeavyComputationActive: (active: boolean) => {
    const { intervalId } = get();

    if (!active && intervalId) {
      clearInterval(intervalId);
      set({ isHeavyComputationActive: false, intervalId: null });
    } else if (active && !intervalId) {
      const newIntervalId = setInterval(() => {
        runHeavyComputation();

        const smallArray = new Array(COMPUTATION_CONFIG.SORT_ARRAY_SIZE).fill(0).map(() => Math.random());
        smallArray.sort();

        let blockingSum = 0;
        for (let i = 0; i < COMPUTATION_CONFIG.BLOCKING_SUM_ITERATIONS; i++) {
          blockingSum += Math.sin(i) * Math.cos(i);
        }
        if (blockingSum > Number.MAX_SAFE_INTEGER) {
          console.log('Overflow:', blockingSum);
        }
      }, COMPUTATION_CONFIG.COMPUTATION_INTERVAL_MS);

      set({ isHeavyComputationActive: true, intervalId: newIntervalId });
    }
  },
}));
