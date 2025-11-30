import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '@/services/api';

// Default fallback content matching the current hardcoded data
// Store icon names as strings (will be mapped to components in the component)
const defaultSteps = [
  {
    id: 0,
    title: "Book a Discovery Call",
    description: "Schedule a free consultation to discuss your business needs and energy requirements. We'll understand your current situation, challenges, and goals to provide the best solutions tailored to your business.",
    iconName: "Phone",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    order: 1,
  },
  {
    id: 1,
    title: "Strategy Session",
    description: "We will review the insights from the discovery call and develop a tailored strategy and proposal. We'll create a detailed plan with actionable steps, timelines, and deliverables to meet your project requirements.",
    iconName: "FileText",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    order: 2,
  },
  {
    id: 2,
    title: "Design and Development",
    description: "Our team brings your strategy to life with custom solutions. We handle all aspects of implementation, ensuring seamless integration with your existing systems and processes.",
    iconName: "Code",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    order: 3,
  },
  {
    id: 3,
    title: "Launch and Support",
    description: "We ensure a smooth launch and provide ongoing support to help you maximize the benefits. Our team remains available to assist with any questions, optimizations, or future enhancements you may need.",
    iconName: "Rocket",
    image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&q=80",
    order: 4,
  },
];

// Helper function to map API step data to component format
const mapStepToComponent = (step, index) => {
  // Use icon from API if provided (backend stores it as 'icon'), otherwise try to detect from title
  let iconName = step.icon || step.iconName || null;
  
  // If no icon provided in API, try to match icon by title
  if (!iconName) {
    const titleLower = step.title?.toLowerCase() || '';
    
    if (titleLower.includes('discovery') || titleLower.includes('call') || titleLower.includes('book')) {
      iconName = "Phone";
    } else if (titleLower.includes('strategy') || titleLower.includes('session') || titleLower.includes('plan')) {
      iconName = "FileText";
    } else if (titleLower.includes('design') || titleLower.includes('development') || titleLower.includes('implement')) {
      iconName = "Code";
    } else if (titleLower.includes('launch') || titleLower.includes('support') || titleLower.includes('ongoing')) {
      iconName = "Rocket";
    } else {
      // Default based on order
      const iconNames = ["Phone", "FileText", "Code", "Rocket"];
      iconName = iconNames[index % iconNames.length];
    }
  }

  return {
    id: index,
    title: step.title || `Step ${index + 1}`,
    description: step.description || '',
    iconName: iconName, // Store icon name as string - will be converted to component in the UI using getLucideIcon
    image: step.image?.url || step.image || defaultSteps[index]?.image || '',
    order: step.order || index + 1,
  };
};

// Helper function to compare two arrays deeply
const isStepsEqual = (steps1, steps2) => {
  if (!steps1 || !steps2 || steps1.length !== steps2.length) return false;
  return JSON.stringify(steps1.map(s => ({ title: s.title, description: s.description, image: s.image, iconName: s.iconName }))) === 
         JSON.stringify(steps2.map(s => ({ title: s.title, description: s.description, image: s.image, iconName: s.iconName })));
};

// Async thunk to fetch how we work steps
export const fetchHowWeWorkSteps = createAsyncThunk(
  'howWeWork/fetchHowWeWorkSteps',
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await apiService.getHowWeWorkSteps();
      
      let newSteps = [];
      if (response.data.success && response.data.data && response.data.data.length > 0) {
        // Map API response to component format
        newSteps = response.data.data.map((step, index) => mapStepToComponent(step, index));
      } else {
        // Return default steps if no active steps
        newSteps = defaultSteps;
      }

      // Check if steps have changed from cached version
      const currentState = getState();
      const cachedSteps = currentState.howWeWork.steps;
      const hasChanged = !isStepsEqual(newSteps, cachedSteps);

      return {
        steps: newSteps,
        hasChanged,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Error fetching how we work steps:', error);
      // Return cached steps on error instead of rejecting
      const currentState = getState();
      return {
        steps: currentState.howWeWork.steps || defaultSteps,
        hasChanged: false,
        timestamp: currentState.howWeWork.lastFetched || Date.now(),
        error: error.message,
      };
    }
  }
);

// Initial state
const initialState = {
  steps: defaultSteps,
  loading: false,
  error: null,
  lastFetched: null,
  needsRefresh: false,
};

const howWeWorkSlice = createSlice({
  name: 'howWeWork',
  initialState,
  reducers: {
    // Action to manually refresh steps
    refreshHowWeWorkSteps: (state) => {
      state.needsRefresh = true;
    },
    // Action to clear steps cache (resets to default)
    clearHowWeWorkCache: (state) => {
      state.steps = defaultSteps;
      state.lastFetched = null;
      state.needsRefresh = false;
      state.error = null;
    },
    // Reset needsRefresh flag (used internally)
    resetNeedsRefresh: (state) => {
      state.needsRefresh = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending state
      .addCase(fetchHowWeWorkSteps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state
      .addCase(fetchHowWeWorkSteps.fulfilled, (state, action) => {
        const { steps, hasChanged, timestamp, error } = action.payload;
        
        state.loading = false;
        state.error = error || null;
        
        // Only update if steps have changed
        if (hasChanged) {
          state.steps = steps;
          state.lastFetched = timestamp;
          console.log('✅ How we work steps updated (changed from cached version)');
        } else {
          // Steps haven't changed, just update timestamp
          state.lastFetched = timestamp;
          console.log('✅ How we work steps unchanged, using cached version');
        }
        
        state.needsRefresh = false;
      })
      // Rejected state (shouldn't happen as we handle errors in fulfilled)
      .addCase(fetchHowWeWorkSteps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch how we work steps';
        // Keep existing steps on error
        state.needsRefresh = false;
      });
  },
});

// Export actions
export const { refreshHowWeWorkSteps, clearHowWeWorkCache, resetNeedsRefresh } = howWeWorkSlice.actions;

// Selectors
export const selectHowWeWorkSteps = (state) => state.howWeWork.steps;
export const selectHowWeWorkLoading = (state) => state.howWeWork.loading;
export const selectHowWeWorkError = (state) => state.howWeWork.error;
export const selectHowWeWorkLastFetched = (state) => state.howWeWork.lastFetched;
export const selectHowWeWorkNeedsRefresh = (state) => state.howWeWork.needsRefresh;
// Check if we need to fetch (no data exists or needsRefresh is true)
export const selectShouldFetchHowWeWork = (state) => {
  const { steps, lastFetched, needsRefresh } = state.howWeWork;
  // Fetch if manually requested or if we don't have valid cached data
  return needsRefresh || !lastFetched || !steps || steps.length === 0;
};

export default howWeWorkSlice.reducer;

