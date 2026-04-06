# Enhanced Search - Low Level Design (React Native Only)

## 🎯 Scope

This LLD covers **Enhanced Movie Search** functionality:

- Movie search with advanced filtering (rating range, language, runtime) 
- Extends existing useMovieStore (no separate search store)
- Search optimization and caching with AsyncStorage
- **Focus**: React Native app only
- **Excludes**: User authentication, ML recommendations, API rate limiting, multi-entity search

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Search UI     │───▶│   MovieStore    │───▶│  Search API     │
│   Components    │    │ (Extended)      │    │   Service       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Enhanced Filter │    │  Cache Store    │    │   TMDB API      │
│   Components    │    │ (AsyncStorage)  │    │   /search/movie │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 File Structure (Design Only)

```
movies-rn/src/
├── components/
│   ├── SearchBar.tsx                  # Search input component
│   ├── EnhancedFilter.tsx            # Extended filter with new options
│   └── (existing components remain unchanged)
├── hooks/
│   ├── useMovieStore.ts              # Extended with search functionality
│   ├── useSearchDebounce.ts          # Debounced search hook
│   └── (existing hooks remain)
├── services/
│   ├── searchAPI.ts                  # TMDB search API integration
│   └── searchCache.ts                # AsyncStorage cache management
└── common/
    └── searchConstants.ts            # Search-related constants
```

## 🎨 UI Design & Placement

### Recommended Layout: Search Bar Above Filters

```
┌─────────────────────────────────────────────────┐
│ NavigationHeader (unchanged)                    │
│ [Hamburger] Movie with RN/Lynx    [fps counter]│
│                              [Movie count badge]│
├─────────────────────────────────────────────────┤
│ 🆕 SEARCH SECTION (~8% height)                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ 🔍 Search movies...            [X] [Filter]│ │
│ └─────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────┤
│ Enhanced Filter Section (~12% height)           │
│ [All] [Action] [Comedy] [Drama] | [2024][2023]..│
│ 🆕 [Rating: 7.0-9.0] [Language: EN] [Runtime: 90-180m] │
├─────────────────────────────────────────────────┤
│ Movie Results (~70% height)                     │
│   [Movie Card 1] - Shows search results         │
│   [Movie Card 2] - when searching               │
│   [Movie Card 3] - Falls back to discover       │
│   ...                                           │
├─────────────────────────────────────────────────┤
│ Footer (~10% height)                            │
│ [Clear Search] or [Refresh List] (conditional)  │
└─────────────────────────────────────────────────┘
```

### Search States & Behavior (Simplified)

**🔍 Empty Input (Default)**: 
- Placeholder: "Search movies..."
- Shows `moviesList` (discover results with current filters)
- No API calls triggered

**⌨️ User Typing**:
- Debounced search (300ms) triggers `searchMovies(query)` 
- Uses existing `isLoading` flag
- Populates `searchResults` array

**📋 Results State**:
- Component shows `searchResults` when input has text
- Component shows `moviesList` when input is empty
- Footer shows different actions based on input state

**🚫 Empty Results**:
- `searchResults = []` with text in input
- Show "No movies found" message
- Suggest clearing search or trying different keywords

## 🔧 Simplified MovieStore Design  

### No New State Fields Needed!

```typescript
interface MovieStore {
  // 📋 Existing (unchanged - use as-is!)
  moviesList: Movie[]        // discover results
  searchResults: Movie[]     // search results (already exists!)
  isLoading: boolean         // reuse for both discover and search
  error: string | null       // reuse for both discover and search  
  filter: string | null
  menuOpened: boolean
}
```

**Search Mode Logic**: Determined by component input state, not store state
```typescript
// In SearchBar component
const [inputValue, setInputValue] = useState('')

// In HomeScreen component  
const moviesToShow = inputValue.trim() ? searchResults : moviesList
```

### New Actions (minimal additions)

```typescript
interface MovieAction {
  // 📋 Existing (unchanged)
  getMovies: (apiKey, page, yearFilter, genreFilter?) => Promise<void>
  resetList: () => Promise<void>
  setOpenMenu: (state) => Promise<void>
  
  // 🆕 Search actions (minimal)
  searchMovies: (query: string) => Promise<void>  // populates searchResults
  clearSearchResults: () => void                  // clears searchResults array
}
```

## 🎨 UI Mockup Preview

```
┌─────────────────────────────────────────────────┐
│                                                 │ CURRENT
│ [≡] Movie with RN/Lynx              60fps [142] │ NAVIGATION 
│                                                 │ HEADER
├─────────────────────────────────────────────────┤
│                                                 │
│ ┌─────────────────────────────────────────────┐ │ 🆕 NEW
│ │ 🔍 Search movies...     [✕] [⚙️ Filters] │ │ SEARCH  
│ └─────────────────────────────────────────────┘ │ SECTION
│                                                 │ (~8% height)
├─────────────────────────────────────────────────┤
│ Genre Filters:                                  │ ENHANCED
│ [All] [Action] [Comedy*] [Drama]               │ FILTER 
│                                                 │ SECTION
│ Year Filters:                                   │ (~12% height)
│ [2024*] [2023] [2022] [2021]                   │
│                                                 │
│ 🆕 Active Filters: [Comedy] [2024] [Rating: 7.0-9.0] [×] │
├─────────────────────────────────────────────────┤
│                                                 │ MOVIE
│ [Movie Card 1: Batman Begins]                   │ RESULTS
│ ⭐ 8.2 • 2005 • Action, Crime                   │ (~70% height)
│                                                 │ 
│ [Movie Card 2: The Dark Knight]                 │ Shows either:
│ ⭐ 9.0 • 2008 • Action, Crime                   │ • Search results
│                                                 │ • Discover results  
│ [Movie Card 3: Batman Returns]                  │
│ ⭐ 7.0 • 1992 • Action, Fantasy                 │
│                                                 │
│ ... (infinite scroll continues)                 │
├─────────────────────────────────────────────────┤
│                                                 │ FOOTER
│ [Clear Search & Filters] or [Refresh List]     │ (~10% height)
│                                                 │ (conditional)
└─────────────────────────────────────────────────┘
```

### Search Field Interaction States

**1. 🔍 Empty State (Default)**
```
┌───────────────────────────────────────────────┐
│ 🔍 Search movies...            [⚙️ Filters] │
└───────────────────────────────────────────────┘
```

**2. ⌨️ Active Typing State**  
```
┌───────────────────────────────────────────────┐
│ 🔍 batman|                [✕] [⚙️ Filters] │
└───────────────────────────────────────────────┘
                                     ↳ Debouncing...
```

**3. 📋 Results Found State**
```
┌───────────────────────────────────────────────┐
│ 🔍 batman                 [✕] [⚙️ Filters] │
└───────────────────────────────────────────────┘
    ↳ Found 47 movies
```

**4. ⚠️ No Results State**
```
┌───────────────────────────────────────────────┐
│ 🔍 xyz123abc               [✕] [⚙️ Filters] │
└───────────────────────────────────────────────┘
    ↳ No movies found - Try different keywords
```

### Enhanced Filter Panel (Expandable)

**When Filter button pressed:**
```
┌─────────────────────────────────────────────────┐
│ 🔍 batman                 [✕] [⚙️ Filters ▲] │
├─────────────────────────────────────────────────┤
│ 📊 ENHANCED FILTERS                    [Reset] │
├─────────────────────────────────────────────────┤
│ Genre: [All] [Action*] [Comedy] [Drama]         │
│ Year:  [2024] [2023*] [2022] [2021]             │ 
├─────────────────────────────────────────────────┤
│ 🆕 Rating: [――――●────●――――] 7.0 - 9.0          │
│ 🆕 Language: [English ▼] [Spanish] [French]     │ 
│ 🆕 Runtime: [―――●―――――――●―] 90min - 180min      │
├─────────────────────────────────────────────────┤
│                              [Apply Filters]    │
└─────────────────────────────────────────────────┘
```

## 📊 API Design Strategy

### Search API Integration

**New Service Functions**:
- `searchMovies(query, enhancedFilters, page)` - TMDB /search/movie endpoint
- `discoverWithFilters(enhancedFilters, page)` - Enhanced /discover/movie endpoint  
- `cacheSearchResults(key, data)` - AsyncStorage caching
- `getCachedResults(key)` - Cache retrieval with TTL

**TMDB API Usage**:
- **Search Mode**: `/search/movie` + enhanced filter parameters
- **Discover Mode**: Existing `/discover/movie` + new filter parameters  
- **Caching**: 5-minute TTL for search results
- **Pagination**: Same infinite scroll pattern as existing

## 🎛️ Filter Enhancement Strategy

### Current Filters (keep unchanged)
- **Genre**: Action, Comedy, Drama buttons
- **Year**: 2024, 2023, 2022, 2021 buttons

### New Advanced Filters (additive)
- **Rating Range**: Dual slider (0.0 - 10.0) 
- **Language**: Dropdown (English, Spanish, French, etc.)
- **Runtime**: Dual slider (60 - 240 minutes)

**Filter Behavior**:
- All filters work together (AND logic)
- Applied filters show as removable chips
- Filters persist between search/discover modes
- "Reset Filters" button clears all enhanced filters

## ⚡ Performance Strategy

### Search Optimization
- **Debounced Input**: 300ms delay to reduce API calls
- **Result Caching**: AsyncStorage with 5-minute TTL
- **Pagination**: Load 20 results per page
- **Loading States**: Separate loading for search vs discover

### Memory Management
- **Cache Limits**: Maximum 50MB for search cache
- **Result Limits**: Maximum 200 movies per search
- **Cache Cleanup**: Remove expired entries on app launch

## 🔄 Simplified User Experience Flow

```
1. User opens HomeScreen → Shows moviesList (discover results)
2. User taps search field → Keyboard appears
3. User types "batman" → Debounced searchMovies() after 300ms
4. Component automatically shows searchResults (because input has text)
5. User clears input → Component automatically shows moviesList again
6. No complex state management needed!
```

**Key Simplifications:**
- ✅ No global search state to manage
- ✅ Component input state drives everything  
- ✅ No "search mode" flags needed
- ✅ Clear input = instant return to discover

## 🎯 Simplified Implementation Priority

### Phase 1: Basic Search (3-4 days)
- [SearchBar.tsx] Search input with debouncing (local state only)
- [useMovieStore] Add `searchMovies()` action (reuse existing patterns)
- [HomeScreen] Add search bar above filters + conditional display logic
- [searchAPI.ts] Basic TMDB /search/movie integration

### Phase 2: Enhanced Filters (1 week)  
- [EnhancedFilter.tsx] Rating, Language, Runtime filters UI
- [useMovieStore] Extend searchMovies() to accept filter parameters
- [HomeScreen] Integrate enhanced filters with existing filter section

### Phase 3: Polish & Performance (2-3 days)
- [searchCache.ts] AsyncStorage caching for search results
- Error handling and empty states
- Performance monitoring and optimization

---

## 🎯 Why This Simplified Approach Works Best

✅ **Minimal State Changes**: Only uses existing `searchResults` array  
✅ **Component-Driven**: Input state controls everything, no global flags  
✅ **Reuses Everything**: Same loading, error, pagination patterns  
✅ **Simple Logic**: Empty input → discover, text input → search  
✅ **Easy Testing**: Each piece works independently  

**Key Design Benefits**:
✅ **Ultra-Minimal Store Changes**: Just one new `searchMovies()` action  
✅ **No State Pollution**: No search-specific state flags  
✅ **Instant Mode Switching**: Clear input = instant return to discover  
✅ **Follows User Expectations**: Natural behavior for search inputs

**Questions for You:**
1. Do you like this **search bar above filters** placement?
2. Should the enhanced filters be **always visible** or **expandable** (as shown)?  
3. Any changes to the search field design or interaction states?