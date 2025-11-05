# [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Source+Code+Pro&weight=500&size=25&pause=1000&color=F796A0&vCenter=true&width=435&lines=Learning+Japanese+App+%F0%9F%8C%B8)](https://git.io/typing-svg)

Welcome to the Learning Japanese App! This is a full-stack web application designed to help users learn and interact with the Japanese language, born from my personal journey as a Chilean learning Japanese.

As I delved into the language, I found the process both fulfilling and challenging. I built this app to share that excitement, and provide a platform for others on a similar path.

## [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Source+Code+Pro&weight=500&size=25&color=F796A0&vCenter=true&repeat=false&width=435&lines=Features)](https://git.io/typing-svg)

-   **Name Translator**: Translates your name into Katakana, the Japanese script for foreign words, and provides the Romaji pronunciation.
-   **Text Translator**: Translates phrases and texts from the language of your preference (according to DeepL support hehe) to Japanese with Romaji transcription.
-   **Study Resources**: A curated list of physical study places in Chile and also some online resources.
-   **Message Wall**: An interactive wall where users can post and view messages, with data persisted in a PostgreSQL database.
-   **Fully Containerized**: The entire application is containerized with Docker for easy setup and deployment.

## [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Source+Code+Pro&weight=500&size=25&color=F796A0&vCenter=true&repeat=false&width=435&lines=Tech+Stack)](https://git.io/typing-svg)

-   **Frontend**: React, Vite, TypeScript, Tailwind CSS
-   **Backend**: Python, FastAPI
-   **Database**: PostgreSQL
-   **ORM**: SQLAlchemy
-   **Containerization**: Docker, Docker Compose
-   **Web Server / Reverse Proxy**: Nginx
-   **APIs & Libraries**:
    -   **Translation**: [DeepL API](https://www.deepl.com/pro-api) (currently using the free tier).
    -   **Romaji Conversion**: `pykakasi` for converting Japanese script to phonetic Romaji.

## [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Source+Code+Pro&weight=500&size=25&color=F796A0&vCenter=true&repeat=false&width=435&lines=Architecture+Overview)](https://git.io/typing-svg)

The project uses a decoupled, multi-container architecture orchestrated by Docker Compose.

-   **Frontend**: A React Single-Page Application (SPA) built with Vite. It is served by an Nginx web server.
-   **Backend**: A Python API built with FastAPI that handles business logic, including requests to the DeepL API, Romaji conversion, and database operations.
-   **Database**: A PostgreSQL container that stores all data for the application, such as messages from the message wall.
-   **Nginx as a Reverse Proxy**: To solve cross-origin (CORS) issues and simplify networking, Nginx acts as a reverse proxy. All traffic from the browser goes to Nginx. It serves the frontend files directly and forwards any requests starting with `/api/` to the backend container.

## [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Source+Code+Pro&weight=500&size=25&color=F796A0&vCenter=true&repeat=false&width=435&lines=Database+Schema)](https://git.io/typing-svg)

The application uses a single table, `messages`, to store posts from the message wall. The schema is defined using SQLAlchemy in `database/model.py`.

-   `id` (UUID): A unique identifier for each message, automatically generated.
-   `name` (String): The name of the user who posted the message. Defaults to "Anonymous".
-   `message` (String): The content of the message, limited to 280 characters.
-   `created_at` (DateTime): A timestamp automatically set to the time of creation (in UTC).

## [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Source+Code+Pro&weight=500&size=25&color=F796A0&vCenter=true&repeat=false&width=435&lines=Getting+Started)](https://git.io/typing-svg)

The project can be run using Docker (recommended) or by setting up the frontend and backend environments locally.

### [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Source+Code+Pro&weight=500&size=25&color=F796A0&vCenter=true&repeat=false&width=380&height=30&lines=Using+Docker)](https://git.io/typing-svg)

This method handles all dependencies and networking automatically.

#### [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Source+Code+Pro&weight=500&size=16&duration=500&color=F796A0&center=true&vCenter=true&repeat=false&width=18&height=14&lines=1.)](https://git.io/typing-svg) Prerequisites

-   [Docker](https://www.docker.com/get-started) & Docker Compose
-   A DeepL API Key (the free tier is sufficient)

#### [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Source+Code+Pro&weight=500&size=16&duration=500&color=F796A0&center=true&vCenter=true&repeat=false&width=18&height=14&lines=2.)](https://git.io/typing-svg) Environment Variables

The backend requires environment variables for the DeepL API and the database connection.

1.  Navigate to the `backend/` directory.
2.  Create a `.env` file by copying the example: `cp .env.example .env` (or just create the file manually).
3.  Open the `.env` file and ensure it contains all the required keys:
    ```.env
    DEEPL_API_KEY="your_secret_deepl_api_key"
    POSTGRES_USER=your_user
    POSTGRES_PASSWORD=your_password
    POSTGRES_DB=learning_japanese_db
    DATABASE_URL="postgresql://your_user:your_password@db:5432/learning_japanese_db"
    ```

#### [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Source+Code+Pro&weight=500&size=16&duration=500&color=F796A0&center=true&vCenter=true&repeat=false&width=18&height=14&lines=3.)](https://git.io/typing-svg) Build and Run

From the project's root directory, run:

```bash
docker compose up --build
```

The application will be available at `http://localhost:8080`.


### [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Source+Code+Pro&weight=500&size=25&color=F796A0&vCenter=true&repeat=false&width=500&height=30&lines=Running+Locally+(Without+Docker))](https://git.io/typing-svg)

This method requires you set up separate environments for the frontend, backend, and a local PostgreSQL database.

#### [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Source+Code+Pro&weight=500&size=16&duration=500&color=F796A0&center=true&vCenter=true&repeat=false&width=18&height=14&lines=1.)](https://git.io/typing-svg) Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or newer)
-   [Python](https://www.python.org/) (v3.10 or newer) and `pip`
-   A running local instance of [PostgreSQL](https://www.postgresql.org/download/).

#### [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Source+Code+Pro&weight=500&size=16&duration=500&color=F796A0&center=true&vCenter=true&repeat=false&width=18&height=14&lines=2.)](https://git.io/typing-svg) Backend Setup

In a terminal:

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Set up your .env file with the DEEPL_API_KEY and a DATABASE_URL
#    pointing to your local PostgreSQL instance.
#    Example: DATABASE_URL="postgresql://user:password@localhost:5432/learning_japanese_db"

# 5. Run the backend server
uvicorn main:app --reload
```

The backend will be running on `http://localhost:8000`.

#### [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Source+Code+Pro&weight=500&size=16&duration=500&color=F796A0&center=true&vCenter=true&repeat=false&width=18&height=14&lines=3.)](https://git.io/typing-svg) Frontend Setup

In a **new** terminal:

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

The frontend will be available at `http://localhost:8080` (or another port if 5173 is busy). The `vite.config.ts` is pre-configured to proxy API requests to the backend at port 8000.

## [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Source+Code+Pro&weight=500&size=25&color=F796A0&vCenter=true&repeat=false&width=435&lines=Notes+on+APIs+and+Libraries)](https://git.io/typing-svg)

-   **DeepL API**: This project relies on the DeepL API for translations. The free tier has a monthly character limit.
-   **`pykakasi`**: This library provides the Romaji conversion. While effective for many cases, it may have limitations. I am currently exploring more alternatives for better accuracy.

## [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Source+Code+Pro&weight=500&size=25&color=F796A0&vCenter=true&repeat=false&width=435&lines=Future+Plans+%F0%9F%94%AE)](https://git.io/typing-svg)

The project is a work in progress! Here are some features I'm currently working on:

-   **Deployment**: Host the application on a cloud service so it's publicly accessible.
-   **Enhanced Romaji**: Integrate a more advanced Romaji conversion tool.
