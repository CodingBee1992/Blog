ENGLISH VERSION BELOW

```bash
# Fullstack Blog App – React + Node

Nowoczesny projekt blogowy z własnym backendem, systemem użytkowników, komentarzy, postów oraz panelem administratora (50% ukończony).
Design inspirowany stylem Pinterest (masonry grid) – w pełni responsywny i estetyczny.


## 🚀 Funkcje aplikacji

### 🧑‍💻 Użytkownicy

- Rejestracja
- Logowanie
- Uwierzytelnianie JWT
- Ochrona tras i zasobów

### 📝 Posty

- Dodawanie postów
- Edycja postów
- Usuwanie postów
- Przeglądanie wszystkich postów
- Widok pojedynczego postu
- Kategorie postów w menu
- Wyszukiwarka po tytułach postów

### 💬 Komentarze

- Dodawanie komentarzy
- Edycja komentarzy
- Usuwanie komentarzy
- Przypisanie komentarzy do użytkownika i do posta

### 📸 Obrazy

- Wgrywanie obrazów na **Cloudinary**
- Obrazy przypisane do posta

### 📊 Panel Administratora (50% ukończony)

- Zarządzanie użytkownikami
- Podgląd i moderacja postów
- Podgląd i moderacja komentarzy
  _(Można łatwo rozbudować o dodatkowe moduły)_

### 🎨 UI / UX

- Nowoczesny layout inspirowany **Pinterest**
- Masonry / waterfall grid
- Responsywny design (mobile-first)
- Intuicyjny interfejs w React

---

## 🧰 Technologie

### Frontend

- **React** (Hooks, komponenty funkcyjne)
- React Router
- React Redux
- React ReduxJs/Toolkit
- React Hook Form
- ZOD
- JS-Cookie
- CSS / SCSS / Styled Components
- Responsywna architektura

### Backend

- **Node.js + Express**
- REST API
- Kontrolery + route’y + middleware
- JWT
- Obsługa błędów
- Zabezpieczenia podstawowe

### Baza danych

- MongoDB

### Obrazy

- **Cloudinary** (wgrywanie i przechowywanie obrazków)

---

## 📦 Instalacja i uruchomienie

### 1. Sklonuj repo:


git clone <twoje-repo-url>
cd <folder-projektu>


🔧 Backend
Instalacja zależności
cd backend
npm install

Zmienne środowiskowe

Utwórz plik .env w folderze backend i dodaj wartości:

PORT = 8000
MONGODB_URL = 'your_database_url'
JWT_SECRET = 'your_secret_key'

CLOUDINARY_CLOUD_NAME = your_cloud_name
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_API_SECRET = your_api_secret


Start backendu
npm run backend


Backend uruchomi się pod adresem:

http://localhost:8000

🎨 Frontend
Instalacja zależności
cd frontend
npm install

Start aplikacji
npm run dev || lub cd ..  npm run frontend


Frontend uruchomi się pod adresem:

http://localhost:5173

🔗 Połączenie front-back

W pliku konfiguracyjnym frontendu (np. api.js, .env, lub inny):

VITE_API_URL = http://localhost:8000

🗂 Struktura projektu
/frontend
  /src
    /assets
    /components
        /atoms
        /modules
        /organism
        /pages
        /templates
    /containers
    /hooks
    /slices
    /context
    /types
    /utils

/backend
  /config
  /controllers
  /middlewares
  /models
  /routes
  /utils

🛠 Możliwe kierunki rozwoju

Dokończenie panelu administratora

System ról (Admin / User)

Kategorie postów / tagi

Lajki / oceny postów

Notatki prywatne użytkownika


📄 Licencja / Prawa autorskie

## Kod autora:
- Wszystkie elementy kodu frontend i backend zostały napisane wyłącznie przeze mnie.
- **Użycie komercyjne kodu jest zabronione** bez mojej wyraźnej zgody.
- Kod można używać, modyfikować i wdrażać **do celów osobistych lub edukacyjnych**, ale **nie można go sprzedawać ani rozpowszechniać komercyjnie**.

## Szablon graficzny (Styleshout):
- Projekt korzysta z szablonu Styleshout na licencji ich strony.
- Szablon można używać i modyfikować w projektach, również komercyjnych, **pod warunkiem podania odpowiedniego źródła**:

## Licencje użytych ikon

- **Calcite UI Icons**
  Author: Esri
  License: MIT
  Repo: [https://github.com/Esri/calcite-ui-icons](https://github.com/Esri/calcite-ui-icons)
*MIT pozwala na użycie, modyfikację i dystrybucję, pod warunkiem dołączenia pełnego tekstu licencji.*

- **Nuiverse Icons**
  Author: Nuiverse Design
  License: BSD
  Repo: [https://gitlab.com/nuinalp/open-source/nuiverse/icons](https://gitlab.com/nuinalp/open-source/nuiverse/icons)
  *BSD pozwala na użycie, modyfikację i dystrybucję pod warunkiem dołączenia oryginalnej licencji.*

- **Unicons**
  Author: Iconscout
  License: Apache License 2.0
  Repo: https://github.com/Iconscout/unicons
  *Apache 2.0 pozwala na użycie, modyfikację i dystrybucję (również komercyjną) pod warunkiem zachowania informacji o licencji i autorze.*


👤 Autor

Projekt wykonany przez: CoodingBee
Kontakt: codingBeeBee@gmail.com



#ENGLISH VERSION

# Fullstack Blog App – React + Node
A modern full-stack blog application with a custom backend, user system, comments, posts, and a partially completed admin panel (50%).
Features a Pinterest-style responsive layout (masonry / waterfall grid) for a clean and modern user experience.

---

## 🚀 Features

### 👤 Users

- User registration
- User login
- Authentication JWT
- Protected routes and restricted actions

### 📝 Posts

- Create post
- Edit post
- Delete post
- View all posts
- View single post
- Post categories in the menu
- Search posts by title

### 💬 Comments

- Add comment
- Edit comment
- Delete comment
- Comments linked to both user and post

### 📸 Images
- Upload images via **Cloudinary**
- Images attached to posts

### 📊 Admin Panel (50% ready)

- Post moderation
- Comment moderation
- User management (if implemented)
- Easy to extend and complete

### 🎨 UI / UX

- Pinterest-inspired layout (masonry grid)
- Fully responsive (mobile-friendly)
- Clean and modern UI built with React components

---

## 🧰 Technologies Used

### Frontend

- **React** (Hooks, functional components)
- React Router
- React Redux
- React ReduxJS/Toolkit
- React Hook Form
- ZOD
- JS-Cookie
- CSS / SCSS / Styled Components
- Responsive design

### Backend

- **Node.js + Express**
- REST API architecture
- Controllers, routes, middleware
- JWT
- Error handling & basic security

### Database

- MongoDB

### Image Hosting

- **Cloudinary** (for image uploads)

---

## 📦 Installation & Setup

### 1. Clone the repository

bash
git clone <your-repo-url>
cd <project-folder>

🔧 Backend Setup
Install dependencies
bash

cd backend
npm install

Create .env file in /backend and add :

PORT = 8000
MONGODB_URL = 'your_data_base_url'
JWT_SECRET = 'your_jtw_secret'

CLOUDINARY_CLOUD_NAME = your_cloud_name
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_API_SECRET = your_api_secret

Start backend
#bash

npm run backend

Backend will run at: http://localhost:8000

🎨 Frontend Setup
Install dependencies
#bash

cd frontend
npm install

Start frontend
# bash

npm run dev ||' cd ..' : npm run frontend

Frontend will run at: http://localhost:5173

🔗 Frontend → Backend Connection
In the frontend config (e.g., .env, api.js, etc.) set:

VITE_API_URL = http://localhost:8000

🗂 Project Structure (Example)

/frontend
  /src
    /assets
    /components
        /atoms
        /modules
        /organism
        /pages
        /templates
    /containers
    /hooks
    /slices
    /context
    /types
    /utils

/backend
  /config
  /controllers
  /middlewares
  /models
  /routes
  /utils

🛠 Possible Extensions
Finish admin panel

Role system (Admin / User)

Post categories and tags

Likes, reactions, or ratings


📄 License / Copyright

## Author's Code:
- All code in this project (frontend and backend) was written solely by me.
- **Commercial use of the code is strictly prohibited** without explicit written permission.
- You may use, modify, and deploy the code for **personal or educational purposes only**, but **you cannot sell or redistribute it commercially**.

## Graphic Template (Styleshout):
- This project uses a template from Styleshout under their license.
- You may use and modify this template in your projects, including commercial ones, **as long as you give proper credit**:

## Licenses for icons used

- **Calcite UI Icons**
  Author: Esri
  License: MIT
  Repo: https://github.com/Esri/calcite-ui-icons
  *MIT allows use, modification, and distribution, provided that the full license text is included.*

- **Nuiverse Icons**
  Author: Nuiverse Design
  License: BSD
  Repo: https://gitlab.com/nuinalp/open-source/nuiverse/icons
  *BSD allows use, modification, and distribution, provided that the original license is included.*

- **Unicons**
  Author: Iconscout
  License: Apache License 2.0
  Repo: https://github.com/Iconscout/unicons
  *Apache 2.0 allows use, modification, and distribution (including commercial use), provided that the license and copyright notice are preserved.*



👤 Author
Created by: CodingBee
Contact: codingBeeBee@gmail.com


ENGLISH VERSION BELOW :

---

# ❓ **FAQ dla kupującego (zaktualizowane)**

## **Q1: Czy projekt jest w pełni funkcjonalny?**

Tak — blog, posty, komentarze, autoryzacja i frontend działają w pełni.
Panel administracyjny jest częściowo ukończony (~50%), ale można go łatwo rozszerzyć.

## **Q2: Czy mogę używać projektu komercyjnie?**

Nie — kod tego projektu nie może być kopiowany, redystrybuowany ani sprzedawany w celach komercyjnych bez wyraźnej, pisemnej zgody autora.
Kod można używać i modyfikować wyłącznie do celów osobistych, edukacyjnych lub niekomercyjnych.

## **Q3: Czy mogę używać projektu dla klientów?**

Projekt można używać w projektach osobistych lub edukacyjnych, ale nie można go odsprzedawać ani redystrybuować komercyjnie.
Jeśli chcesz użyć projektu w celach komercyjnych, musisz skontaktować się z autorem w celu uzyskania zgody.

## **Q4: Czy mogę użyć szablonu Styleshout w moim projekcie?**

Tak — szablon można używać i modyfikować w projekcie, również komercyjnie, pod warunkiem podania odpowiedniego źródła:

Design template by Styleshout.com


Nie wolno natomiast redystrybuować ani sprzedawać samego szablonu.

## **Q5: Czy projekt działa na urządzeniach mobilnych?**

Tak — UI jest w pełni responsywne i zoptymalizowane pod wszystkie rozmiary ekranów.

## **Q6: Czy mogę modyfikować wygląd?**

Tak — wszystkie komponenty frontendu są modularne, więc można dowolnie zmieniać style, układ i funkcjonalności.

## **Q7: Jak działa wgrywanie obrazków?**

Obrazy są wgrywane przez Cloudinary i przypisane do postów.
Do działania potrzebne jest własne konto Cloudinary i dane API.

## **Q8: Czy projekt posiada funkcję wyszukiwania?**

Tak — użytkownicy mogą wyszukiwać posty po tytułach.

## **Q9: Czy projekt obsługuje kategorie postów?**

Tak — kategorie są wyświetlane w menu i można je przypisywać do postów.

## **Q10: Co jest potrzebne do wdrożenia?**

Hosting backendu (Render, Railway lub własny serwer)

Hosting frontendu (Twoja strona lub serwer)

Połączenie z bazą danych (MongoDB )

Konto Cloudinary do wgrywania obrazków

## **Q11: Czy mogę samodzielnie dokończyć panel admina?**

Tak — panel administracyjny jest częściowo zaimplementowany i korzysta z tej samej struktury kodu, więc łatwo go rozszerzyć.

## **Q12: Czy aplikacja jest skalowalna dla wielu użytkowników?**

Tak — stos React + Node.js + baza danych jest skalowalny i nadaje się do projektów o dużym ruchu.

---

# ❓ **3. FAQ for Buyers**

### **Q1: Is this project fully functional?**

Yes — the blog, posts, comments, authentication, and frontend are fully functional.
The admin panel is partially completed (~50%) but can be easily extended.

### **Q2: Can I use the project commercially?**

No — the code of this project cannot be copied, redistributed, or sold for commercial purposes without the explicit written permission of the author.
You may use and modify it for personal, educational, or non-commercial deployment only.

### **Q3: Can I use this project with clients?**

You can use the project for personal or educational projects, but you cannot resell or redistribute it commercially.
If you want to use it for commercial purposes, you must contact the author for permission.

### **Q4: Can I use the included Styleshout template in my project?**

Yes — the template can be used and modified in your project, including commercial projects, as long as you give proper credit:

Design template by Styleshout.com

You cannot redistribute or sell the template itself.

### **Q5: Does the project support mobile devices?**

Yes — the UI is fully responsive and optimized for all screen sizes.

### **Q6: Can I customize the design?**

Yes — all frontend components are modular, so you can modify styles, layout, and functionality.

### **Q7: How does image uploading work?**

Images are uploaded via Cloudinary and attached to posts. You will need your own Cloudinary account and API credentials.

### **Q8: Does the project have search functionality?**

Yes — users can search posts by title.

### **Q9: Does the project support post categories?**

Yes — categories are displayed in the menu and can be assigned to posts.

### **Q10: What do I need for deployment?**

A hosting platform for the backend (Render, Railway, or your own server)

Hosting for the frontend (your website or server)

Database connection (MongoDB)

Cloudinary account for image uploads

### **Q11: Can I finish the admin panel myself?**

Yes — the admin panel is partially implemented and follows the same code structure, so it’s easy to extend.

### **Q12: Can the app scale for multiple users?**

Yes — the React + Node.js + database stack is scalable and suitable for high-traffic projects.

```
