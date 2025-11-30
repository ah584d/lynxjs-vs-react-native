# **MovieWithLynx — Discover Movies with LynxJS**  

**MovieWithLynx** is a fast and smooth movie discovery app built with **LynxJS**, the new open-source cross-platform framework from **ByteDance**. With **MovieWithLynx**, you can easily explore movies based on genre, release year, and ratings—all in a **high-performance, native-first experience** powered by LynxJS’s multi-threaded architecture.  

## 🔗 **Join the LynxJS Community**  
- **LinkedIn Group:** [LynxJS Developers](https://www.linkedin.com/groups/14621185/)  
- **GitHub:** [bonnmh](https://github.com/bonnmh)  

### GIF Preview
![Demo Preview](https://raw.githubusercontent.com/bonnmh/MoviesWithLynx/main/preview/demo.gif)

### ScreenShot Preview
![MovieWithLynx Demo](https://firebasestorage.googleapis.com/v0/b/plantea-5f102.appspot.com/o/Simulator%20Screenshot%20-%20iPhone%2011%20-%202025-03-10%20at%2011.27.14.png?alt=media&token=36d57035-07f5-440e-9467-d8e18643b202)  
![MovieWithLynx Demo](https://firebasestorage.googleapis.com/v0/b/plantea-5f102.appspot.com/o/Screenshot%202025-03-10%20at%2011.33.22.png?alt=media&token=f45dbd0c-0382-4cb6-af16-da10840bad8c)  
 

---

## 🚀 **Why LynxJS?**  

**LynxJS** is a cutting-edge framework designed to build **high-performance native applications** with a multi-threaded approach. It ensures a **buttery-smooth UI**, even when handling **large movie lists**.  

### **💡 Key Features of LynxJS**  
✅ **Multi-threaded architecture** for a seamless UI experience  
✅ **Native-first** support for both iOS & Android  
✅ **Instant First Frame Rendering (IFR)** for near-instant app startup  
✅ **Rspeedy** – Rust-based build tool for lightning-fast compilation  
✅ **Full CSS support** – including animations, gradients, and masking  
✅ **Lynx Devtool** – Advanced debugging & UI inspection  

---

## 🎬 **Core Features of MovieWithLynx**  

📌 **Movie Filters:**  
🎭 **Genre:** _All, Action, Comedy, Drama_  
📅 **Year:** _All, 2020s, 2010s, 2000s_  
🔝 **Recommendation Mode:** _Random or Highest Rated_  

📌 **Movie Details Display:**  
- Title  
- Rating  
- Description  
- Release Date  
- Poster  

This app is designed to **test LynxJS’s performance**, especially in handling **large lists of movies**.  

---

## 📥 **Installation & Setup**  

### **1️⃣ Requirements**  

- **Node.js** >= 18  
- **Lynx CLI**  
- **Xcode (macOS)** for iOS development  
- **Android Studio** for Android development  

---

### **2️⃣ Clone the Repository & Install Dependencies**  

```sh
git clone https://github.com/bonnmh/MovieWithLynx.git
cd MovieWithLynx
npm install
```

---

### **3️⃣ Set Up TMDB API Key**  

The app uses **[The Movie Database (TMDB)](https://www.themoviedb.org/)** API to fetch movie data.  

#### **🔹 Get Your API Key from TMDB**  
1. Go to [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)  
2. Sign in or create a TMDB account  
3. Click **"Create API Key"** and select **Developer**  
4. Copy your **TMDB_API_KEY**  

#### **🔹 Create a `.dev` file & Add API Key**  
```sh
touch .dev
```

Open `.dev` and add the following:  
```plaintext
TMDB_API_KEY=your_api_key_here
```
Replace `your_api_key_here` with your actual TMDB API Key.  

#### **🔹 Read API Key in the Code**  
In **config.ts**, add:  
```ts
import dotenv from 'dotenv';

dotenv.config();

export const TMDB_API_KEY = process.env.TMDB_API_KEY;
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
```

Use it in API requests:  
```ts
const fetchMovies = async (genre: string, year: string) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genre}&primary_release_year=${year}`
  );

  const data = await response.json();
  return data.results;
};
```

---

### **4️⃣ Run the App on a Simulator or Real Device**  

#### **Run on iOS (Requires Xcode)**  
```sh
lynx run ios
```

#### **Run on Android (Requires Android Studio)**  
```sh
lynx run android
```

✅ **Now, you can explore MovieWithLynx and experience the power of LynxJS!**  

---

## 🛠️ **Tech Stack & Tools Used**  

| Technology | Purpose |
|------------|---------|
| **LynxJS** | Core UI framework |
| **ReactLynx** | React-like component model |
| **Rspeedy** | Rust-based build tool |
| **Lynx Devtool** | Debugging & UI inspection |
| **Preact** | Ultra-light virtual DOM |
| **TMDB API** | Movie data source |
| **TypeScript** | Type-safe development |

---

## 🔮 **Future Plans for MovieWithLynx**  

📌 **Upcoming Features:**  
- User accounts & favorite movie lists  
- Improved recommendation algorithm  
- Advanced filtering (language, runtime, etc.)  
- Animated transitions using Lynx CSS  

---

## 📚 **Resources & References**  

📖 **Learn More About LynxJS**  
- [LynxJS Docs](https://lynx-docs.com)  
- [LynxJS Blog](https://lynx-blog.com)  

📦 **Tools Used**  
- [TMDB API](https://developer.themoviedb.org/)  
- [Preact](https://preactjs.com/)  
- [Rust](https://www.rust-lang.org/)  

---

🎉 **Ready to explore LynxJS? Let’s build MovieWithLynx together!**
