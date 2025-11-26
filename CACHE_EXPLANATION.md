# 🗄️ How Redux Cache Works - Detailed Explanation

## 📋 Overview

The cache system prevents unnecessary API calls by storing data in Redux state and only fetching when:
1. Data doesn't exist
2. Cache has expired (5 minutes default)
3. Data is manually marked as stale

---

## 🔑 Key Components

### 1. **Cache State** (in Redux Store)

```javascript
{
  heroContent: {...},      // The actual data
  lastFetched: 1704123456789,  // Timestamp when data was last fetched
  cacheExpiry: 300000,     // 5 minutes in milliseconds
  isStale: false,          // Manual flag to force refresh
  loading: false,          // Loading state
  error: null              // Error state
}
```

### 2. **Cache Expiry Logic** (Selector)

```javascript
selectHeroNeedsRefresh = (state) => {
  const { lastFetched, cacheExpiry, isStale } = state.hero;
  
  // Condition 1: If manually marked as stale
  if (isStale) return true;
  
  // Condition 2: If never fetched before
  if (!lastFetched) return true;
  
  // Condition 3: If cache expired (current time - last fetch > expiry)
  return Date.now() - lastFetched > cacheExpiry;
};
```

### 3. **Smart Hook Logic**

```javascript
useEffect(() => {
  // Only fetch if:
  // - Data needs refresh (from selector)
  // - Not already loading (prevent duplicate requests)
  if (needsRefresh && !loading) {
    dispatch(fetchHeroContent());
  }
}, [dispatch, needsRefresh, loading]);
```

---

## 🔄 How Cache Works - Step by Step

### **Scenario 1: First Visit (No Cache)**

```
┌─────────────────────────────────────────────────────────┐
│ Step 1: Component Mounts                                 │
│   ↓                                                       │
│ Step 2: useHeroContentRedux() hook runs                  │
│   ↓                                                       │
│ Step 3: Check Redux State                                │
│   • lastFetched = null (no data)                        │
│   • needsRefresh = true ✅                               │
│   ↓                                                       │
│ Step 4: Dispatch fetchHeroContent()                      │
│   ↓                                                       │
│ Step 5: API Call → GET /api/hero/active                 │
│   ↓                                                       │
│ Step 6: Save to Redux State                              │
│   • heroContent = {...api data...}                      │
│   • lastFetched = Date.now() (e.g., 1704123456789)      │
│   • isStale = false                                      │
│   ↓                                                       │
│ Step 7: Component Renders with Data                      │
└─────────────────────────────────────────────────────────┘
```

**Result:** ✅ API Call Made, Data Cached

---

### **Scenario 2: Within Cache Period (Under 5 Minutes)**

```
┌─────────────────────────────────────────────────────────┐
│ Step 1: User Navigates Back to Page                     │
│   ↓                                                       │
│ Step 2: useHeroContentRedux() hook runs                  │
│   ↓                                                       │
│ Step 3: Check Redux State                                │
│   • lastFetched = 1704123456789 (2 minutes ago)         │
│   • cacheExpiry = 300000 (5 minutes)                     │
│   • Time difference = 2 minutes < 5 minutes ✅          │
│   • needsRefresh = false ❌                              │
│   ↓                                                       │
│ Step 4: Skip API Call                                    │
│   ↓                                                       │
│ Step 5: Use Cached Data from Redux                       │
│   ↓                                                       │
│ Step 6: Component Renders Instantly                      │
└─────────────────────────────────────────────────────────┘
```

**Result:** ✅ No API Call, Instant Rendering from Cache

---

### **Scenario 3: Cache Expired (Over 5 Minutes)**

```
┌─────────────────────────────────────────────────────────┐
│ Step 1: User Returns After 6 Minutes                    │
│   ↓                                                       │
│ Step 2: useHeroContentRedux() hook runs                  │
│   ↓                                                       │
│ Step 3: Check Redux State                                │
│   • lastFetched = 1704123456789 (6 minutes ago)         │
│   • cacheExpiry = 300000 (5 minutes)                     │
│   • Time difference = 6 minutes > 5 minutes ❌          │
│   • needsRefresh = true ✅                               │
│   ↓                                                       │
│ Step 4: Dispatch fetchHeroContent()                      │
│   ↓                                                       │
│ Step 5: API Call → GET /api/hero/active                 │
│   ↓                                                       │
│ Step 6: Update Redux State                               │
│   • heroContent = {...new api data...}                  │
│   • lastFetched = Date.now() (updated timestamp)        │
│   ↓                                                       │
│ Step 7: Component Renders with Fresh Data                │
└─────────────────────────────────────────────────────────┘
```

**Result:** ✅ API Call Made, Cache Refreshed

---

### **Scenario 4: Manual Refresh**

```javascript
// Somewhere in your component
import { useAppDispatch } from '@/store/hooks';
import { refreshHeroContent } from '@/store/slices/heroSlice';

const dispatch = useAppDispatch();

// Force refresh
dispatch(refreshHeroContent());
```

```
┌─────────────────────────────────────────────────────────┐
│ Step 1: refreshHeroContent() Action Dispatched          │
│   ↓                                                       │
│ Step 2: Redux State Updated                              │
│   • isStale = true ✅                                    │
│   • lastFetched = null                                   │
│   ↓                                                       │
│ Step 3: Hook Detects Change                              │
│   • needsRefresh = true (because isStale = true)        │
│   ↓                                                       │
│ Step 4: API Call → GET /api/hero/active                 │
│   ↓                                                       │
│ Step 5: Fresh Data Loaded                                │
└─────────────────────────────────────────────────────────┘
```

**Result:** ✅ Immediate API Call, Cache Refreshed

---

## ⏱️ Timeline Example

```
Time: 10:00 AM - First Visit
└─> API Call ✅
└─> Data Cached (lastFetched: 10:00 AM)

Time: 10:02 AM - Return Visit (2 minutes later)
└─> No API Call ❌ (Cache Valid)
└─> Use Cached Data ✅

Time: 10:03 AM - Navigate Away & Back (3 minutes later)
└─> No API Call ❌ (Cache Still Valid)
└─> Use Cached Data ✅

Time: 10:06 AM - Return Visit (6 minutes later)
└─> API Call ✅ (Cache Expired)
└─> Data Refreshed (lastFetched: 10:06 AM)

Time: 10:07 AM - Return Visit (1 minute later)
└─> No API Call ❌ (Cache Valid)
└─> Use Cached Data ✅
```

---

## 🎯 Cache Benefits

### **Performance**
- ✅ Faster page loads (no API wait time)
- ✅ Reduced server load (fewer API calls)
- ✅ Better user experience (instant data)

### **Network Efficiency**
- ✅ Less bandwidth usage
- ✅ Works offline (if data exists in cache)
- ✅ Handles network errors gracefully

### **Smart Refresh**
- ✅ Auto-refresh when cache expires
- ✅ Manual refresh option available
- ✅ Stays fresh but not too frequent

---

## 🔧 Cache Configuration

### **Change Cache Duration**

Edit `user-frontend/src/store/slices/heroSlice.js`:

```javascript
const initialState = {
  // ... other state
  cacheExpiry: 10 * 60 * 1000, // Change to 10 minutes
  // cacheExpiry: 60 * 1000,    // Or 1 minute
};
```

### **Disable Cache** (Always Fetch)

```javascript
cacheExpiry: 0, // Always expired = always fetch
```

### **Longer Cache** (1 Hour)

```javascript
cacheExpiry: 60 * 60 * 1000, // 1 hour
```

---

## 🧪 Testing Cache

### **Check Cache Status in Browser Console**

```javascript
// Open Redux DevTools or run this in console:
const state = store.getState();
console.log({
  lastFetched: new Date(state.hero.lastFetched),
  cacheExpiry: state.hero.cacheExpiry / 1000 + ' seconds',
  needsRefresh: Date.now() - state.hero.lastFetched > state.hero.cacheExpiry,
  timeSinceLastFetch: (Date.now() - state.hero.lastFetched) / 1000 + ' seconds ago'
});
```

### **Monitor Network Tab**

1. Open DevTools → Network tab
2. Filter by "hero"
3. First load: See API call
4. Navigate back: No API call (cache working!)
5. Wait 5+ minutes: See API call (cache expired)

---

## 📊 Cache Flow Diagram

```
                    Component Mounts
                           │
                           ▼
              ┌─────────────────────────┐
              │ useHeroContentRedux()   │
              └─────────────────────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │ Check needsRefresh      │
              │ (from Redux selector)   │
              └─────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            │                             │
            ▼                             ▼
      needsRefresh = true        needsRefresh = false
            │                             │
            ▼                             ▼
    ┌──────────────┐              ┌──────────────┐
    │ Fetch API    │              │ Use Cache    │
    └──────────────┘              └──────────────┘
            │                             │
            ▼                             ▼
    ┌──────────────┐              ┌──────────────┐
    │ Update State │              │ Render Data  │
    │ + Cache Time │              │ Instantly    │
    └──────────────┘              └──────────────┘
```

---

## 🎓 Summary

**Cache works like this:**

1. **First Time**: Fetch from API → Save to Redux → Remember timestamp
2. **Short Time Later**: Check timestamp → Still valid → Use cache → No API call
3. **Long Time Later**: Check timestamp → Expired → Fetch from API → Update cache
4. **Manual Refresh**: Set stale flag → Force fetch → Update cache

**Key Point**: Data is stored in Redux state, and the hook intelligently decides when to fetch new data based on time elapsed and cache expiry rules.

---

## 🚀 Next Steps

To add caching to other APIs, follow the same pattern:
1. Create slice with `lastFetched` and `cacheExpiry`
2. Create `selectNeedsRefresh` selector
3. Create hook that checks `needsRefresh` before fetching
4. Use hook in components

The cache will work automatically! 🎉

